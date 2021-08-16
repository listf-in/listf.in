import React, { FC } from 'react';
import '../sass/styles.scss';

type shareButtonProps = {
  id: string;
};

const ShareButton: FC<shareButtonProps> = ({ id }) => {
  const [code, setCode] = React.useState('');
  return (
    <div>
      <i
        className='fas fa-share-alt-square shareButton shareButtons clickable'
        onClick={() => {
          setCode(id);
          setTimeout(() => {
            setCode('');
          }, 5000);
        }}
      ></i>
      <span className='shareCode clickable'>{code}</span>
    </div>
  );
};

export default ShareButton;
