<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <BaseMaterialCard
          color="mchhh-primary"
          title="Videó ajánló">
          <div class="pa-3">
            <v-layout
              wrap>
              <v-flex
                v-for="(item, index) in optionTypes[itemsType]"
                :key="index"
                xs4>
                <v-card
                  dark
                  class="cursor-pointer"
                  color="mchhh-primary">
                  <v-card-text
                    class="pa-4 font-weight-bold text-center white--text"
                    @click="show(item.type)"
                    v-text="item.name" />
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <component :is="showType" />
        </BaseMaterialCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang='scss'>

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

//import MovieAdd from '@/components/Recommendation/movie/MovieAdd'
//import SeriesAdd from '@/components/Recommendation/series/SeriesAdd'
import VideoAdd from '@/components/videos/VideoAdd'
// import YoutubeUpdateChannel from '@/components/Recommendation/youtube/Update'
// import YoutubeRemoveChannel from '@/components/Recommendation/youtube/Remove'

export default {
  name: 'RecommendationDashboard',
  components: {
    //MovieAdd,
    //SeriesAdd,
    VideoAdd,
  },
  data: () => ({
    pageName: '',
    showType: '',
    itemsType: '',
    optionTypes: {
      videoOptions: [
        {
          name: 'Új hozzáadása',
          type: 'VideoAdd',
          color: 'success'
        },
        {
          name: 'Módosítás',
          type: 'VideoUpdate',
          color: 'warning'
        },
        {
          name: 'Törlés',
          type: 'VideoRemove',
          color: 'red'
        },
      ],
      movieOptions: [
        {
          name: 'Új hozzáadása',
          type: 'MovieAdd',
          color: 'success'
        },
        {
          name: 'Módosítás',
          type: 'MovieUpdate',
          color: 'warning'
        },
        {
          name: 'Törlés',
          type: 'MovieRemove',
          color: 'red'
        },
      ],
      seriesOptions: [
        {
          name: 'Új hozzáadása',
          type: 'SeriesAdd',
          color: 'success'
        },
        {
          name: 'Módosítás',
          type: 'SeriesUpdate',
          color: 'warning'
        },
        {
          name: 'Törlés',
          type: 'SeriesRemove',
          color: 'red'
        },
      ],
    }
  }),
  computed: {
    urlParams() {
      return this.$route.params.id;
    },
  },
  watch: {
    urlParams(nv, ov) {
      console.log('ROUTE', nv)
      if (nv !== ov) {
        this.showType = '';
      }
      this.setPageType(nv);
    },
  },
  methods: {
    show(type) {
      this.showType = type;
    },
    setPageType(type) {
      switch (type) {
      case 'video':
        this.itemsType = 'videoOptions';
        this.pageName = 'Video';
        break;
      case 'movie':
        this.itemsType = 'movieOptions';
        this.pageName = 'Film';
        break;
      case 'series':
        this.itemsType = 'seriesOptions';
        this.pageName = 'Sorozat';
        break;
      }
    },
  },
  mounted() {
    this.setPageType(this.$route.params.id);
  }
};
</script>