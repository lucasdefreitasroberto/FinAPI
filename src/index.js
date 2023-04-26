const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());

const customers = [];

//Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  //.find verifica se existe o cpf e retorna os elementos
  const Customer = customers.find((customers) => customers.cpf === cpf);

  if (!Customer) {
    return response.status(400).json({ error: "Customer Not Found" });
  }

  request.Customer = Customer;

  return next;
}

app.get("/", (request, response) => {
  return response.json(["API Financeira"]);
});

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  //.some ira verificar dentro do customers e irá Retornar true ou false;
  const customerAlreadyExists = customers.some(
    (customers) => customers.cpf === cpf
  );

  // se retornar true, e porque ja existe cpf, irá retornar erro;
  if (customerAlreadyExists == true) {
    return response.status(400).json({ erro: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statamen: [],
  });

  return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { Customer } = request;

  return response.json(Customer.statamen);
});

app.listen(4000, (err) => {
  if (err) {
    console.error("listen error" + err);
    return;
  }
  console.log("listening on");
});
