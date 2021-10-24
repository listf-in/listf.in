import { gql, useMutation } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useState } from 'react';
import '../sass/styles.scss';
import { Boardtype } from './Interfaces';

type AddBoardFormProps = {
  parent: string;
  index: number;
  placeholder: string;
  setBoard: Function;
  board: Boardtype;
  edit?: boolean;
  boardID?: string;
  setEditing?: Function;
  initValue?: string;
};

const AddBoardForm: FC<AddBoardFormProps> = ({
  parent,
  index,
  placeholder,
  edit = false,
  boardID,
  setEditing,
  initValue = '',
  setBoard,
  board,
}) => {
  const [formValue, setFormValue] = useState(initValue);
  const { user } = useAuth0();

  const optAddBoard = () => {
    if (parent === board.id) {
      board.listItems.push({
        id: 'temp',
        index: index,
        board: {
          id: 'temp',
          name: formValue,
          home: false,
          listItems: [],
          members: [],
          owner: {
            id: 'temp',
            email: '',
            name: '',
          },
        },
      });
    } else {
      board.listItems.forEach((item) => {
        if (item.board.id === parent) {
          item.board.listItems.push({
            id: 'temp',
            index: index,
            board: {
              id: 'temp',
              name: formValue,
              home: false,
              listItems: [],
              members: [],
              owner: {
                id: 'temp',
                email: '',
                name: '',
              },
            },
          });
        }
      });
    }
    setBoard({ ...board });
  };

  const addToBoardGql = gql`
    mutation addBoard(
      $parent: [ID!]
      $name: String!
      $index: Float!
      $email: String!
    ) {
      updateBoard(
        input: {
          filter: { id: $parent }
          set: {
            listItems: [
              {
                index: $index
                board: {
                  name: $name
                  owner: { email: $email }
                  members: { email: $email }
                  parents: 1
                  home: false
                }
              }
            ]
          }
        }
      ) {
        board {
          id
        }
      }
    }
  `;

  const [addToBoard] = useMutation(addToBoardGql);

  const addToParentBoard = () => {
    optAddBoard();
    addToBoard({
      variables: {
        parent: parent,
        index: index || 0,
        name: formValue,
        email: user.email,
      },
    }).catch((err) => console.log(err));
    setFormValue('');
  };

  const optEditBoard = () => {
    if (parent === board.id) {
      board.listItems.forEach((list) => {
        if (list.board.id === boardID) {
          list.board.name = formValue;
        }
      });
    } else {
      board.listItems.forEach((list) => {
        if (list.board.id === parent) {
          list.board.listItems.forEach((item) => {
            if (item.board.id === boardID) {
              item.board.name = formValue;
            }
          });
        }
      });
    }
    setBoard({ ...board });
  };

  const editBoardGql = gql`
    mutation addBoard($id: [ID!], $name: String!) {
      updateBoard(input: { filter: { id: $id }, set: { name: $name } }) {
        board {
          name
          id
        }
      }
    }
  `;

  const [editsBoard] = useMutation(editBoardGql);

  const editBoard = () => {
    optEditBoard();
    editsBoard({
      variables: {
        id: boardID,
        name: formValue,
      },
    })
      .then(() => {
        setEditing('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue.length > 0 && edit) {
      editBoard();
    } else if (formValue.length > 0) {
      addToParentBoard();
    }
  };

  return (
    <form
      className='AddBoardForm'
      onClick={(e) => e.stopPropagation()}
      onSubmit={onSubmitFilter}
    >
      <input
        className={edit ? 'AddBoardFormInput edit' : 'AddBoardFormInput'}
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
