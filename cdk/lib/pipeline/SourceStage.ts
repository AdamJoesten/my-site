import { Construct } from 'constructs';
import {
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as codepipelineActions,
  aws_secretsmanager as secretsManager,
} from 'aws-cdk-lib';

interface SourceStageProps {
  pipeline: codepipeline.Pipeline;
}

export class SourceStage extends Construct {
  public readonly sourceOutput: codepipeline.Artifact;
  constructor(scope: Construct, id: string, props: SourceStageProps) {
    super(scope, id);

    const oauthToken = secretsManager.Secret.fromSecretCompleteArn(
      this,
      'MySiteSecret',
      '',
    );

    this.sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipelineActions.GitHubSourceAction({
      actionName: 'Source',
      owner: 'AdamJoesten',
      repo: 'my-site',
      oauthToken: oauthToken.secretValue,
      output: this.sourceOutput,
      branch: 'main', // optional, default: 'master'
    });

    props.pipeline.addStage({
      stageName: 'Source',
      actions: [sourceAction],
    });
  }
}
