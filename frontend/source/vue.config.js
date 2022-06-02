/*
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const vuetifyVersion = JSON.parse(packageJson).dependencies.vuetify || 0;
*/

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    /*
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                    @import "@/scss/globals/variables.scss";
                    @import "@/scss/globals/mixins/index.scss";
                    @import "@/scss/globals/functions/index.scss";
                `
            }
        }
    },
    */

    /*
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].vuetifyVersion = vuetifyVersion;

                return args;
            })
    }*/

    /*
    chainWebpack: config => {
        config.module
          .rule('yaml')
            .test(/\.ya?ml?$/)
            .use('json-loader')
              .loader('json-loader')
              .end()
            .use('yaml-loader')
              .loader('yaml-loader')
    }
    */
}