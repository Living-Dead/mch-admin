<template>
	<div class="pt-3 pb-3">
		<v-menu
	    v-model="openMenu"
	    bottom>
	    <template v-slot:activator="{ on, attrs }">
	      <div style="position: relative;">
	        <v-text-field
	          v-model="search"
	          label="Twitch csatorna kereső"
	          outlined
	          autocomplete="off"
	          @keyup.enter.exact="searchTwitchChannel"
	          hide-details />
	        <!--<v-icon
	          :color="$store.state.app.color"
	          class="yt-channel-search-icon"
	          v-bind="attrs"
	          v-on="on"
	          @click="searchTwitchChannel"> mdi-magnify
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
		      @click="selected(item, 'twitch')">
		      <v-list-item-avatar>
		        <img :src="item.thumbnail_url">
		      </v-list-item-avatar>
		      <v-list-item-content>
		        <v-list-item-title v-text="item.display_name" />
		        <v-list-item-subtitle v-text="item.created_at" />
		        <v-list-item-subtitle v-text="item._id" />
		      </v-list-item-content>
		    </v-list-item>
		  </div>
	  </v-menu>
	  <div
      v-if="showDetails"
      class="pt-6">
		  <v-flex>
	      <v-list-item class="pl-2 pb-4">
	        <v-list-item-avatar>
	          <img :src="selectedChannel.thumbnail_url" />
	        </v-list-item-avatar>
	        <v-list-item-content>
	          <v-list-item-title v-text="selectedChannel.display_name" />
	          <v-list-item-subtitle v-text="selectedChannel.id" />
	          <v-list-item-subtitle v-text="selectedChannel.title" />
	        </v-list-item-content>
	      </v-list-item>
	    </v-flex>
	  </div>
	</div>
</template>

<script>

export default {
  name: 'Twitch',
  data: () => ({
    isLoading: false,
    search: null,
    channels: [],
    cache: '',
    openMenu: false,
    showDetails: false,
    timeout: true,
    selectedChannel: {},
  }),
  methods: {
    searchTwitchChannel() {
     /* this.$http.post('https://id.twitch.tv/oauth2/token?client_id=kp9noyzxcyqipsr5dhf3jnb6qhp5j6&client_secret=q92gmyvehmm9wsbxbb3xrp9e6i1hir&grant_type=client_credentials', {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'kp9noyzxcyqipsr5dhf3jnb6qhp5j6',
        }
      })*/
      this.$http.get(`https://api.twitch.tv/helix/search/channels?query=${this.search}`, {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          'Authorization': 'Bearer dcz1unnkztgs2u1917uo1pub5j9hl6',
          'Client-ID': 'kp9noyzxcyqipsr5dhf3jnb6qhp5j6',
        }
      })
      .then(response => {
        console.log('RESPONSE HELIX', response.data);
        this.channels = response.data.data;
        this.openMenu = true;

        //https://api.twitch.tv/helix/videos?user_id=whoever&first=1&sort=time&type=archive
        setTimeout(() => {
          this.timeout = true;
        }, 2000);
      })
      .catch(error => {
        console.log(err)
      })
    },
    selected(item) {
      console.log('selected item', item);
      this.selectedChannel = item;
      this.showDetails = true;
    },
  },
};
</script>