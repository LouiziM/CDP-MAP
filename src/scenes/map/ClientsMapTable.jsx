import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const regionNames = {
    1: "Laayoune-Saguia Hamra",
    2: "Oriental",
    3: "Tanger-Tetouan-Hoceima",
    4: "Fes-Meknes",
    5: "Rabat-Sale-Kenitra",
    6: "Casablanca-Settat",
    7: "Beni Mellal-Khenifra",
    8: "Daraa-Tafilelt",
    9: "Souss Massa",
    10: "Guelmim-Oued Noun",
    11: "Dakhla-Oued Eddahab",
    12: "Marrakech-Safi"
};

const useStyles = makeStyles((theme) => ({
    table: {
        borderCollapse: "collapse",
        width: "100%",
    },
    tableRow: {
        "&:hover": {
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
        },
        transition: "background-color 0.3s ease",
    },
    tableCell: {
        position: "relative",
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: "2px 16px", // Reduce padding
        height: "10px", // Set height
    },
    underline: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 3,
        backgroundColor: "transparent",
        transition: "width 0.3s ease",
    },
    underlineHovered: {
        width: "100%",
        backgroundColor: '#0D47A1', 
    },
    tableContainer: {
        margin: "auto",
        width: "100%", // Adjust as needed
        borderRadius: "15px", // Add border radius
        borderTop: "none", // Remove top border
        borderBottom: "none", // Remove bottom border
    },
}));

const RegionTable = ({ data, theme, setRegionId }) => {
    const classes = useStyles();

    const handleMouseEnter = (event) => {
        event.currentTarget.querySelector(`.${classes.underline}`).classList.add(classes.underlineHovered);
    };

    const handleMouseLeave = (event) => {
        event.currentTarget.querySelector(`.${classes.underline}`).classList.remove(classes.underlineHovered);
    };

    const handleRowClick = (id) => {
        setRegionId(id);
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="region table" className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontSize: 20, fontWeight: "bold" }}>Région</TableCell>
                        <TableCell style={{ textAlign: "right", color: theme.palette.blue.first, fontSize: 20, fontWeight: "bold" }}>Nb de clients</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row) => (
                            <TableRow
                                key={row.id}
                                className={classes.tableRow}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleRowClick(row.id)}
                                sx={{ height: '47px' }} // Adjust row height as needed
                            >
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {regionNames[row.id]}
                                    <div className={classes.underline} />
                                </TableCell>
                                <TableCell align="right" className={classes.tableCell} style={{ color: theme.palette.blue.first, fontWeight: "bold" }}>{row.value}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RegionTable;
