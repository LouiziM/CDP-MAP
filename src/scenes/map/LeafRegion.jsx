import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Layer } from 'leaflet';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MarkerClusterGroup from "react-leaflet-cluster";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RegionDataDisplay from './misc/components/RegionDataDisplay';
import MainComponent from './misc/components/MainComponent';

import { ORIENTAL_MARKERS, LSH_MARKERS, TTH_MARKERS, FM_MARKERS, RSK_MARKERS, CS_MARKERS, BMK_MARKERS, DT_MARKERS, SM_MARKERS, GON_MARKERS, DOE_MARKERS, MS_MARKERS } from "./misc/data/Locations";
import { RSK, BMK, LSH, SM, CS, ORIENTAL, FM, DT, GON, MS, TTH, DOE } from './misc/data/Regions';

const regionDataMap = {
    1: LSH,  // Laayoune-Saguia Hamra
    2: ORIENTAL,
    3: TTH,  // Tanger-Tetouan-Hoceima
    4: FM,   // Fes-Meknes
    5: RSK,  // Rabat-Sale-Kenitra
    6: CS,   // Casablanca-Settat
    7: BMK,  // Beni Mellal-Khenifra
    8: DT,   // Daraa-Tafilelt
    9: SM,   // Souss Massa
    10: GON, // Guelmim-Oued Noun
    11: DOE, // Dakhla-Oued Eddahabs
    12: MS,  // Marrakech-Safi
};

const Loaded = ({ region }) => {
    const map = useMap();

    const findCenter = (coordinates) => {
        if (!coordinates || coordinates.length === 0) {
            return null;
        }
        const innerCoordinates = coordinates[0][0];
        let totalLat = 0;
        let totalLng = 0;
        innerCoordinates.forEach(coord => {
            totalLat += coord[1];
            totalLng += coord[0];
        });
        const avgLat = totalLat / innerCoordinates.length;
        const avgLng = totalLng / innerCoordinates.length;

        return [avgLat, avgLng];
    };

    useEffect(() => {
        const zoomToRegion = () => {
            const center = findCenter(region?.geometry.coordinates);
            if (map && center) {
                setTimeout(() => {
                    map.setView([
                        center[0],
                        center[1]
                    ], 7);
                }, 500);
            }
        };
        zoomToRegion();
    }, [region, map]);

    return null;
};



