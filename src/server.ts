import { app } from './gateway/rest-gateway';

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`AI OS Security API listening on port ${port}`);
});
