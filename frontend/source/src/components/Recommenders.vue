<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <BaseMaterialCard
          color="primary"
          title="Ajánlók">
          <!--<div class="pa-3">
            <v-layout
              wrap>
              <v-flex
                v-for="(item, index) in options"
                :key="index"
                xs4>
                <v-btn
                  @click="show(item.type)"
                  color="mchhh-primary">
                  <span class="white--text" v-text="item.name"></span>
                </v-btn>
              </v-flex>
            </v-layout>
          </div>
          <component :is="selectedType" />-->
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1 pa-3">
            <template v-slot:top>
              <v-toolbar
                flat>
                <v-dialog
                  v-model="newDialog"
                  max-width="850px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on">
                      Új ajánló feltöltése
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">----</span>
                    </v-card-title>
                    <v-card-actions>
                      <Add> </Add>
                    </v-card-actions>
                  </Add>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.recommenderDescription="{ item }">
              <v-dialog
                v-model="dialog"
                width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="pa-0 ma-0"
                    color="green"
                    text 
                    v-bind="attrs"
                    v-on="on"
                  >
                    Leírás megtekintése
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Leírás</span>
                  </v-card-title>
                  <v-card-text v-text="item.recommenderDescription"></v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                    >
                      Disagree
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template
              v-slot:[`item.edit`]="{ item }">
               <v-btn
                  color="green"
                  icon
                  @click="deleteUser(item, all.users.map((x) => {return x.id; }).indexOf(item.id))">
                  <v-icon> mdi-delete </v-icon>
              </v-btn>
              <v-btn
                  color="green"
                  icon
                  @click="editUser(item.id, all.users.map((x) => {return x.id; }).indexOf(item.id))">
                  <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                  color="green"
                  icon
                  @click="details(item.id)">
                  <v-icon> mdi-account-details </v-icon>
              </v-btn>
            </template>
          </v-data-table>
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
import Add from '@/components/recommenders/Add'
//import Add from '@/components/recommenders/Add'
// import YoutubeUpdateChannel from '@/components/Recommendation/youtube/Update'
// import YoutubeRemoveChannel from '@/components/Recommendation/youtube/Remove'

export default {
  name: 'RecommendationDashboard',
  components: {
    //MovieAdd,
    //SeriesAdd,
    Add,
  },
  data: () => ({
    headers: [
      {
        text: 'Ajánló neve',
        value: 'recommenderName',
      },
      {
        text: 'Leírás',
        value: 'recommenderDescription',
      },
      {
        text: 'Ajánló típusa',
        value: 'recommenderType',
      },
      {
        text: 'Hozzáadás dátuma',
        value: 'date',
      },
      {
        text: 'Státusz',
        value: 'status',
      },
      {
        text: 'Módosítás',
        value: 'edit',
        align: 'center'
      },
    ],
    items: [
      {
        recommenderName: 'fókuszcsoport',
        recommenderDescription: 'shfsjkhfkjsdhfjksdhfkjd ghsdkhdjgsjd',
        recommenderType: 'youtube',
        status: 'aktív',
        date: '2022.04.18',
      },
      {
        recommenderName: 'kókuszcsoport',
        recommenderDescription: 'shfsjkhfkjsdhfjksdhfkjd ghsdkhdjgsjd',
        recommenderType: 'twitch',
        status: 'aktív',
        date: '2022.04.18',
      },
    ],
    pageName: '',
    selectedType: '',
    itemsType: '',
    options: [
      {
        name: 'Új hozzáadása',
        type: 'Add',
        color: 'success'
      },
      {
        name: 'Módosítás',
        type: 'Update',
        color: 'warning'
      },
      {
        name: 'Törlés',
        type: 'Remove',
        color: 'red'
      },
    ],
      /*movieOptions: [
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
      ],*/
      dialog: false,
      newDialog: false,
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  computed: {
    urlParams() {
      return this.$route.params.id;
    },
  },
  /*watch: {
    urlParams(nv, ov) {
      console.log('ROUTE', nv)
      if (nv !== ov) {
        this.showType = '';
      }
      this.setPageType(nv);
    },
  },*/
  methods: {
    show(type) {
      this.selectedType = type;
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
    close () {
      this.dialog = false;
    },
    save () {
      this.close()
    },
  },
  mounted() {
    this.setPageType(this.$route.params.id);
  }
};
</script>