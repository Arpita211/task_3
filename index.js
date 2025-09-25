import express from 'express';
const app = express();
const PORT = 3000;

let nextId = 3;
let bookData =[
    {
        id : 1,
        title: "the mercy",
        author:"Arpita Singh"


    },
    {
        id:2,
        title: "Leaarn forgiveness",
        author:"Arpita Singh"
    }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/add-task", (req, res) => {
  const { title, author } = req.body; 
   console.log("Request body:", req.body);
  const newBook = {
    id: nextId++,
    title,
    author,
  };
 

  bookData.push(newBook);
  res.status(201).send(newBook);
});

app.listen(PORT,()=>{
    console.log(`server is listening on  ${PORT}`);
})

app.get("/", (req, res) => {
  res.send("Hello from Arpita and her tea!");
});
app.get("/books" , (req,res)=>{
    res.status(200).send(bookData);
});
//update
 app.put("/books/:id", (req, res) => {
    const book = bookData.find((book) => book.id === parseInt(req.params.id));
    if (!book) {
      return res.status(404).send("book not found");
    }
  
    const { title, author } = req.body;
    book.title = title;
    book.author = author;
  
    res.status(200).send(book);
  });
// delete tea
  app.delete("/books/:id", (req, res) => {
    const index = bookData.findIndex((book) => book.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send("book not found");
    }
    bookData.splice(index, 1);
    res.status(204).send("Deleted");
  });
