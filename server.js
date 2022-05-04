import express from "express";
import cors from "cors";
const app = express();

const port = process.env.PORT || 9000;
const options = {
  allowedHeaders: [
    "*",
    "Origin",
    "X-Requested-With",
    "X-Custom-Header",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  console.log("get all customers");
  return res.send([
    {
      id: 1,
      image: "https://placeImg.com/64/64/1",
      name: "Sangkun",
      age: 23,
      gender: "male",
      career: "GnB",
    },
    {
      id: 2,
      image: "https://placeImg.com/64/64/2",
      name: "Tay",
      age: 30,
      gender: "male",
      career: "GnB",
    },
    {
      id: 3,
      image: "https://placeImg.com/64/64/3",
      name: "Summer",
      age: 32,
      gender: "female",
      career: "GnB",
    },
  ]);
});

app.listen(9000, () => {
  console.log(`Listening server port ${port}`);
});
// git remote add origin git@github.com:Sangkun-svg/management-be.git
// git branch -M master
// git push -u origin master
