/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import { blog } from './modules/blog.module.js'
import { movies } from './modules/movies.module.js'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  modules: {
    blog,
    movies,
  },
})

export default store
