import React from "react";
import {Typography} from "@mui/material";

export function TreeMapTooltip(props: { active: any, payload: any, mapSelection: any }) {
    let {active, payload, mapSelection} = props;
    if (active && payload && payload.length) {
        const {name, value, index} = payload[0].payload;
        return (
            <div>
                <Typography variant={"h5"}>{(index + 1) + " " + name}</Typography>
                <Typography
                    variant={"subtitle1"}>{`${mapSelection}: ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Typography>
            </div>
        );
    }
    return null;
}
