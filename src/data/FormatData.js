import * as data from './global.json'


const { features } = data;
let statesGeoData = features;


const loadGeoData = async () => {
    return fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json')
        .then(response => response.json())
        .then(data => {
            let weird = false;
            for (let key in data) {
                weird |= data[key].total_cases == null;
            }
            let w = statesGeoData.every((feature) => feature.properties.hasOwnProperty('adm0_a3'))
            for (let i = statesGeoData.length - 1; i >= 0; i--) {
                let feature = statesGeoData[i];
                let countryCode = feature.properties.adm0_a3;
                feature.properties.total_cases = countryCode in data ? data[countryCode].total_cases : null
            }
            let magnitude = [];
            statesGeoData.forEach((feature) => {
                if (feature.properties.total_cases != null) {

                    magnitude.push(feature.properties.total_cases)

                }
            })
            let b = magnitude.sort(function (a, b) {
                return a - b;
            });
            console.log(b)

            return statesGeoData
        });
}

export { loadGeoData };