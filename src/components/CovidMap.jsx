import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
// import L from 'leaflet';

const CovidMap = ({ geoJson, colors, stats: { ranges }, focusRegion, setFocusRegion }) => {
    const geoJsonRef = useRef(null);
    let accessToken = 'pk.eyJ1IjoidG9ueWwyNzEiLCJhIjoiY2wxdmY4OWM2MmhxcDNrbWptNzBidjV6YSJ9.KwCsotDTXdDE-ntiAzNd5A';

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

    const onEachCountry = (state, layer) => {
        layer.on({
            mouseover: highlightState,
            mouseout: resetHighlight,
        });
        let name = state.properties.name;
        let cases = state.properties.casesFormatted;
        layer.bindPopup(`<p>Name: ${name} <br/> Covid Cases: ${cases}</p>`).openPopup();
    }

    return (
        <MapContainer
            style={{ backgroundColor: '#25282D', height: '90%', width: '100%' }}
            center={[39.162497380360634, 0]}
            zoom={2.5}
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