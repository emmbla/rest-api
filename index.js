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
