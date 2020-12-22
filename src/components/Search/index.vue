<template>
  <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>					
        </div>
        <div class="search_result">
            <h3>影院</h3>
            <ul>
                <!-- <li>
                    <div class="img"><img src="/images/movie_1.jpg"></div>
                    <div class="info">
                        <p><span>无名之辈</span><span>8.5</span></p>
                        <p>A Cool Fish</p>
                        <p>剧情,喜剧,犯罪</p>
                        <p>2018-11-16</p>
                    </div>
                </li> -->
                <li v-for="item in cinemaList" :key="item.cinemaId">
                    <div class="info">
                        <p><span>{{ item.name }}</span><span>¥{{ item.lowPrice / 100}}起</span></p>
                        <p>{{ item.address }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'Search',
    data () {
        return {
            message : '',
            cinemaList : []
        }
    },
    methods : {
        cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        }
    },
    watch : {
        message(newVal) {
            var that = this
            var cityId = this.$store.state.city.id
            // 快速输入终止请求
            this.cancelRequest()
            axios({
                url : 'https://m.maizuo.com/gateway?cityId='+ cityId +'&k=' + newVal,
                headers : {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1607051486881503382798337","bc":"130600","lo":"0","la":"0"}',
                    'X-Host': 'mall.film-ticket.cinema.recommend'
                },
                cancelToken: new axios.CancelToken(function executor(c) {
                    console.log(1111)
                    that.source = c;
                })
            }).then((res) => {
                var msg = res.data.msg
                var cinemas = res.data.data.cinemas
                if (msg && cinemas) {
                    this.cinemaList = cinemas
                }
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            })
        }
    }
}
</script>

<style>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
.search_body .search_result .info p:nth-of-type(2){ color:#797d82;}
</style>