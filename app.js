import { getBooks, getBook } from "./app_db.js";
import Joi from "joi";
import express from "express";
const app = express();

// Middleware
app.use(express.json());

const books = [
  {
    id: 1,
    author: "Kobo Abe",
    title: "Žmogus-dėžė",
  },
  {
    id: 2,
    author: "Iain Banks",
    title: "Tiltas",
  },
  {
    id: 3,
    author: "Italo Calvino",
    title: "Mūsų protėviai",
  },
];

// CRUD
// Create - app.post()
// Read   - app.get()
// Update - app.put()
// Delete - app.delete()

app.get("/", (req, res) => {
  res.send("It's alive! It's ALIVE!!!");
});

app.get("/demo", (req, res) => {
  res.send(["a", "b", "c"]);
});

// Params
app.get("/demo/:id", (req, res) => {
  const id = req.params.id;
  res.send(id);
});

app.get("/demo/:cat/:id", (req, res) => {
  const cat = req.params.cat;
  const id = req.params.id;
  res.send([id, cat]);
});

// Query
app.get("/query", (req, res) => {
  const q = req.query;
  res.send(q);
});

// ---------------------APP-----------------------

// GETS
// app.get("/api/books", (req, res) => {
//   res.send(books);
// });

app.get("/api/books", async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

// app.get("/api/books/:id", (req, res) => {
//   const book = books.find((book) => book.id === parseInt(req.params.id));
//   if (!book) return res.status(404).send("Tokia knyga nerasta :(");
//   res.send(book);
// });

app.get("/api/books/:id", async (req, res) => {
  const book = await getBook(req.params.id);
  if (!book) return res.status(404).send("Tokia knyga nerasta :(");
  res.send(book);
});

// POST
// app.post("/api/books", (req, res) => {
//   const naujaKnyga = {
//     id: books.length + 1,
//     author: req.body.author,
//     title: req.body.title,
//   };
//   books.push(naujaKnyga);
//   res.send(books);
// });

// app.post("/api/books", (req, res) => {
//   if (!req.body.author || !req.body.title || req.body.author.length < 5 || req.body.title.length < 1) {
//     res.status(400).send("Autorius turi turėti bent 5 simbolius ir pavadinimas turi turėti bent 1 simbolį.");
//     return;
//   }
//   const naujaKnyga = {
//     id: books.length + 1,
//     author: req.body.author,
//     title: req.body.title,
//   };
//   books.push(naujaKnyga);
//   res.send(books);
// });

app.post("/api/books", (req, res) => {
  const schema = Joi.object({
    author: Joi.string().min(5).required(),
    title: Joi.string().min(1).required(),
  });

  const validation = schema.validate(req.body);
  // console.log(validation);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }
  const naujaKnyga = {
    id: books.length + 1,
    author: req.body.author,
    title: req.body.title,
  };
  books.push(naujaKnyga);
  res.send(books);
});

// PUT
app.put("/api/books/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Tokia knyga nerasta :(");

  const schema = Joi.object({
    author: Joi.string().min(5).required(),
    title: Joi.string().min(1).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  book.author = req.body.author;
  book.title = req.body.title;
  res.send(books);
});

// DELETE
app.delete("/api/books/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Tokia knyga nerasta :(");

  const index = books.indexOf(book);
  books.splice(index, 1);

  res.send(books);
});

app.listen(3000, () => console.log("Listening of port 3000..."));












