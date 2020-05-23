require("dotenv").config();

console.log("Loading function");

//kobatest
exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(function (record) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);
  });
  callback(null, "message");

  const https = require("https");
  var data = JSON.stringify({
    text: "Result: :apple:",
    blocks: [],
    attachments: [
      {
        color: "#00FF00",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "A message *with some bold text* and _some italicized text_.",
            },
          },
        ],
      },
    ],
  });

  var options = {
    hostname: "hooks.slack.com",
    port: 443,
    path: process.env.slack_path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  var req = https.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log("OK:" + res.statusCode);
    } else {
      console.log("Status Error:" + res.statusCode);
    }
  });

  req.on("error", (e) => {
    console.error(e);
  });

  req.write(data);

  req.end();
};
