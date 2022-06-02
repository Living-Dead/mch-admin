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
    cast: null,
  },
  rating: null,
  isSelected: false,
  genres: [],
  selecteGenres: [],
};

const actions = {
  imdb({ commit }, imdb) {
    ApiService.get('OMDB', imdb)
      .then(response => {
        commit('IMDB', response.data.omdb);
      })
      .catch(error => {
        console.log('OMDB  MODULES ERROR:', error)
      })
  },
  tmdbDetails({ commit, state }, data) {
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
      .then((response) => {
        console.log('responseresponse', response.data)
        response.data.title = title;
        state.isSelected = true;
        commit('TMDB_DETAILS', response.data);
      })
      .catch(error => {
        state.isSelected = false;
        console.log('OMDB  MODULES ERROR:', error)
      })
  },
  tmdbExternalId({ commit }, tmdbId) {
    return new Promise((resolve, reject) => {
      ApiService.get('TMDB_EXTERNAL_ID', tmdbId)
        .then((response) => {
          console.log('tmdbMovieExternalId', response.data);
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


  /*showtimes({ commit }, tmdbId) {
    return new Promise((resolve, reject) => {
      ApiService.get('SHOWTIMES')
        .then((response) => {
          console.log('SHOWTIMES', response.data);
          commit('SHOWTIMES');
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
   })
  },*/
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
      imdbId: data.imdb_id || null,
      tmdbId: data.id,
      releaseDate: data.release_date,
      runtime: data.runtime,
      poster: data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : null,
    });
    state.genres = genres;
  },
  TMDB_CAST(state, data) {
    state.cast = data.cast;
  },
  TMDB_EXTERNAL_ID(state, data) {
    state.imdbId = data;
  },
  RESET_MOVIE_DETAILS(state) {
    state.imdb = {};
    state.tmdbDetails = {};
  },
};

const getters = {
  genres: state => state.genres,
};

export const movies = {
  state,
  actions,
  mutations,
  getters,
};