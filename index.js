import { DatabaseMemory } from "./database-memory.js"
import express from "express";
import { DatabasePostgres } from "./database-postgres.js";
const server = express();


server.use(express.json())

//const database = new DatabaseMemory()
const database = new DatabasePostgres()
/*
"app.get("/", (req, res) => { ... });: Aqui, você define uma rota GET para o caminho raiz ("/"). 
Quando um cliente faz uma requisição GET para esse caminho, a função callback é executada. 
Essa função recebe dois parâmetros: req (representando a requisição) e res (representando a resposta). 
No exemplo, estamos enviando uma resposta JSON com uma mensagem "Primeira rota criada".
*/

server.post("/videos", async (req, res) => {
    const {title, description} = req.body

    await database.create({
      title,                           
      description
    })

    return res.status(201).send()
    
})

server.get("/videos", async (req, res) => {
  const {search} = req.query
  console.log(search)
  const videos = await database.list(search)

  return res.json(videos)
})

server.put("/videos/:id", async (req, res) => {
  const videoId = req.params.id
  const {title, description} = req.body

  await database.update(videoId, {
    title,
    description
  })

  return res.status(204).send()
})

server.delete("/videos/:id", async (req, res) => {
  const videoId = req.params.id

  await database.delete(videoId)

  return res.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3000
}) //Isso faz com que o aplicativo Express escute na porta 3000
