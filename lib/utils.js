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
        };
    });


    return returnArray.slice(0, 9);
}

function mungeReviews(reviewObj) {
    let returnArray = reviewObj.map(review => {
        return {
            name: review.name,
            image_url: review.image_url,
            price: review.price,
            rating: review.rating,
            url: review.url
        };
    })
    return returnArray.slice(0, 20);
}

function mungeTrails(trailObj) {
    const returnArray = trailObj.trails.map(trail => {
        return {
            name: trail.name,
            location: trail.location,
            length: trail.length,
            stars: trail.stars,
            star_votes: trail.starVotes,
            summary: trail.summary,
            trail_url: trail.url,
            conditions: trail.conditionStatus,
            condition_date: trail.conditionDetails,
            condition_time: trail.conditionDate,
        };
    });

    return returnArray.slice(0, 11);
}

module.exports = {
    mungeLocation,
    mungeWeather,
    mungeReviews,
    mungeTrails
}