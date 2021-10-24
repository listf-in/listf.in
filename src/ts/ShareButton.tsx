import React, { FC } from 'react';
import '../sass/styles.scss';

type shareButtonProps = {
  id: string;
  home: boolean;
};

const ShareButton: FC<shareButtonProps> = ({ id, home }) => {
  const [code, setCode] = React.useState('');
  return (
    <div>
      <button
        className='shareButton shareButtons clickable'
        onClick={() => {
          setCode(id);
          setTimeout(() => {
            setCode('');
          }, 5000);
        }}
        disabled={!home}
      >
        Share Board
      </button>
      <span className='shareCode clickable'>{code}</span>
    </div>
  );
};

export default ShareButton;
