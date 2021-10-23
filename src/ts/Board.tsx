import React, { FC, MouseEventHandler } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useMutation,
} from '@apollo/client';

import '../sass/styles.scss';
import List from './List';
import AddBoardForm from './AddBoardForm';
import DepthBar from './DepthBar';
import ShareButton from './ShareButton';
import AddShareButton from './AddShareButton';
import { Boardtype } from './Interfaces';
import EditButton from './EditButton';

type BoardProps = {
  setActiveBoard: Function;
  setBoard: Function;
  client: ApolloClient<NormalizedCacheObject>;
  addHistory: Function;
  prevBoardList: Boardtype[];
  goBack: MouseEventHandler<HTMLButtonElement>;
  setPrevBoardList: Function;
  board: Boardtype;
  editing: string;
  setEditing: Function;
};

const Board: FC<BoardProps> = ({
  board,
  setBoard,
  setActiveBoard,
  client,
  addHistory,
  prevBoardList,
  goBack,
  setPrevBoardList,
  editing,
  setEditing,
}) => {
  const addToTopGql = gql`
    mutation addBoard($parent: [ID!], $id: ID!, $index: Float) {
      updateBoard(
        input: {
          filter: { id: $parent }
          set: { listItems: [{ index: $index, board: { id: $id } }] }
        }
      ) {
        board {
          listItems {
            index
            board {
              id
              parents
            }
          }
        }
      }
    }
  `;

  const [addToTop] = useMutation(addToTopGql);

  const addToParentsGql = gql`
    mutation addBoard($id: [ID!], $parents: Int) {
      updateBoard(input: { filter: { id: $id }, set: { parents: $parents } }) {
        board {
          name
          id
        }
      }
    }
  `;

  const [addToParents] = useMutation(addToParentsGql);

  const addToTopBoard = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    if (value === board.id) {
      window.alert('You cannot add a board to itself!');
    } else {
      addToTop({
        variables: {
          parent: board.id,
          index: board.listItems[board.listItems.length - 1]
            ? board.listItems[board.listItems.length - 1].index + 1
            : 0,
          id: value,
        },
      })
        .then((data) => {
          let parents =
            data.data.updateBoard.board[0].listItems[
              data.data.updateBoard.board[0].listItems.length - 1
            ].board.parents;
          parents = parents ? (parents += 1) : 2;

          addToParents({
            variables: {
              id: value,
              parents,
            },
          }).catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onDragEnd = (context) => {
    if (context.draggableId === context.destination.droppableId) {
      window.alert('You cannot add a board to itself!');
    } else if (
      context.destination.droppableId === context.source.droppableId &&
      context.source.index === context.destination.index
    ) {
      return;
    } else {
      let index;
      const same =
        context.destination.droppableId === context.source.droppableId;
      const up = context.destination.index > context.source.index;
      const mod = same && up ? 1 : 0;

      if (context.type === 'item') {
        for (let i = 0; i < board.listItems.length; i++) {
          if (board.listItems[i].board.id === context.destination.droppableId) {
            if (
              board.listItems[i].board.listItems[
                context.destination.index - 1 + mod
              ]
            ) {
              if (
                board.listItems[i].board.listItems[
                  context.destination.index + mod
                ]
              ) {
                const above =
                  board.listItems[i].board.listItems[
                    context.destination.index - 1 + mod
                  ].index;
                const below =
                  board.listItems[i].board.listItems[
                    context.destination.index + mod
                  ].index;
                index = below - (below - above) / 2;
              } else {
                index =
                  board.listItems[i].board.listItems[
                    context.destination.index - 1 + mod
                  ].index + 1;
              }
            } else {
              if (
                board.listItems[i].board.listItems[context.destination.index]
              ) {
                index =
                  board.listItems[i].board.listItems[context.destination.index]
                    .index - 1;
              } else {
                index = 0;
              }
            }
            break;
          }
        }

        itemMover(context);

        if (context.destination.droppableId === context.source.droppableId) {
          client
            .mutate({
              mutation: gql`mutation{

          updateOrder(input:
            { filter: {
              id: "${context.draggableId}"
            },
            set: {
              index: ${index}
            }
          }) {
            order{
              id
            }
          }
        }
        `,
            })
            .then(() => {
              // error handling
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          client
            .mutate({
              mutation: gql`mutation{
            updateBoard(input:
              { filter: {
                id: "${context.source.droppableId}"
              },
              remove: {
                listItems: {
                  id: "${context.draggableId}"
                }
              }
          }){
              board {
                id
                name
              }
            }
          updateOrder(input:
            { filter: {
              id: "${context.draggableId}"
            },
            set: {
              index: ${index}
            }
          }) {
            order{
              id
            }
          }
          updateBoard(input:
            { filter: {
              id: "${context.destination.droppableId}"
            },
            set: {
              listItems: [
                {
                  id: "${context.draggableId}"
                }
              ]
            }
          }) {
            board {
              id
              name
            }
          }
        }
        `,
            })
            .then(() => {
              //error handling
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        if (board.listItems[context.destination.index - 1 + mod]) {
          if (board.listItems[context.destination.index + mod]) {
            const above =
              board.listItems[context.destination.index - 1 + mod].index;
            const below =
              board.listItems[context.destination.index + mod].index;
            index = below - (below - above) / 2;
          } else {
            index =
              board.listItems[context.destination.index - 1 + mod].index + 1;
          }
        } else {
          if (board.listItems[context.destination.index]) {
            index = board.listItems[context.destination.index].index - 1;
          } else {
            index = 0;
          }
        }

        listMover(context);

        client
          .mutate({
            mutation: gql`mutation{
              updateOrder(input:
                { filter: {
                  id: "${context.draggableId}"
                },
                set: {
                  index: ${index}
                }
              }) {
                order{
                  id
                }
              }
            }
            `,
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const itemMover = (context) => {
    const newBoard = Object.assign(board);

    let fromList, fromIndex, movedItem, newList;

    let mod = 0;

    for (let i = 0; i < newBoard.listItems.length; i++) {
      if (newBoard.listItems[i].board.id === context.source.droppableId) {
        for (let j = 0; j < newBoard.listItems[i].board.listItems.length; j++) {
          if (
            newBoard.listItems[i].board.listItems[j].id === context.draggableId
          ) {
            movedItem = newBoard.listItems[i].board.listItems[j];
            fromList = i;
            fromIndex = j;
            break;
          }
        }
        break;
      }
    }

    for (let i = 0; i < newBoard.listItems.length; i++) {
      if (newBoard.listItems[i].board.id === context.destination.droppableId) {
        if (
          context.destination.droppableId === context.source.droppableId &&
          context.destination.index > context.source.index
        ) {
          mod = 1;
        }
        newList = Object.assign(newBoard.listItems[i].board);
        newList.listItems.splice(context.destination.index + mod, 0, movedItem);
        newBoard.listItems[i].board = newList;
      }
    }

    mod = 0;

    if (
      context.destination.droppableId === context.source.droppableId &&
      context.destination.index < context.source.index
    ) {
      mod = 1;
    }

    newBoard.listItems[fromList].board.listItems.splice(fromIndex + mod, 1);
    setBoard(newBoard);
  };

  const listMover = (context) => {
    const newBoard = Object.assign(board);

    newBoard.listItems.splice(
      context.destination.index,
      0,
      newBoard.listItems.splice(context.source.index, 1)[0]
    );

    setBoard(newBoard);
  };

  return (
    <div className='board'>
      <DepthBar
        prevBoardList={prevBoardList}
        setActiveBoard={setActiveBoard}
        setPrevBoardList={setPrevBoardList}
      />
      {editing === board.id ? (
        <AddBoardForm
          parent={board.id}
          placeholder={'Change List Name'}
          edit={true}
          initValue={board.name}
          setEditing={setEditing}
          boardID={board.id}
          index={board.listItems.length}
          setBoard={setBoard}
          board={board}
        />
      ) : (
        board.name
      )}
      <button
        className={'backButton clickable'}
        onClick={goBack}
        disabled={!prevBoardList[0]}
      >
        Back
      </button>
      <EditButton top={true} boardID={board.id} callback={setEditing} />
      {board.home ? null : <ShareButton id={board.id} />}
      <AddShareButton addToTopBoard={addToTopBoard} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={board.id}
          direction={'horizontal'}
          type={'list'}
        >
          {(provided) => (
            <div
              id='mainBoard'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.listItems.map((list, i) =>
                list.board.id === editing ? (
                  <div className='list addBoardForm'>
                    <AddBoardForm
                      parent={board.id}
                      placeholder={'Change List Name'}
                      edit={true}
                      initValue={list.board.name}
                      setEditing={setEditing}
                      boardID={list.board.id}
                      index={list.index}
                      setBoard={setBoard}
                      board={board}
                    />
                  </div>
                ) : (
                  <List
                    key={list.board.id}
                    list={list.board}
                    setActiveBoard={setActiveBoard}
                    parent={board.id}
                    addHistory={addHistory}
                    editing={editing}
                    setEditing={setEditing}
                    container={list}
                    index={i}
                    setBoard={setBoard}
                    board={board}
                  />
                )
              )}
              {provided.placeholder}

              <div className='list addBoardForm'>
                <AddBoardForm
                  parent={board.id}
                  placeholder={'Add List'}
                  index={
                    board.listItems.length
                      ? board.listItems[board.listItems.length - 1].index + 1
                      : 0
                  }
                  setBoard={setBoard}
                  board={board}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
