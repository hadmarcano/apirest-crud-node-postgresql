const db = require("../db/pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

// User controllers ...

// Falta actualizar el update, getByID y el delete

const usersControllers = {
  createOne: async (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    delete req.body.password;
    const body = req.body;
    const input = [...Object.entries(body), ["passwordHash", passwordHash]];
    try {
      const query = `INSERT INTO users (uid, ${input.map(
        (e) => `${e[0]}`
      )}) VALUES (uuid_generate_v4(), ${input.map(
        (e, i) => `$${i + 1}`
      )}) RETURNING uid`;

      const result = await db.query(
        query,
        input.map((e) => e[1])
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
};

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

// const createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const response = await db.query(
//       "INSERT INTO users (name, email) VALUES ($1, $2)",
//       [name, email]
//     );
//     res.status(200).json({
//       message: "User has been added succesfully",
//       user: {
//         name,
//         email,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

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

module.exports = {
  getUser,
  getUserById,
  deleteUser,
  updateUser,
  usersControllers,
};
