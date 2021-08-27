module.exports =
  process.env.NODE_ENV === 'producion' ? require('./prod') : require('./dev');
