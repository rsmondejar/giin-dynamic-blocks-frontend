'use client';
import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import styles from './ImageParallax.module.css'

export default function ImageParallax(props: Readonly<{ image: string }>): React.JSX.Element {
    const [imageBackground, setImageBackground]: [string, (value: (((prevState: string) => string) | string)) => void] = useState(props.image);

    useEffect(() => {
        setImageBackground(props.image);
    }, [props.image]);

    return (
        <Grid
            className={styles.parallax}
            sx={{backgroundImage: `url(${imageBackground})`}}
        />
    )
}
