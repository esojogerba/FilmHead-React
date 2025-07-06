// Constant variables.
const API_KEY = import.meta.env.VITE_API_KEY;
const imageBaseURL = "http://image.tmdb.org/t/p/";

// Fetches data from API using a url.
// Passes the results in JSON format into a callback function,
// along with an optional parameter if applicable.
const fetchDataFromAPI = async (url, callback, options = {}) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        callback(data, options);
    } catch (error) {
        console.error("API fetch error:", error);
    }
};

// Export functionalities and constant variables.
export { imageBaseURL, API_KEY, fetchDataFromAPI };
