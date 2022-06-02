<template>
  <v-app-bar app class="alice-admin-header">
    <v-list class="alice-admin-header-container">
      <v-list-item>
        <v-list-item-icon>
          <v-icon
            @click="mobileDrawer(drawer = !drawer)">
            mdi-menu
            </v-icon>
        </v-list-item-icon>
        <v-list-item-content class="pt-0 pb-0">
          <v-list-item-title class="text-h6">
            <span> Moviecrashhh </span>
          </v-list-item-title>
          <v-list-item-subtitle> Admin </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style lang='scss'>
  .alice-admin-header {
    background-color: white !important;
    left: 0 !important;
    box-shadow: none !important;
    height: 64px !important;

    .v-icon {
      bottom: 4px !important;
    }

    .v-toolbar__content {
      padding-left: 0px !important;
      height: 64px !important;
    }

    .alice-admin-header-container {
      width: 256px !important;
      height: 64px !important;
      display: flex !important;
    }
  }
</style>

<script>
  export default {
    name: 'Header',
    data: () => ({
      drawer: false,
      responsive: false,
    }),
    watch: {
      responsive(nv) {
        this.drawer = nv < 960;
        this.mobileDrawer();
        return nv;
      },
    },
    mounted() {
      this.responsive = window.innerWidth;
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      });
    },
    methods: {
      onResize() {
        this.responsive = window.innerWidth;
      },
      mobileDrawer() {
        this.event.$emit('mobile-drawer', {
          drawer: this.drawer,
          size: this.responsive,
        });
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    }
  };
</script>