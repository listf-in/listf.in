import React, { FC } from 'react';

import '../sass/styles.scss';

type EditButtonProps = {
  boardID: string;
  callback: Function;
  top: boolean;
};

const EditButton: FC<EditButtonProps> = ({ boardID, callback, top }) => {
  const editBoardFormer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    callback(boardID);
  };

  return top ? (
    <button
      className='shareButtons clickable'
      onClick={(e) => editBoardFormer(e)}
    >
      Edit Board Name
    </button>
  ) : (
    <i
      className='fas fa-pen-square listButtons editButton clickable'
      onClick={(e) => editBoardFormer(e)}
    ></i>
  );
};

export default EditButton;
