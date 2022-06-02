import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#36c6e9',
        blue: '#070d59',
        green: '#358490',
        red: '#c10537'
      },
      light: {
        primary: '#36c6e9',
        blue: '#070d59',
        green: '#358490',
        red: '#c10537'
      }
    }
  }
});
