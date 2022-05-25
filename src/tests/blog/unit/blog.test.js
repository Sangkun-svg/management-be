import "regenerator-runtime";
import { blogService } from "../../../services/blogService";

test("create blog test", async () => {
  const data = {
    title: "title",
    writer: "Sangkun",
    content: "content",
  };
  await blogService.create(data);
});

test("find blog poster by PK", async () => {
  const id = 1;
  await blogService.findOneByPk(id);
});

test("find All blog posters ", async () => {
  await blogService.findAll();
});

test("update blog posters ", async () => {
  const data = {
    id: 2,
    title: "Update Test Title",
    writer: "Updater is SK",
    content: "Update content",
  };
  await blogService.update(data);
});

test("delete blog posters ", async () => {
  const id = 1;
  const poster = await blogService.findOneByPk(id);
  await blogService.delete(poster);
});
