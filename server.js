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
    const customers = await Customers.findAll({
      raw: true,
      where: { is_deleted: false },
    });
    return res.send(customers);
  } catch (err) {
    console.error(err);
  }
});
// softDelete : DB 내 isDeleted 컬럼 값에 따라 삭제처리를 한다
app.patch("/api/customer/delete/:id", (req, res) => {
  try {
    console.log("/api/customer/delete/:id");
    const customerId = Number(req.params.id);
    const customer = Customers.update(
      { is_deleted: true },
      {
        where: [{ id: customerId }],
      }
    );
    return Promise.resolve(customer);
  } catch (err) {
    console.error(err);
  }
});

// hardDelete : DB 내 데이터를 영구 삭제함
// app.delete("/api/customer/delete/:id", async (req, res) => {
//   try {
//     const customerId = Number(req.params.id);
//     console.log(typeof customerId, customerId);
//     const customer = await Customers.destroy({
//       where: [
//         {
//           id: customerId,
//         },
//       ],
//     });
//   } catch (err) {
//     console.error(err);
//   }
// });

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