const LeafRegion = ({ RegionId, onReturn, theme }) => {

    const [regionId, setRegionId] = useState(RegionId)
    const [region, setRegion] = useState(regionDataMap[regionId])
    const markersData = {
        1: LSH_MARKERS,
        2: ORIENTAL_MARKERS,
        3: TTH_MARKERS,
        4: FM_MARKERS,
        5: RSK_MARKERS,
        6: CS_MARKERS,
        7: BMK_MARKERS,
        8: DT_MARKERS,
        9: SM_MARKERS,
        10: GON_MARKERS,
        11: DOE_MARKERS,
        12: MS_MARKERS,
    };
    const [hoveredsTooltip, setHoveredsTooltip] = useState(regionId);
    const [showAllRegions, setShowAllRegions] = useState(false);
    const [loaded, setLoaded] = useState();
    const customIcon = new L.Icon({
        iconUrl: require("./misc/assets/image.svg").default,
        iconSize: new L.Point(100, 100  )
    });

    const toggleRegionsVisibility = () => {
        setShowAllRegions(!showAllRegions);
    };


    const onEachRegion = (feature, layer) => {

        layer.on('mouseover', function () {
            setHoveredsTooltip(layer?.feature?.properties?.id);
        });
        layer.on('mouseout', function () {
            setHoveredsTooltip(null);
        });
        layer.on('click', function () {
            // setSideToolTipTimout(1000);
            setRegion(layer?.feature);
            setRegionId(layer?.feature?.properties?.id)

        });
    };

    //EXPIRIMENTAL
    const [items, setItems] = useState([]);
    const [fusedItems, setFusedItems] = useState([]);
    const [flickerId, setFlickerId] = useState(null);

    // useEffect(()=>{
    //     console.log("flieckerid",flickerId)

    // },[flickerId])

    const flickerItem = (itemId) => {
        console.log("flcikering the item",itemId)
        setFlickerId(itemId);
        setTimeout(() => setFlickerId(null), 2000   );
      };
      const [snackBarOpen, setSnackBarOpen] = useState(false);
      const [snackBarMessage, setSnackBarMessage] = useState("");

    const addItem = (marker, region) => {
        const markerData = markersData[region].results;
        if (items.length < 6) {
          const newItemData = markerData.find(item => item.id === marker);
         

          if (newItemData) {
            const itemExists = items.some(item => item[newItemData.id]);
            if (!itemExists) {
              const newItem = { [newItemData.id]: newItemData };
              setItems([...items, newItem]);
            } else {
              flickerItem(newItemData.id);
            }
          }
        }else{
            setSnackBarMessage("Le nombre maxinum est atteint")
            setSnackBarOpen(true)
        }
      };

    

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer
                center={[31.7917, -7.0926]}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
                whenReady={() => setLoaded(true)}
                doubleClickZoom={false}
            >


                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
                {showAllRegions && Object.keys(regionDataMap).map((regionKey) => (
                    <MarkerClusterGroup
                        key={regionKey}
                        chunkedLoading
                        showCoverageOnHover={false}
                        spiderfyDistanceMultiplier={2}>
                        {markersData[regionKey].results.map((address, index) => (
                            <Marker
                                key={index}
                                position={[
                                    address.lat ? address.lat : 0,
                                    address.lng ? address.lng : 0
                                ]}
                                markerId={address.id}
                                icon={customIcon}
                                eventHandlers={{
                                    click: (e) => {
                                        addItem(address.id , address.region)
                         console.log('marker clicked', e.target.options.markerId)

                                    },
                                }}
                            >

                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                ))}
                {!showAllRegions && region && (
                    <MarkerClusterGroup
                        chunkedLoading
                        showCoverageOnHover={false}
                        spiderfyDistanceMultiplier={2}>
                        {markersData[regionId].results.map((address, index) => (
                            <Marker
                                key={index}
                                position={[
                                    address.lat ? address.lat : 0,
                                    address.lng ? address.lng : 0
                                ]}
                                markerId={address.id}
                                icon={customIcon}
                                eventHandlers={{
                                    click: (e) => {
                                        // console.log('marker clicked', e.target.options.markerId)
                                        addItem(address.id , address.region)

                                    },
                                }}
                            >

                            </Marker>

                        ))}
                    </MarkerClusterGroup>
                )}
                {showAllRegions && Object.keys(regionDataMap).map((regionKey) => (
                    <GeoJSON key={regionKey} data={regionDataMap[regionKey]} onEachFeature={onEachRegion} />
                ))}
                {!showAllRegions && region && <GeoJSON data={region} onEachFeature={onEachRegion} />}
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: '1000' }}>
                    <button onClick={onReturn} style={{ backgroundColor: theme.palette.blue.first, border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                        <KeyboardReturnIcon style={{ fontSize: '40px', color: theme.palette.white.first }} />
                    </button>
                    <button onClick={toggleRegionsVisibility} style={{ backgroundColor: theme.palette.blue.first, border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                        {showAllRegions ? <VisibilityOffIcon style={{ fontSize: '40px', color: theme.palette.white.first }} /> : <VisibilityIcon style={{ fontSize: '40px', color: theme.palette.white.first }} />}
                    </button>
                </div>
                {hoveredsTooltip && (
                    <RegionDataDisplay markersData={markersData[hoveredsTooltip]} />
                )}
                {loaded && <Loaded region={region} />}
                {(items.length !== 0 || fusedItems.length !== 0) &&
                 <MainComponent 
                 snackBarOpen={snackBarOpen}
                 setSnackBarOpen={setSnackBarOpen}
                 snackBarMessage={snackBarMessage}
                 setSnackBarMessage={setSnackBarMessage}
                 flickerId={flickerId} 
                 theme={theme} 
                 fusedItems={fusedItems} 
                 setFusedItems={setFusedItems} 
                 items={items} 
                 setItems={setItems} 
                 />}

            </MapContainer>

        </div>
    );
};

export default LeafRegion;
