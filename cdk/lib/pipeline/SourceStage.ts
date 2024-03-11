import { Construct } from 'constructs';
import {
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as codepipelineActions,
  aws_secretsmanager as secretsManager,
} from 'aws-cdk-lib';
import { GitHubSourceActionProps } from 'aws-cdk-lib/aws-codepipeline-actions';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

interface SourceStageBaseProps {
  githubSecretArn: string;
  githubSecretId: string;
}

type SourceStageProps = SourceStageBaseProps &
  Omit<GitHubSourceActionProps, 'actionName' | 'branch' | 'output' | 'oauthToken'> &
  Partial<Pick<GitHubSourceActionProps, 'actionName' | 'branch'>>;

export class SourceStage extends Construct {
  public readonly sourceOutput: codepipeline.Artifact;
  public readonly sourceAction: codepipelineActions.GitHubSourceAction;
  private githubSecret: ISecret;
  constructor(scope: Construct, id: string, props: SourceStageProps) {
    super(scope, id);
    const {
      githubSecretArn,
      githubSecretId,
      actionName = 'Source',
      owner,
      repo,
      branch = 'main',
    } = props;

    this.githubSecret = secretsManager.Secret.fromSecretCompleteArn(
      this,
      githubSecretId,
      githubSecretArn,
    );

    this.sourceOutput = new codepipeline.Artifact();

    this.sourceAction = new codepipelineActions.GitHubSourceAction({
      actionName,
      owner,
      repo,
      oauthToken: this.githubSecret.secretValue,
      output: this.sourceOutput,
      branch,
    });
  }
}
