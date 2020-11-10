/* eslint-disable indent */
function mungeLocation(location) {

    return {
        formatted_query: location[0].display_name,
        latitude: location[0].lat,
        longitude: location[0].lon
    }
}

function mungeWeather(weatherObj) {

    let returnArray = weatherObj.data.map(weather => {
        return {
            forecast: weather.weather.description,
            time: weather.datetime
        }

    });


    return returnArray;
}

function mungeReviews(reviewObj) {
    let returnArray = [];

    for (let i = 0; i < 20; i++) {
        returnArray.push({
            name: reviewObj[i].name,
            image_url: reviewObj[i].image_url,
            price: reviewObj[i].price,
            rating: reviewObj[i].rating,
            url: reviewObj[i].url
        });
    }
    console.log(returnArray);
    return returnArray;
}

module.exports = {
    mungeLocation,
    mungeWeather,
    mungeReviews
}