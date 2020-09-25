/* eslint-disable react/prop-types */
import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: '#21354a',
        color: 'white'
    },

    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

export default function CustomDialog(props) {
    const { turnOnfullScreenOnSize, maxWidth, fullWidth, onClose, children, open, title } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down(turnOnfullScreenOnSize));

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    return (
        <>
            <Dialog
                maxWidth={maxWidth}
                fullScreen={fullScreen}
                onClose={onClose}
                fullWidth={fullWidth}
                title={title}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle id="customized-dialog-title" onClose={onClose}>
                    {title}
                </DialogTitle>
                <DialogContent dividers style={{ backgroundColor: '#15202b' }}>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
