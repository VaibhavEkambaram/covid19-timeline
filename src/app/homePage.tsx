"use client"

import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {Typography, useMediaQuery, createTheme, ThemeProvider, SelectChangeEvent} from "@mui/material";
import {Grid, Paper} from "@mui/material"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {scaleQuantize} from "d3-scale";
import {notAvailablePlaceholder, placeholderValue} from "@/constants/DatasetPlaceholderConstants";
import {TotalCasesChart} from "@/visualisations/TotalCasesChart";
import {InformationPanel} from "@/components/InformationPanel";
import {chartMargin, colorGradient} from "@/constants/StyleConstants";
import {WorldMap} from "@/visualisations/WorldMap";
import {NewCasesDeathsChart} from "@/visualisations/NewCasesDeathsChart";
import {MenuBar} from "@/components/MenuBar";
import {TimelineSlider} from "@/components/TimelineSlider";
import {TreeDataSelect} from "@/components/TreeDataSelect";
import {TreeMap} from "@/visualisations/TreeMap";
import {fixCountryAliases} from "@/util/CountryAliases";
import {MapControls} from "@/components/MapControls";
import {TreeSortSelect} from "@/components/TreeSortSelect";
import {flagCode} from "@/util/FlagCode";
import {CountrySelect} from "@/components/CountrySelect";
import {TotalDeathsChart} from "@/visualisations/TotalDeathsChart";
import {MapDataSelect} from "@/components/MapDataSelect";
import {VaccineChart} from "@/visualisations/VaccineChart";
import countries from '../../public/countries.json';

