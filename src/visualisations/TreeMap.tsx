import React from "react";
import styles from "../styles/Home.module.css";
import {ResponsiveContainer, Tooltip, Treemap} from "recharts";
import {TreeMapLeaf} from "@/components/TreeMapLeaf";
import {TreeMapTooltip} from "@/components/TreeMapTooltip";
import {CircularProgress} from "@mui/material";

export function TreeMap(props: { cArray: any, colorScale: any, countryCodes: any, mapSelection: any }) {
    let {cArray, colorScale, countryCodes, mapSelection} = props;
    return (
        <div style={{width: '100%', height: 730}}>
            <div style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                paddingBottom: '730px'
            }}>
                <div className={styles.innerPaper}>
                    {cArray.length > 0 ? <ResponsiveContainer width="99%">
                        <Treemap data={cArray} isAnimationActive={false} dataKey="value"
                                 aspectRatio={1}
                                 content={<TreeMapLeaf depth={undefined}
                                                       height={undefined}
                                                       index={undefined}
                                                       name={undefined}
                                                       width={undefined} x={undefined}
                                                       y={undefined}
                                                       value={undefined} colorScale={colorScale}
                                                       countryCodes={countryCodes}/>}
                        > <Tooltip wrapperStyle={{
                            backgroundColor: "white",
                            color: "black",
                            padding: 7
                        }} content={<TreeMapTooltip
                            active={undefined} payload={undefined} mapSelection={mapSelection}/>}/>

                        </Treemap>

                    </ResponsiveContainer> : <div className={styles.infoCard}>
                        <CircularProgress className={styles.circularProgress}/>
                        <h3>Loading Historical Data</h3>
                        <h4>This may take a few seconds</h4>

                    </div>}
                </div>
            </div>
        </div>
    );
}
