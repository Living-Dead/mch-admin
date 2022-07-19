<template>
  <div>
    <v-layout
      class="pa-0"
      wrap
      v-for="(data, index) in Object.keys($store.state.movies.details)"
      v-bind:key="index">
      <v-flex
        xs12
        sm8
        md8
        v-if="$store.state.movies.details[data] && data !== 'genres'">
        <v-text-field
          :style="data === 'poster' ? { 'float': 'left', 'width' : '80%' } : {}"
          v-model="$store.state.movies.details[data]"
          :label="labels[data]"
          outlined
          :suffix="data === 'runtime' ? 'perc' : ''"
          :rules="[v => !!v || 'A mező kitöltése kötelező!']"
          :disabled="!!$store.state.movies.details[data]"
          hide-details />
          <img style="float: right;"
            v-if="data === 'poster'"
            width="56px"
            height="56px"
            :src="$store.state.movies.details[data]" />
      </v-flex>
      <v-flex
        xs12
        sm8
        md8
        v-if="$store.state.movies.details[data] && data === 'genres'">
        <v-select
          v-model="$store.state.movies.details.genres"
          :items="genres"
          label="Select Item"
          item-text="name"
          item-value="id"
          multiple
          outlined>
          <template v-slot:selection="{ item }">
            <v-chip>
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <!--<v-flex
        xs12
        sm8
        md8>
        <v-select
          v-model="$store.state.movies.details.genres"
          :items="genres"
          label="Select Item"
          item-text="name"
          item-value="id"
          multiple
          outlined>
          <template v-slot:selection="{ item, index }">
            <v-chip>
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-flex>-->
    </v-layout>
  </div>
</template>

<script>

export default {
  name: 'MovieDetails',
  data: () => ({
    labels: {
      originalTitle: 'A film eredeti címe',
      imdbId: 'IMDB ID',
      tmdbId: 'TMDB ID',
      runtime: 'Játékidő',
      releaseDate: 'Megjelenés',
      seasonsOfNumber: 'Évad',
      title: 'Cím',
      poster: 'Poster'
    },
  }),
  computed: {
    genres() {
      return [
        {"id":28,"name":"Action"},
        {"id":12,"name":"Adventure"},
        {"id":16,"name":"Animation"},
        {"id":35,"name":"Comedy"},
        {"id":80,"name":"Crime"},
        {"id":99,"name":"Documentary"},
        {"id":18,"name":"Drama"},
        {"id":10751,"name":"Family"},
        {"id":14,"name":"Fantasy"},
        {"id":36,"name":"History"},
        {"id":27,"name":"Horror"},
        {"id":10402,"name":"Music"},
        {"id":9648,"name":"Mystery"},
        {"id":10749,"name":"Romance"},
        {"id":878,"name":"Science Fiction"},
        {"id":10770,"name":"TV Movie"},
        {"id":53,"name":"Thriller"},
        {"id":10752,"name":"War"},
        {"id":37,"name":"Western"},
        {"id":10759,"name":"Action & Adventure"},
        {"id":10751,"name":"Family"},
        {"id":10763,"name":"News"},
        {"id":10764,"name":"Reality"},
        {"id":10765,"name":"Sci-Fi & Fantasy"},
        {"id":10766,"name":"Soap"},
        {"id":10767,"name":"Talk"},
        {"id":10768,"name":"War & Politics"},
      ];
    },
  },
};
</script>