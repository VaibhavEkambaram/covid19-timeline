import React from "react";
import styles from "../styles/Home.module.css";
import {Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export function NewCasesDeathsChart(props: { covidData: any, chartMargin: any }) {
    let {covidData, chartMargin} = props;


    return (
        <div className={styles.card}>
            <h1>New Cases and New Deaths</h1>

            <div style={{width: '100%', height: 300}}>


                <div style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '300px'
                }}>
                    <div className={styles.innerPaper}>
                        <ResponsiveContainer width="99%">
                            <AreaChart data={covidData} margin={chartMargin}>
                                <XAxis dataKey="name"/>
                                <YAxis domain={[0, "dataMax + 20"]}/>
                                <Tooltip
                                    wrapperStyle={{backgroundColor: "white", color: "black"}}/>
                                <Legend/>
                                <Area type="monotone" dataKey="newDeaths" stackId="1"
                                      stroke="red" fill="red" strokeWidth={0}
                                      isAnimationActive={false} name={"New Deaths"}/>
                                <Area type="monotone" dataKey="newCases" stackId="1"
                                      stroke="#2ECC71" fill="#2ECC71" strokeWidth={0}
                                      isAnimationActive={false} name={"New Cases"}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
