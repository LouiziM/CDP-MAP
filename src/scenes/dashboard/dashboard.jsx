import React from 'react';
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
} from "@mui/icons-material";
import {
  Grid,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import GeneralDataCompletion from './generalDataCompletion';
import ClientsMap from 'scenes/map/ClientsMap';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box p="1.5rem 2.5rem" position="relative" bgcolor={theme.palette.gray.first}>
      <FlexBetween>
        <Header title="Tableau de bord" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.blue.first,
              color: theme.palette.white.first,
              marginLeft: '30px',
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.blue.first
              }
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Exporter
          </Button>
        </Box>
      </FlexBetween>
      <Grid container   mt="24px">
        <Grid  item xs={2}>
          <GeneralDataCompletion theme={theme} />
        </Grid>
        <Grid item xs={10}>
          <ClientsMap theme={theme} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
