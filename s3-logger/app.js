const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const S3 = new AWS.S3();
const bucketName = process.env.DestinationBucketName;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    console.log("EVENT: " + JSON.stringify(event));
    const key = "lambda/" + event.requestContext.requestId;
    await S3.putObject({
      Bucket: bucketName,
      Key: key,
      Body: new Date().toISOString(),
    }).promise();

    await S3.getObject({
      Bucket: bucketName,
      Key: key,
    }).promise();

    const response = {
      statusCode: 200,
      isBase64Encoded: false,
    };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
