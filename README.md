# AWS Step function vs. AWS Lambda benchmark

Looking into the AWS ecosystem of serverless services, AWS Step Functions is one of my personal most favourite services. I recently had a chat with some colleagues about a potential use case of Step functions in favour of AWS Lambda. While we discussed the general concept of AWS Step Functions, one argued towards the usage of AWS Lambda like

> Let us use AWS Lambda because a workflow described as a state machine sounds like it is very much slower.

This statement initially started to make me think a lot about this. I could neither substantiate this statement nor could I contradict it. So I started to prove the original assumption "Step Functions is slower than Lambda" with facts. Time for a benchmark!

To get details about the benchmark results, please jump over to my [blog post for a comprehensive overview](https://dev.to/cremich/aws-step-function-vs-aws-lambda-benchmark-4f41).

## Benchmark setup

The goal of this benchmark is not to say service a) is better/worse than service b). What we want to achieve, is getting a better understanding what kind of latencies we can measure for Step Functions and how this compares to a similar integration based on AWS Lambda.

Keep in mind: each service has is strengths and weaknesses.

We want to measure the time it takes to write data to and read data from S3 both from a state machine and a Lambda function. Hence we provide the same logic in two different versions.
Version 1 simply writes to S3. Version 2 extends this by executing a `GetObject` operation afterwards.

## Deploy the application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 10](https://nodejs.org/en/), including the NPM package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

- **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
- **AWS Region**: The AWS region you want to deploy your app to.
- **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
- **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
- **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name serverless-latency
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
