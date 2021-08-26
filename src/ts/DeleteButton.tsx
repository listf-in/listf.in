import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC } from 'react';
import '../sass/styles.scss';
import { Ordertype } from './Interfaces';

type DeleteButtonProps = {
  parentID: string;
  container: Ordertype;
  client: ApolloClient<NormalizedCacheObject>;
};

const DeleteButton: FC<DeleteButtonProps> = ({
  parentID,
  client,
  container,
}) => {
  const deleteFromParentBoard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    client
      .mutate({
        mutation: gql`mutation{
          updateBoard(input: {
           filter: {
              id: "${parentID}"
            },
            remove: {
              listItems: {
                id: "${container.id}"
              }
            }

        }){
            board {
              id
              name
            }
          }
        }
        `,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <i
      className='fas fa-window-close shareButtons deleteButton clickable'
      onClick={(e) => deleteFromParentBoard(e)}
    ></i>
  );
};

export default DeleteButton;

// former delete function
// .mutate({
//   mutation: gql`mutation{
//     deleteBoard(filter: {
//       id: "${boardID}"
//     }) {
//       board {
//         name
//         id
//       }
//     }
//   }
//   `,
// })
