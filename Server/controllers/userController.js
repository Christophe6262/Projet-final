const db = require("../db");
const { StatusCodes } = require("http-status-codes");

// RECUPERE LES INFORMATIONS D UN UTILSATEUR SANS LE MOT DE PASSE.
const getUser = async (req, res) => {
  const {
    rows: [user],
  } = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.userId,
  ]);
  delete user.password;
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  // PERMET D EFFACE LA LIGNE DE L UTILISATEUR DANS LE TABLEAU USERS
  const {
    rows: [deletedUser],
  } = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [
    req.user.userId,
  ]);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Utilisateur supprimé", user: deletedUser });
};

module.exports = { getUser, deleteUser };
