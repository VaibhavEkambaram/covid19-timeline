import React from "react";
import styles from "../styles/Home.module.css";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export function VaccineChart(props: { covidData: any, chartMargin: any }) {
    let {covidData, chartMargin} = props;
    return (
        <div className={styles.card}>
            <h1>Vaccine Doses</h1>
            <div style={{width: '100%', height: 300}}>
                <div style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '300px'
                }}>
                    <div className={styles.innerPaper}>
                        <ResponsiveContainer width="99%">
                            <LineChart
                                data={covidData}
                                margin={chartMargin}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis domain={[0, "dataMax + 20"]}/>

                                <YAxis/>
                                <Tooltip
                                    wrapperStyle={{backgroundColor: "white", color: "black"}}/>
                                <Legend/>
                                <Line
                                    type="monotone"
                                    dataKey="vaccinated"
                                    stroke="#6495ED"
                                    isAnimationActive={false}
                                    dot={false}
                                    activeDot={{r: 0}}
                                    strokeWidth={"4"}
                                    name={"Vaccine Doses"}

                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
