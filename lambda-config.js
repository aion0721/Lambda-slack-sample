require("dotenv").config();

module.exports = {
  region: process.env.lambda_region,
  handler: "index.handler",
  role: process.env.lambda_role,
  functionName: process.env.lambda_functionName,
  timeout: 10,
  eventSource: process.env.lambda_eventSource,
};
