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
      <button
        className='addShareButton shareButtons clickable'
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        Add Shared Board
      </button>
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
