import { Alert, AlertColor, Snackbar } from "@mui/material";

export interface SnackBarProps {
  open: boolean,
  handleClose: any,
  message: string,
  severity: AlertColor
}

export const defaultSnackBarProps: SnackBarProps = {
  handleClose: () => '',
  open: false,
  message: '',
  severity: 'info'
}

const SnackBar = ({open, handleClose, message, severity}: SnackBarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant='filled' onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;