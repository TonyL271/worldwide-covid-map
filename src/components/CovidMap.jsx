import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as L from 'leaflet';
import "https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js";;

const CovidMap = ({ geoJson }) => {
    let accessToken = 'pk.eyJ1IjoidG9ueWwyNzEiLCJhIjoiY2wxdmY4OWM2MmhxcDNrbWptNzBidjV6YSJ9.KwCsotDTXdDE-ntiAzNd5A';
    let a = L.VectorGrid.Slicer;

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