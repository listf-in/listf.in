import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useState } from 'react';
import '../sass/styles.scss';

import orderBoard from './sharedMethods';

type AddBoardFormProps = {
  parent: string;
  top: boolean;
  index: number;
  placeholder: string;
  client: ApolloClient<NormalizedCacheObject>;
  callback: Function;
  edit?: boolean;
  boardID?: string;
  setEditing?: Function;
  initValue?: string;
};

const AddBoardForm: FC<AddBoardFormProps> = ({
  parent,
  top,
  index,
  placeholder,
  client,
  callback,
  edit = false,
  boardID,
  setEditing,
  initValue = '',
}) => {
  const [formValue, setFormValue] = useState(initValue);
  const { user } = useAuth0();

  const addToParentBoard = (e: React.FormEvent<HTMLFormElement>) => {
    client
      .mutate({
        mutation: gql`mutation {
                updateBoard(input:
                  { filter: {
                    id: "${parent}"
                  },
                  set: {
                    listItems: [
                      {
                        index: ${index || 0},
                        board:{
                          name: "${formValue}",
                          owner: {
                            email: "${user.email}"
                          },
                          members: {
                            email: "${user.email}"
                          },
                          home: false
                        }
                      }
                    ]
                  }
                }) {
                  board {
                    id
                    name
                    owner {
                      email
                      name
                    }
                    home
                    listItems {
                      id
                      index
                      board {
                        id
                        name
                        owner {
                          email
                          name
                        }
                        listItems {
                          id
                          index
                          board {
                            id
                            name
                            owner {
                              email
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              `,
      })
      .then((result) => {
        if (top) {
          result = orderBoard(result.data.updateBoard.board[0]);
        }
        callback(e, result);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormValue('');
  };

  const editBoard = (e: React.FormEvent<HTMLFormElement>) => {
    client
      .mutate({
        mutation: gql`mutation{
          updateBoard(input: {filter: {
            id: "${boardID}",
          },
          set: {
            name: "${formValue}"
          }}
            ) {
            board {
              name
              id
            }
          }
        }
        `,
      })
      .then(() => {
        callback(e);
        setEditing('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue.length > 0 && edit) {
      editBoard(e);
    } else if (formValue.length > 0) {
      addToParentBoard(e);
    }
  };

  return (
    <form
      className='AddBoardForm'
      onClick={(e) => e.stopPropagation()}
      onSubmit={onSubmitFilter}
    >
      <input
        className={'AddBoardFormInput'}
        type={'text'}
        value={formValue}
        placeholder={placeholder}
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
      />
    </form>
  );
};

export default AddBoardForm;
