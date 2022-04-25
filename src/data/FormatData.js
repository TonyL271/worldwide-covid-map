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
                feature.properties.cases = countryCode in data ? data[countryCode].total_cases : -1
            }
            return statesGeoData
        });
}
const loadStatsData = (statesGeoData) => {
    const rangesLength = 7;

    let sortedCases = [];
    let totalCases = 0;
    let cases;
    statesGeoData.forEach((state) => {
        cases = state.properties.cases;
        sortedCases.push((cases));
        totalCases += cases;
    })
    sortedCases = sortedCases.sort((a, b) => a - b);

    const ranges = [];
    let leastCount = sortedCases[0];
    leastCount -= Math.pow(10, parseInt(Math.log10(10, leastCount)) - 1).toPrecision(2);
    let maxCount = (sortedCases[sortedCases.length - 1]).toPrecision(2);
    let diff = ((maxCount - leastCount) / rangesLength).toPrecision(2);
    let from, to;

    for (let i = 0; i < rangesLength; i++) {
        from = parseFloat(leastCount) + (parseFloat(diff) * i) - 1;
        to = parseFloat(leastCount) + parseFloat(diff) * (i + 1);
        ranges.push([from, to]);
    }
    return { totalCases, ranges };
}

export { loadGeoData,loadStatsData };