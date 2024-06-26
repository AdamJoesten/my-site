#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MySiteStack } from '../lib';

const app = new cdk.App();
const mySiteStack = new MySiteStack(app, 'MySiteStack', {
  /**
   * This is required for our use of hosted-zone lookup.
   *
   * Lookups do not work at all without an explicit environment
   * specified; to use them, you must specify env.
   * @see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
   */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    /**
     * Stack must be in us-east-1, because the ACM certificate for a
     * global CloudFront distribution must be requested in us-east-1.
     */
    region: process.env.CDK_DEFAULT_REGION,
  },
});

cdk.Tags.of(mySiteStack).add('project', 'my-site');
