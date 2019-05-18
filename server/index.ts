import Server from './server';
import * as next from 'next';

const app = next({ dev: true });
const handler = app.getRequestHandler();
const port = process.env.PORT || 4500;

app.prepare().then(() => {
  const server = new Server(handler);
  server.app.listen(port, (err: any) => {
    if (err) {
      return console.log(err);
    }
    return console.log(`Server is up on ${port}`);
  });
});

export default app;