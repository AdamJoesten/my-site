import { Construct } from 'constructs';
import { aws_iam as iam, aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';

interface BasePemissionsProps {
  pipeline: Pipeline;
  githubSecretCompleteArn: string;
  pipelineInlinePolicyId: string;
  githubSecretId: string;
}

export class Permissions extends Construct {
  githubSecretId: string;
  githubSecretCompleteArn: string;
  constructor(scope: Construct, id: string, props: BasePemissionsProps) {
    super(scope, id);
    this.githubSecretId = props.githubSecretId;
    this.githubSecretCompleteArn = props.githubSecretCompleteArn;

    const { pipelineInlinePolicyId, pipeline } = props;

    const secretsManagerPolicy = new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [this.githubSecretCompleteArn],
    });

    pipeline.role?.attachInlinePolicy(new iam.Policy(this, pipelineInlinePolicyId, {
      statements: [secretsManagerPolicy],
    }));

    const secret = secretsmanager.Secret.fromSecretAttributes(this, this.githubSecretId, {
      secretCompleteArn: this.githubSecretCompleteArn
    });
    secret.grantRead(pipeline.role);
  }
}
