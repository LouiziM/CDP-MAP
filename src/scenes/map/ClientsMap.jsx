import React, { useState, useEffect } from "react";
import { Choropleth } from './Choropleth';
import { Box} from "@mui/material";
import { ChartContext }  from "./misc/components/Contexts.ts";
import { useGetCustomersPerRegionQuery } from '../../features/state/clientApiSlice';
import RegionTable from "./ClientsMapTable"; 
import { CircularProgress } from '@mui/material';
import { useTheme } from "@mui/material";
import Legend from "./Legend";
import LeafRegion from "./LeafRegion";

const ClientsMap = () => {
    const theme = useTheme();
    const [region, setRegion] = useState(null);
    const [regionId, setRegionId] = useState(null);
    const [dataColors, setDataColors] = useState([
        '#E3F2FD', // lightest shade of blue
        '#BBDEFB',
        '#90CAF9',
        '#64B5F6',
        '#42A5F5',
        '#2196F3', // medium shade of blue
        '#1E88E5',
        '#1976D2',
        '#1565C0',
        '#0D47A1',
        '#0d2c5c' // darkest shade of blue
    ]);
    const { data: regionalData, isLoading } = useGetCustomersPerRegionQuery();

    const maxData = regionalData ? Math.max(...regionalData.map((item) => item.value)) : 0;
    const maxDataFloor = Math.floor(maxData / 10) * 10;
    const step = maxDataFloor / 10;

    const handleReturn = () => {
        setRegionId(null);
    };



    if (regionId !== null) {
        return <LeafRegion RegionId={regionId} onReturn={handleReturn} theme={theme}/>; 
    }

    return (
        <>
            {!regionalData ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="500px"
                >
                    <CircularProgress sx={{color:theme.palette.blue.first}} />
                </Box>      
            ) : (
                <ChartContext.Provider>
                    <Box sx={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',borderRadius:'15px',backgroundColor:'white !important',height: "620px", position: 'relative', display: 'flex', flexDirection: 'row' }}>
                            <Choropleth setRegion={setRegion} setRegionId={setRegionId} data={regionalData} maxData={maxDataFloor+step} dataColors={dataColors}/>
                        <Legend dataColors={dataColors} setDataColors={setDataColors} data={regionalData} maxDataFloor={maxDataFloor}/>
                        <RegionTable setRegionId={setRegionId} data={regionalData} theme={theme}/> 
                    </Box>
                </ChartContext.Provider>
            )}
        </>
    );
}

export default ClientsMap;