import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import React, { FC } from 'react';
import '../sass/styles.scss';
import { Boardtype, Ordertype } from './Interfaces';

type DeleteButtonProps = {
  parentID: string;
  container: Ordertype;
  setBoard: Function;
  board: Boardtype;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  parentID,
  container,
  setBoard,
  board,
}) => {
  const optDelete = () => {
    if (parentID === board.id) {
      board.listItems.forEach((item, i) => {
        if (item.id === container.id) {
          board.listItems.splice(i, 1);
        }
        setBoard({ ...board });
      });
    } else {
      board.listItems.forEach((item, i) => {
        if (item.board.id === parentID) {
          board.listItems[i].board.listItems.forEach((item, j) => {
            if (item.id === container.id) {
              board.listItems[i].board.listItems.splice(j, 1);
            }
            setBoard({ ...board });
          });
        }
      });
    }
  };

  const deleteBoardGql = gql`
    mutation addBoard(
      $parent: [ID!]
      $orderId: [ID!]
      $boardId: [ID!]
      $newParents: Int!
    ) {
      updateBoard(
        input: {
          filter: { id: $parent }
          remove: { listItems: { id: $orderId } }
        }
      ) {
        board {
          id
          name
        }
      }
      deleteOrder(filter: { id: $orderId }) {
        order {
          id
        }
      }
      updateBoard(
        input: { filter: { id: $boardId }, set: { parents: $newParents } }
      ) {
        board {
          id
          name
        }
      }
    }
  `;

  const deleteBoardWithParentsGql = gql`
    mutation addBoard($parent: [ID!], $orderId: [ID!]) {
      updateBoard(
        input: {
          filter: { id: $parent }
          remove: { listItems: { id: $orderId } }
        }
      ) {
        board {
          id
          name
        }
      }
      deleteOrder(filter: { id: $orderId }) {
        order {
          id
        }
      }
    }
  `;

  const [deleteBoard] = useMutation(deleteBoardGql);
  const [deleteBoardWithParents] = useMutation(deleteBoardWithParentsGql);

  const deleteFromParentBoard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    optDelete();
    if (container.board.parents > 1) {
      deleteBoard({
        variables: {
          parent: parentID,
          orderId: container.id,
          boardId: container.board.id,
          newParents: container.board.parents - 1,
        },
      }).catch((err) => {
        console.log(err);
      });
    } else {
      deleteBoardWithParents({
        variables: {
          parent: parentID,
          orderId: container.id,
        },
      }).catch((err) => {
        console.log(err);
      });

      axios({
        method: 'post',
        url: '/delete',
        data: {
          id: container.id,
        },
      });
    }
  };

  return (
    <i
      className='fas fa-window-close shareButtons deleteButton clickable'
      onClick={(e) => deleteFromParentBoard(e)}
    ></i>
  );
};

export default DeleteButton;
