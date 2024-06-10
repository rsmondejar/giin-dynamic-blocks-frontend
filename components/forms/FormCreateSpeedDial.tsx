"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useSnackbar } from 'notistack';

export default function FormCreateSpeedDial(propsIn: Readonly<{
    handleAddQuestion: () => void;
    handleOpenSaveDialog: () => void;
}>) {

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen]: [boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void] = React.useState(true);

    const handleClickSave = () => {
        propsIn.handleOpenSaveDialog();
    }

    const handleClickAddQuestion = () => {
        propsIn.handleAddQuestion();
        enqueueSnackbar('Pregunta añadida ...', { variant: 'success' });
    }

    const handleOnOpen = (e: any, reason: any) => {
        if (reason === 'toggle') {
            setOpen(true);
        }
    }

    const handleOnClose = (e: any, reason: any) => {
        if (reason === 'toggle') {
            setOpen(false);
        }
    }

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 5, right: 5 }}
                icon={<SpeedDialIcon />}
                open={open}
                onOpen={handleOnOpen}
                onClose={handleOnClose}
            >
                <SpeedDialAction
                    key="save"
                    icon={<SaveIcon />}
                    tooltipTitle="Guardar"
                    onClick={handleClickSave}
                />
                <SpeedDialAction
                    key="add_question"
                    icon={<AddCommentIcon />}
                    tooltipTitle="Agregar pregunta"
                    onClick={handleClickAddQuestion}
                />
            </SpeedDial>
        </Box>
    );
}
