const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
module.exports = withTypescript(
  withSass(
    {
      env: {
        URL: 'http://localhost:4500/graphql'
      }
    }
  )
);