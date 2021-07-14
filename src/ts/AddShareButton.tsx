import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import React, { FC, useState } from 'react';
import '../sass/styles.scss';

type addShareButtonProps = {
  addToTopBoard: Function;
};

const AddShareButton: FC<addShareButtonProps> = ({ addToTopBoard }) => {
  const [formValue, setFormValue] = useState('');
  const [clicked, setClicked] = React.useState(false);

  const addShareBoard = (e) => {
    e.preventDefault();
    setClicked(false);
    addToTopBoard(e, formValue);
  };

  return (
    <div>
      <i
        className='fas fa-plus-square addShareButton shareButtons clickable'
        onClick={() => {
          setClicked(!clicked);
        }}
      ></i>
      {clicked && (
        <form className='boardShareInputForm' onSubmit={addShareBoard}>
          <input
            type='text'
            className='boardShareInput'
            placeholder='Board Id'
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          />
        </form>
      )}
    </div>
  );
};

export default AddShareButton;
