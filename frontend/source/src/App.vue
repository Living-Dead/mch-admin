<template>
  <v-app id="app">
    <NavigationDrawer />
    <Header /> 

    <v-main
      class="alice-admin-content" :class="style">
      <div class="alice-container">
        <router-view />
      </div>
    </v-main>

    <Footer />
  </v-app>
</template>

<style lang='scss'>
  .alice-admin-content {
    background-color: #f5f5f5 !important;

    &--with-drawer {
      padding: 64px 0px 0px 256px !important;
    }

    &--mobile {
      padding: 64px 0px 0px 56px !important;
    }

    &--full {
      padding: 64px 0px 0px 0px !important;
    }

    .alice-container {
      padding: 24px !important;

      @media (max-width: 599px) {
        padding: 12px !important;
      }
    }
  }

  .mchhh-primary {
    background-color: #1C9DD9 !important;
    border-color: #1C9DD9 !important;

    &--text {
      color: #1C9DD9 !important;
      caret-color: #1C9DD9 !important;
    }
  }


  @import "@/scss/Global.scss";
</style>

<script>
  import Header from '@/components/Header'
  import NavigationDrawer from '@/components/NavigationDrawer'
  import Footer from '@/components/Footer'

  export default {
    name: 'App',
    components: {
      Header,
      NavigationDrawer,
      Footer,
    },
    data: () => ({
      style: {},
    }),
    async created() {
      this.event.$on('mobile-drawer', (data) => {
        let size = data.size;
        if (size > 960) {
          this.style = {
            'alice-admin-content--with-drawer': !data.drawer,
            'alice-admin-content--mobile': data.drawer,
          }
        } else if (size > 600 && 960 > size) {
          this.style =  {
            'alice-admin-content--mobile': data.drawer,
            'alice-admin-content--with-drawer': !data.drawer,
          }
        } else {
          this.style =  {
            'alice-admin-content--full': true,
          }
        }
      });
    },
  };
</script>