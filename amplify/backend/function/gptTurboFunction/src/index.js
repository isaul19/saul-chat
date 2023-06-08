/**
 * @typedef {import('aws-lambda').APIGatewayProxyEvent} APIGatewayProxyEvent
 * @typedef {import('aws-lambda').APIGatewayProxyResult} APIGatewayProxyResult
 */

/**
 * @type {import('aws-lambda').APIGatewayProxyHandler}
 */

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY
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
  try {
    const prompt = event.body;
    let openaiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });

    openaiResponse = openaiResponse.data.choices[0].message.content;
    return buildResponse({ code: 200, content: openaiResponse });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return buildResponse({
        code: 500,
        content: "Error en la clave de la API"
      });
    } else {
      return buildResponse({
        code: 500,
        content: "Error en la llamada a la API"
      });
    }
  }
};
