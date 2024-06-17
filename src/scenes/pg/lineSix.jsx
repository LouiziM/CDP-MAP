import { ResponsiveBar } from '@nivo/bar'

const colors=["#004BAB"]

const LineSix = () => {
    const data = [
        {
            "kmeans_label": "0",
            "Somme_de_days_since_saledate": 4000000
        },
        {
            "kmeans_label": "2",
            "Somme_de_days_since_saledate": 8000000
        },
        {
            "kmeans_label": "3",
            "Somme_de_days_since_saledate": 4000000
        },
        {
            "kmeans_label": "1",
            "Somme_de_days_since_saledate": 2000000
        }
    ];

    return (
        <ResponsiveBar
            data={data}
            keys={['Somme_de_days_since_saledate']}
            indexBy="kmeans_label"
            margin={{ top: 20, right: 0, bottom: 50, left: 200 }}
            padding={0.3}
            layout="vertical"
            colors={colors}
            width={450}
            height={300}            
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Groupe de couleur',
                legendPosition: 'middle',
                legendOffset: -242
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Somme de days_since_saledate',
                legendPosition: 'middle',
                legendOffset: -70
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    );
}

export default LineSix;
