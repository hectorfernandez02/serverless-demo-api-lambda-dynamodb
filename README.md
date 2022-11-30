# API using AWS Lambda and AWS DynamoDB


Project created to show the process to deploy a simple CRUD with Node.js (Typescript) using [Serverless Framework](https://www.serverless.com/). 

## :stop_sign: Pre-requirements
1) Create a S3 Bucket called "api-lambda-dynamodb-USERNAME-ENV" when YOURNAME is the USER_NAME defined on keys.yml and ENV the environment "dev" it's ok. 
Bucket example: api-lambda-dynamodb-hfernandez02-dev
2) Create an AWS IAM user and keep the aws_access_key_id and the aws_secret_access_key
3) Install [Serverless Framework](https://www.serverless.com/) CLI v3
4) Use node version 16.x  (we recommended NVM)


## :racing_car: 1,2,3... here we go!

*Complete the file keys.yml with your data

Run the following command:

```
serverless deploy --stage local
```

## :wave: Credits
> Hector Fernandez, AWS Community Builder
> Montevideo, Uruguay

[LI:](https://www.linkedin.com/in/hectorfernandez02/)
