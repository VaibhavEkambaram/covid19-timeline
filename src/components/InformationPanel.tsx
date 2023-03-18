import React from "react";
import styles from "../styles/Home.module.css";
import {
    Button,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export function InformationPanel(props: { countryCode: any, content: any, selectedAttributes: any, lastUpdatedTime: any, handleRefresh: any }) {
    let {countryCode, content, selectedAttributes, lastUpdatedTime, handleRefresh} = props;
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
            <div style={{paddingTop: "20px"}}>
                <Typography variant={"subtitle2"}>Last Updated: {lastUpdatedTime}</Typography>
                <Button style={{
                    marginTop: "15px", textTransform: "none"
                }} variant="contained" onClick={handleRefresh}
                        startIcon={<RefreshIcon/>}>
                    Refresh Source Data
                </Button>
            </div>
            <div style={{paddingTop: "20px"}}>
                <Typography variant={"caption"}>Historical case, mortality, and vaccination data
                    sourced through disease.sh - Open Disease Data API. Case and mortality
                    information sourced from Johns Hopkins University. Vaccine information
                    sourced from Our World in Data.</Typography>
            </div>
        </div>
    );
}
