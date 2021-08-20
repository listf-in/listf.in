import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useState } from 'react';
import '../sass/styles.scss';

type AddBoardFormProps = {
  parent: string;
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
                        index: ${index},
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

                  }
                }
              }
              `,
      })
      .then((result) => {
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
