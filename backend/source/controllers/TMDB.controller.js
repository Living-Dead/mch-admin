import axios from 'axios';

class TMDBController {
    getTMDBMovieDetails(body, res) {
        /*console.log('BODY', body)
        const data = JSON.parse(body);
        res.send({
            movie: {
                originalTitle: data.original_title || null,
                imdbId: data.imdb_id || null,
                tmdbId: data.id || null,
                releaseDate: data.release_date || null,
                runtime: data.runtime || null,
                poster: data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : null,
            },
        });*/
        res.end(body);
    }

    getTMDBMovieCast(req, res) {
        console.log('req.params.', req.params)
        axios.get(`https://api.themoviedb.org/3/${req.params.movieType}/${req.params.tmdbMovieId}/credits?api_key=f4e6009df6f9b64f5063de615df82bf9&language=en-US`)
        .then(response => {
            res.send({
                success: true,
                tmdbMovieCast: response.data,
            });
        })
        .catch(error => {
            res.send({
                success: false,
                message: error.data,
            });
        })
    }

    getTMDBMovieExternalId(req, res) {
        console.log('req.params. external', req.params)
        axios.get(`https://api.themoviedb.org/3/tv/${req.params.tmdbMovieId}/external_ids?api_key=f4e6009df6f9b64f5063de615df82bf9&language=en-US`)
        .then(response => {
            res.send({
                success: true,
                tmdbMovieExternalId: response.data.imdb_id,
            });
        })
        .catch(error => {
            res.send({
                success: false,
                message: error.data,
            });
        })
    }

    showtimes(req, res) {
        axios.get('https://mozipremierek.hu/api/showtimes/20220110/3779')
        .then(response => {
            console.log(response);
            res.send(response.data);
        })
        .catch(error => {
            res.send({
                success: false,
                message: error.data,
            });
        })
    }
}

module.exports = new TMDBController();