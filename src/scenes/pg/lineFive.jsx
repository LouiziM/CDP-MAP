import { ResponsiveFunnel } from '@nivo/funnel'



const LineFive = () => {
    const data = [
        {
            "id": "2",
            "value": 18400,
            "label": "18.40K",
            "color": "#004BAB"

        },
        {
            "id": "0",
            "value": 13950,
            "label": "13.95K",
            "color": "#004BAB"

        },
        {
            "id": "3",
            "value": 560,
            "label": "0.56K",
            "color": "#004BAB"

        },
        {
            "id": "4",
            "value": 470,
            "label": "0.47K",
            "color": "#004BAB"

        },
        {
            "id": "1",
            "value": 420,
            "label": "0.42K",
            "color": "#004BAB"

        }
    ];
    const colors=["#004BAB"]
    return (
        <ResponsiveFunnel
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            interpolation="linear"

            width={350}
            height={300}
            shapeBlending={1}
            colors={colors}
            borderWidth={0}
            borderColor={{ from: 'color', modifiers: [] }}
            borderOpacity={0.6}
            labelColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        3
                    ]
                ]
            }}
            beforeSeparatorLength={100}
            afterSeparatorLength={100}
            currentBorderWidth={40}
            motionConfig="wobbly"
        />
    );
}



export default LineFive;