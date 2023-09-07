const db = require("../db");
const { StatusCodes } = require("http-status-codes");

const getAllArticles = async (_req, res) => {
  const { rows: articles } = await db.query("SELECT * FROM parking");
  res.status(StatusCodes.OK).json({ count: articles.length, articles });
};

const createArticle = async (req, res) => {
  const { title, picture, price, city, street, description, available_date } =
    req.body;
  const { userId } = req.user;

  const {
    rows: [createdArticle],
  } = await db.query(
    "INSERT INTO parking (title,picture,price, city,street, description,available_date, user_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [title, picture, price, city, street, description, available_date, userId]
  );

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Offre créé", article: createdArticle });
};

const getAllUserArticles = async (req, res) => {
  const { rows: articles } = await db.query(
    "SELECT * FROM parking WHERE user_id = $1",
    [req.user.userId]
  );
  res.status(StatusCodes.OK).json({ count: articles.length, articles });
};

const getSingleArticle = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [article],
  } = await db.query("SELECT * FROM parking WHERE article_id = $1", [id]);

  res.status(StatusCodes.OK).json({ article });
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, picture, price, city, street, description, available_date } =
    req.body;

  const {
    rows: [updatedArticle],
  } = await db.query(
    "UPDATE parking SET  title= $1, picture=$2, price= $3, city=$4, street=$5, description=$6 ,date=$7 WHERE article_id = $8 RETURNING *",
    [title, picture, price, city, street, description, available_date, id]
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Article modifié", article: updatedArticle });
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [deletedArticle],
  } = await db.query("DELETE FROM parking WHERE article_id = $1 RETURNING *", [
    id,
  ]);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Offre supprimée", article: deletedArticle });
};

module.exports = {
  createArticle,
  getAllUserArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
};
