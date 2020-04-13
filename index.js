// whats requiered
const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

// array ak "api"
const cats = [
  { id: 1, name: 'Sudden' },
  { id: 2, name: 'Prins' },
  { id: 3, name: 'Essi' },
  { id: 4, name: 'Nuffe' },
  { id: 5, name: 'Sindi' },
]

// what's shown on the screen when at the index page
app.get('/', (req, res) => {
  res.send('The cats')
})

// what's shown when at courses page
app.get('/api/cats', (req, res) => {
  res.send(cats)
})

// add onother object
app.post('/api/cats', (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(result.error.details[0].message)

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is requierd and shuold be minimum 3 characters')
    return
  }

  const cat = {
    id: cats.length + 1,
    name: req.body.name,
  }
  cats.push(cat)
  res.send(cat)
})

// updatin specific object
app.put('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
    return res.status(404).send('The cat with the given id was not found')

  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(result.error.details[0].message)

  cat.name = req.body.name
  res.send(cat)
})

// get specific object
app.get('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
    return res.status(404).send('The cat with the given id was not found')
  res.send(cat)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Running at http://localhost:${port}`))

function validateCourse(cat) {
  const schema = {
    name: Joi.string().min(3).required(),
  }
  return Joi.validate(cat, schema)
}

// delete a object, if clicked twice the next is deleted. (1,2...)
app.delete('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
    return res.status(404).send('The coruse with the given id was not found')

  const index = cats.indexOf(cat)
  cats.splice(index, 1)

  res.send(cat)
})
