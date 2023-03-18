import React, {Fragment} from "react";
import {Slider, Typography} from "@mui/material";
import styles from '../styles/Home.module.css';

export function TimelineSlider(props: { selectedAttributes: any, maximumSetTime: any, maximumTimeValue: any, handleChange: any, dataMap: any }) {
    let {selectedAttributes, maximumSetTime, maximumTimeValue, handleChange, dataMap} = props;

    return (
        <Fragment>
            {selectedAttributes.name !== "" ?
                <Typography>Selected Date: {selectedAttributes.name}</Typography> :
                <Typography>Data not available</Typography>
            }
            <div className={styles.slider}>
                {dataMap.size > 0 ? <Slider
                    defaultValue={0}
                    value={maximumSetTime}

                    max={maximumTimeValue}
                    onChange={handleChange}
                /> : <Slider disabled
                             defaultValue={0}
                             value={maximumSetTime}
                             max={maximumTimeValue}
                             onChange={handleChange}
                />}
            </div>
        </Fragment>


    );
}
