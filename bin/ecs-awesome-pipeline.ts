#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcsAwesomePipelineStack } from '../lib/ecs-awesome-pipeline-stack';
import { CommonInfrastructure } from '../lib/common-infrastructure';

const branchSuffix = process.env.BRANCH_SUFFIX || '';
const app = new cdk.App();
const stack1 = new CommonInfrastructure(app, 'HisingenHackathonPermanentInfrastructure');
new EcsAwesomePipelineStack(app, `HisingenHackathonServiceStack-${branchSuffix}`, {
  ecrRepository: stack1.ecrRepository,
  ecsCluster: stack1.ecsCluster,
});
