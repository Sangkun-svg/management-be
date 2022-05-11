import "regenerator-runtime";
import { userService } from "../services/userService";
import { User } from "../models/userModel";
import { dbConfig } from "../../sequelize";
import bcrypt from "bcryptjs";

// describe("about user test", () => {

const expectToBe = (expected, toBe) => {
  console.log(`expect(${expected}).toBe(${toBe})`);
  expect(expected).toBe(toBe);
};

const data = {
  id: "SangkunId",
  password: "testPassword",
  name: "encryt",
  email: "testEmail@test.com",
};
test("bcrytojs 를 이용한 password 암호화 테스트", async () => {
  const password = "UserPassword";
  const encrytedPassword = await userService.encryptPassword(password);
  expect(await bcrypt.compare(password, encrytedPassword)).toBe(true);
});

test("회원가입 테스트", async () => {
  const transaction = await dbConfig.transaction();
  await userService.register(data);
  const user = await User.findOne({
    raw: true,
    where: [{ id: data.id }],
  });
  const { id, password, email, name, provider, is_deleted } = user;
  expect(id).toBe(data.id);
  expect(await bcrypt.compare(data.password, password)).toBe(true);
  expect(name).toBe(data.name);
  expect(email).toBe(data.email);
  expect(provider).toBe("local");
  expect(is_deleted).toBe(Number(false));

  await transaction.rollback();
});
