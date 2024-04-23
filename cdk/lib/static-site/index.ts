#!/usr/bin/env node
import {
  aws_route53,
  aws_s3,
  aws_certificatemanager,
  aws_cloudfront,
  aws_s3_deployment,
  aws_route53_targets,
  aws_cloudfront_origins,
  aws_iam,
} from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import path = require('path');

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {
  prodBucket: IBucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const hostedZoneId = process.env.HOSTED_ZONE_ID ?? '';
    const zoneName = this.node.tryGetContext('domain');
    const hostedZone = aws_route53.PublicHostedZone.fromHostedZoneAttributes(
      this,
      'MySiteHostedZone',
      {
        hostedZoneId,
        zoneName,
      }
    );
    new CfnOutput(this, 'HostedZone', {
      value: hostedZone.toString(),
    });

    const cloudfrontOAI = new aws_cloudfront.OriginAccessIdentity(
      this,
      'MySiteCloudfrontOriginAccessIdentity',
      {
        comment: `OAI for ${id}`,
      }
    );
    new CfnOutput(this, 'CloudfrontOAI', {
      value: cloudfrontOAI.toString(),
    });

    const baseDomain = this.node.tryGetContext('domain');
    const siteDomain = `${this.node.tryGetContext('subdomain')}.${baseDomain}`;
    new CfnOutput(this, 'Site', { value: 'https://' + baseDomain });

    // Content bucket
    this.prodBucket = new aws_s3.Bucket(this, 'MySiteProdBucket', {
      bucketName: baseDomain,
      publicReadAccess: false,
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      // removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
      // autoDeleteObjects: true, // NOT recommended for production code
    });

    // Grant access to cloudfront;
    this.prodBucket.addToResourcePolicy(
      new aws_iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [this.prodBucket.arnForObjects('*')],
        principals: [
          new aws_iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );
    new CfnOutput(this, 'Bucket', { value: this.prodBucket.bucketName });

    // TLS certificate
    const certificate = new aws_certificatemanager.Certificate(
      this,
      'MySiteTLSCertificate',
      {
        domainName: baseDomain,
        subjectAlternativeNames: [siteDomain],
        validation:
          aws_certificatemanager.CertificateValidation.fromDns(hostedZone),
      }
    );
    new CfnOutput(this, 'WWWTLSCertificate', {
      value: certificate.certificateArn,
    });

    //CloudFront distribution;
    const distribution = new aws_cloudfront.Distribution(
      this,
      'MySiteCloudfrontDistribution',
      {
        certificate,
        defaultRootObject: 'index.html',
        domainNames: [baseDomain, siteDomain],
        minimumProtocolVersion:
          aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 403,
            responsePagePath: '/404.html',
            ttl: Duration.minutes(30),
          },
        ],
        defaultBehavior: {
          origin: new aws_cloudfront_origins.S3Origin(this.prodBucket, {
            originAccessIdentity: cloudfrontOAI,
          }),
          compress: true,
          allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy:
            aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );
    new CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    });

    const wwwAliasRecord = new aws_route53.ARecord(
      this,
      'MySiteWWWAliasRecord',
      {
        recordName: siteDomain,
        target: aws_route53.RecordTarget.fromAlias(
          new aws_route53_targets.CloudFrontTarget(distribution)
        ),
        zone: hostedZone,
      }
    );
    new CfnOutput(this, 'WWWAliasRecord', {
      value: wwwAliasRecord.toString(),
    });

    const baseAliasRecord = new aws_route53.ARecord(
      this,
      'MySiteBaseAliasRecord',
      {
        recordName: baseDomain,
        target: aws_route53.RecordTarget.fromAlias(
          new aws_route53_targets.CloudFrontTarget(distribution)
        ),
        zone: hostedZone,
      }
    );
    new CfnOutput(this, 'BaseAliasRecord', {
      value: baseAliasRecord.toString(),
    });

    // Deploy site contents to S3 bucket
    const bucketDeployment = new aws_s3_deployment.BucketDeployment(
      this,
      'MySiteProdCFBucketDeploymentWithInvalidation',
      {
        sources: [
          aws_s3_deployment.Source.asset(
            path.join(__dirname, '..', '..', '..', 'public')
          ),
        ],
        destinationBucket: this.prodBucket,
        distribution,
        distributionPaths: ['/*'],
      }
    );
    new CfnOutput(this, 'BucketDeployment', {
      value: bucketDeployment.toString(),
    });
  }
}
