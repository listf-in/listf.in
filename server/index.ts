import * as path from 'path'
import * as express from 'express'
const port = 3080
const app = express()

app.use('/', express.static(path.join(__dirname, '../build')))

app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})
