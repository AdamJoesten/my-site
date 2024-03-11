#!/usr/bin/env node
import {
  // aws_route53 as route53,
  aws_s3 as s3,
  // aws_certificatemanager as acm,
  // aws_cloudfront as cloudfront,
  aws_s3_deployment as s3deploy,
  // aws_route53_targets as targets,
  // aws_cloudfront_origins as origins,
  // aws_iam as iam,
} from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');

export interface StaticSiteProps {
  domainName: string;
  siteSubDomain: string;
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {
  bucketName: string;
  constructor(scope: Construct, id: string, props: StaticSiteProps) {
    super(scope, id);

    // const zone = route53.HostedZone.fromLookup(this, 'Zone', {
    //   domainName: props.domainName,
    // });
    // const zone = new route53.HostedZone(this, 'MySiteHostedZone', {
    //   zoneName: this.node.tryGetContext('domain'),
    // });
    const siteDomain = props.siteSubDomain + '.' + props.domainName;
    this.bucketName = siteDomain;
    // const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
    //   this,
    //   'MySiteCloudfrontOriginAccessIdentity',
    //   {
    //     comment: `OAI for ${id}`,
    //   },
    // );

    new CfnOutput(this, 'Site', { value: 'https://' + siteDomain });

    // Content bucket
    const siteBucket = new s3.Bucket(this, 'MySiteBucket', {
      bucketName: this.bucketName,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      /**
       * The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
       * the new bucket, and it will remain in your account until manually deleted. By setting the policy to
       * DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
       */
      // removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code

      /**
       * For sample purposes only, if you create an S3 bucket then populate it, stack destruction fails.  This
       * setting will enable full cleanup of the demo.
       */
      // autoDeleteObjects: true, // NOT recommended for production code
    });

    // Grant access to cloudfront
    // siteBucket.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     actions: ['s3:GetObject'],
    //     resources: [siteBucket.arnForObjects('*')],
    //     principals: [
    //       new iam.CanonicalUserPrincipal(
    //         cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId,
    //       ),
    //     ],
    //   }),
    // );
    new CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    // TLS certificate
    // const certificate = new acm.Certificate(this, 'MySiteCertificate', {
    //   domainName: siteDomain,
    //   validation: acm.CertificateValidation.fromDns(zone),
    // });

    // new CfnOutput(this, 'Certificate', { value: certificate.certificateArn });

    // CloudFront distribution
    // const distribution = new cloudfront.Distribution(this, 'MySiteCloudfrontDistribution', {
    //   certificate: certificate,
    //   defaultRootObject: 'index.html',
    //   domainNames: [siteDomain],
    //   minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
    //   errorResponses: [
    //     {
    //       httpStatus: 403,
    //       responseHttpStatus: 403,
    //       responsePagePath: '/error.html',
    //       ttl: Duration.minutes(30),
    //     },
    //   ],
    //   defaultBehavior: {
    //     origin: new origins.S3Origin(siteBucket, {
    //       originAccessIdentity: cloudfrontOAI,
    //     }),
    //     compress: true,
    //     allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
    //     viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //   },
    // });

    // new CfnOutput(this, 'DistributionId', {
    //   value: distribution.distributionId,
    // });

    // Route53 alias record for the CloudFront distribution
    // new route53.ARecord(this, 'MySiteAliasRecord', {
    //   recordName: siteDomain,
    //   target: route53.RecordTarget.fromAlias(
    //     new targets.CloudFrontTarget(distribution),
    //   ),
    //   zone,
    // });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'MySiteDeployWithInvalidation', {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, '..', '..', '..', 'public')),
      ],
      destinationBucket: siteBucket,
      // distribution,
      // distributionPaths: ['/*'],
    });
  }
}
