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
  name: 'Summary',
  data: () => ({
    rates: [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10,
    ],
    rating: null,
  }),
  /*watch: {
    rating(nv) {
      this.$store.dispatch('addRating', nv);
    },
  },*/
};
</script>