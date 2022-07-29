module.exports = {
  apps: [{
    name: 'coupon-promo-offer-service',
    script: './src/index.js',
    env_production: {
       NODE_ENV: 'production',
    },
    env_development: {
       NODE_ENV: 'development',
    },
  }],
};
