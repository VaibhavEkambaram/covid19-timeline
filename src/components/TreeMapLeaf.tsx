import React from "react";

export const TreeMapLeaf = (props: { depth: any; x: any; y: any; width: any; height: any; index: any; name: any; value: any, colorScale : any, countryCodes : any }) => {
    const {depth, x, y, width, height, index, name, value, colorScale, countryCodes} = props;

    let fillColor = colorScale(value ? value : "#fff").toString();

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: fillColor,
                    stroke: '#fff',
                }}
            />
            {depth === 1 ? (
                <text
                    x={x + width / 2}
                    y={y + height / 2 + 7}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={14}
                >
                    {countryCodes.get(name)}
                </text>
            ) : null}
        </g>
    );
};
