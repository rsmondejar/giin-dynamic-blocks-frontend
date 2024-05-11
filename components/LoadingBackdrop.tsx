"use client";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBackdrop(
    propsIn: Readonly<{
        open?: boolean,
        allowToClose?: boolean,
    }>
) {
    const [open, setOpen] = React.useState(propsIn.open || false);
    const [allowToClose] = React.useState(propsIn.open || false);
    const handleClose = () => {
        if (allowToClose) {
            setOpen(false);
        }
    };


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
