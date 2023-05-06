import ReactLoading from "react-loading"
import { Grid, Typography } from "@mui/material"

export const LoadingPage = (props : any) => {

    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            style={{
                paddingBottom: "6rem",
                paddingTop: "12rem",
                paddingRight: "12rem",
                paddingLeft: "12rem",
            }}>
            <Grid container item xs={12} justifyContent='center'>
                <ReactLoading type={props.type || "bars"} color='primary' height={60} width={60} />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography>{props.loadingText || "veuillez patienter..."}</Typography>
            </Grid>
        </Grid>
    )
}
