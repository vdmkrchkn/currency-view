import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert, AlertTitle} from '@material-ui/lab';
// eslint-disable-next-line no-unused-vars
import {Color} from '@material-ui/lab';

interface IToastProps {
    isOpen: boolean;
    type: Color;
    title?: string;
    onClose: any;
    message: string;
}

// FIXME: https://ru.reactjs.org/docs/react-dom.html#finddomnode
const Toast = ({isOpen, type, title, onClose, message}: IToastProps) => (
  <Snackbar
    open={isOpen}
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    autoHideDuration={5000}
    onClose={onClose}
  >
    <Alert onClose={onClose} severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
