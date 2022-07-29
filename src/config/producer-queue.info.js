module.exports = {
  development: {
    login: {
      masterPos: {
        // username: 'nikhil',
        // password: 'nikhil',
        // host: '18.135.98.178',
        // exchange: 'login1',
        routingKey: 'login-masterPos',
        // exchangeType: 'direct',
        // vhost: 'nikhil',
        // durable: false,
      },
    },
    server: {
      newStore: {
        // username: 'nikhil',
        // password: 'nikhil',
        // host: '18.135.98.178',
        // exchange: 'login1',
        routingKey: 'server-newStore',
        // exchangeType: 'direct',
        // vhost: 'nikhil',
        // durable: false,
      },
    },
    receiver: {
      username: 'nikhil',
      password: 'nikhil',
      host: '18.135.98.178',
      vhost: 'nikhil',
    },
  },
  production: {
    login: {
      masterPos: {
        username: 'login',
        password: 'login',
        host: '18.135.98.178',
        exchange: 'login1',
        routingKey: 'login-masterPos',
        exchangeType: 'direct',
        vhost: 'login',
        durable: false,
      },
    },
  },
  staging: {
    login: {
      masterPos: {
        username: 'login',
        password: 'login',
        host: '18.135.98.178',
        exchange: 'login',
        routingKey: 'login-masterPos',
        exchangeType: 'direct',
        vhost: 'login',
        durable: false,
      },
    },
  },
};
