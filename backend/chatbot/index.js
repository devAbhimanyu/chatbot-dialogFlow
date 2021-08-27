const dialogFlow = require('dialogflow');
const structJson = require('./structJson');
const config = require('../config/keys');

const projectId = config.projectId;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

console.log(projectId);

const sessionClient = new dialogFlow.SessionsClient({ projectId, credentials });
const sessionPath = sessionClient.sessionPath(projectId, config.dfSessionID);

const textQuery = async (text, params) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: config.dfSessionLangCode,
      },
    },
    queryParams: {
      payload: {
        data: params,
      },
    },
  };
  try {
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    return result;
  } catch (err) {
    throw err;
  }
};

const eventQuery = async (event, params = {}) => {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: event,
        parameters: structJson.jsonToStructProto(params),
        languageCode: config.dfSessionLangCode,
      },
    },
  };
  // try {
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected event');
  const result = responses[0].queryResult;
  return result;
  // } catch (err) {
  //   throw err;
  // }
};

module.exports = { textQuery, eventQuery };
