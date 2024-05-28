import dboperations from './dbconnect.js'
import express from 'express'
const app = express()
const port = 5000


app.get('/', async (req, res) => {
  dboperations()
  res.send('Hello World!')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})