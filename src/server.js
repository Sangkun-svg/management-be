import { app } from "./app.js";

const port = process.env.PORT || 9000;

app.listen(9000, () => {
  console.log(`Listening server port ${port}`);
});
