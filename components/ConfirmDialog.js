/* eslint-disable react/prop-types */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
const ConfirmDialog = (props) => {
  const { title, open, setOpen, onConfirm } = props;
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)} color="default">
          No
        </Button>
        <Button variant="contained" onClick={onConfirm} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
