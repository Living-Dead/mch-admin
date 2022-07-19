<template>
  <v-flex
    xs12
    md10
    class="pl-0 pr-0">
    <v-select
      :rules="[v => !!v || 'A mező kitöltése kötelező!']"
      v-model="$store.state.movies.rating"
      :items="rates"
      label="Pontozás"
      outlined
      hide-details />
  </v-flex>
</template>

<script>

export default {
  name: 'Season',
  data: () => ({
    rates: [],
    rating: null,
  }),
  mounted() {
    for (var i = 1; i <= this.$store.state.movies.seasonsOfNumber; i++) {
      this.rates.push(i)
    }
  },
  /*watch: {
    rating(nv) {
      this.$store.dispatch('addRating', nv);
    },
  },*/
};
</script>