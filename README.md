# Welcome to an awesome CDK TypeScript project!

The purpose of this repository is to demonstrate a pipeline (using Github Actions) which deploys a new and isolated version of a simple application for every pull request. This means that you can try out your changes, run integration tests etc before you merge your branch into master and without affecting the code running in production in any way.

The file [lib/ecs-awesome-pipeline-stack.ts](lib/ecs-awesome-pipeline-stack.ts) contains a variable called `COLOR` which you can edit before you open a pull request. That way you can quickly verify that the deployed application really includes the changes you made.

Feel free to fork this repo if you want to play around with it.

## Overview

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Setup

* Install npm.

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

* Install CDK: `npm install -g aws-cdk`

* Install Docker if you want to run the app locally.

### Install dependencies

    npm ci

### Create an AWS IAM user

How to generate an access key to use with the AWS CLI.
- Go to AWS IAM > Users > Add user in the AWS Console.
- Select "Programmatic access" (and "AWS Management Console access" if you want to).
- In the next step, add the user to the group "developer".
- If you need to, you can then edit the groups for this permission.
- Remember to copy the generated key id and secret access key (and password if you generated one), because you will not be able to retrieve them later.
- Put the generated credentials on your local computer:

`~/.aws/credentials`:

    [default]
    aws_access_key_id=
    aws_secret_access_key=

`~/.aws/config`:

    [default]
    region=eu-west-1
    output=json


## Deployment

### Publish Docker image (manually)

    docker build -t latest .

    aws ecr describe-repositories

Use the URL you got as output in the following commands.

    aws ecr get-login-password | docker login --username AWS --password-stdin 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

    docker tag hello-world 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

    docker push 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app


### Deploy CloudFormation stack (manually)

Deploy this stack to your default AWS account/region:

    cdk deploy HisingenHackathonServiceStack --require-approval never

In the output, you will see the URL to your application.

Other useful commands:

 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


### Deploy with Github Actions
All you need to do is to add the following Github Secrets: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. You can either use the same credentials as you use locally or generate a separate set of credentials.


The pipeline, which is specified in [aws.yml](.github/workflows/aws.yml), will be run automatically on every push to master.

## Run image locally 

    docker build -t hello-world .

    docker run -t -i -p 80:80 -e color=GREEN hello-world

Visit http://localhost:80 in your browser.

## Destroy resouces

* Destroy all the deployed CloudFormation stacks.
* The ECR registry has a DeletionPolicy set, and therefore needs to be deleted manually.
