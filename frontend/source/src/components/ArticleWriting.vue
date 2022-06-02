<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <BaseMaterialCard
          color="primary"
          title="Cikk létrehozása">
          <div class="pt-2 pb-2">
            <v-form
              ref="form"
              v-model="valid">
              <v-flex
                xs12
                sm6
                md4
                class="pl-0 pr-0">
                <ArticleCategory />
              </v-flex>
              <v-flex
                xs12
                sm6
                class="pl-0 pr-0"
                v-if="isValidTvOrMovieCategory">
                <MovieSearch :category="$store.state.blog.category" />
              </v-flex>
              <div v-if="showNextStep || $store.state.movies.isSelected">
                <ArticleDefault />
                <!--<Season :movie="movie" />-->
                <v-layout wrap>
                  <v-flex
                    class="pl-3 pr-3"
                    xs12
                    sm10
                    md10>
                    <TinyMCE
                      id="content"
                      type="content"
                      height="500"
                      :images="images">
                    </TinyMCE>
                  </v-flex>
                </v-layout>
                <UploadImage />
                <MovieDetails v-if="isValidTvOrMovieCategory" />
                <Rating v-if="$store.state.blog.category !== 'news'" />
              </div>
              <SearchEngine v-if="$store.state.blog.category" />
              <v-btn
                v-if="$store.state.blog.category"
                :disabled="!valid"
                color="mchhh-primary"
                @click="send()"> Beküldöm ellenőrzésre
              </v-btn>
            </v-form>
          </div>
        </BaseMaterialCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import ArticleCategory from '@/components/selectors/options/ArticleCategory'
import MovieSearch from '@/components/selectors/options/MovieSearch'
import ArticleDefault from '@/components/selectors/options/ArticleDefault'
import TinyMCE from '@/components/selectors/options/TinyMCE'
import MovieDetails from '@/components/selectors/options/MovieDetails'
//import Recommendation from '@/components/selectors/options/Recommendation'
import Rating from '@/components/selectors/options/Rating'
import SearchEngine from '@/components/selectors/options/SearchEngine'
import UploadImage from '@/components/selectors/options/UploadImage'

export default {
  components: {
    ArticleCategory,
    ArticleDefault,
    MovieSearch,
    TinyMCE,
    MovieDetails,
    //Recommendation,
    Rating,
    SearchEngine,
    UploadImage,
  },
  data() {
    return {
      valid: false,
      validArticle: false,
      selectedCategory: '',
      recommendation: {
        selected: [],
      },
      movie: {},
      images: {
        pictures: [],
      },
      showNextStep: false,
      showtimes: null,
    }
  },
  computed: {
    //rating() {
      //return this.$store.state.rating.value;
    //},
    details() {
      return this.$store.getters.details;
    },
    isValidTvOrMovieCategory() {
      return this.$store.state.blog.category
        && this.$store.state.blog.category === 'movie'
        || this.$store.state.blog.category === 'tv';
    },
  },
  watch: {
    '$store.state.blog.category'(nv) {
      console.log('category', nv)
      if (nv !== 'movie' && nv !== 'tv') {
        this.showNextStep = true;
      } else {
        this.showNextStep = false;
      }
    },
    rating(nv) {
      console.log('TEST RATING', nv)
    },
  },
  methods: {
    send() {
      //this.$store.dispatch('createBlog', blogObject);
    },
  },
};
</script>