export function HomePage(){
    const [covidData, setCovidData] = useState([]);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: "#136cfb"
                    },
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );


    const [content, setContent] = useState("Worldwide");
    const [country, setCountry] = useState(null);

    const [selectedDateValue, setSelectedDateValue] = useState(new Date());
    const [selectedAttributes, setSelectedAttributes] = useState(placeholderValue);


    const [maximumTimeValue, setMaximumTimeValue] = useState(0);
    const [maximumSetTime, setMaximumSetTime] = useState(0);

    const [dataMap, setDataMap] = useState(new Map());
    const [countriesMap, setCountriesMap] = useState(new Map());

    const [position, setPosition] = useState({coordinates: [0, 0], zoom: 1});

    const [mapSelection, setMapSelection] = useState("Total Cases");
    const [treeSortSelection, setTreeSortSelection] = useState("Sorted by Value");

    const [countryNames] = useState(new Map());
    const [countryCodes] = useState(new Map());

    const [lastUpdatedTime, setLastUpdatedTime] = useState("");

    let countryMap = new Map();

    let cMap = new Map();
    let cArray: any[] = []

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Cache-Control', 'max-age=180, must-revalidate');


    useEffect(() => {
        setLastUpdatedTime(new Date().toLocaleString());
        getData("all", "");
        getAllCountryData()
    }, []);


    async function getAllCountryData() {
        countriesMap.clear();
        countryNames.clear();
        countryCodes.clear();

        for (let k = 0; k < countries.objects.countries.geometries.length; k++) {
            countryNames.set(countries.objects.countries.geometries[k].properties.name.toString().toLowerCase(), countries.objects.countries.geometries[k].properties.name.toString());
            countryCodes.set(countries.objects.countries.geometries[k].properties.name.toString(), countries.objects.countries.geometries[k].properties.code.toString());
        }



        const res = await fetch('https://disease.sh/v3/covid-19/historical?lastdays=all', {headers: headers});

        const json = await res.json();
        Object.entries(json).forEach(([key, value]) => {
            // @ts-ignore
            let countryNameValue = value.country;
            // @ts-ignore
            let provinceNameValue = value.province;
            // @ts-ignore
            let timelineValue = value.timeline;

            fixCountryAliases(countryNameValue, countryMap, timelineValue, provinceNameValue);
        });

        const res2 = await fetch('https://disease.sh/v3/covid-19/historical/au%2C%20ca%2C%20cn?lastdays=all', {
            headers: headers
        });

        const json2 = await res2.json();

        for (let i = 0; i < json2.length; i++) {
            countryMap.set(json2[i].country.toLowerCase(), json2[i].timeline);
        }

        setCountriesMap(countryMap);

    }




    async function getData(countryInput: string, countryCode: string) {
        setSelectedAttributes(placeholderValue);

        let casesMap = new Map();
        let deathMap = new Map();
        let newDeathMap = new Map();
        let newCasesMap = new Map();
        let vaccineMap = new Map();
        let date: Date;

        let dd: { name: any; cases: any; deaths: any; newCases: any; vaccinated: any; newDeaths: any }[] = []


        if (countryInput === "all") {
            const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all', {
                headers: headers,
            });
            const json = await res.json();
            Object.entries(json).forEach(([key, value]) => {

                let val: any = value;
                let totalCases = 0;
                let totalDeaths = 0;
                Object.entries(val).forEach(([k, v]) => {


                    if (key === "cases") {
                        casesMap.set(k, v);

                        let num = v;

                        if(typeof num==="number"){
                            let val = num - totalCases;
                            newCasesMap.set(k, val);
                        } else {
                            newCasesMap.set(k, 0);
                        }

                        typeof num === "number" ? totalCases = num : totalCases = 0;


                    } else if (key === "deaths") {
                        // @ts-ignore

                        deathMap.set(k, v);
                        let num = v;

                        if(typeof num==="number"){
                            let val = num - totalDeaths;
                            newDeathMap.set(k, val);
                        } else {
                            newDeathMap.set(k, 0);
                        }


                        typeof num === "number" ? totalDeaths = num : totalDeaths = 0;
                    }
                });
            });


            const vaccineRes = await fetch('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all&fullData=false', {
                headers: headers,
            });
            const vaccineJson = await vaccineRes.json();

            if (vaccineJson !== null) {
                Object.entries(vaccineJson).forEach(([key, value]) => {
                    vaccineMap.set(key, value);
                });
            }


            let counter = 0;
            let dm = new Map();
            casesMap.forEach((value, key) => {
                if (counter == 0) {
                } else if (counter === casesMap.size - 1) {
                    setMaximumTimeValue(counter);
                    setMaximumSetTime(counter);

                }
                date = new Date(key);


                setSelectedDateValue(date);


                let vaxxed = vaccineMap.get(key);
                if (vaxxed === undefined) {
                    vaxxed = 0;
                }

                let newValue = {
                    name: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                    cases: value,
                    newCases: (newCasesMap.get(key)!==-1 ? newCasesMap.get(key) : 0),
                    deaths: deathMap.get(key),
                    newDeaths: newDeathMap.get(key),
                    vaccinated: vaxxed
                };
                setSelectedAttributes(newValue);


                dd.push(newValue);
                dm.set(key, newValue);
                counter++;
            });

            // @ts-ignore
            setCovidData(dd);

            setDataMap(dm);

        } else {

            let countryStorage = countriesMap.get(countryInput.toLowerCase());

            if (countryStorage !== undefined) {


                Object.entries(countriesMap.get(countryInput.toLowerCase())).forEach(([key, value]) => {
                    let val: any = value;
                    let totalCases = 0;
                    let totalDeaths = 0;
                    Object.entries(val).forEach(([k, v]) => {
                        if (key === "cases") {
                            casesMap.set(k, v);
                            // @ts-ignore
                            let val = parseInt(v) - totalCases;

                            newCasesMap.set(k, val);
                            if (val !== undefined) {
                                totalCases = totalCases + val;
                            }

                        } else if (key === "deaths") {
                            // @ts-ignore
                            let val = parseInt(v) - totalDeaths;
                            deathMap.set(k, v);
                            newDeathMap.set(k, val);
                            totalDeaths = totalDeaths + val;
                        }
                    });
                });


                const vaccineRes = await fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries/' + countryCode + '?lastdays=all&fullData=false', {
                    headers: headers,
                });
                const vaccineJson = await vaccineRes.json();

                let vaccineValuesAPI = vaccineJson.timeline;

                if (vaccineValuesAPI !== undefined && vaccineRes.status === 200) {

                    Object.entries(vaccineValuesAPI).forEach(([key, value]) => {
                        vaccineMap.set(key, value);

                    });
                }
            }


            let counter = 0;
            let dm = new Map();
            casesMap.forEach((value, key) => {
                if (counter == 0) {
                } else if (counter === casesMap.size - 1) {
                    setMaximumTimeValue(counter);
                    setMaximumSetTime(counter);
                }
                date = new Date(key);
                setSelectedDateValue(date);


                let vaxxed = vaccineMap.get(key);
                if (vaxxed === undefined) {
                    vaxxed = null;
                }


                let newValue = {
                    name: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                    cases: value,
                    newCases: (newCasesMap.get(key)>=0 ? newCasesMap.get(key) : 0),
                    deaths: deathMap.get(key),
                    newDeaths: (newDeathMap.get(key)>=0 ? newDeathMap.get(key) : 0),
                    vaccinated: vaxxed
                };
                setSelectedAttributes(newValue);


                dd.push(newValue);
                dm.set(key, newValue);
                counter++;
            });


            // @ts-ignore
            setCovidData(dd);
            setDataMap(dm);

            if (dd.length === 0) {
                // @ts-ignore
                setSelectedAttributes(notAvailablePlaceholder);
            }
        }
    }

