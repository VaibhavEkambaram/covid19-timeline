import React from "react";
import {AppBar, Container, ThemeProvider, Toolbar, Typography} from "@mui/material";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";

export function MenuBar(props: { theme: any }) {
    let {theme} = props;
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <CoronavirusOutlinedIcon/>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1, paddingLeft: "10px",
                                display: {xs: 'block', sm: 'block'}
                            }}>
                            COVID-19 Timeline
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}
