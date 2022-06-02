<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex
        xs12
        :md8="mockComments && mockComments.length !== 0"
        :md12="!mockComments && mockComments.length === 0">
        <material-card
          :color="$store.state.app.color"
          title="Cikk létrehozása"
          text="--- cikk ---">
          <div class="pt-2 pb-2">
            <v-form
              ref="form"
              v-model="valid">
              <v-flex
                xs12
                sm6
                md4
                class="pl-0 pr-0">
                <v-select
                  v-model="selectedCategory"
                  :items="categories"
                  item-text="text"
                  item-value="id"
                  label="Kategória kiválasztása"
                  outlined
                  :rules="[v => !!v || 'A mező kitöltése kötelező!']"
                  required />
              </v-flex>
              <IMDB v-if="movie.category !== ''" :movie="movie" />
            </v-form>
            <v-form
              v-show="valid"
              ref="fromArticle"
              v-model="validArticle">
              <Default :article="article" />
              <!--<Season :movie="movie" />-->
              <TinyMCE
                id="content"
                type="content"
                height="500"
                :article="article"
                :movie="movie"
                :title="movie.title" />
              <Summary :category="selectedCategory" :summary="summary" />
              <MovieDetails :movie="movie" :category="selectedCategory" />
              <Rating :category="selectedCategory" :rating="rating" />
              <SearchEngine :movie="movie" />
              <Recommendation :movie="movie" />
              <v-btn @click="save()"> Mentés és beküldés ellenőrzésre </v-btn>
            </v-form>
            <core-preview v-if="article.title !== ''" :preview="movie" />
          </div>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md4
        v-if="mockComments && mockComments.length !== 0">
        <material-card
          :color="$store.state.app.color"
          title="Üzenetek"
          text="--- Észrevételek és hozzászólások ---">
          <div class="comment-container" v-for="mockComment in mockComments" v-bind:key="mockComment.comment">
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
                :color="$store.state.app.color"> {{ !showComment ? 'mdi-plus' : 'mdi-minus' }}
              </v-icon>
            </v-btn>
          </div>
        </material-card>
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

import IMDB from '@/components/Article/IMDB'
import Default from '@/components/Article/Default'
import TinyMCE from '@/components/Article/TinyMCE'
import Summary from '@/components/Article/Summary'
import MovieDetails from '@/components/Article/MovieDetails'
import Recommendation from '@/components/Article/Recommendation'
import Rating from '@/components/Article/Rating'
//import Season from '@/components/Article/series/Season'
import SearchEngine from '@/components/Article/SearchEngine'

export default {
  components: {
    IMDB,
    Default,
    TinyMCE,
    Summary,
    MovieDetails,
    Recommendation,
    Rating,
    //Season,
    SearchEngine,
  },
  data() {
    return {
      mockComments: [],
      showComment: false,
      comment: '',
      valid: false,
      validArticle: false,
      selectedCategory: '',
      article: {
        title: '',
        prologue: '',
        selectedCover: null,
        pictures: [],
      },
      summary: {
        good: '',
        bad: '',
        rating: '',
      },
      movie: {
        title: '',
        originalTitle: '',
        releaseDate: '',
        runtime: '',
        content: '',
        selectedRecommendations: [],
        category: '',
        selectedGenres: [],
        seasons: [],
        imdb: null,
      },
      rating: 0,
    }
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
        id: 'series',
      },
      {
        text: 'Rajzfilm',
        id: 'animation'
      },
      {
        text: 'Anime',
        id: 'anime',
      },
      {
        text: 'Videók',
        id: 'video',
      },
      ];
    },
  },
  watch: {
    movie: {
      handler(nv, ov) {
        console.log('PARENT movie object', nv);
        return nv;
      },
      deep: true
    },
    selectedCategory(nv, ov) {
      if (nv !== ov && ov) {
        this.movie = this.$data.movie;
      }
      this.movie.category = nv;
    },
  },
  methods: {
    kebabToSnake(str) {
      let string = '';
      for (let i = 0; i < str.length; i++) {
        string = string + str.charAt(i).replace(',', ', ')
      }
      return string;
    },
    makeId(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    addComment() {

      console.log('SEND COMMENT')
    },
    save() {
      const regex = new RegExp(/(data-image-count=")([1-9])(")/gm);
      let found = this.movie.content.match(regex);
      console.log('FOUND', found)
      let validFounds = [];
      found.forEach((element, index) => {
        validFounds.push(parseInt(element.replaceAll(/[a-z,\-"=]/gm, '')));
      });

      let validPictures = [];
      validFounds.forEach((validFound, index) => {
        this.article.pictures.forEach((picture, index) => {
          if (picture.filename === validFound) {
            validPictures.push(picture.file);
          }
        });
      });
      console.log('validPictures', validPictures)
      const formData = new FormData();
      for (let i = 0; i < validPictures.length; i++) {
        formData.append('file_' + i, validPictures[i], window.btoa(validPictures[i].name).toString() + this.makeId(5) + validPictures[i].name.match(/.(gif|jpg|jpeg|png|svg)/g)[0]);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
    }
  },
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
  },
};
</script>