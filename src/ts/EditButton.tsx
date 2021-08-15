import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';

type EditButtonProps = {
  boardID: string;
  boardName: string;
  callback: Function;
  client: ApolloClient<NormalizedCacheObject>;
  setForm: Function;
};

const EditButton: FC<EditButtonProps> = ({
  boardID,
  boardName,
  client,
  callback,
  setForm,
}) => {
  // const editBoard = (boardID: string) => {
  //   client
  //     .mutate({
  //       mutation: gql`mutation{
  //         updateBoard(filter: {
  //           id: "${boardID}",
  //         },
  //         set: {
  //           name: "${name}"
  //         }
  //           ) {
  //           board {
  //             name
  //             id
  //           }
  //         }
  //       }
  //       `,
  //     })
  //     .then(() => {
  //       callback();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const editBoardFormer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setForm(boardID, boardName);
  };

  return (
    <button
      className={'editButton clickable'}
      onClick={(e) => editBoardFormer(e)}
    >
      E
    </button>
  );
};

export default EditButton;
