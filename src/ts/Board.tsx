import React, { FC, MouseEventHandler } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';

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
  setActiveBoard,
  client,
  addHistory,
  prevBoardList,
  goBack,
  setPrevBoardList,
  editing,
  setEditing,
}) => {
  const addToTopBoard = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    if (value === board.id) {
      window.alert('You cannot add a board to itself!');
    } else {
      client
        .mutate({
          mutation: gql`mutation {
                updateBoard(input:
                  { filter: {
                    id: "${board.id}"
                  },
                  set: {
                    listItems: [
                      {
                        index: ${board.listItems.length}
                        board:
                        {
                          id: "${value}"
                        }
                      }
                    ]
                  }
                }) {
                  board {
                    id
                  }
                }
              }
              `,
        })
        .then(() => {
          //error handling
          // setActiveBoard(result.data.updateBoard.board[0].id);
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
      //update state to reflect new board order
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
        //update state to reflect new board order
        itemMover(context);

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
            // setActiveBoard(board.id);
          })
          .catch((err) => {
            console.log(err);
          });
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

        //update state to reflect new board order

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
            //error handling
            // setActiveBoard(board.id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const itemMover = (context) => {
    let newBoard = Object.assign(board);

    let movedItem;

    for (let list of newBoard.listItems) {
      if (list.board.id === context.source.droppableId) {
        for (let item of list.board.listItems) {
          if (item.id === context.draggableId) {
            movedItem = item;
            break;
          }
        }
        break;
      }
    }

    for (let list of newBoard.listItems) {
      if (list.board.id === context.destination.droppableId) {
        let newList = Object.assign(list.board);
        newList.listItems = newList.listItems.splice(
          0,
          context.destination.index
        );
        newList.listItems.push(movedItem);
        newList.listItems = newList.listItems.concat(
          list.board.listItems.splice(context.destination.index)
        );
      }
    }
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
          client={client}
          edit={true}
          initValue={board.name}
          setEditing={setEditing}
          boardID={board.id}
          index={board.listItems.length}
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
      <EditButton boardID={board.id} callback={setEditing} />
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
                      client={client}
                      edit={true}
                      initValue={list.board.name}
                      setEditing={setEditing}
                      boardID={list.board.id}
                      index={list.index}
                    />
                  </div>
                ) : (
                  <List
                    key={list.board.id}
                    list={list.board}
                    setActiveBoard={setActiveBoard}
                    client={client}
                    parent={board.id}
                    addHistory={addHistory}
                    editing={editing}
                    setEditing={setEditing}
                    container={list}
                    index={i}
                  />
                )
              )}
              {provided.placeholder}

              <div className='list addBoardForm'>
                <AddBoardForm
                  parent={board.id}
                  placeholder={'Add List'}
                  client={client}
                  index={
                    board.listItems.length
                      ? board.listItems[board.listItems.length - 1].index + 1
                      : 0
                  }
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
