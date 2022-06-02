<template>
  <div
    style="width: 100%; display: inline-block;"
    class="movie-search">
    <v-menu
      v-model="openMenu"
      content-class="movie-selector"
      allow-overflow
      max-height="350px"
      max-width="350px"
      bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            ref="search"
            v-model="movieSearch"
            :loading="isLoading"
            placeholder="Film kereső"
            outlined
            background-color="white"
            autocomplete="off"
            hide-details />
          <!--<v-icon
            :color="$store.state.app.color"
            class="search-icon"
            v-bind="attrs"
            v-on="on"> mdi-magnify
          </v-icon>-->
      </template>
      <v-list-item
        v-for="(item, index) in movies"
        :key="index"
        @click="selected(item)">
        <v-list-item-avatar>
          <img :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="category === 'movie' ? item.title : item.name" />
          <v-list-item-subtitle v-text="category === 'movie' ? item.original_title : item.original_name" />
          <v-list-item-subtitle v-text="item.release_date" />
        </v-list-item-content>
      </v-list-item>
    </v-menu>
  </div>
</template>

<style lang='scss'>

  .movie-selector {
    top: 360px !important;
    background-color: white !important;
  }

  .movie-search {

    .search-icon {
      position: absolute !important;
      top: 14px !important;
      right: -40px !important;
    }
  }
</style>

<script>

export default {
  name: 'MovieSearch',
  props: {
    type: String,
    category: String,
  },
  data: () => ({
    isLoading: false,
    movieSearch: '',
    movies: [],
    openMenu: false,
  }),
  computed: {
    tmdb() {
      return this.$store.state.movies.tmdbDetails;
    },
  },
  watch: {
    movieSearch(nv) {
      if (nv && nv.length > 6) {
        this.isLoading = true;
        fetch(`https://api.themoviedb.org/3/search/${this.category}?api_key=f4e6009df6f9b64f5063de615df82bf9&language=hu-HU&page=1&include_adult=false&query=${nv}`)
          .then(res => res.clone().json())
          .then(res => {
            console.log('res', res);
            this.openMenu = true;
            this.movies = res.results;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    },
  },
  methods: {
    selected(data) {
      console.log('DATA item', data);
      this.$store.dispatch('tmdbDetails', {
        tmdbId: data.id,
        category: this.category,
        title: this.category === 'movie' ? data.title : data.name,
      });
    },
  },
};
</script>