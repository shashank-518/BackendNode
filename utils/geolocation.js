const axios = require('axios')
const API_KEY = '9726707b8fda4a1ea72edd492abda989';

async function getgeolocation(address){


    try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
            params: {
                text: address,
                apiKey: API_KEY
            }
        });

        return {
            lat : response.data.features[0].properties.lat,
            long : response.data.features[0].properties.lon
        }
    } catch (error) {
        console.error('Error fetching geolocation:', error.message);
    }

}


module.exports = getgeolocation;
