<template>
  <v-navigation-drawer
    class="navigation-drawer"
    app
    :mini-variant.sync="mobileDrawer"
    v-model="drawer"
    :permanent="(!permanent && drawer && screenSize < 600) || screenSize > 600"
    mobile-breakpoint="600"
    width="260"
    height="100%"
    :fixed="!permanent && drawer">
    <v-list>
      <v-list-item
        v-for="(link, index) in links"
        :key="index"
        link
        @click="navigation(link.to)"
        active-class="highlighted"
        :class="link.to === $route.path ? 'highlighted' : ''">

        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            class="page-name"
            v-text="link.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang='scss'>

  .highlighted {
    background-color: #070d59 !important;
    border-color: #070d59 !important;

    .page-name {
      color: white;
    }

    .v-list-item__icon {
      i {
        color: white !important;
      }
    }

    .v-list-item__content {
      color: white !important;
    }
  }
  .navigation-drawer {
    top: 64px !important;

    .v-navigation-drawer__border {
      background-color: transparent !important;
    }

    .page-name {
      font-size: 12px;
      font-weight: bold;
    }
  }
</style>

<script>
  export default {
    name: 'NavigationDrawer',
    data: () => ({
      links: [{
        to: '/dashboard/statistics',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
      },
      {
        to: '/create-new-article',
        icon: 'mdi-newspaper',
        text: 'Új cikk létrehozása',
        label: 'Cikk műveletek',
      },
      {
        to: '/published-article',
        icon: 'mdi-newspaper-variant-multiple',
        text: 'Publikált cikkek',
      },
      {
        to: '/check-article',
        icon: 'mdi-check',
        text: 'Cikkek ellenőrzése',
      },
      {
        to: '/dashboard/article-sketch',
        icon: 'mdi-content-save',
        text: 'Mentett cikkek folytatása',
      },
      {
        to: '/recommenders',
        icon: 'mdi-vhs',
        text: 'Ajánlók',
      },
      {
        to: '/dashboard/premier',
        icon: 'mdi-movie-open',
        text: 'Premierek feltöltése',
      },
      {
        to: '',
        icon: 'mdi-theater',
        text: 'Moziműsor',
      }],
      mobileDrawer: false,
      drawer: false,
      permanent: true,
      screenSize: null,
    }),
    created() {
      this.event.$on('mobile-drawer', (data) => {
        this.screenSize = data.size;
        let size = data.size;
        if (size > 600) {
          this.mobileDrawer = data.drawer;
          this.permanent = true;
        } else {
          this.permanent = false;
          this.mobileDrawer = false;
          this.drawer = !data.drawer;
        }
      });
    },
    methods: {
      navigation(path) {
        if (this.$route.path !== path) {
            this.$router.push({ path: path });
        }
      },
    },
  };
</script>