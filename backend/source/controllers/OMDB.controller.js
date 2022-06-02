import axios from 'axios';

class OMDBController {
    getOMDB(req, res) {
        axios.get(`http://www.omdbapi.com/?apikey=13b6a95b&i=${req.params.id}`)
        .then(response => {
            res.send({
                success: true,
                omdb: {
                    runtime: parseInt(response.data.Runtime),
                    genres: response.data.Genre.split(', '),
                    director: response.data.Director,
                    actors: response.data.Actors,
                    writer: response.data.Writer,
                    year: response.data.Year,
                    imdbId: response.data.imdbID,
                    poster: response.data.Poster,
                }
            });
        })
        .catch(error => {
            res.send({
                success: false,
                message: error.data,
            });
        })
    }
}

module.exports = new OMDBController();