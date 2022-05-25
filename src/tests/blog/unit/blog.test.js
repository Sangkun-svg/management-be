import "regenerator-runtime";
import { blogService } from "../../../services/blogService";

test("create blog test", async () => {
  const data = {
    title: "title",
    writer: "Sangkun",
    content: "content",
  };
  await blogService.createPost(data);
});

test("find blog poster by PK", async () => {
  const id = 1;
  await blogService.findOneByPosterId(id);
});

test("find All blog posters ", async () => {
  await blogService.findAllPosters();
});

test("update blog posters ", async () => {
  const data = {
    id: 2,
    title: "Update Test Title",
    writer: "Updater is SK",
    content: "Update content",
  };
  await blogService.updatePost(data);
});

test("delete blog posters ", async () => {
  const id = 1;
  const poster = await blogService.findOneByPosterId(id);
  await blogService.deletePost(poster);
});
