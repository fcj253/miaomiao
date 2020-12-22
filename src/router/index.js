import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  cinemaRouter,
  mineRouter,
  {
    path : '/*',
    redirect : '/movie/nowPlaying'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
