import { Router } from "express";
import { instance as axios } from "../axiosConfig.js";

const articlesRouter = Router();
const articleLimit = 100;

articlesRouter.get("/", async (req, res, next) => {
  const { articleTypeId, categoryId } = req.query;

  try {
    const axiosRes = await axios.get("/articles", {
      params: { articleTypeId, categoryId },
    });
    const articles = axiosRes.data;
    res.json(articles ? articles.articles.slice(0, articleLimit) : []);
  } catch (error) {
    console.log(error);
  }
});

export { articlesRouter };
