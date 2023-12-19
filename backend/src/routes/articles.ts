import {Router} from 'express'
import { instance as axios } from '../axiosConfig.js';

const articlesRouter = Router();

articlesRouter.get("/", async (req, res, next) => {
  const {articleTypeId, categoryId} = req.query

  try {
    const axiosRes = await axios.get("/articles", {
      params: {articleTypeId, categoryId}
    })
    const articles = axiosRes.data
    res.json(articles)
    console.log(articles)
  } catch (error) {
    next(error)
  }
})

export {articlesRouter}