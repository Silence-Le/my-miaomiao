<template>
    <div id="main">
        <!--        <Header title="我的喵喵Movie"></Header>-->
        <!--        <TabBar></TabBar>-->
        <Header title="我的喵喵Movie"/>

        <div id="content">

            <div class="movie_menu"><!--四个选项-->
                <router-link to="/movie/city" tag="div" class="city_name">
                    <span>城市</span><i class="iconfont icon-lower-triangle"></i>
<!--                    <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>-->
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
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import TabBar from '@/components/TabBar'

    export default {
        name: "Movie",
        components: {
            Header,
            TabBar
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