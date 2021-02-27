const db = require("../db/pg");

const getUser = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM users");
    //console.log(response.rows);
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.query("SELECT * FROM users WHERE (id = $1)", [
      id,
    ]);
    res.status(200).json({
      message: "query succesfull",
      user: response.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const response = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [name, email]
    );
    res.status(200).json({
      message: "User has been added succesfully",
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;

    const response = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id]
    );

    res.status(200).json({
      message: "user updated",
      users_updated: response.rowCount,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.query("DELETE FROM users WHERE id=$1", [id]);
    res.status(200).json({
      message: "User has been deleted succesfully",
      users_deleted: response.rowCount,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, createUser, getUserById, deleteUser, updateUser };
