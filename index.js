// whats requiered
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

// array aka "api"
const cats = [
  { id: 1, name: 'Sudden', color: "Light Brown", food: "Royal Canin"  },
  { id: 2, name: 'Prins',color: "Grey and White" , food: "Pure Naturals" },
  { id: 3, name: 'Essi',color: "Dark Brown", food: "Orijen"  },
  { id: 4, name: 'Nuffe',color: "Grey", food: "Purima"  },
  { id: 5, name: 'Sindi',color: "Light Brown", food: "Mjau" },
]

//index 
app.get('/', (req, res) => {
  res.send('The cats')
})

// Alla objekt
app.get('/api/cats', (req, res) => {
  res.send(cats)
})

// Specifikt objekt
app.get('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
    return res.status(404).send('No cat with that ID.')
  res.send(cat)
})

// Lägg till objekt
app.post('/api/cats', (req, res) => {
  let newCat = req.body
  newCat.id = s4()
  cats.push(req.body)
  res.status(201).send(cats)
})


// Uppdatera ett objekt
app.put('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  // Om id:t ej finns
  if (!cat)
    return res.status(404).send('The cat with the given id was not found')
    
// om id hittades
  cat.name = req.body.name,
  cat.color = req.body.color,
  cat.food = req.body.food
  res.send(cat)
})


// Radera objekt
app.delete('/api/cats/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (!cat)
  return res.status(404).send('The cat with the given id was not found')
  
  const index = cats.indexOf(cat)
  cats.splice(index, 1)
  
  res.send(cat)
})



app.listen(port, () => console.log(`Running at http://localhost:${port}`))

// random id 
let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}