;

    countriesMap.forEach((value, key) => {
        let fullCountryName = countryNames.get(key);

        if (selectedDateValue !== null && fullCountryName !== undefined && cArray !== undefined) {
            let dateString = ((selectedDateValue.getMonth() + 1) + "/" + selectedDateValue.getDate() + "/" + selectedDateValue.getFullYear().toString().substring(2));

            if (mapSelection === "Total Cases") {
                const map = new Map(Object.entries(value.cases));

                cMap.set(fullCountryName, map.get(dateString));
                // @ts-ignore
                if (map.get(dateString) > 0) {
                    cArray.push({name: fullCountryName, value: map.get(dateString)});
                }

            } else if (mapSelection === "Total Deaths") {
                const map = new Map(Object.entries(value.deaths));
                cMap.set(fullCountryName, map.get(dateString));
                // @ts-ignore
                if (map.get(dateString) > 0) {
                    cArray.push({name: fullCountryName, value: map.get(dateString)});
                }
            }
        }
    });


    if(treeSortSelection==="Sorted by Value"){
        cArray.sort((a, b) => b.value - a.value);
    } else if(treeSortSelection==="Sorted by Country"){
        cArray.sort((a, b) => a.name - b.name);
    }


    function handleRefresh() {
        setLastUpdatedTime(new Date().toLocaleString());
        setContent("Worldwide");
        setCountry(null);
        getAllCountryData();
        getData("all", "");
    }


    function handleZoomIn() {
        if (position.zoom >= 15) return;
        setPosition((pos) => ({...pos, zoom: pos.zoom * 2}));
    }

    function handleZoomOut() {
        if (position.zoom <= 0.5) return;
        setPosition((pos) => ({...pos, zoom: pos.zoom / 2}));
    }

    function handleMoveEnd(position: React.SetStateAction<{ coordinates: number[]; zoom: number; }>) {
        setPosition(position);
    }

    function centreMap() {
        setPosition({coordinates: [0, 0], zoom: 1});
    }




    const countryCode = flagCode(content, country);


    async function updateDate(newValue: number | number[]) {

        if (typeof newValue === 'number') {
            setMaximumSetTime(newValue);

            let dd: { name: any; cases: any; deaths: any; newCases: any; vaccinated: any; newDeaths: any; }[] = []
            let counter = 0;

            try {
                dataMap.forEach((value, key) => {

                    if (counter <= newValue) {
                        if (counter === newValue) {
                            let date = new Date(key);

                            let newValue = {
                                name: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                                cases: dataMap.get(key).cases,
                                newCases: dataMap.get(key).newCases,
                                deaths: dataMap.get(key).deaths,
                                newDeaths: dataMap.get(key).newDeaths,
                                vaccinated: dataMap.get(key).vaccinated
                            };

                            setSelectedAttributes(newValue)
                            setSelectedDateValue(date);


                        }

                        dd.push(dataMap.get(key));
                        counter++;
                    } else {
                        throw 'Break';
                    }
                });
            } catch (e) {

            }
            // @ts-ignore
            setCovidData(dd);
        }
    }


    // @ts-ignore
    const colorScale = scaleQuantize().domain([0, Math.max(...Array.from(cMap.values())) / 5]).range(colorGradient);




    const handleCountrySelectChange = (event: SelectChangeEvent) => {
        setContent(event.target.value);
        if (event.target.value === "Worldwide") {
            setCountry(null);
            getData("all", "");
        } else {
            setCountry(countryCodes.get(event.target.value));
            getData(event.target.value, countryCodes.get(event.target.value));
        }
    };

    const handleMapSelectChange = (event: SelectChangeEvent) => {
        setMapSelection(event.target.value);
    };

    const handleTreeSelectionChange = (event: SelectChangeEvent) => {
        setTreeSortSelection(event.target.value);
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        updateDate(newValue);
    };



    return (
        <div className={styles.container}>
            <MenuBar theme={theme} />
            <main className={styles.main}>
                <ThemeProvider theme={theme}>
                    <Grid container spacing={1.5} className={styles.grid} alignItems={"stretch"}>
                        <Grid item xs={12} xl={8}>
                            <Paper className={styles.paperboxes}>
                                <WorldMap position={position} handleMoveEnd={handleMoveEnd} colorScale={colorScale} content={content} cMap={cMap} setContent={setContent} setCountry={setCountry} getData={getData}/>
                                <MapControls handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} centreMap={centreMap}/>
                                <MapDataSelect mapSelection={mapSelection} handleMapSelectChange={handleMapSelectChange}/>
                                <CountrySelect content={content} handleCountrySelectChange={handleCountrySelectChange} cMap={cMap} countryCodes={countryCodes}/>
                                <TimelineSlider selectedAttributes={selectedAttributes} maximumSetTime={maximumSetTime} maximumTimeValue={maximumTimeValue} handleChange={handleChange} dataMap={dataMap}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} xl={4}>
                            <Paper className={styles.paperboxes}>
                                <div className={styles.card}>
                                    <InformationPanel countryCode={countryCode} content={content} selectedAttributes={selectedAttributes} lastUpdatedTime={lastUpdatedTime} handleRefresh={handleRefresh}/>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Paper className={styles.paperboxes}>
                                <TotalCasesChart covidData={covidData} chartMargin={chartMargin}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Paper className={styles.paperboxes}>
                                <TotalDeathsChart covidData={covidData} chartMargin={chartMargin}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Paper className={styles.paperboxes}>
                                <NewCasesDeathsChart covidData={covidData} chartMargin={chartMargin}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Paper className={styles.paperboxes}>
                                <VaccineChart covidData={covidData} chartMargin={chartMargin}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={styles.paperboxes}>
                                <div className={styles.card}>
                                    <h1>Tree Map</h1>
                                    <div style={{ display: "inline-block"}}>
                                        <TreeDataSelect mapSelection={mapSelection} handleMapSelectChange={handleMapSelectChange}/>
                                        <TreeSortSelect treeSortSelection={treeSortSelection} handleTreeSelectionChange={handleTreeSelectionChange}/>
                                    </div>
                                    <TreeMap cArray={cArray} colorScale={colorScale} countryCodes={countryCodes} mapSelection={mapSelection}/>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </main>
            <footer className={styles.footer}>
                <Typography>© 2022 - 2023</Typography>
                <Typography>Vaibhav Ekambaram</Typography>
                <Typography>Abraham Alfred</Typography>
                <Typography>and</Typography>
                <Typography>Alexandra Hall</Typography>
            </footer>
        </div>
    );
}
