import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATA,
  })
  .promise();

// const result = await db.query("SELECT * FROM books");
// console.log(result[0]);

export async function getBooks() {
  const books = await db.query("SELECT * FROM books");
  return books[0];
}

export async function getBook(id) {
  const book = await db.query("SELECT * FROM books WHERE id = ?", [id]);
  return book[0][0];
}