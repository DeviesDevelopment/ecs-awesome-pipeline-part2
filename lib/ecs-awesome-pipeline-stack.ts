import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import ecr = require("@aws-cdk/aws-ecr");

interface EcsAwesomePipelineStackProps extends cdk.StackProps {
  ecsCluster: ecs.Cluster,
  ecrRepository: ecr.Repository,
}

export class EcsAwesomePipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: EcsAwesomePipelineStackProps) {
    super(scope, id, props);

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateServiceBlack", {
      cluster: props.ecsCluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 1, // Default is 1
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository, "latest"),
        environment: {
          COLOR: "black"
        }
      },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true // Default is false
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateServiceRed", {
      cluster: props.ecsCluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 1, // Default is 1
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository, "latest"),
        environment: {
          COLOR: "red"
        }
      },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true // Default is false
    });
  }
}
