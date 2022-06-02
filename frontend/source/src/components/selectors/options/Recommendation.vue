<template>
  <v-layout wrap>
    <v-flex xs10 md6 class="pl-3 pr-0">
      <v-autocomplete
        v-model="recommendation.selected"
        :items="numbers"
        label="Cikk ajánló"
        counter="2"
        multiple
        chips
        deletable-chips
        outlined
        :counter-value="recommendationSelected()"
        height="46px">
      </v-autocomplete>
    </v-flex>
    <v-flex
      class="tooltip-wrapper tooltip-wrapper--recommendation pr-0"
      xs2
      md4>
      <v-tooltip
        right
        color="mchhh-primary"
        content-class="white--text">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"> mdi-information
          </v-icon>
        </template>
        <span> Csak kettőt tudsz kiválasztani. Érdemes követni azt a logikát, hogyha egy film több részes és íródott róla cikk ezek közül megadni kettőt. Például: ha ez a Jurassic Park 2, akkor megadod, hogy Jurassic Park 1 és 3 </span>
      </v-tooltip>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Recommendation',
  props: {
    recommendation: Object,
  },
  data: () => ({
    numbers: ['elso cikk', 'masodik cikk', 'harmadik cikk'],
  }),
  methods: {
    recommendationSelected() {
      if (this.recommendation.selected.length > 2) {
        this.recommendation.selected.splice(0, 1);
      }
    },
  },
};
</script>