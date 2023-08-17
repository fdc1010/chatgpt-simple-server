require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

// Set up the server
const app = express()
const port = 5000

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/chatgpt', async (req, res) => {
  const prompt = req.body.prompt
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: prompt
    })
    res.json({ text: response.data.choices[0].text })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while processing your request.' })
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
