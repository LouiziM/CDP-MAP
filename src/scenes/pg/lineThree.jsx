import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      "category": 2000,
      "value": 70,
      "color": "#004BAB"
    },
    {
      "category": 2001,
      "value": 88,
      "color": "#004BAB"
    },
    {
      "category": 2002,
      "value": 124,
      "color": "#004BAB"
    },
    {
      "category": 2003,
      "value": 341,
      "color": "#004BAB"
    },
    {
      "category": 2004,
      "value": 270,
      "color": "#004BAB"
    },
    {
      "category": 2005,
      "value": 450,
      "color": "#004BAB"
    },
    {
      "category": 2006,
      "value": 900,
      "color": "#004BAB"
    },
    {
      "category": 2007,
      "value": 1440,
      "color": "#004BAB"
    },
    {
      "category": 2008,
      "value": 5000,
      "color": "#004BAB"
    },
    {
      "category": 2009,
      "value": 8000,
      "color": "#004BAB"
    },
    {
      "category": 2010,
      "value": 11000,
      "color": "#004BAB"
    },
    {
      "category": 2011,
      "value": 14000,
      "color": "#004BAB"
    },
    {
      "category": 2012,
      "value": 17000,
      "color": "#004BAB"
    },
    {
      "category": 2013,
      "value": 20000,
      "color": "#004BAB"
    },
    {
      "category": 2014,
      "value": 23000,
      "color": "#004BAB"
    },
    {
      "category": 2015,
      "value": 25000,
      "color": "#004BAB"
    },
    {
      "category": 2016,
      "value": 27000,
      "color": "#004BAB"
    },
    {
      "category": 2017,
      "value": 30000,
      "color": "#004BAB"
    },
    {
      "category": 2018,
      "value": 32000,
      "color": "#004BAB"
    },
    {
      "category": 2019,
      "value": 10000,
      "color": "#004BAB"
    },
    {
      "category": 2020,
      "value": 2000,
      "color": "#004BAB"
    }
  ];
  
  
  
  

const LineThree = () => (
  <ResponsiveBar
    data={data}
    indexBy="category"
    width={700}
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

export default LineThree;
