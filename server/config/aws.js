import AWS from 'aws-sdk';
require('dotenv').config();

const awsConfig = {
    accessKeyId:process.env.AWS_ACCESS_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion:process.env.AWS_API_VERSION
};

const SES = new AWS.SES(awsConfig);



export default SES;