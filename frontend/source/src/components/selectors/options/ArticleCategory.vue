<template>
  <v-select
    v-model="$store.state.blog.category"
    :items="categories"
    item-text="text"
    item-value="id"
    label="Kategória kiválasztása"
    outlined
    :rules="[v => !!v || 'A mező kitöltése kötelező!']"
    required
    hide-details />
</template>

<script>
  export default {
    name: 'Default',
    props: {
      article: Object,
      images: Object,
    },
    computed: {
      categories() {
        return [{
          text: 'Hír',
          id: 'news',
        },
        {
          text: 'Film',
          id: 'movie',
        },
        {
          text: 'Sorozat',
          id: 'tv',
        },
        {
          text: 'Videók',
          id: 'video',
        },
        {
          text: 'Vélemény/gondolat',
          id: 'opinion',
        }];
      },
    }
  }
</script>