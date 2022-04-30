import * as data from './global.json'


const { features } = data;
let statesGeoData = features;


const loadGeoData = async () => {
    return fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json')
        .then(response => response.json())
        .then(data => {
            for (let i = statesGeoData.length - 1; i >= 0; i--) {
                let feature = statesGeoData[i];
                let countryCode = feature.properties.adm0_a3;
                feature.properties.cases = (countryCode in data && data[countryCode].total_cases != null) ? data[countryCode].total_cases : -1
                feature.properties.casesFormatted = feature.properties.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return statesGeoData
        });
}
const loadStatsData = (statesGeoData) => {
    let sortedCases = statesGeoData.map((feature) => feature.properties.cases).sort((a, b) => a - b)
    sortedCases = sortedCases.filter((x) => x != -1)
    const n = 7;
    const inc = Math.ceil(sortedCases.length / 7)
    let totalCases = sortedCases.reduce((prev, curr) => prev + curr);
    let ranges = []
    for (let i = 0; i < n + 1; i++) {
        ranges.push(i * inc)
    }

    for (let i = 0; i < ranges.length - 1; i++) {
        ranges[i] = [ranges[i], ranges[i + 1]]
    }
    ranges.pop()
    ranges[ranges.length - 1][1] = sortedCases.length - 1
    ranges = ranges.map((interval) => [sortedCases[interval[0]], sortedCases[interval[1]]])
    ranges[0][0] = 0;




    return { totalCases, ranges };
}

export { loadGeoData, loadStatsData };