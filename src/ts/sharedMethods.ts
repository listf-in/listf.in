import { Boardtype } from './Interfaces';

const orderBoard = (board: Boardtype): Boardtype => {
  const newBoard = Object.assign({}, board);
  const { listItems } = newBoard;
  if (listItems === undefined) {
    return board;
  }

  const ordered = [...listItems].sort((a, b) => {
    return a.index - b.index;
  });

  ordered.forEach((b, i) => {
    const newB = Object.assign({}, b);
    newB.board = orderBoard(newB.board);
    ordered[i] = newB;
  });

  newBoard.listItems = ordered;
  return newBoard;
};

export default orderBoard;
