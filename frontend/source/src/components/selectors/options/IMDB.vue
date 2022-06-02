<template>
  <v-flex
    v-if="movie.category !== 'news' && movie.category !== 'video'"
    class="pl-0 pr-0"
    xs12
    sm6
    md4>
    <v-text-field
      v-model="imdb"
      :rules="rules"
      label="IMDB azonosító (pl.: tt1234567)"
      outlined />
  </v-flex>
</template>

<script>

export default {
  name: 'IMDB',
  props: {
    movie: Object,
  },
  data: () => ({
    imdb: '',
    type: '',
    categoriesName: {
      movie: 'film',
      series: 'sorozat',
      animation: 'rajzfilm',
    },
    regularExpression: new RegExp(/^tt[\d]{8}$/),
  }),
  computed: {
    rules() {
      const rules = []
      const failGenre = []

      if (!this.imdb) {
        const rule = !!this.imdb ||
        'A mező kitöltése kötelező!'

        rules.push(rule)
      }

      if (this.regularExpression.exec(this.imdb) || this.imdb.length !== 9) {
        const rule = 'Az IMDB azonosító nem megfelelő! (pl.: tt1234567)'

        rules.push(rule)
      }

      if (this.movie.selectedGenres && this.movie.selectedGenres.some(element => element.text === 'Animation')) {
        console.log('ANIMACIO')
        failGenre.push('rajzfilm ')
      }

      if (this.type && this.movie.category === 'animation') {
        if (failGenre.length === 0) {
          const rule = `A kategória (${this.categoriesName[this.movie.category]}), de a megadott IMDB azonosító szerint ez nem (rajzfilm)`
          rules.push(rule)
        }
      }

      if (this.type && (this.movie.category === 'movie' || this.movie.category === 'series')) {
        console.log('failGenre', failGenre)
        const rule = (this.type === this.movie.category && failGenre.length === 0) ||
        `A kiválasztott film vagy a megadott IMDB azonosító nem a kategóriának megfelelő. A megadott kategória (${this.categoriesName[this.movie.category]}) és az azonosítás alapján a megadott azonosító egy (${failGenre}${this.categoriesName[this.type]})!`

        rules.push(rule)
      }

      return rules
    },
    omdb() {
      return this.$store.state.movieDetails.imdb || {};
    },
    tmdb() {
      return this.$store.state.movieDetails.tmdb || {};
    },
    tmdbDetails() {
      return this.$store.state.movieDetails.tmdbDetails || {};
    },
    genres() {
      return [{
          id: 10,
          text: 'Horror',
        },
        {
          id: 20,
          text: 'Drama',
        },
        {
          id: 30,
          text: 'Action',
        },
        {
          id: 40,
          text: 'Thriller',
        },
        {
          id: 50,
          text: 'Crime',
        },
        {
          id: 60,
          text: 'Mystery',
        },
        {
          id: 70,
          text: 'Fantasy',
        },
        {
          id: 80,
          text: 'Comedy',
        },
        {
          id: 90,
          text: 'Animation',
        },
        {
          id: 100,
          text: 'Documentary',
        },
        {
          id: 110,
          text: 'Western',
        },
        {
          id: 120,
          text: 'War',
        },
        {
          id: 130,
          text: 'Romance',
        },
        {
          id: 140,
          text: 'Sci-Fi',
        },
        {
          id: 150,
          text: 'Adventure',
        },
      ];
    },
  },
  watch: {
    imdb(nv, ov) {
      this.movie.selectedGenres = [];
      if (nv.length === 9 && nv.charAt(0) === 't' && nv !== ov) {
        this.$store.dispatch('imdb', nv);
        this.movie.imdb = nv;
      } else {
        console.log('nem megfelelo imdb id')
      }
      return nv;
    },
    rules(nv) {
      if (typeof nv[0] === 'string') {
        this.$set(this.movie, 'imdb', null);
      } else {
        this.$set(this.movie, 'imdb', this.imdb);
      }
    },
    omdb(nv) {
      this.movie.runtime = nv.runtime;
      this.movie.year = nv.year;
      this.type = nv.type;

      nv.genres.forEach((omdb, index) => {
        this.movie.selectedGenres.push(
          this.genres.find((element, index) => {
            return element.text === omdb;
          })
        );
      });

      if (nv.type !== 'movie') {
        this.movie.seasons = nv.seasons;
      }

      this.$store.dispatch('tmdb', {
        imdb: this.imdb,
      });
    },
    tmdb(nv) {
      this.movie.tmdbId = nv.tmdbId;
      this.movie.title = nv.title;
      this.movie.originalTitle = nv.originalTitle;
      this.$store.dispatch('tmdbDetails', nv.tmdbId);
    },
    tmdbDetails(nv) {
      this.movie.productionCountries = nv.productionCountries.join(', ');
    },
  },
};
</script>