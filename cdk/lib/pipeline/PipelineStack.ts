import {
  Stack,
  type StackProps,
  aws_codepipeline as codepipeline,
} from 'aws-cdk-lib';
import { type Construct } from 'constructs';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    const pipeline = new codepipeline.Pipeline(this, 'MySitePipeline', {
      pipelineName: 'my-site-pipeline',
    });
  }
}
