/* eslint-disable no-undef */

const whatToDelete = (container) => {
  debugger;
  let containers = [container.id];
  let boards = [container.board.id];
  let lowerParents = [];
  container.board.listItems.forEach((cont) => {
    if (cont.board.parents > 1) {
      lowerParents.push(cont.board.id);
    } else {
      containers.push(cont.id);
      boards.push(cont.board.id);
      const [conts, boardies, notOrphans] = whatToDelete(cont);
      containers = containers.concat(conts);
      boards = boards.concat(boardies);
      lowerParents = lowerParents.concat(notOrphans);
    }
  });

  return [containers, boards, lowerParents];
};

module.exports = (id) => {
  debugger;
  //call db for container info
  const [containersToDelete, boardsToDelete, parentsToLower] =
    whatToDelete(container);
  debugger;
  // make a mutation for all items
};
