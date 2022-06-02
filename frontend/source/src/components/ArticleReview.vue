<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout wrap>
      <v-flex
        xs12
        md8
        lg8>
        <BaseMaterialCard
          color="primary"
          title="Cikk ellenőrzése"
          text="--- cikk ---">
          <div class="pt-2 pb-2">
            <div>
              <span> cikk test </span>
            </div>
            <core-preview v-if="article.title !== ''" :preview="movie" />
          </div>
        </BaseMaterialCard>
      </v-flex>
      <v-flex
        xs12
        md4
        lg4>
        <BaseMaterialCard
          color="blue"
          title="Review"
          text="--- Észrevételek és hozzászólások ---">
          <div
            class="comment-container"
            v-for="mockComment in mockComments"
            v-bind:key="mockComment.comment">
            <v-layout wrap>
              <v-flex xs6 class="text-left">
                <span style="font-size: .7rem; font-weight: bold;" v-html="mockComment.reviewer"></span>
              </v-flex>
              <v-flex xs6 class="text-right">
                <span style="font-size: .7rem" v-html="mockComment.createdAt"></span>
              </v-flex>
            </v-layout>
            <p stle="font-size: 1rem" v-html="mockComment.comment"></p>
          </div>
          <div class="text-center pt-10">
            <v-textarea
              v-model="comment"
              v-if="showComment"
              label="Comment"
              outlined
              no-resize>
            </v-textarea>
            <v-btn icon @click="addComment(showComment = !showComment)">
              <v-icon
                color="green"> {{ !showComment ? 'mdi-plus' : 'mdi-minus' }}
              </v-icon>
            </v-btn>
          </div>
        </BaseMaterialCard>
      </v-flex>
    </v-layout>
    <core-reviewer />
  </v-container>
</template>

<style lang='scss'>
  .v-label {
    color: #aaa !important;
    font-size: 14px !important;
    font-weight: 400 !important;
  }

  .comment-container {
    padding-top: 12px;
    padding-bottom: 4px;
    border-bottom: 1px solid #1C9DD9;
  }

</style>

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
    //IMDB,
    //Default,
    TinyMCE,
    //Summary,
    MovieDetails,
    //Recommendation,
    Rating,
    //Season,
    SearchEngine,
  },
  data() {
    return {
      mockComments: [],
      showComment: false,
      comment: '',
      movie: {},
      article: {},
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.selectedCategory = 'news';
    this.mockComments = [
      {
        createdAt: '2021.04.09',
        reviewer: 'Nev 1',
        comment: 'test',
      },
      {
        createdAt: '2021.04.08',
        reviewer: 'Nev 2',
        comment: 'test2',
      },
    ];
    this.movie = {};
  },
  created() {
    // call endpoint
    console.log('this.$router', this.$route)
  },
};
</script>