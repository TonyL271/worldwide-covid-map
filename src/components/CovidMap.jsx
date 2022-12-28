import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
// import L from 'leaflet';

const CovidMap = ({ geoJson, colors, stats: { ranges }, focusRegion, setFocusRegion }) => {
    const geoJsonRef = useRef(null);
    const mapRef = useRef(null);
    let accessToken = 'pk.eyJ1IjoidG9ueWwyNzEiLCJhIjoiY2wxdmY4OWM2MmhxcDNrbWptNzBidjV6YSJ9.KwCsotDTXdDE-ntiAzNd5A';

    useEffect(() => {
        if (focusRegion === {}) return;

        if (geoJsonRef?.current?._layers && mapRef?.current) {
            const layers = Object.values(geoJsonRef?.current?._layers);
            const layerMatch = layers.find((layer) =>
                layer.feature.properties.name === focusRegion.name
            )
            // Exception for Russia and US because they cross the dateline
            // Exception for France because some of its teritory is in south america

            const coord = layerMatch.feature.properties.coord;
            console.log(coord)
            switch (focusRegion.name) {
                case 'United States':
                    layerMatch.openPopup(coord);
                    mapRef.current.fitBounds([[71.469124, -63.145981], [24.527135, -168.263168]])
                    break;
                case 'Russia':
                    layerMatch.openPopup(coord);
                    mapRef.current.fitBounds([[79.196590, 180.000000], [39.368279, 24.920425]])
                    break;
                case 'France':
                    layerMatch.openPopup(coord);
                    mapRef.current.fitBounds([[51.941090, 9.404297], [42.048018, -5.361328]])
                    break;
                default:
                    layerMatch.openPopup(
                        coord ?
                            coord :
                            layerMatch.getBounds().getCenter()
                    );
                    mapRef.current.fitBounds(layerMatch.getBounds())
            }
        }
    }, [focusRegion])

    const countryStyle = (state) => {
        const cases = state.properties.cases
        let color = '#400080';
        for (let i = 0; i < ranges.length; i++) {
            if (cases >= ranges[i][0] && cases <= ranges[i][1]) {
                color = colors[i];
            }
        }
        return (
            {
                fillColor: color,
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        )
    }

    const highlightState = (e) => {
        let layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        layer.bringToFront();
    }

    const resetHighlight = (e) => {
        geoJsonRef?.current && geoJsonRef.current.resetStyle(e.target)
    }

    const handleClick = (e) => {
        setFocusRegion({ name: e.target.feature.properties.name });
    }


    const onEachCountry = (state, layer) => {
        layer.on({
            mouseover: highlightState,
            mouseout: resetHighlight,
            click: handleClick
        });
        let name = state.properties.name;
        let cases = state.properties.casesFormatted;
        layer.bindPopup(`<p>Name: ${name} <br/> Covid Cases: ${cases}</p>`).openPopup();
    }

    return (
        <MapContainer
            ref={mapRef}
            style={{ backgroundColor: '#25282D', height: '100%', width: '100%' }}
            center={[39.162497380360634, 0]}
            zoom={2.5}
            options={{ WorldCopyJump: true }}
            whenReady={(map) => {
                map.target.zoomControl.setPosition('topright');
                map.target.zoomControl._container.style = 'margin-top:2rem; margin-right:2rem;';
            }}
        >
            <GeoJSON ref={geoJsonRef} data={geoJson} style={countryStyle} onEachFeature={onEachCountry} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
            />
        </MapContainer>
    )
}

export default CovidMap