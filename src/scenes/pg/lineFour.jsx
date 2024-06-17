import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      "category": 1,
      "value": 50000,
      "color": "#004BAB"
    },
    {
      "category": 2,
      "value": 100000,
      "color": "#004BAB"
    },
    {
      "category": 3,
      "value": 175000,
      "color": "#004BAB"
    },
    {
      "category": 4,
      "value": 150000,
      "color": "#004BAB"
    },
    {
      "category": 5,
      "value": 75000,
      "color": "#004BAB"
    }
  ];
  
  
  
  

const LineFour = () => (
  <ResponsiveBar
    data={data}
    indexBy="category"
    width={350}
    height={300}
    enableLabel={false}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={({ id, data }) => data.color}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 35,
      legend: 'Nombre de clients par nombre de commandes',
      legendPosition: 'middle',
      legendOffset: -230    
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Nombre des clients',
      legendPosition: 'middle',
      legendOffset: -50
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [['darker', 1.6]]
    }}
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
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={e => e.id + ": " + e.formattedValue + " in category: " + e.indexValue}
  />
)

export default LineFour;
