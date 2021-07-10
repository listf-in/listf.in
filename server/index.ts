import * as path from 'path';
import * as express from 'express';
__dirname = __dirname || path.resolve();
const boardData = require('../dummy_board_data.json');

const port = process.env.PORT || 3080;
const app = express();

const http = require('http').Server(app);

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/board', (req, res) => {
  res.send(boardData);
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
