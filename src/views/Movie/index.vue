<template>
    <div id="main">
        <!--        <Header title="我的喵喵Movie"></Header>-->
        <!--        <TabBar></TabBar>-->
        <Header title="我的喵喵Movie"/>
        <div id="content">

            <div class="movie_menu"><!--四个选项-->
                <router-link to="/movie/city" tag="div" class="city_name">
                    <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
                </router-link>
                <div class="hot_switch">
                    <router-link to="/movie/nowPlaying" tag="div" class="hot_item">
                        正在热映
                    </router-link>
                    <router-link to="/movie/comingSoon" tag="div" class="hot_item">
                        即将上映
                    </router-link>
                </div>
                <router-link to="/movie/search" tag="div" class="search_entry">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>

            <keep-alive>
                <router-view></router-view><!--上面渲染到的路由将匹配到这里 二级路由渲染-->
            </keep-alive>

        </div>
        <TabBar/>
<!--        <MessageBox />&lt;!&ndash;绝对定位了的盒子&ndash;&gt;-->
    </div>
</template>
<script>
    import Header from '@/components/Header'
    import TabBar from '@/components/TabBar'
    // import MessageBox from '@/components/JS/MessageBox'
    import {messageBox} from '@/components/JS' /*@/compontents/JS/index*/
    export default {
        name: "Movie",
        components: {
            Header,
            TabBar,
            // MessageBox
        },
        mounted() {
            //什么时候调弹窗？Ajax请求成功后！定位原理：后台调用的是一些现成的定位的API，如百度的定位系统 都有这个功能
            setTimeout(() => {  /*将下面的包裹在setTimeout中，目的是做一个延时*/
                this.axios.get('/api/getLocation').then((res) => {
                    console.log('_________')
                    console.log(res)
                    let msg = res.data.msg;
                    let nm = res.data.data.nm;
                    let id = res.data.data.id;
                    if (msg === 'ok') {
                        // console.log(typeof(this.$store.state.city.id))   /* String类型，需要转一下或者用==*/
                        // console.log(typeof(id))  /*number类型*/
                        // if (this.$store.state.city.id == id){return ;}/*若当前城市与状态管理中的城市一样则不要弹窗！！*/
                        messageBox({  /*messageBox 方法*/
                            title: '定位',
                            content:nm,
                            cancel:'取消',
                            ok:'切换定位',
                            handleCancel() {
                                console.log(333)
                            },
                            handleOk() {/*点击后让定位到的城市id和别的相关联，两种方法：1、改状态管理；2、改本地存储来重新渲染页面*/
                                window.localStorage.setItem('nowNm', nm);
                                window.localStorage.setItem('nowId', id);
                                window.location.reload();/*重新加载并渲染页面*/
                                console.log(444)
                            }
                        })
                    }
                });
            },3000);
        }
    }
</script>

<style scoped>
    #content .movie_menu {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        z-index: 10;
    }

    .movie_menu .city_name {
        margin-left: 20px;
        height: 100%;
        line-height: 45px;
    }

    .movie_menu .city_name.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .city_name.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .hot_switch {
        display: flex;
        height: 100%;
        line-height: 45px;
    }

    .movie_menu .hot_item {
        font-size: 15px;
        color: #666;
        width: 80px;
        text-align: center;
        margin: 0 12px;
        font-weight: 700;
    }

    .movie_menu .hot_item.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .hot_item.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .search_entry {
        margin-right: 20px;
        height: 100%;
        line-height: 45px;
        /*width: 15px;*/
        /*background-color: green;*/
    }

    .movie_menu .search_entry.active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .search_entry.router-link-active {
        color: #ef4238;
        border-bottom: 2px #ef4238 solid;
    }

    .movie_menu .search_entry i {
        font-size: 24px;
        color: red;
    }

    .slide-enter-active {
        animation: 13s detailMove;
    }

    @keyframes detailMove {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0);
        }
    }

</style>