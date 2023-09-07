const { Router } = require("express");
const router = Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentificationMiddleware.js");

const {
  validateAddItemInput,

  validateIdParam,
} = require("../middlewares/validationMiddleware.js");

const {
  createArticle,
  getAllUserArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
} = require("../controllers/parkingController.js");
const uploadImage = require("../controllers/uploadController.js");

router.route("/").get(getAllArticles);
router.use(authenticateUser);
router.route("/uploads").post(uploadImage);
router
  .route("/users")
  .get(getAllUserArticles)
  .post(validateAddItemInput, createArticle);
router
  .route("/:id")
  .get(validateIdParam, getSingleArticle)
  .put([validateIdParam], updateArticle)
  .delete(validateIdParam, deleteArticle);

module.exports = router;
