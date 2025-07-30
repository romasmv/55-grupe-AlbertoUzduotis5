import Joi from 'joi'
import express, { json } from "express";
const app = express();

app.use(express.json());

const books = [
    {
        id: 1,
        author: 'Kobo Abe',
        title: 'Žmogus-dėžė'
    },
    {
        id: 2,
        author: 'Iain Banks',
        title: 'Tiltas'
    },
    {
        id: 3,
        author: 'Italo Calvino',
        title: 'Mūsų protėviai'
    }
];

// CRUD kaip verciasi
        // Create - app.post()
        // Read - app.get()
        // Update - app.put()
        // Delete - app.delete()

app.get('/', (req,res) => {
    res.send("it's alive! it's alive!")
})

app.get('/demo', (req,res) => {
    res.send(["a", "b", "c"]);
})

//Params
app.get('/demo/:id', (req,res) => {
    const id = req.params.id;
    res.send(id);
})

app.get('/demo/:cat/:id', (req,res) => {
    const cat = req.params.cat;
    const id = req.params.id;
    res.send([cat,id]);
})

//Query
app.get('/query', (req,res) => {
    const q = req.query;
    res.send(q);
})

//----------------------------------------

//GETS
app.get('/api/books', (req,res) => {
    res.send(books)
})

app.get('/api/books/:id', (req,res) => {
const book = books.find((book) => book.id === parseInt(req.params.id))
if(!book) return res.status(404).send('Tokia knyga nerasta ;(')
    res.send(book)
});

//POST

// app.post('/api/books',(req,res) => {
//     const naujaKnyga = {
//         id: books.length +1,
//         author: req.body.author,
//         title: req.body.title
//     }
//     books.push(naujaKnyga)
//     res.send(books)
// })


//----------------------------------------------------------------


// app.post('/api/books',(req,res) => {
//     if(!req.body.author || !req.body.title || req.body.author.length < 5 || req.body.title.length < 1) {
//       res.status(400).send('Autorius tūri turėti bent 5 simbolius ir pavadinimas tūri turėti bent 1 simbolį');
//       return;
//     }
//     const naujaKnyga = {
//         id: books.length +1,
//         author: req.body.author,
//         title: req.body.title
//     }
//     books.push(naujaKnyga)
//     res.send(books)
// })


app.post('/api/books',(req,res) => {
    
  const schema = Joi.object({
    author: Joi.string().min(5).required(),
    title: Joi.string().min(1).required(),
    })

    const validation = schema.validate(req.body)

    if(validation.error) {
      res.status(400).send(validation.error.details[0].message);
      return;
    }
    const naujaKnyga = {
        id: books.length +1,
        author: req.body.author,
        title: req.body.title
    }
    books.push(naujaKnyga)
    res.send(books)
})

// PUT 

app.put('/api/books',(req,res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id)); 
    if (!book) return res.status(404).send("Tokia knyga nerasta : (");
    
  const schema = Joi.object({
    author: Joi.string().min(5).required(),
    title: Joi.string().min(1).required(),
    })

    const validation = schema.validate(req.body)

    if(validation.error) {
      res.status(400).send(validation.error.details[0].message);
      return;
    }
    // const naujaKnyga = {
    //     id: books.length +1,
    //     author: req.body.author,
    //     title: req.body.title
    // }

    book.author = req.body.author
    book.title = req.body.title

    res.send(books)
})


app.listen(3000, ()=> console.log("Listening of port 3000..."));












