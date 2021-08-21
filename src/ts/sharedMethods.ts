import { Boardtype } from './Interfaces';

const orderBoard = (board: Boardtype): Boardtype => {
  let newBoard = Object.assign({}, board);
  let { listItems } = newBoard;
  if (listItems === undefined) {
    return board;
  }

  let ordered = [...listItems].sort((a, b) => {
    return a.index - b.index;
  });

  ordered.forEach((b, i) => {
    let newB = Object.assign({}, b);
    newB.board = orderBoard(newB.board);
    ordered[i] = newB;
  });

  newBoard.listItems = ordered;
  return newBoard;
};

export default orderBoard;
