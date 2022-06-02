<template>
  <v-layout wrap>
    <v-flex xs12>
      <div class="pt-2 pb-2">
        <v-flex
          xs12
          sm3
          md3
          class="pl-0 pr-0">
          <v-radio-group
            column
            v-model="selectedType">
            <v-radio
              v-for="(type, index) in types"
              :key="index"
              :label="type.label"
              :value="type.value">
            </v-radio>
          </v-radio-group>
          <v-radio-group
            column
            class="mt-1 pl-3"
            v-if="selectedType === 'cartoon'">
            <v-radio
              v-for="(cartoonType, index) in cartoonTypes"
              :key="index"
              :label="cartoonType"
              :value="cartoonType">
            </v-radio>
          </v-radio-group>
          <Youtube
            v-if="selectedType === 'youtube'"
            :selected-channel="selectedChannel">
          </Youtube>
          <Twitch
            v-if="selectedType === 'twitch'"
            :selected-channel="selectedChannel">
          </Twitch>
        </v-flex>
        <v-flex
          xs12
          sm6
          md6
          class="pl-0 pr-0">
          <MovieSearch
            class="pt-3 pb-3"
            v-if="selectedType === 'movie' || selectedType === 'tv'"
            :category="selectedType">
          </MovieSearch>
        </v-flex>

        <v-flex
          xs12
          class="pa-0"
          v-if="selectedType">
          <TinyMCE
            id="content"
            type="content"
            height="500">
          </TinyMCE>
        </v-flex>
        <v-flex
          xs6
          class="pl-0 pr-0 text-center">
          <v-btn
            v-if="selectedType"
            :disabled="isValidChannel(selectedType) || !channelDescription"
            width="100%"
            class="mx-0 font-weight-light"
            color="mchhh-primary"
            @click="save()"> Mentés
          </v-btn>
        </v-flex>
      </div>
    </v-flex>
  </v-layout>
</template>

<style lang='scss'>

  .v-input--radio-group__input {
    width: 100%;
    display: inline-block !important;
  }

  .yt-channel-search-icon {
    position: absolute !important;
    top: 14px !important;
    right: -40px !important;
  }

  .v-menu__content {
    background-color: white !important;
  }

</style>

<script>

import Youtube from '@/components/recommenders/options/Youtube'
import Twitch from '@/components/recommenders/options/Twitch'
import MovieSearch from '@/components/selectors/options/MovieSearch'
import TinyMCE from '@/components/selectors/options/TinyMCE'

export default {
  name: 'VideoAdd',
  components: {
    Youtube,
    Twitch,
    MovieSearch,
    TinyMCE,
  },
  data: () => ({
    selectedType: null,
    types: [
      {
        label: 'Youtube channel',
        value:'youtube',
      },
      {
        label: 'Twitch channel',
        value:'twitch',
      },
      {
        label: 'Film',
        value:'movie',
      },
      {
        label: 'Sorozat',
        value:'tv',
      },
      {
        label: 'Rajzfilm',
        value:'cartoon',
      }
    ],
    cartoonTypes: [
      'cartoon-movie',
      'cartoon-series'
    ],
    channelDescription: null,
    selectedChannel: {
      youtube: {},
      twitch: {},
    },
    showPreview: false,
  }),
  methods: {
    isValidChannel(type) {
      if (this.selectedChannel.hasOwnProperty(type)) {
        if (Object.keys(this.selectedChannel[type]).length === 0) {
          return true;
        }
        return false;
      }
      return true;
    },
    save() {
      console.log('this.selectedChannel', this.selectedChannel, this.channelDescription);
      console.log('movie', this.$store.state.movies.details );

      if (this.selectedType === 'youtube') {
        this.$http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${this.selectedChannel.youtube.channelId}&key=AIzaSyArZ50yIgroz4DnOpOFRQYjzshjmIVYPfY`)
          .then(response => {
            console.log('youtube this.selectedChannel.channelId', response.data)
          })
          .catch(error => {
            console.log('youtube ERROR', error)
          })

        /*
        this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.selectedChannel.youtube.channelId}&key=AIzaSyArZ50yIgroz4DnOpOFRQYjzshjmIVYPfY&maxResults=5&order=viewcount`)
        .then(response => {
            console.log('VIDEOS youtube', response.data)
        })
        .catch(error => {
            console.log('youtube ERROR', error)
        })
        */
        /*
        this.$http.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyArZ50yIgroz4DnOpOFRQYjzshjmIVYPfY&channelId=${this.selectedChannel.youtube.channelId}&part=snippet,id&order=date&maxResults=1`)
          .then(response => {
              console.log('latest youtube', response.data)
          })
          .catch(error => {
              console.log('youtube ERROR', error)
          })
        */
      }
    }
  },
};
</script>