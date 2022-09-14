import express from 'express'
import { PrismaClient } from '@prisma/client';

const app = express()
const prisma = new PrismaClient()

// localhost:5500/ads

//Listagem de games com contagem de anúncios
app.get('/games', (request, response) => {
  return response.json([]);
})

//Criação de um novo anúncio
app.post('/ads', (request, response) => {
  return response.status(201).json(['ads']);
})

// Listagem de anúncios por game
app.get('/games/:id/ads', (request, response) => {
  // const gameId = request.params.id;

   return response.json([
    {id: 1, name: 'Anúncio 1'},
    {id: 2, name: 'Anúncio 2'},
    {id: 3, name: 'Anúncio 3'},
  ])
})

// Buscar Discord pelo ID do anúncio
app.get('/ads/:id/discord', (request, response) => {
  // const discordId = request.params.id;

  return response.json([])
})

app.listen(5500)