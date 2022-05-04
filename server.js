import express from "express";
import cors from "cors";
import { dbConfig } from "./sequelize.js";
import { Customers } from "./user.model.js";
import multer from "multer";
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
const upload = multer({ dest: "./upload" });
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("./upload"));

app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customers.findAll({ raw: true });
    return res.send(customers);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/customers", upload.single("image"), async (req, res) => {
  try {
    const {
      body: { name, age, gender, career },
      file: { filename },
    } = req;
    const image = "/image/" + filename;
    const newCustomer = {
      name: name,
      age: age,
      gender: gender,
      career: career,
      image: image,
    };
    const addCustomer = await Customers.create(newCustomer);
    return;
  } catch (err) {
    console.error(err);
  }
});

app.listen(9000, () => {
  console.log(`Listening server port ${port}`);
});

dbConfig
  .sync()
  .then(() => console.info("connected to db"))
  .catch((e) => {
    console.error("Errordb ", e);
    throw "error";
  });
