import "regenerator-runtime";
import { userService } from "../services/userService";
import { User } from "../models/userModel";
import { dbConfig } from "../../sequelize";
import bcrypt from "bcryptjs";

// describe("about user test", () => {

/*
const simpleExpect = (target, expected) => {
  console.log(`target : ${target} & expected : ${expected}`);
  expect(target).toContainEqual(expected);
  const test = () => {
    simpleExpect(no, 1);
    simpleExpect(id, data.id);
    simpleExpect(password, data.password);
    simpleExpect(name, data.name);
    simpleExpect(email, data.email);
    simpleExpect(provider, "local");
    simpleExpect(is_deleted, false);
  };
};
*/
const data = {
  id: "testId",
  password: "testPassword",
  name: "testName",
  email: "testEmail@test.com",
};

test("회원가입 테스트", async () => {
  const transaction = await dbConfig.transaction();
  await userService.register(data);
  const user = await User.findOne({
    raw: true,
    where: [{ id: data.id }],
  });
  const { id, password, email, name, provider, is_deleted } = user;
  expect(id).toBe(data.id);
  expect(password).toBe(data.password);
  expect(name).toBe(data.name);
  expect(email).toBe(data.email);
  expect(provider).toBe("local");
  expect(is_deleted).toBe(Number(false));

  await transaction.rollback();
});

test("bcrytojs 를 이용한 password 암호화 테스트", async () => {
  const password = "1234";
  const encrytedPassword = await bcrypt.hash(password, 12);
  expect(await bcrypt.compare(password, encrytedPassword)).toBe(true);
});
