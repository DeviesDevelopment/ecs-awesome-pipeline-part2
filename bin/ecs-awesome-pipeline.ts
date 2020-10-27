#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcsAwesomePipelineStack } from '../lib/ecs-awesome-pipeline-stack';

const app = new cdk.App();
new EcsAwesomePipelineStack(app, 'EcsAwesomePipelineStack');
