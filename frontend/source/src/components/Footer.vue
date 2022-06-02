<template>
  <v-footer
    padless
    class="white"
    v-bind:style= "{ paddingLeft: responsiveFooter }">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong> Moviecrashhh &copy; {{ new Date().getFullYear() }} Minden jog fenntartva </strong>
    </v-col>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    data: () => ({
      responsiveFooter: '',
    }),
    created() {
      this.event.$on('mobile-drawer', (data) => {
        let size = data.size;
        if (size > 600) {
          this.responsiveFooter = data.drawer ? '56px' : '256px';
        } else {
          this.responsiveFooter = '0px';
        }
      });
    },
  };
</script>