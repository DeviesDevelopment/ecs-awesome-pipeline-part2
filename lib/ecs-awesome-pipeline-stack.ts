import * as cdk from '@aws-cdk/core';
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import ecr = require("@aws-cdk/aws-ecr");

const COLOR = "blue";

interface EcsAwesomePipelineStackProps extends cdk.StackProps {
  ecsCluster: ecs.Cluster,
  ecrRepository: ecr.Repository,
}

export class EcsAwesomePipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: EcsAwesomePipelineStackProps) {
    super(scope, id, props);

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: props.ecsCluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 1, // Default is 1
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository, "latest"),
        environment: {
          COLOR
        }
      },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true // Default is false
    });

  }
}
