"use client";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from "react";

export default function LoadingBackdrop(
    propsIn: Readonly<{
        open: boolean,
        allowToClose?: boolean,
    }>
) {
    const [open, setOpen]: [boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void] = React.useState(propsIn.open);
    const [allowToClose, setAllowToClose]: [boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void] = React.useState(propsIn.allowToClose || false);

    useEffect(() => {
        setOpen(propsIn.open);
        setAllowToClose(propsIn.allowToClose || false);
    }, [propsIn]);

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
