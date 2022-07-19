import ApiService from '@/services/api.service.js'
import genres from './configs/genres.js'

const state = {
  imdb: {},
  tmdbDetails: {},
  imdbId: '',
  details: {
    title: null,
    originalTitle: null,
    imdbId: null,
    tmdbId: null,
    releaseDate: null,
    runtime: null,
    poster: null,
    genres: [],
  },
  rating: null,
  isSelected: false,
  genres: [],
};

const actions = {
  tmdbDetails({ commit, state, dispatch }, data) {
    const { tmdbId, category, title } = data;
    state.isSelected = false;
    ApiService.get(
      'TMDB_DETAILS',
      `${category}/${tmdbId}`,
      {
        query: {
          type: 'details',
        }
      })
      .then(async (response) => {
        console.log('responseresponse', response.data)
        response.data.title = title;
        state.isSelected = true;
        if (category === 'movie') commit('TMDB_DETAILS', response.data);
        if (category === 'tv') {
          const imdbId = await dispatch('tmdbExternalId', tmdbId)
          commit('TMDB_SERIES_DETAILS', {
            details: response.data,
            imdb_id: imdbId,
          });
        }
      })
      .catch(error => {
        state.isSelected = false;
        console.log('TMDB  MODULES ERROR:', error);
      })
  },
  tmdbExternalId({ commit }, tmdbId) {
    return new Promise((resolve, reject) => {
      ApiService.get('TMDB_EXTERNAL_ID', tmdbId)
        .then((response) => {
          commit('TMDB_EXTERNAL_ID');
          resolve(response.data.tmdbMovieExternalId);
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  resetMovieDetails({ commit }) {
    commit('RESET_MOVIE_DETAILS');
  },
};

const mutations = {
  IMDB(state, data) {
    state.imdb = data;
  },
  TMDB(state, data) {
    state.tmdb = data;
  },
  TMDB_DETAILS(state, data) {
    Object.assign(state.details, {
      title: data.title,
      originalTitle: data.original_title,
      imdbId: data.imdb_id,
      tmdbId: data.id,
      releaseDate: data.release_date,
      runtime: data.runtime,
      poster: data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : null,
      genres: data.genres,
      seasonsOfNumber: null,
    });
    state.genres = genres;
  },
  TMDB_SERIES_DETAILS(state, data) {
    Object.assign(state.details, {
      title: data.details.title,
      originalTitle: data.details.original_name,
      imdbId: data.imdb_id,
      tmdbId: data.details.id,
      releaseDate: data.details.first_air_date,
      runtime: null,
      poster: data.details.poster_path ? `https://image.tmdb.org/t/p/w500/${data.details.poster_path}` : null,
      genres: data.details.genres,
      seasonsOfNumber: data.details.number_of_seasons,
    });
    state.seasonsOfNumber = data.details.number_of_seasons;
    state.genres = genres;
    console.log(data);
  },
  TMDB_CAST(state, data) {
    state.cast = data.cast;
  },
  TMDB_EXTERNAL_ID(state, data) {
    state.imdbId = data;
  },
  RESET_MOVIE_DETAILS(state) {
    state.details = {
      title: null,
      originalTitle: null,
      imdbId: null,
      tmdbId: null,
      releaseDate: null,
      runtime: null,
      poster: null,
      genres: [],
    };
  },
};

export const movies = {
  state,
  actions,
  mutations,
  //getters,
};