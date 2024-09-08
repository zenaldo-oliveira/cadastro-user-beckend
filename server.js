import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Rota GET para listagem de usuários
app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

// Rota POST para criar um novo usuário
app.post("/usuarios", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rota PUT para atualizar um usuário existente
app.put("/usuarios/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id); // Converte o ID para inteiro
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
});

// Rota DELETE para deletar um usuário
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ messege: "Usuário deletado com sucesso" });
});

// Inicializando o servidor
app.listen(3000, () => {
  console.log("🚀server🚀online🚀");
});
