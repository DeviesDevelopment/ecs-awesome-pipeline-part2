import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import ecr = require("@aws-cdk/aws-ecr");

export class CommonInfrastructure extends cdk.Stack {

  public readonly ecrRepository: ecr.Repository;
  public readonly ecsCluster: ecs.Cluster;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.ecrRepository = new ecr.Repository(this, "hello-world-app", {
      repositoryName: "hello-world-app"
    });

    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 3 // Default is all AZs in region
    });

    // something with URL
    // redirect to service?
    this.ecsCluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    });

    const externalLoadBalancer = new elbv2.ApplicationLoadBalancer(this, 'ExternalLoadBalancer', {
      vpc,
      internetFacing: true
    });
    const listener = externalLoadBalancer.addListener('Listener', {
      port: 80,
    })

  }
}