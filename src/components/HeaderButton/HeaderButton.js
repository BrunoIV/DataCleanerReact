import React from 'react';
import './HeaderButton.css';

  function HeaderButton(props) {

  const clickEvent = () => {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <div class="header-button" onClick={clickEvent}>
      <span class="material-icons material-symbols-outlined">{props.icon}</span>{props.text}
    </div>
  );
}

export default HeaderButton;
