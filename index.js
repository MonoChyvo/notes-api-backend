const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 3,
    content: 'Continuar con asesorias Betty',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 1,
    content: 'Curso Deno y Fresh despues de ver MongooseDb',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 2,
    content: 'Curso de Svelte',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Que rollo, perre!!!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.sendStatus(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.sendStatus(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.sendStatus(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: Math.random() > 0.5,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  console.log(newNote)
  response.sendStatus(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
