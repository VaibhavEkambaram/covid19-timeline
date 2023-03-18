import {FormControl, MenuItem, Select} from "@mui/material";
import styles from "../styles/Home.module.css";
import {selectorOverride} from "@/constants/StyleConstants";
import React from "react";

export function TreeSortSelect(props: { treeSortSelection: any, handleTreeSelectionChange: any }) {
    let {treeSortSelection, handleTreeSelectionChange} = props;
    return (
        <FormControl sx={{minWidth: 170, maxWidth: 170, paddingBottom: 2}} size="small">

            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={treeSortSelection}
                onChange={handleTreeSelectionChange}
                className={styles.selector}
                sx={selectorOverride}
                style={{backgroundColor: '#136cfb'}}
            >
                <MenuItem value={"Sorted by Value"}>Sort by Value</MenuItem>
                <MenuItem value={"Sorted by Country"}>Sort by Country</MenuItem>
            </Select>
        </FormControl>
    );
}
