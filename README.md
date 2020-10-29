# Welcome to an awesome CDK TypeScript project!

This is an awesome project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Setup

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

* Install CDK: `npm install -g aws-cdk`

* Install Docker if you want to run the app locally.

### Create an AWS IAM user

How to generate an access key to use with the AWS CLI.
This is needed in order to use the Devies AWS account.
- Go to AWS IAM > Users > Add user.
- Select "Programmatic access" (and "AWS Management Console access" if you want to).
- In the next step, add the user to the group "developer".
- If you need to, you can then edit the groups for this permission.
- Remember to copy the generated key id and secret access key (and password if you generated one), because you will not be able to retrieve them later.
- Put the credentials into `~/.aws/credentials`.


## Publish Docker image

    docker build -t hello-world .

    aws ecr describe-repositories

Use the URL you got as output in the following commands.

    aws ecr get-login-password | docker login --username AWS --password-stdin 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

    docker tag hello-world 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app

    docker push 856309271307.dkr.ecr.eu-west-1.amazonaws.com/hello-world-app


## Deploy CloudFormation stack

Deploy this stack to your default AWS account/region:

    cdk deploy --require-approval never

In the output, you will see the URL to your application.

Other useful commands:

 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## Run image locally 

    docker build -t hello-world .

    docker run -t -i -p 80:80 -e color=GREEN hello-world

Vist http://localhost:80 in your browser.
