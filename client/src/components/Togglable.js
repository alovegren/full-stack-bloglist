import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState('false');

  const hiddenWhenVisible = { display: visible ? 'none' : '' };
  const shownWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div
        style={hiddenWhenVisible}
      >
        {props.children}
        <button onClick={toggleVisibility}>
          cancel
        </button>
      </div>
      <button
        style={shownWhenVisible}
        onClick={toggleVisibility}
      >
        {props.buttonText}
      </button>
    </>
  );
});

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
