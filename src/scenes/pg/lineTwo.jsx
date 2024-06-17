import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      "category": 0,
      "value": 0,
      "color": "#004BAB"
    },
    {
      "category": 1,
      "value": 50000,
      "color": "#004BAB"
    },
    {
      "category": 2,
      "value": 45000,
      "color": "#004BAB"
    },
    {
      "category": 3,
      "value": 30000,
      "color": "#004BAB"
    },
    {
      "category": 4,
      "value": 20000,
      "color": "#004BAB"
    },
    {
      "category": 5,
      "value": 15000,
      "color": "#004BAB"
    },
    {
      "category": 6,
      "value": 10000,
      "color": "#004BAB"
    },
    {
      "category": 7,
      "value": 7000,
      "color": "#004BAB"
    },
    {
      "category": 8,
      "value": 5000,
      "color": "#004BAB"
    },
    {
      "category": 9,
      "value": 3000,
      "color": "#004BAB"
    },
    {
      "category": 10,
      "value": 2000,
      "color": "#004BAB"
    },
    {
      "category": 11,
      "value": 1000,
      "color": "#004BAB"
    },
    {
      "category": 12,
      "value": 300,
      "color": "#004BAB"
    }
  ]
  

const LineTwo = () => (
  <ResponsiveBar
    data={data}
    indexBy="category"
    width={700}
    height={300}
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
      legend: 'Répartition par année',
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

export default LineTwo;
