// whats requiered
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

// array ak "api"
const cats = [
  { id: 1, name: 'Sudden', color: "Light Brown", food: "Royal Canin"  },
  { id: 2, name: 'Prins',color: "Grey and White" , food: "Pure Naturals" },
  { id: 3, name: 'Essi',color: "Dark Brown", food: "Orijen"  },
  { id: 4, name: 'Nuffe',color: "Grey", food: "Purima"  },
  { id: 5, name: 'Sindi',color: "Light Brown", food: "Mjau" },
]

// what's shown on the screen when at the index page
app.get('/', (req, res) => {
  res.send('The cats')
})

// what's shown when at courses page
app.get('/api/cats', (req, res) => {
  res.send(cats)
})

// get specific object
app.get('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
    return res.status(404).send('The cat with the given id was not found')
  res.send(cat)
})

// add onother object
app.post('/api/cats', (req, res) => {
 
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is requierd and shuold be minimum 3 characters')
    return
  }

  const cat = {
    id: cats.length + 1,
    name: req.body.name,
    color: req.body.color,
    food: req.body.food
  }

  cats.push(cat)
  res.send(cat)
})

// updatin specific object
app.put('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))

  // if the id doesn't exist send this.
  if (!cat)
    return res.status(404).send('The cat with the given id was not found')
    
// if the id is found update
  cat.name = req.body.name,
  cat.color = req.body.color,
  cat.food = req.body.food

  res.send(cat)
})


// delete a object, if clicked twice the next is deleted.
app.delete('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
  return res.status(404).send('The coruse with the given id was not found')
  
  const index = cats.indexOf(cat)
  cats.splice(index, 1)
  
  res.send(cat)
})

app.listen(port, () => console.log(`Running at http://localhost:${port}`))
