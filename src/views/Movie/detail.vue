<template>
    <div id="detailContainer" class="slide-enter-active">
        <!-- <header id="header">
            <i class="iconfont icon-right"></i><h1>影片详情</h1>
        </header> -->
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i><!--返回的小图标 放到插槽中（插槽操作），分发出去-->
        </Header>
        <Loading v-if="isLoading"/>
        <div v-else id="content" class="contentDetail">

            <!--            <div class="detail_list">-->
            <!--                <div class="detail_list_bg"></div>-->
            <!--                <div class="detail_list_filter"></div>-->
            <!--                <div class="detail_list_content">-->
            <!--                    <div class="detail_list_img">-->
            <!--                        <img src="/images/movie_1.jpg" alt="">-->
            <!--                    </div>-->
            <!--                    <div class="detail_list_info">-->
            <!--                        <h2>liyanzhi</h2>-->
            <!--                        <p>ENGname</p>-->
            <!--                        <p>9.2</p>-->
            <!--                        <p>nnnnn</p>-->
            <!--                        <p>中国大陆 / 108分钟</p>-->
            <!--                        <p>动画</p>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="detail_intro">-->
            <!--                <p>在一座山间小城中，一对低配劫匪、一个落魄的泼皮保安、一个身体残疾却性格彪悍的残毒舌女以及一系列生活在社会不同轨迹-->
            <!--                    上的小人物，在一个貌似平常的日子里，因为一把丢失的老枪和一桩当天发生在城中的乌龙劫案，从而被阴差阳错地拧到一起，发生-->
            <!--                    的一幕幕令人啼笑皆非的荒诞喜剧。</p>-->
            <!--            </div>-->
            <!--            <div class="detail_player swiper-container">-->
            <!--                <ul class="swiper-wrapper">-->
            <!--                    <li class="swiper-slide">-->
            <!--                        <div>-->
            <!--                            <img src="/images/person_1.webp" alt="">-->
            <!--                        </div>-->
            <!--                        <p>陈建斌</p>-->
            <!--                        <p>马先勇</p>-->
            <!--                    </li>-->
            <!--                </ul>-->
            <!--            </div>-->

            <div class="detail_list">
                <div class="detail_list_bg"
                     :style="{ 'background-image': 'url('+detailMovie.img.replace(/w\.h/,'148.208')+')' }"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="detailMovie.img | setWH('148.208')" alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{ detailMovie.nm }}</h2>
                        <p>{{ detailMovie.enm }}</p>
                        <p>{{ detailMovie.sc }}</p>
                        <p>{{ detailMovie.cat }}</p>
                        <p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
                        <p>{{ detailMovie.pubDesc }}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{ detailMovie.dra }}</p>   <!--简单介绍-->
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" v-for="(item, index) in detailMovie.photos" :key='index'>
                        <div>
                            <img :src="item | setWH('140.127')" alt="">
                        </div>
                        <!-- <p>陈建斌</p>
                        <p>马先勇</p> -->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'

    export default {
        name: "Detail",
        components: {
            Header
        },
        props: ['movieId'],
        data() {
            return {
                detailMovie: {},
                isLoading:true,
                prevMovieId:-1
            }
        },
        mounted() {
            console.log('通过props得到的id为：' + this.movieId)
            console.log(typeof(this.prevMovieId))   /*number*/
            console.log(typeof(this.movieId))  /*string*/
            if(this.prevMovieId  == this.movieId){
                console.log(this.prevMovieId + '里面')

                return ;}/*实现第一次加载更新，之后加载不更新  但是没有效果 why？？？？ 难道是一进入该页面就会重新开始吗？？*/
            this.isLoading = true
            this.axios.get('/api/detailmovie?movieId=' + this.movieId).then((res) => {
                let msg = res.data.msg;
                this.isLoading = false
                if (msg === 'ok') {
                    /*全部都挂载，耗性能，不推荐，建议用到什么挂载什么。但这里不做优化，直接使用*/
                    this.detailMovie = res.data.data.detailMovie
                    this.$nextTick(()=>{     /*Swiper滑动*/
                        new Swiper(this.$refs.detail_player , {/*$refs能拿到相应的dom*/
                            slidesPerView : 'auto',
                            freeMode : true,  /*自由拖放*/
                            freeModeSticky: true,
                        });
                    })
                }
                this.prevMovieId = this.movieId
                console.log(this.prevMovieId + 'iuuiiuyhiuii')
            });
        },
        methods: {
            handleToBack() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    #detailContainer {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        min-height: 100%; /*若为height: 100% 则高与移动端整个设备高相同,固定值 min-height: 100%保证最小高度和里面内容相同，可变*/
        /*height: 100%;*/
        background: white; /*若不设置，可能会透出被遮住的内容*/
    }

    #detailContainer.slide-enter-active {
        animation: slideMove .3s
    }

    @keyframes slideMove {
        0% {
            transform: translateX(100%)
        }
        100% {
            transform: translateX(0%)
        }
    }

    #content.contentDetail {
        display: block;
        margin-bottom: 0;
    }

    #content .detail_list {
        height: 200px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .detail_list .detail_list_bg {
        width: 100%;
        height: 100%;
        background: 0 40%;
        filter: blur(20px);
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
    }

    .detail_list .detail_list_filter {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #40454d;
        opacity: .55;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }

    .detail_list .detail_list_content {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }

    .detail_list .detail_list_img {
        width: 108px;
        height: 150px;
        border: solid 1px #f0f2f3;
        margin: 20px;
    }

    .detail_list .detail_list_img img {
        width: 100%;
        height: 100%;
    }

    .detail_list .detail_list_info {
        margin-top: 20px;
    }

    .detail_list .detail_list_info h2 {
        font-size: 20px;
        color: white;
        font-weight: normal;
        line-height: 40px;
    }

    .detail_list .detail_list_info p {
        color: white;
        line-height: 20px;
        font-size: 14px;
        color: #ccc;
    }

    #content .detail_intro {
        padding: 10px;
    }

    #content .detail_player {
        margin: 20px;
    }

    .detail_player .swiper-slide {
        width: 70px;
        margin-right: 20px;
        text-align: center;
        font-size: 14px;
    }

    .detail_player .swiper-slide img {
        width: 100%;
        margin-bottom: 5px;
    }

    .detail_player .swiper-slide p:nth-of-type(2) {
        color: #999;
    }
</style>