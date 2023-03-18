import {LinearProgress, Typography} from "@mui/material";
import React from "react";

export function GradientLegend(props: { cMap: any }) {
    let {cMap} = props;

    const boxStyle = {
        width: 120,
        margin: 'auto',
        justifyItems: 'centre'
    };
    const gradientStyle = {
        backgroundImage:
            `linear-gradient(to right, ${"#FFD9B2"} , ${"#C30000"})`,
        height: 20
    };

    // @ts-ignore
    let maximumValue = Math.max(...Array.from(cMap.values())).toString();

    return (
        <div style={{position: "absolute", right: "10px"}}>
            {maximumValue !== "-Infinity" && maximumValue !== "NaN" ?
                <Typography>0 to {maximumValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography> :
                <LinearProgress style={{
                    marginBottom: '5px'
                }}/>}

            <div style={{...boxStyle, ...gradientStyle}} className="mt8">
            </div>
        </div>
    );
}
