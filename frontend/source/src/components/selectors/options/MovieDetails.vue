<template>
  <v-layout
    class="pt-3 pb-3"
    wrap>
    <v-flex
      xs12
      sm8
      md8
      v-for="(item, index) in Object.keys($store.state.movies.details)"
      v-bind:key="index">
      <v-text-field
        :style="item === 'poster' ? { 'float': 'left', 'width' : '80%' } : {}"
        v-model="$store.state.movies.details[item]"
        :label="labels[item]"
        outlined
        :suffix="item === 'runtime' ? 'perc' : ''"
        :rules="[v => !!v || 'A mező kitöltése kötelező!']"
        :disabled="!!$store.state.movies.details[item]"
        hide-details />
        <img style="float: right;" v-if="item === 'poster'" width="56px" height="56px" :src="$store.state.movies.details[item]" />
    </v-flex>
    <v-flex
      xs12
      sm8
      md8>
      <v-autocomplete
        ref="genres"
        label="Műfaj"
        :items="genres"
        v-model="$store.state.movies.details.selecteGenres"
        small-chips
        outlined
        :rules="[v => !!v || 'A mező kitöltése kötelező!']"
        required
        hide-details="auto"
        multiple
        item-text="name"
        item-value="id">
      </v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'MovieDetails',
  watch: {
    movieDetails: {
      handler(nv) {
        console.log('NVNVNV', nv)
      },
      deep: true,
    },
  },
  data: () => ({
    labels: {
      originalTitle: 'A film eredeti címe',
      imdbId: 'IMDB id',
      runtime: 'Játékidő',
      releaseDate: 'Megjelenés',
      director: 'Rendező',
      seasonsOfNumber: 'Évad',
      title: 'Cím',
      cast: 'Szereplők',
    },
  }),
  computed: {
    genres() {
      return this.$store.getters.genres;
    },
  },
  /*methods: {
    urlToBlob() {
      fetch(this.$store.state.movies.details.poster)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        // Here's where you get access to the blob
        // And you can use it for whatever you want
        // Like calling ref().put(blob)

        // Here, I use it to make an image appear on the page
        let objectURL = URL.createObjectURL(blob);
        let myImage = new Image();
        myImage.src = objectURL;
        console.log('IMG', myImage.src)

        var formData = new FormData();
    formData.append("file", formData);
    formData.append(name, value, filename);
    });
    },
  },*/
  /*
  watch: {
    movie: {
      handler() {
        this.showEmptyItems = true;
      },
      deep: true,
    },
    details: {
      handler(nv) {
        Object.keys(nv).forEach((item, index) => {
          const data = item === 'director' ? new Array(nv[item]) : nv[item];
          this.$set(this.movie, item, data);
        });
      },
      deep: true,
    },
    movie: {
      handler(nv) {
        if (nv && (!nv.cast || nv.cast.length === 0)) {
          this.showAddCast = true;
        }
      },
      deep: true,
    },
    cast: {
      handler(nv) {
        console.log('cast', nv)
        this.$set(this.movie, 'cast', nv);
      },
      deep: true,
    },
  },
  methods: {
    addCharacter(name, character) {
      this.cast.push({
        name,
        character,
      });
      this.$refs.castName.reset();
      this.$refs.castCharacter.reset();
    },
    removeCharacter(index) {
      this.$delete(this.cast, index);
    },
  },*/
};
</script>