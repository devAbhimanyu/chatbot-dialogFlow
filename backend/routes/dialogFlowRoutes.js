const { textQuery, eventQuery } = require('../chatbot');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ msg: 'hello theres' });
  });

  app.post('/api/df_text_query', async (req, res, next) => {
    // console.log(req.body.text);
    try {
      const response = await textQuery(req.body.text);
      res.send(response);
    } catch (err) {
      res.status(500);
      next('error', { error: err });
    }
  });

  app.post('/api/df_event_query', async (req, res, next) => {
    // try {
    const response = await eventQuery(req.body.event);
    res.send(response);
    // } catch (err) {
    //   res.status(500);
    //   next('error', { error: err });
    // }
  });
};
