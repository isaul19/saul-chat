/**
 * @typedef {import('aws-lambda').APIGatewayProxyEvent} APIGatewayProxyEvent
 * @typedef {import('aws-lambda').APIGatewayProxyResult} APIGatewayProxyResult
 */

/**
 * @type {import('aws-lambda').APIGatewayProxyHandler}
 */

const { Configuration, OpenAIApi } = require("openai");

const OPENAI_KEY = process.env.OPENAI_KEY;
const configuration = new Configuration({
  apiKey: OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

const buildResponse = ({ code, content }) => {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify({ data: content })
  };
};

exports.handler = async (event /** @type {APIGatewayProxyEvent} */) => {
  const prompt = event.body;
  console.log("API_KEY:", OPENAI_KEY);
  console.log("PROMTP:", prompt);
  let openaiResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 2048,
    frequency_penalty: 0.5,
    presence_penalty: 0.5
  });
  console.log("RESPONSE:", openaiResponse);

  openaiResponse = openaiResponse.data.choices[0].message.content;
  return buildResponse({ code: 200, content: openaiResponse });
};
