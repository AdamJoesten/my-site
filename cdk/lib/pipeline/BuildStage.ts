import { Construct } from 'constructs';
import {
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as codepipelineActions,
  aws_codebuild as codebuild,
} from 'aws-cdk-lib';

interface BuildStageProps {
  sourceOutput: codepipeline.Artifact;
  pipeline: codepipeline.Pipeline;
}

export class BuildStage extends Construct {
  public readonly buildOutput: codepipeline.Artifact;
  constructor(scope: Construct, id: string, props: BuildStageProps) {
    super(scope, id);

    this.buildOutput = new codepipeline.Artifact();
    const buildAction = new codepipelineActions.CodeBuildAction({
      actionName: 'Build',
      input: props.sourceOutput,
      project: new codebuild.PipelineProject(this, 'MySiteBuildProject', {
        projectName: 'my-site-build-project',
        // You can also create your own buildspec.yml file and reference it here instead of using the inline buildspec
        // https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-syntax
        buildSpec: codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              commands: ['npm install'],
            },
            build: {
              commands: [
                'npm run lint',
                'npm run test:unit',
                'npm run deploy',
                'npm run test:integration',
              ],
            },
          },
          artifacts: {
            'base-directory': '.',
            files: ['**/*'],
          },
          buildOutput: this.buildOutput,
        }),
      }),
    });
    props.pipeline.addStage({
      stageName: 'Build',
      actions: [buildAction],
    });
  }
}
