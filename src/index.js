const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());

const customers = [];

// ## FinAPI - Financeira

// ## Requisitos
// - [X] Deve ser possível criar uma conta
// - [X] Deve ser possível bsucar o extrato bancário do cliente
// - [] Deve ser possível realizar um depósito
// - [] Deve ser possível buscar o extrato bancário do cliente por data
// - [] Deve ser possível atualizar dados da conta do cliente
// - [] Deve ser possível deletar uma conta

// ## Regras de negócio
// - [X] Não Deve ser possível cadastrar uma conta com CPF já exitente
// - [X] Não Deve ser possível fazer depósito em uma conta não existente
// - [] Não Deve ser possível buscar extrato em uma conta não existente
// - [] Não Deve ser possível fazer saque em uma conta não existente
// - [] Não Deve ser possível excluir uma conta não existente
// - [] Não Deve ser possível fazer saque quando o saldo por insuficiente

app.get("/", (req, res) => {
  return res.json(["API Financeira"]);
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  //.find verifica se existe o cpf e retorna os elementos
  const Customer = customers.find((customers) => customers.cpf === cpf);

  if (!Customer) {
    return response.status(400).json({ error: "Customer Not Found" });
  }

  return response.json(Customer.statamen);
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

app.listen(4000, (err) => {
  if (err) {
    console.error("listen error" + err);
    return;
  }
  console.log("listening on");
});
