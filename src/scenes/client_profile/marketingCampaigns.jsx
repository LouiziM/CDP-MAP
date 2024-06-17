import React, { useEffect, useState, useMemo } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, frFR, gridClasses, GridLogicOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Grid, Box, Typography } from '@mui/material';
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { CustomTooltip } from './misc/customTooltip.tsx';
import { useGetCustomerMarketingCampaignsQuery } from 'features/state/clientApiSlice.js';

const ODD_OPACITY = 0.4;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.blue.second,
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.gray.second, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.gray.second,
        ODD_OPACITY,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.gray.second,
          ODD_OPACITY
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.gray.second,
            ODD_OPACITY
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.gray.second,
        ODD_OPACITY,
      ),
    },
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.gray.second, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    }
  },
}));

const LegendItem = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const MarketingCampaigns = ({ theme, clientSelected }) => {
  const { data: campaigns = [], isLoading } = useGetCustomerMarketingCampaignsQuery(clientSelected?.id);
  const defaultDataColors = ["#3f51b5", "#4caf50", "#00a7c4"];
  const [dataColors, setDataColors] = useState(defaultDataColors);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    console.log(campaigns); // Check the structure of the fetched data
  }, [campaigns]);

  const data = [
    {
      id: "Réponses aux campagnes",
      data: [{ x: "", y: 44 }]
    }
  ];

  const handleLegendHover = (color, index) => {
    setHoveredIndex(index);
    const newColors = defaultDataColors.map((c, i) => (i === index ? color : 'transparent'));
    setDataColors(newColors);
  };

  const resetColors = () => {
    setDataColors(defaultDataColors);
    setHoveredIndex(null);
  };

  const Legend = () => (
    <Box
      onMouseLeave={() => resetColors()}
      display="flex"
      flexDirection="column"
      position="absolute"
      top="340px"
    >
      {data.map((item, index) => (
        <LegendItem
          key={index}
          onMouseEnter={() => handleLegendHover(defaultDataColors[index], index)}
          onMouseLeave={() => resetColors()}
        >
          <Box
            width="18px"
            height="18px"
            borderRadius="50%"
            backgroundColor={dataColors[index]}
            marginRight="5px"
            marginBottom="2px"
          />
          <Typography variant="body2">
            {item.id} <strong>{item.data[0].y}%</strong>
          </Typography>

        </LegendItem>
      ))}
    </Box>
  );

  const columns = useMemo(() => [
    {
      field: 'Titre', // Ensure this matches the key in your data
      headerName: 'Titre',
      flex: 1,
      align: "center",
      renderCell: ({ row }) => (
        <CustomTooltip title={row.Titre}>
          <Typography>{row.Titre}</Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'Marque', // Ensure this matches the key in your data
      headerName: 'Marque',
      flex: 1,
      align: "center",
      renderCell: ({ row }) => (
        <CustomTooltip title={row.Marque}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {row.Marque}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'Type', // Ensure this matches the key in your data
      headerName: 'Type',
      align: "center",
      flex: 1,
      renderCell: ({ row }) => (
        <CustomTooltip title={row.Type}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {row.Type}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'Date', // Ensure this matches the key in your data
      headerName: 'Date',
      flex: 1,
      align: "center",
      renderCell: ({ row }) => (
        <CustomTooltip title={row.Date}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {row.Date}
          </Typography>
        </CustomTooltip>
      ),
    },
    {
      field: 'Contenu', // Ensure this matches the key in your data
      headerName: 'Contenu',
      flex: 1,
      align: "center",
      renderCell: ({ row }) => (
        <CustomTooltip title={row.Contenu}>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {row.Contenu}
          </Typography>
        </CustomTooltip>
      ),
    },
  ], []);

  useEffect(() => {
    console.log(columns); // Check the columns configuration
  }, [columns]);

  const Metric = ({ center }) => {
    if (hoveredIndex !== null) {
      const value = data[hoveredIndex].data[0].y;
      return (
        <text
          x={center[0]}
          y={center[1]}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          {value}%
        </text>
      );
    }
    return null;
  };

  return (
    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ borderRadius: '15px', position: 'relative', display: "flex" }}>
      <Box
        width="100%"
        height="100%"
        p="20px"
        style={{ borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
        backgroundColor={theme.palette.white.first}
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} >
          Campagnes marketing
        </Typography>
        <hr style={{ border: `1px solid ${theme.palette.blue.first}`, width: '100%', marginBottom: "20px" }} />

        <Box onMouseLeave={() => resetColors()}>
          <Grid container spacing={2} position={"relative"}>
            <Grid item xs={12} sm={12} md={4}>
              <ResponsiveRadialBar
                data={data}
                innerRadius={0.3}
                padding={0.7}
                cornerRadius={16}
                colors={dataColors}
                maxValue={100}
                startAngle={0}
                endAngle={360}
                enableRadialGrid={false}
                enableCircularGrid={false}
                enableTracks={true}
                circularAxisOuter={null}
                labelsSkipAngle={0}
                labelsRadiusOffset={0}
                height={300}
                radialAxisStart={null}
                isInteractive={true}
                labelsTextColor={{ theme: 'grid.line.stroke' }}
                transitionMode="startAngle"
                layers={['grid', 'tracks', 'bars', 'labels', Metric]}
              />
              <Legend />
            </Grid>
            <Grid item xs={12} sm={12} md={8} mt={{ xl: 0, lg: 0, md: 0, sm: "90px", xs: "90px" }}>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.blue.first} marginBottom={"20px"} textAlign={"center"}>
                Historique de participation aux campagnes
              </Typography>
              <StripedDataGrid
                rows={campaigns.data || []}
                columns={columns}
                loading={isLoading}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                sx={{
                  '&, [class^=MuiDataGrid]': {
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                    borderTop: 'none',

                    '& .MuiDataGrid-main': {
                      flexGrow: 0
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 'bold',
                    },
                  },
                }}
                initialState={{
                  filter: {
                    filterModel: {
                      items: [],
                      quickFilterLogicOperator: GridLogicOperator.Or,
                    },
                  },
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5]}
                slots={{ toolbar: QuickSearchToolbar }}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default MarketingCampaigns;

function QuickSearchToolbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={"#ffffff"}
      borderRadius="9px"
      border="1px solid"
      borderColor={"#004BAB"}
      p="0rem 0.5rem"
      width="100%"
      height="50px"
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
        sx={{
          width: "100%",
          pb: 0,
          "& .MuiInputBase-root.MuiInput-root:before": {
            display: 'none'
          },
          "& .MuiInputBase-root.MuiInput-root:after": {
            display: 'none'
          }
        }}
      />
    </Box>
  );
}
