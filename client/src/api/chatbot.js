import axios from 'axios';

export const getTextQuery = async (text) => {
  const res = await axios.post('/api/df_text_query', { text });
  const { fulfillmentMessages = [] } = res;
  const messages = fulfillmentMessages.map((msg) => {
    return {
      speaks: 'bot',
      msg,
    };
  });
  return messages;
};
