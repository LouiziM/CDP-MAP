import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Typography, Select, MenuItem } from '@mui/material';

const GraphDisplay = ({ initialData, variation }) => {
  const [data, setData] = useState([]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(4); // Default index for 2023

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      if (variation === "singular") {
        const transformedDataSingular = transformDataSingular(initialData);
        setData(transformedDataSingular);
      } else {
        const transformedData = transformData(initialData, selectedYearIndex);
        setData(transformedData);
      }
    }
  }, [initialData, selectedYearIndex, variation]);

  function transformData(data, yearIndex) {
    return data.flatMap(fusedItem => {
      const items = Object.values(fusedItem).flatMap(obj => Object.values(obj));

      return items.map(item => ({
        name: item.name,
        Abarth: item.sales_per_car_brand.Abarth[yearIndex],
        Dongfeng: item.sales_per_car_brand.Dongfeng[yearIndex],
        Ford: item.sales_per_car_brand.Ford[yearIndex],
        Fuso: item.sales_per_car_brand.Fuso[yearIndex],
        Mitsubishi: item.sales_per_car_brand.Mitsubishi[yearIndex],
        Nissan: item.sales_per_car_brand.Nissan[yearIndex]
      }));
    });
  }

  function transformDataSingular(data) {
    const years = [2019, 2020, 2021, 2022, 2023];
    const transformedData = [];

    data.forEach(fusedItem => {
      const items = Object.values(fusedItem).flatMap(obj => Object.values(obj));
      items.forEach(item => {
        years.forEach((year, yearIndex) => {
          const yearData = {
            year,
            name: item.name,
            Abarth: item.sales_per_car_brand.Abarth[yearIndex],
            Dongfeng: item.sales_per_car_brand.Dongfeng[yearIndex],
            Ford: item.sales_per_car_brand.Ford[yearIndex],
            Fuso: item.sales_per_car_brand.Fuso[yearIndex],
            Mitsubishi: item.sales_per_car_brand.Mitsubishi[yearIndex],
            Nissan: item.sales_per_car_brand.Nissan[yearIndex]
          };
          transformedData.push(yearData);
        });
      });
    });

    return transformedData;
  }

  const handleYearChange = (index) => {
    setSelectedYearIndex(index);
  };

  return (
    <>
      {variation !== "singular" && (
        <Select
          value={selectedYearIndex}
          onChange={(e) => handleYearChange(e.target.value)}
          variant="outlined"
        >
          {[2019, 2020, 2021, 2022, 2023].map((year, index) => (
            <MenuItem key={year} value={index}>
              {year}
            </MenuItem>
          ))}
        </Select>
      )}
      {data.length > 0 ? (
        <ResponsiveBar
          data={data}
          keys={['Abarth', 'Dongfeng', 'Ford', 'Fuso', 'Mitsubishi', 'Nissan']}
          indexBy={variation === "singular" ? "year" : "name"}
          height={340}
          margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 3]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 6,
            tickPadding: 5,
            tickRotation: 25,
            legend: variation === "singular" ? 'Année' : 'Volume vendu par marque',
            legendPosition: 'middle',
            legendOffset: -279,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Volume de ventes',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 25,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 20,
              isFocusable: true,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 0.5
                  }
                }
              ]
            }
          ]}
        />
      ) : (
        <Typography>No data available</Typography>
      )}
    </>
  );
};

export default GraphDisplay;
