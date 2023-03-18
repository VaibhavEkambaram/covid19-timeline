import React from "react";
import {FormControl, MenuItem, Select} from "@mui/material";
import styles from "../styles/Home.module.css";
import {selectorOverride} from "@/constants/StyleConstants";


export function MapDataSelect(props: { mapSelection: any, handleMapSelectChange: any }) {
    let {mapSelection, handleMapSelectChange} = props;
    return (
        <div className={styles.mapSelect}>

            <FormControl sx={{minWidth: 140}} size="small">

                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={mapSelection}
                    onChange={handleMapSelectChange}
                    className={styles.selector}
                    sx={selectorOverride}
                    style={{backgroundColor: '#136cfb'}}
                >
                    <MenuItem value={"Total Cases"}>Total Cases</MenuItem>
                    <MenuItem value={"Total Deaths"}>Total Deaths</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
