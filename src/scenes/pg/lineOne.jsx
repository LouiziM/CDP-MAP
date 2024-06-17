import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    "category": "sedan",
    "value": 0.23,
    "color": "#004BAB"
  },
  {
    "category": "suv",
    "value": 0.17,
    "color": "#004BAB"
  },
  {
    "category": "hatchback",
    "value": 0.05,
    "color": "#004BAB"
  },
  {
    "category": "minivan",
    "value": 0.03,
    "color": "#004BAB"
  },
  {
    "category": "coupe",
    "value": 0.02,
    "color": "#004BAB"
  },
  {
    "category": "crew cab",
    "value": 0.02,
    "color": "#004BAB"
  },
  {
    "category": "wagon",
    "value": 0.02,
    "color": "#004BAB"
  },
  {
    "category": "convertible",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "supercrew",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "g sedan",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "supercab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "regular cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "van",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "extended cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "quad cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "e-series van",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "g coupe",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "double cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "crewmax cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "king cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "g convertible",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "Genesis coupe",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "access cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "koup",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "club cab",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "cts coupe",
    "value": 0.01,
    "color": "#004BAB"
  },
  {
    "category": "mega cab",
    "value": 0.01,
    "color": "#004BAB"
  }
]

const LineOne = () => (
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
      legend: 'Répartition des types de carrosserie',
      legendPosition: 'middle',
      legendOffset: -202
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Nombre de body',
      legendPosition: 'middle',
      legendOffset: -40
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

export default LineOne;
