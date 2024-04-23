#!/usr/bin/env node
import { Stack, type StackProps } from 'aws-cdk-lib';
import { StaticSite } from './static-site';
import { Construct } from 'constructs';
import { Pipeline } from './pipeline';

export class MySiteStack extends Stack {
  staticSite: StaticSite;
  pipeline: Pipeline;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.staticSite = new StaticSite(this, 'StaticSite');

    this.pipeline = new Pipeline(this, 'Pipeline', {
      prodBucket: this.staticSite.prodBucket,
    });
  }
}
