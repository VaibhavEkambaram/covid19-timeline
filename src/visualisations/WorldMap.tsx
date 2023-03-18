import {CircularProgress} from "@mui/material";
import React from "react";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import styles from "../styles/Home.module.css";

export function WorldMap(props: { position: any, handleMoveEnd: any, colorScale: any, content: any, cMap: any, setContent: any, setCountry: any, getData: any }) {
    let {position, handleMoveEnd, colorScale, content, cMap, setContent, setCountry, getData} = props;
    return (
        <div className={styles.paperboxesInner}>
            {cMap.size > 0 ? <ComposableMap projectionConfig={{rotate: [-10, 0, 0], scale: 60}} width={400}
                                            height={200}>
                <ZoomableGroup zoom={position.zoom}
                               center={[position.coordinates[0], position.coordinates[1]]}
                               onMoveEnd={handleMoveEnd}>
                    <Geographies geography="/countries.json">
                        {({geographies}) =>
                            geographies.map((geo: any) => {
                                    const cur = cMap.get((geo.properties.name));

                                    let colour = colorScale(cur ? cur : "#fff").toString();

                                    if (cur === undefined) {
                                        colour = "#404040";
                                    } else if (cur === 0) {
                                        colour = "#FFD9B2";
                                    }

                                    if (geo.properties.name === content) {


                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={() => {
                                                    if (content === geo.properties.name) {
                                                        setContent("Worldwide");
                                                        setCountry(null);
                                                        getData("all", "");
                                                    }
                                                }}

                                                style={{
                                                    default: {
                                                        fill: "#136cfb",
                                                        stroke: "#000",
                                                        strokeWidth: 0.1,
                                                        outline: "none"
                                                    },
                                                    hover: {
                                                        fill: "#136cfb",
                                                        stroke: "#000",
                                                        strokeWidth: 0.1,
                                                        outline: "none"
                                                    },
                                                    pressed: {
                                                        fill: "#136cfb",
                                                        stroke: "#000",
                                                        strokeWidth: 0.1,
                                                        outline: "none"
                                                    }
                                                }}
                                            />
                                        )

                                    } else {

                                        // @ts-ignore
                                        return (

                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}

                                                onClick={() => {
                                                    setContent(`${geo.properties.name}`);
                                                    setCountry(geo.properties.code);
                                                    getData(geo.properties.name, geo.properties.code);


                                                }}

                                                style={{
                                                    default: {
                                                        fill: colour,
                                                        stroke: "#000",
                                                        strokeWidth: 0.1,
                                                        outline: "none"
                                                    },
                                                    hover: {
                                                        fill: colour,
                                                        stroke: "#000",
                                                        strokeWidth: 0.1,
                                                        outline: "none"
                                                    },
                                                    pressed: {
                                                        fill: "#136cfb",
                                                        stroke: "#000",
                                                        strokeWidth: 0.1,
                                                        outline: "none"
                                                    }
                                                }}
                                            />
                                        )
                                    }
                                }
                            )
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap> : <div className={styles.infoCard}>
                <CircularProgress className={styles.circularProgress}/>
                <h3>Loading Historical Data</h3>
                <h4>This may take a few seconds</h4>

            </div>}
        </div>
    );
}
