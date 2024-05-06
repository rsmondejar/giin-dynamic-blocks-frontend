"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useSnackbar } from 'notistack';

export default function FormCreateSpeedDial(propsIn: { handleAddQuestion: () => void; handleOpenSaveDialog: () => void;}) {

    const { enqueueSnackbar } = useSnackbar();

    const handleClickSave = () => {
        propsIn.handleOpenSaveDialog()
    }

    const handleClickPrint = () => {
        enqueueSnackbar('Funcionalidad de imprimir no implementada en esta versión.', { variant: 'info' });
    }

    const handleClickAddQuestion = () => {
        propsIn.handleAddQuestion()
        enqueueSnackbar('Funcionalidad de agregar pregunta no implementada en esta versión.', { variant: 'success' });
    }

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    key="save"
                    icon={<SaveIcon />}
                    tooltipTitle="Guardar"
                    onClick={handleClickSave}
                />
                <SpeedDialAction
                    key="print"
                    icon={<PrintIcon />}
                    tooltipTitle="Imprimir"
                    onClick={handleClickPrint}
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
