<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex s12>
        <material-card
          :color="$store.state.app.color"
          title="Cikkek ellenőrzése"
          text="--- Itt találod a publikált cikkjeid listáját. Lehetőséged van ezeket szerkeszteni ---">
          <v-fade-transition mode="out-in">
            <v-row class="pt-2 pb-2">
              <v-col cols="4">
                <v-card>
                  <v-img
                    lazy-src="https://picsum.photos/id/1/350/165.jpg?hmac=DPk4maGRveUvUIZsWEYBbqZXN0yFYN54eHK3jNRk3oc"
                    src="https://picsum.photos/id/1/350/165.jpg?hmac=DPk4maGRveUvUIZsWEYBbqZXN0yFYN54eHK3jNRk3oc"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px">
                    <v-card-title> test </v-card-title>
                  </v-img>
                  <v-card-actions>
                    <!--<v-btn icon>
                      <v-icon color="red">mdi-alert-circle</v-icon>
                    </v-btn>-->

                    <v-spacer />

                    <v-btn icon @click="navigation(213412412, 'edit')">
                      <v-icon :color="$store.state.app.color">mdi-pencil</v-icon>
                    </v-btn>
                    <!--<v-btn icon @click="navigation(213412412, 'edit')">
                      <v-icon :color="$store.state.app.color">mdi-pencil</v-icon>
                    </v-btn>-->
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'ArticleReviewList',
  methods: {
    navigation(id, type) {
      console.log('---', id)
      this.$router.push({ path: `/dashboard/article-${type}`, query: { id: id } });
    },
  },
  created() {
    // call endpoint
  },
};
</script>