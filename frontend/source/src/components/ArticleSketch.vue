<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <material-card
          :color="$store.state.app.color"
          title="Mentett cikkek listája"
          text="--- kattints a képre vagy az ikonra a folytatáshoz ---">
          <v-fade-transition mode="out-in">
            <v-row class="pt-2 pb-2">
              <v-col cols="4">
                <v-card>
                  <v-img
                    src="https://picsum.photos/350/165?random"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    @click="navigation(213412412, 'saved')">
                    <v-card-title> test </v-card-title>
                  </v-img>
                  <v-card-actions>
                    <v-btn icon @click="remove(213412412)">
                      <v-icon color="black">mdi-delete</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="navigation(213412412, 'saved')">
                      <v-icon :color="$store.state.app.color">mdi-pencil</v-icon>
                    </v-btn>
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
  name: 'ArticleSketchList',
  methods: {
    navigation(id, type) {
      console.log('---', id)
      this.$router.push({ path: `/dashboard/article-${type}`, query: { id: id }})
    },
    remove(id) {
      console.log('REMOVE', id)
    },
  },
};
</script>
