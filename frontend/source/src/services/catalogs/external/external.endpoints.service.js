export default {
  ENDPOINTS(key, value) {
    return {
      OMDB: `/api/omdb/${key}`,
      PREMIERS: `/premiers`,
      TMDB_EXTERNAL_SOURCE: `https://api.themoviedb.org/3/find/${key}?api_key=f4e6009df6f9b64f5063de615df82bf9&language=hu-HU&external_source=imdb_id`,
      // TMDB_MOVIE_PROVIDERS: `https://api.themoviedb.org/3/${value}/${key}/watch/providers?api_key=f4e6009df6f9b64f5063de615df82bf9`,
      TMDB_DETAILS: `/api/tmdb/${key}`,
      TMDB_EXTERNAL_ID: `/api/tmdb-external-id/${key}`,
      TMDB_CAST: `/api/tmdb-cast/${key}`,
      SHOWTIMES: `/api/showtimes`,
    }
  }
}