import "regenerator-runtime";
import { userService } from "../../../services/userService";
import { User } from "../../../models/userModel";
import { dbConfig } from "../../../../sequelize";
import bcrypt from "bcryptjs";
import { message } from "../../../constants/index.js";
import { jwtConfig } from "../../../config/jwtConfig";
import jwt from "jsonwebtoken";

// describe("about user test", () => {

const expecttoEqual = (expected, toEqual) => {
  console.log(`expect(${expected}).toEqual(${toEqual})`);
  expect(expected).toEqual(toEqual);
};

const data = {
  id: "SangkunId",
  password: "testPassword",
  name: "encryt",
  email: "testEmail@test.com",
};

const findUser = async (userId) => {
  const user = await User.findOne({
    raw: true,
    where: [{ id: userId }],
  });
  return user;
};

test("bcrytojs 를 이용한 password 암호화 테스트", async () => {
  const password = "UserPassword";
  const encrytedPassword = await userService.encryptPassword(password);
  expect(await bcrypt.compare(password, encrytedPassword)).toBeTruthy();
});

test("회원가입 성공 테스트", async () => {
  const transaction = await dbConfig.transaction();

  await userService.register(data);
  const user = await findUser(data.id);
  const { id, password, email, name, provider, is_deleted } = user;
  expect(data.id).toStrictEqual(id);
  expect(await bcrypt.compare(data.password, password)).toBeTruthy();
  expect(data.name).toStrictEqual(name);
  expect(data.email).toStrictEqual(email);
  expect("local").toStrictEqual(provider);
  expect(is_deleted).toBeFalsy();

  await transaction.rollback();
});

// test("회원가입 실패 테스트", async () => {}); TODO: 설공/실패 케이스 별로 테스트 코드 작성하기

test("회원가입 정보 validation 실패 테스트", async () => {
  expect(await userService.validateDuplicate(data.id)).toBeFalsy();
});
test("회원가입 정보 validation 성공 테스트", async () => {
  expect(await userService.validateDuplicate("NoneExistId")).toBeTruthy();
});

test("로그인 시도 시 password 일치 테스트", async () => {
  const user = await findUser(data.id);
  expect(
    await userService.comparePassword(data.password, user.password)
  ).toBeTruthy();
});

test("로그인 시도 시 password 불일치 테스트", async () => {
  const user = await findUser(data.id);
  expect(
    await userService.comparePassword(data.password, "anyWord")
  ).toBeFalsy();
});

// test("로그인 성공 테스트", async () => {
//   expect(await userService.login(data)).toEqual({
//     status: 200,
//     token: token,
//     name: data.name,
//   });
// });

test("로그인 아이디 불일치 테스트", async () => {
  const reformData = {
    ...data,
    id: "unknownId",
  };
  expect(await userService.login(reformData)).toEqual({
    status: 403,
    message: message.idNotEquals,
  });
});

test("로그인 비밀번호 불일치 테스트", async () => {
  const reformData = {
    ...data,
    password: "unknownPassword",
  };
  expect(await userService.login(reformData)).toEqual({
    status: 403,
    message: message.passwordNotEquals,
  });
});

// test.only("create token & verfied token", async () => {});
