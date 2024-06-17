import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Select, MenuItem, Typography } from '@mui/material';

const monthsInFrench = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const transformData = (data) => {
    const transformedData = {};

    data.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
            Object.entries(value).forEach(([innerKey, innerValue]) => {
                if (innerValue && innerValue.Satisfaction_client) {
                    innerValue.Satisfaction_client.forEach((yearlyData, yearIndex) => {
                        const year = 2023 - yearIndex;
                        if (!transformedData[year]) {
                            transformedData[year] = [];
                        }
                        const lineData = {
                            id: `${innerValue.name} - ${year}`,
                            color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
                            data: yearlyData.map((monthlyData, monthIndex) => ({
                                x: monthsInFrench[monthIndex],
                                y: monthlyData
                            }))
                        };
                        transformedData[year].push(lineData);
                    });
                }
            });
        });
    });

    return transformedData;
};

const transformDataSingular = (data) => {
    const transformedData = [];

    data.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
            Object.entries(value).forEach(([innerKey, innerValue]) => {
                if (innerValue && innerValue.Satisfaction_client) {
                    innerValue.Satisfaction_client.forEach((yearlyData, yearIndex) => {
                        const year = 2023 - yearIndex;
                        const lineData = {
                            id: `${innerValue.name} - ${year}`,
                            color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
                            data: yearlyData.map((monthlyData, monthIndex) => ({
                                x: monthsInFrench[monthIndex],
                                y: monthlyData
                            }))
                        };
                        transformedData.push(lineData);
                    });
                }
            });
        });
    });

    return transformedData;
};

const LineDisplay = ({ initialData, variation }) => {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [data, setData] = useState(null);
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#57FFFF', '#FFFF33'];

    useEffect(() => {
        if (variation === "singular") {
            const transformedData = transformDataSingular(initialData);
            setData(transformedData);
        } else {
            const transformedData = transformData(initialData);
            setData(transformedData);
        }
    }, [initialData, variation]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    return (
        <>
            {variation !== "singular" && (
                <Select
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    variant="outlined"
                >
                    {[2019, 2020, 2021, 2022, 2023].map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            )}
            {data && (variation === "singular" || (data[selectedYear] && data[selectedYear].length > 0)) ? (
                <ResponsiveLine
                    data={variation === "singular" ? data : data[selectedYear]}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    height={340}
                    colors={colors}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 35,
                        legend: 'Mois',
                        legendOffset: -279,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Satisfaction Moyenne',
                        legendOffset: -40,
                        legendPosition: 'middle',
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    enableSlices="x"
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            ) : (
                <Typography>Aucune donnée disponible</Typography>
            )}
        </>
    );
};

export default LineDisplay;
