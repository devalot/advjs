import Vue from 'vue'
import Router from 'vue-router'
import Artists from '@/components/Artists'
import Albums from '@/components/Albums'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/artists'
    },

    {
      path: '/artists',
      name: 'Artists',
      component: Artists,
      children: [
        { path: ':artistID/albums', component: Albums }
      ]
    }
  ]
})
