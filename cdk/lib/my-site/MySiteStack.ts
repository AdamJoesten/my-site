import {Stack, type StackProps} from 'aws-cdk-lib';
import { type Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MySiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
