import {
  aws_codebuild,
  aws_codepipeline,
  aws_codepipeline_actions,
  aws_iam,
  aws_secretsmanager,
} from 'aws-cdk-lib';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface PipelineStackProps {
  prodBucket: IBucket;
}

export class Pipeline extends Construct {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id);

    const githubOAuthToken = aws_secretsmanager.Secret.fromSecretAttributes(
      this,
      'MySiteGithubOAuthToken',
      {
        secretCompleteArn: process.env.GITHUB_OAUTH_TOKEN_ARN,
      }
    );

    const sourceOutput = new aws_codepipeline.Artifact();
    const sourceAction = new aws_codepipeline_actions.GitHubSourceAction({
      output: sourceOutput,
      actionName: 'Github',
      owner: 'AdamJoesten',
      repo: 'my-site',
      branch: 'main',
      oauthToken: githubOAuthToken.secretValue,
    });

    const pipelineBuildProject = new aws_codebuild.PipelineProject(
      this,
      'MySitePipelineBuildProject',
      {
        environment: {
          buildImage: aws_codebuild.LinuxBuildImage.STANDARD_7_0,
          computeType: aws_codebuild.ComputeType.SMALL,
        },
        // You can also create your own buildspec.yml file and reference it here instead of using the inline buildspec
        // https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-syntax
        buildSpec: aws_codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              commands: ['n 20.11.0', 'node -v', 'npm -v', 'npm install'],
            },
            pre_build: {
              commands: ['npm test'],
            },
            build: {
              commands: ['npm run build'],
            },
          },
          artifacts: {
            'base-directory': 'public',
            files: ['**/*'],
            //  'discard-paths': 'yes',
          },
          // cache: {
          //   paths: ['public/**/*', '.cache/**/*'],
          // },
        }),
      }
    );

    const buildOutput = new aws_codepipeline.Artifact();
    const buildAction = new aws_codepipeline_actions.CodeBuildAction({
      input: sourceOutput,
      actionName: 'Codebuild',
      project: pipelineBuildProject,
      outputs: [buildOutput],
    });

    const deployAction = new aws_codepipeline_actions.S3DeployAction({
      input: buildOutput,
      actionName: 'S3Deploy',
      bucket: props.prodBucket,
    });

    const pipeline = new aws_codepipeline.Pipeline(this, 'MySitePipeline', {
      pipelineName: 'MySitePipeline',
      pipelineType: aws_codepipeline.PipelineType.V2,
      stages: [
        { stageName: 'Source', actions: [sourceAction] },
        { stageName: 'Build', actions: [buildAction] },
        { stageName: 'Deploy', actions: [deployAction] },
      ],
    });

    const getGithubSecretValuePolicyStatement = new aws_iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [process.env.GITHUB_OAUTH_TOKEN_ARN ?? ''],
    });

    const getGithubSecretValuePolicy = new aws_iam.Policy(
      this,
      'GetMySiteGithubSecretValuePolicy',
      {
        statements: [getGithubSecretValuePolicyStatement],
      }
    );

    pipeline.role?.attachInlinePolicy(getGithubSecretValuePolicy);
    githubOAuthToken.grantRead(pipeline.role);
  }
}
