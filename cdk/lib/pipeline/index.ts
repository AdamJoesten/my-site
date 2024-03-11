import {
  aws_codebuild as codebuild,
  aws_codepipeline as codepipeline,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildStage } from './BuildStage';
import { SourceStage } from './SourceStage';
import { Permissions } from './Permissions';
import { PipelineType } from 'aws-cdk-lib/aws-codepipeline';

interface PipelineStackProps {
  bucketName: string;
}

export class Pipeline extends Construct {
  public readonly pipeline: codepipeline.Pipeline;
  private sourceStage: SourceStage;
  private buildStage: BuildStage;
  private permissions: Permissions;
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id);
    const { bucketName } = props;
    this.pipeline = new codepipeline.Pipeline(this, 'MySitePipeline', {
      pipelineName: 'MySitePipelineName',
      pipelineType: PipelineType.V2,
    });

    this.permissions = new Permissions(this, 'MySitePermissions', {
      pipeline: this.pipeline,
      pipelineInlinePolicyId: 'MySitePipelineInlinePolicyId',
      githubSecretCompleteArn:
        'arn:aws:secretsmanager:us-east-1:405960576015:secret:prod/my-site/github-yeWC5h',
      githubSecretId: 'MySiteGithubSecretId',
    });

    this.sourceStage = new SourceStage(this, 'MySitePipelineSourceStage', {
      githubSecretArn: this.permissions.githubSecretCompleteArn,
      githubSecretId: this.permissions.githubSecretId,
      owner: 'AdamJoesten',
      repo: 'my-site',
    });

    this.pipeline.addStage({
      stageName: 'Source',
      actions: [this.sourceStage.sourceAction],
    });

    this.buildStage = new BuildStage(this, 'MySitePipelineBuildStage', {
      sourceOutput: this.sourceStage.sourceOutput,
      pipelineProjectId: 'MySitePiplineBuildProject',
      // You can also create your own buildspec.yml file and reference it here instead of using the inline buildspec
      // https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-syntax
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: ['npm install -g gatsby'],
          },
          pre_build: {
            commands: ['npm install', 'npm run test'],
          },
          build: {
            commands: ['npm run build'],
          },
          post_build: { // Deploy Stage
            commands: [
              `aws s3 sync "public/" "s3://${bucketName}" --delete`, // NOTE: --acl "public-read"`,
            ],
          },
        },
        artifacts: {
          'base-directory': 'public',
          files: ['**/*'],
          'discard-paths': 'yes',
        },
        cache: {
          paths: ['public/**/*', '.cache/**/*'],
        },
      }),
    });

    this.pipeline.addStage({
      stageName: 'Build',
      actions: [this.buildStage.buildAction],
    });
  }
}
