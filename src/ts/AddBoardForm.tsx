import React, { FC, useState } from 'react';
import '../sass/styles.scss';

type AddBoardFormProps = {
  callback: Function;
};

const AddBoardForm: FC<AddBoardFormProps> = ({ callback }) => {
  const [formValue, setFormValue] = useState('');

  return (
    <div className='AddBoardForm'>
      <input
        className={'AddBoardFormInput'}
        type={'text'}
        value={formValue}
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
        onSubmit={callback(formValue)}
      />
    </div>
  );
};

export default AddBoardForm;
