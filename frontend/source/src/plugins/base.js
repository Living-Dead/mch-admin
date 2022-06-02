import Vue from 'vue'

const requireComponent = require.context(
  '@/components/base', true, /\.vue$/,
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');

  Vue.component(`Base${componentName}`, componentConfig.default || componentConfig)
})
