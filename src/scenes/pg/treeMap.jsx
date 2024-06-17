import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';

// Manually created gradient of 8 colors from #004BAB to magenta
const colors = [
  "#004BAB", // Start color
  "#2336AB",
  "#4622AB",
  "#6911AB",
  "#8C00AB",
  "#AF0092",
  "#D20079",
  "#FF0060"  // Magenta
];

const data = {
  "name": "root",
  "color": "hsl(0, 0%, 100%)",
  "children": [
    {
      "name": "Group 1",
      "color": colors[0],
      "loc": 60000
    },
    {
      "name": "Group 2",
      "color": colors[1],
      "loc": 40000
    },
    {
      "name": "Group 3",
      "color": colors[2],
      "loc": 15000
    },
    {
      "name": "Group 4",
      "color": colors[3],
      "loc": 12000
    },
    {
      "name": "Group 5",
      "color": colors[4],
      "loc": 9000
    },
    {
      "name": "Group 6",
      "color": colors[5],
      "loc": 5000
    },
    {
      "name": "Group 7",
      "color": colors[6],
      "loc": 4000
    },
    {
      "name": "Group 8",
      "color": colors[7],
      "loc": 2000
    }
  ]
};

const MyResponsiveTreeMap = () => (
    <ResponsiveTreeMap
        data={data}
        identity="name"
        value="loc"
        valueFormat=".02s"
        colors={colors}
        width={350}
        height={300}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.2
                ]
            ]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.1
                ]
            ]
        }}
    />
);

export default MyResponsiveTreeMap;
