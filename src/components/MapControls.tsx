import React from "react";
import styles from "../styles/Home.module.css";
import {Button, ButtonGroup} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";

export function MapControls(props: { handleZoomIn: any, handleZoomOut: any, centreMap: any }) {
    let {handleZoomIn, handleZoomOut, centreMap} = props;
    return (
        <div className={styles.controls}>

            <ButtonGroup variant="contained" aria-label="outlined button group">
                <Button className={styles.buttons} onClick={handleZoomIn}><ZoomInIcon/></Button>
                <Button className={styles.buttons} onClick={handleZoomOut}><ZoomOutIcon/></Button>
                <Button className={styles.buttons} onClick={centreMap}><CenterFocusStrongIcon/></Button>
            </ButtonGroup>
        </div>
    );
}
