import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useState } from 'react';
import '../sass/styles.scss';

type AddBoardFormProps = {
  parent: string;
  placeholder: string;
  client: ApolloClient<NormalizedCacheObject>;
  callback: Function;
};

const AddBoardForm: FC<AddBoardFormProps> = ({
  parent,
  placeholder,
  client,
  callback,
}) => {
  const [formValue, setFormValue] = useState('');
  const { user } = useAuth0();

  const addToParentBoard = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    e.preventDefault();
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
                        name: "${value}",
                        owner: {
                          email: "${user.email}"
                        },
                        members: {
                          email: "${user.email}"
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
                    listItems {
                      id
                      name
                      owner {
                        email
                        name
                      }
                      listItems {
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
              `,
      })
      .then((result) => {
        callback(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormValue('');
  };

  return (
    <form
      className='AddBoardForm'
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => addToParentBoard(e, formValue)}
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
