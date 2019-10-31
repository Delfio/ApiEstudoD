import { Router } from "express";

import multer from "multer";
const routes = new Router();

import multerConfig from "./config/multer";

import Post from "./models/post";

routes.get("/", (req, res) => {
  return res.json({ ok: true });
});

routes.post("/post", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });
  return res.json(post);
});

module.exports = routes;
