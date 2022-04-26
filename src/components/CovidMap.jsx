import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

const CovidMap = ({ geoJson }) => {
    let accessToken = 'pk.eyJ1IjoidG9ueWwyNzEiLCJhIjoiY2wxdmY4OWM2MmhxcDNrbWptNzBidjV6YSJ9.KwCsotDTXdDE-ntiAzNd5A';

    return (
        <MapContainer style={{ backgroundColor: '#25282D', height: '100vh', width: '100%' }} center={[39.162497380360634, -94.83672007881789]} zoom={2} >
            <GeoJSON data={geoJson} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
            />
        </MapContainer>
    )
}

export default CovidMap