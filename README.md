# Hilton Hotel Assessment

The assessment uses MaterialUI, SSR, React, NodeJS, GraphQL, Jest.

#Video
You can runn 'video.mov' to take a quick look

#Node Version

8.16.0

# Get Started

1) Installation - From project root, run, npm install:

npm i

2) Running:

npm run dev

To run at a different port. Use PORT= prefix with a port number.

To run in a different environement.

3) Testing:

Open http://localhost:4500 to test from UI

Open http://localhost:4500/graphql to access graphql 

4) Building:

To build use NODE_ENV= with environment name and run npm run build.

Example for prod: 
NODE_ENV=production npm run build

#Jest unit tests

Run the following command:
npm run test

The tests try to cover as much as possible. 
- Material UI rendering in api_tests.test.ts
- Express API in api_test.test.ts
- GraphQL in gql_test.test.ts

#Config
.babelrc
nodemon.js
main.server.json
maincofnig.json
jest.config.js
jest.setup.js
mainconfig.jest.json
package.json
tslint.json
next.config.js




