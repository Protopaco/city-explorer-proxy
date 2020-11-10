/* eslint-disable indent */
function mungeLocation(location) {

    return {
        formatted_query: location[0].display_name,
        latitude: location[0].lat,
        longitude: location[0].lon
    }
}

function mungeWeather(weatherObj) {
    console.log(weatherObj.data);
    let returnArray = weatherObj.data.map(weather => {
        return {
            forecast: weather.weather.description,
            time: weather.datetime
        }

    });


    return returnArray;
}

module.exports = {
    mungeLocation,
    mungeWeather
}