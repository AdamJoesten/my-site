import { Construct } from 'constructs';
import {
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as codepipelineActions,
  aws_codebuild as codebuild,
} from 'aws-cdk-lib';
import { PipelineProjectProps } from 'aws-cdk-lib/aws-codebuild';

interface BaseBuildStageProps {
  pipelineProjectId: string;
  sourceOutput: codepipeline.Artifact;
}

type BuildStageProps = BaseBuildStageProps & PipelineProjectProps;

export class BuildStage extends Construct {
  public readonly buildOutput: codepipeline.Artifact;
  public readonly buildAction: codepipelineActions.CodeBuildAction;
  constructor(scope: Construct, id: string, props: BuildStageProps) {
    super(scope, id);
    const { pipelineProjectId, sourceOutput, projectName, buildSpec } = props;
    this.buildOutput = new codepipeline.Artifact();
    this.buildAction = new codepipelineActions.CodeBuildAction({
      actionName: 'Build',
      input: sourceOutput,
      outputs: [this.buildOutput],
      project: new codebuild.PipelineProject(this, pipelineProjectId, {
        projectName,
        buildSpec,
      }),
    });
  }
}
