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

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => {
    return p.id === id;
  });
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const length = persons.length;
  res.send(
    `<p>Phonebook has info for ${length} people.</p><p>${new Date()}</p>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
