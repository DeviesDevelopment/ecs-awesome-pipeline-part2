# Welcome to an awesome CDK TypeScript project!

This is an awesome project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Setup

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

* Install CDK: `npm install -g aws-cdk`

## Create an AWS IAM user

How to generate an access key to use with the AWS CLI.
This is needed in order to use the Devies AWS account.
- Go to AWS IAM > Users > Add user.
- Select "Programmatic access" (and "AWS Management Console access" if you want to).
- In the next step, add the user to the group "developer".
- If you need to, you can then edit the groups for this permission.
- Remember to copy the generated key id and secret access key (and password if you generated one), because you will not be able to retrieve them later.
- Put the credentials into `~/.aws/credentials`.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy --require-approval never`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Publish Docker image

    docker build -t hello-world .

    aws ecr describe-repositories

    aws ecr get-login-password | docker login --username AWS --password-stdin 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

    docker tag hello-world 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

    docker push 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

## Run image locally 

    docker build -t hello-world .

    docker run -t -i -p 80:80 -e color=GREEN hello-world
