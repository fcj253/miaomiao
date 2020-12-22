<template>
  <div class="movie_body" ref="movie_body">
      <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <!-- <li>
                    <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                    <div class="info_list">
                        <h2>无名之辈</h2>
                        <p>观众评 <span class="grade">9.2</span></p>
                        <p>主演: 陈建斌,任素汐,潘斌龙</p>
                        <p>今天55家影院放映607场</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>-->
                <li class="pullDown">{{ pullDownMsg }}</li>
                <li v-for="item in movieList" :key="item.filmId">
                    <div class="pic_show" @tap="handleToDetail"><img :src="item.poster"></div>
                    <div class="info_list">
                        <h2>{{ item.name }} <img v-if="item.item.type === 2" src="@/assets/maxs.png"></h2>
                        <p>观众评分 <span class="grade">{{ item.grade }}</span></p>
                        <p>主演: {{ item.actors | actorfilter}}</p>
                        <p>今天55家影院放映607场</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
// import BScroll from 'better-scroll'
Vue.filter('actorfilter', function (data) {
    // console.log(data)
    var newlist = data.map(item => item.name)
    return newlist.join(' ')
})
export default {
    name : 'NowPlaying',
    data () {
        return {
            movieList : [],
            pullDownMsg : '',
            isLoading : true,
            prevCityId : -1
        }
    },
    activated () {

        var cityId = this.$store.state.city.id
        console.log(cityId)
        if(this.prevCityId === cityId){return}
        this.isLoading =true
        console.log(123)

        axios({
            url: 'https://m.maizuo.com/gateway?cityId='+cityId+'&pageNum=1&pageSize=10&type=1&k=5033830',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607051486881503382798337","bc":"371300"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            var msg = res.data.msg
            if (msg === 'ok') {
                this.movieList = res.data.data.films
                this.isLoading = false
                /* this.$nextTick(() => {
                    var scroll = new BScroll( this.$refs.movie_body , {
                        click : true,
                        probeType : 1 // probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                    })

                    scroll.on('scroll',(pos) => {
                        // console.log('scroll')
                        if (pos.y > 30){
                            this.pullDownMsg = '正在更新中'
                        }                       
                    })

                    scroll.on('touchEnd',(pos) => {
                        // console.log('touchEnd')
                        if (pos.y > 30){
                            axios({
                                url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=2&pageSize=10&type=1&k=5104407',
                                headers: {
                                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607051486881503382798337"}',
                                    'X-Host': 'mall.film-ticket.film.list'
                                }
                            }).then((res) => {
                                var msg = res.data.msg
                                if(msg === 'ok') {
                                    this.pullDownMsg = '更新成功'
                                    setTimeout(() => {
                                        this.movieList = res.data.data.films
                                        this.pullDownMsg = ''
                                    }, 1000)
                                }
                            })
                        }
                    })
                }) */
            }
        })
    },
    methods : {
        handleToDetail () {
            console.log(handleToDetail)
        },
        handleToScroll (pos) {
            if (pos.y > 30){
                this.pullDownMsg = '正在更新中'
            }
        },

        handleToTouchEnd (pos) {
            if (pos.y > 30){
                axios({
                    url: 'https://m.maizuo.com/gateway?cityId=371300&pageNum=2&pageSize=10&type=1&k=3859618',
                    headers: {
                        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607051486881503382798337","bc":"371300"}',
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                }).then((res) => {
                    var msg = res.data.msg
                    if(msg === 'ok') {
                        this.pullDownMsg = '更新成功'
                        setTimeout(() => {
                            this.movieList = res.data.data.films
                            this.pullDownMsg = ''
                        }, 1000)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden; height: 12594px;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{ margin: 0; padding: 0; border: none;}
</style>