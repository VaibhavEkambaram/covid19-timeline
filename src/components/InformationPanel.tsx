import React from "react";
import styles from "../styles/Home.module.css";
import {
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

export function InformationPanel(props: { countryCode: any, content: any, selectedAttributes: any}) {
    let {countryCode, content, selectedAttributes} = props;
    return (
        <div className={styles.card}>
            <h1 className={styles.countryName}><span className={countryCode}></span> {content}</h1>
            <TableContainer>
                <Table sx={{minWidth: 80}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"left"}>
                                {selectedAttributes.name !== "" ? <Typography>Statistics
                                        for </Typography>
                                    : <Typography>Data not available</Typography>}

                            </TableCell>
                            <TableCell align={"center"}>{selectedAttributes.name !== "" ?
                                <Typography>{selectedAttributes.name === "Loading" ?
                                    <LinearProgress/> : selectedAttributes.name}</Typography> :
                                <Typography></Typography>}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align={"left"}>New Cases</TableCell>
                            <TableCell
                                align={"center"}>{(selectedAttributes.newCases !== -1 ? (selectedAttributes.newCases !== -2 ? selectedAttributes.newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Data not available") :
                                <LinearProgress/>)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"left"}>Total Cases</TableCell>
                            <TableCell
                                align={"center"}>{(selectedAttributes.cases !== -1 ? (selectedAttributes.cases !== -2 ? selectedAttributes.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Data not available") :
                                <LinearProgress/>)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"left"}>New Deaths</TableCell>
                            <TableCell
                                align={"center"}>{(selectedAttributes.newDeaths !== -1 ? (selectedAttributes.newDeaths !== -2 ? selectedAttributes.newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Data not available") :
                                <LinearProgress/>)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"left"}>Total Deaths</TableCell>
                            <TableCell
                                align={"center"}>{(selectedAttributes.deaths !== -1 ? (selectedAttributes.deaths !== -2 ? selectedAttributes.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Data not available") :
                                <LinearProgress/>)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"left"}>Vaccine Doses</TableCell>
                            <TableCell
                                align={"center"}>{(selectedAttributes.vaccinated !== -1 ? (selectedAttributes.vaccinated !== null ? selectedAttributes.vaccinated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Data not available") :
                                <LinearProgress/>)}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{paddingTop: "40px"}}>
                <Typography variant={"caption"}>Case and mortality information sourced from Johns Hopkins University. Vaccine information sourced from Our World in Data. Territory exported from OSM and thus defined as on the ground. As a result, disputed territories are marked in regards to physical control.</Typography>
            </div>
        </div>
    );
}
