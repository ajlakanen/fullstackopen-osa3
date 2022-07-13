const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "0400-123123",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "0400-123123",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "0400-123123",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "0400-123123",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello Worldss!</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
