import { Router } from "express";
import { instance as axios } from "../axiosConfig.js";

const articlesRouter = Router();
const articleLimit = 40;

// Get articles by article type and category
articlesRouter.get("/", async (req, res, next) => {
  const { articleTypeId, categoryId } = req.query;

  try {
    const axiosRes = await axios.get("/articles", {
      params: { articleTypeId, categoryId },
    });
    const articles = axiosRes.data.articles;
    res.json(articles.slice(0, articleLimit));
  } catch (error) {
    next(error);
  }
});

// Get article by id
articlesRouter.get("/:articleId", async (req, res, next) => {
  const articleId = req.params.articleId

  try {
    const axiosRes = await axios.get(`/article/${articleId}/xml`)
    const articleData = axiosRes.data
    console.log(articleData)
    res.json(articleData)
  } catch (error) {
    next(error)
  }
})

export { articlesRouter };
