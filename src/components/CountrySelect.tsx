import React from "react";
import styles from "../styles/Home.module.css";
import {FormControl, MenuItem, Select} from "@mui/material";
import {selectorOverride} from "@/constants/StyleConstants";
import {GradientLegend} from "./GradientLegend";

export function CountrySelect(props: { content: any, handleCountrySelectChange: any, cMap: any, countryCodes: any }) {
    let {content, handleCountrySelectChange, cMap, countryCodes} = props;
    return (
        <div style={{position: "relative", paddingBottom: "55px"}}>
            <FormControl style={{
                position: "absolute",
                left: "10px"
            }} sx={{minWidth: 180, maxWidth: 180, paddingBottom: 2}} size="small">
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={content !== "Worldwide" ? content : "Worldwide"}
                    onChange={handleCountrySelectChange}
                    className={styles.selector}
                    sx={selectorOverride}
                    style={{backgroundColor: '#136cfb', marginTop: 5}}
                >
                    <MenuItem value={"Worldwide"}>{"Worldwide"}</MenuItem>

                    {Array.from(countryCodes.keys()).sort().map((i) => (
                            <MenuItem key={i as any} value={i as any}>{i as any}</MenuItem>
                        )
                    )}
                </Select>
            </FormControl>
            <GradientLegend cMap={cMap}/>
        </div>
    );
}
