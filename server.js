import express from "express";

const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello express !" });
});

app.listen(9000, () => {
  console.log(`Listening server port ${port}`);
});
// git remote add origin git@github.com:Sangkun-svg/management-be.git
// git branch -M master
// git push -u origin master
