import React from 'react';
import { ResponsivePie } from '@nivo/pie';

// Data for the pie chart
const data = [
    {
        "id": "Occasion",
        "label": "Occasion",
        "value": 46880,
        "color": "#004BAB"
    },
    {
        "id": "Neuf",
        "label": "Neuf",
        "value": 139292,
        "color": "#80C1FF"
    }
];
const colors = [
    "#004BAB", // Start color
    
    "#6911AB",
    "#8C00AB",
    "#AF0092",
    "#D20079",
    "#FF0060"  // Magenta
  ];
const PieThree = () => (
    <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    colors={colors}
    cornerRadius={3}
    width={450}
    height={355}
    activeOuterRadiusOffset={8}
    borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: '1'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '0'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
);

export default PieThree;
