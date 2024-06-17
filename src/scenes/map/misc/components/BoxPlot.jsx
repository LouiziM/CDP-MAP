import React, { useState, useEffect } from 'react';
import { ResponsiveBoxPlot } from '@nivo/boxplot';
import { Typography, Select, MenuItem } from '@mui/material';

const calculateDataEntries = (votes, uniqueId) => {
  const satisfactionLevels = [1, 2, 3, 4, 5];
  const results = [];

  votes.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
      results.push({
        group:  `${uniqueId.replace(/\s+/g, '')}`,
        mu: satisfactionLevels[index],
        sd: 1, // Placeholder for standard deviation
        n: 1,
        value: satisfactionLevels[index]
      });
    }
  });

  return results;
};

const transformDataSingular = (data) => {
  const results = [];
  const yearLabels = ['2019', '2020', '2021', '2022', '2023'];

  if (!data) {
    console.error("Data is undefined or null.");
    return results;
  }

  Object.values(data[0]).forEach(item => {
    Object.values(item).forEach(subItem => {
      if (subItem.fréquence_de_satisfaction) {
        subItem.fréquence_de_satisfaction.forEach((yearData, yearIndex) => {
          if (yearLabels[yearIndex]) {
            const yearEntries = calculateDataEntries(yearData, `Year-${yearLabels[yearIndex]}`);
            yearEntries.forEach(entry => {
              entry.group = yearLabels[yearIndex];
              results.push(entry);
            });
          }
        });
      }
    });
  });

  console.log("Transformed singular data:", results);
  return results;
};

const transformDataMulti = (data, yearIndex) => {
  const results = [];

  if (!data) {
    console.error("Data is undefined or null.");
    return results;
  }

  Object.values(data[0]).forEach(item => {
    Object.values(item).forEach(subItem => {
      if (subItem.fréquence_de_satisfaction && subItem.fréquence_de_satisfaction.length > yearIndex) {
        const yearData = subItem.fréquence_de_satisfaction[yearIndex];
        const yearEntries = calculateDataEntries(yearData, `Item-${subItem.name}`);
        yearEntries.forEach(entry => {
          entry.group = subItem.name;
          results.push(entry);
        });
      }
    });
  });

  console.log("Transformed multi data:", results);
  return results;
};

const BoxPlot = ({ initialData, variation }) => {
  const [data, setData] = useState([]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // Default to the first index

  useEffect(() => {
    if (variation === 'singular') {
      setData(transformDataSingular(initialData));
    } else if (variation === 'multi') {
      setData(transformDataMulti(initialData, selectedYearIndex));
    }
  }, [initialData, selectedYearIndex, variation]);

  const handleYearChange = (event) => {
    setSelectedYearIndex(event.target.value);
  };

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#57FFFF', '#FFFF33'];

  return (
    <>
      {variation === 'multi' && (
        <Select value={selectedYearIndex} onChange={handleYearChange} variant="outlined">
          {Array.from({ length: 5 }, (_, i) => (
            <MenuItem key={i} value={i}>
              {2019 + i}
            </MenuItem>
          ))}
        </Select>
      )}
      {data.length > 0 ? (
        <ResponsiveBoxPlot
          data={data}
          colors={colors}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          minValue="auto"
          maxValue="auto"
          colorBy="group"

          width={450}
          height={300}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 35,
            legend: variation === 'multi' ? 'Fréquence de satisfaction par filliale' : 'Fréquence de satisfaction par filliale an',
            legendPosition: 'middle',
            legendOffset: -230
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Satisfaction',
            legendPosition: 'middle',
            legendOffset: -40
          }}
        />
      ) : (
        <Typography>No data available</Typography>
      )}
    </>
  );
};

export default BoxPlot;
