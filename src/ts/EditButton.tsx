import React, { FC } from 'react';

import '../sass/styles.scss';

type EditButtonProps = {
  boardID: string;
  callback: Function;
};

const EditButton: FC<EditButtonProps> = ({ boardID, callback }) => {
  const editBoardFormer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    callback(boardID);
  };

  return (
    <i
      className='fas fa-pen-square shareButtons editButton clickable'
      onClick={(e) => editBoardFormer(e)}
    ></i>
  );
};

export default EditButton;
