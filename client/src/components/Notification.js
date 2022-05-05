import React from 'react';

import Alert from '@mui/material/Alert';

const Notification = ({ message, tone }) => {
  if (message === null) return null;
  console.log(tone);

  return (
    <Alert severity={tone}>
      {message}
    </Alert>
  );
};

export default Notification;