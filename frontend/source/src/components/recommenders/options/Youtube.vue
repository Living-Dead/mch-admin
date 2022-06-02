<template>
  <div class="pt-3 pb-3">
    <v-menu
      v-model="openMenu"
      bottom>
      <template v-slot:activator="{ on, attrs }">
        <div style="position: relative;">
          <v-text-field
            v-model="search"
            :loading="isLoading"
            label="Youtube csatorna kereső"
            outlined
            autocomplete="off"
            @keyup.enter.exact="searchYoutubeAPI"
            hide-details />
          <!--<v-icon
            :color="$store.state.app.color"
            class="yt-channel-search-icon"
            v-bind="attrs"
            v-on="on"
            @click="searchYoutubeAPI"> mdi-magnify
          </v-icon>-->
        </div>
      </template>
      <div v-if="!isLoading">
        <v-list-item v-show="!timeout" class="text-center">
          <v-progress-circular
            indeterminate
            size="25"
            color="primary">
          </v-progress-circular>
        </v-list-item>
        <v-list-item 
          v-show="timeout"
          v-for="(item, index) in channels"
          :key="index"
          @click="selected(item)">
          <v-list-item-avatar>
            <img :src="item.snippet.thumbnails.default.url">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.snippet.channelTitle" />
            <v-list-item-subtitle v-text="item.snippet.publishedAt" />
            <v-list-item-subtitle v-text="item.snippet.channelId" />
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-menu>

    <div
      v-if="showDetails"
      class="pt-6">
      <v-list-item class="pa-4">
        <v-list-item-avatar>
          <img :src="selectedChannel.youtube.thumbnails.default.url">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="selectedChannel.youtube.channelTitle" />
          <v-list-item-subtitle v-text="selectedChannel.youtube.publishedAt" />
          <v-list-item-subtitle v-text="selectedChannel.youtube.channelId" />
        </v-list-item-content>
      </v-list-item>

      <p v-html="selectedChannel.youtube.comment" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Youtube',
  props: {
    selectedChannel: {
      youtube: Object,
    },
  },
  data: () => ({
    isLoading: false,
    search: null,
    channels: [],
    cache: '',
    openMenu: false,
    showDetails: false,
    description: null,
    timeout: false,
  }),
  methods: {
    searchYoutubeAPI(e) {
      if (e.keyCode === 13) {
        this.openMenu = true;
      }
      if (this.search !== this.cache) {
        this.isLoading = true;
        /*fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyArZ50yIgroz4DnOpOFRQYjzshjmIVYPfY`)
        .then(res => res.clone().json())
          .then(res => {
            console.log('res', res.items)
            this.channels = res.items;
            this.cache = this.youtubeSearch;
            setTimeout(() => {
              this.timeout = true;
            }, 2000);
            
          })
          .catch(err => {
            console.log(err)
          })*/
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${this.search}&key=AIzaSyArZ50yIgroz4DnOpOFRQYjzshjmIVYPfY&maxResults=10`)
          .then(res => res.clone().json())
          .then(res => {
            console.log('res', res.items)
            this.channels = res.items;
            this.cache = this.search;
            setTimeout(() => {
              this.timeout = true;
            }, 2000);
            
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    },
    selected(item) {
      console.log('selected item', item);
      this.selectedChannel.youtube = item.snippet;
      console.log('selectedChannel', this.selectedChannel);
      this.showDetails = true;

      /*
      GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCIITmFAHQ4S1FMDWqhZyQKg&key=[YOUR_API_KEY] HTTP/1.1

Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json
*/
//GET https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={CHANNEL_ID}&maxResults=10&order=date&type=video&key={YOUR_API_KEY}
      //this.showPreview = true;
    },
  },
};
</script>