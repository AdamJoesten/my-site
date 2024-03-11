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

    this.staticSite = new StaticSite(this, 'StaticSite', {
      domainName: this.node.tryGetContext('domain'),
      siteSubDomain: this.node.tryGetContext('subdomain'),
    });

    this.pipeline = new Pipeline(this, 'Pipeline', {
      bucketName: this.staticSite.bucketName,
    });
  }
}
