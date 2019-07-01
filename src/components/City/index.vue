<template>
    <div class="city_body">
        <div class="city_list">
            <loading v-if="isLoading"/>
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm, item.id)"
                            >{{item.nm }}
                            </li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <!--                    <div>-->
                        <!--                        <h2>A</h2>-->
                        <!--                        <ul>-->
                        <!--                            <li>阿拉善盟</li>-->
                        <!--                            <li>鞍山</li>-->
                        <!--                            <li>安庆</li>-->
                        <!--                            <li>安阳</li>-->
                        <!--                        </ul>-->
                        <!--                    </div>-->

                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="itemCity in item.list" :key="itemCity.id" @tap="handleToCity(itemCity.nm, itemCity.id)"
                                >{{ itemCity.nm }}
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <!--index是下标索引-->
                <li v-for="(item, index) in cityList" :key="item.index"
                    @touchstart="handleToIndex(index)">
                    {{ item.index }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "City",
        data() {
            return {
                cityList: [],
                hotList: [],
                isLoading: true
            }
        },
        mounted() {  /*生命周期是函数，不是对象*/
            var cityList = window.localStorage.getItem('cityList');
            var hotList = window.localStorage.getItem('hotList');

            if (cityList && hotList) {
                this.cityList = JSON.parse(cityList)/*再解析回来*/
                this.hotList = JSON.parse(hotList)
                this.isLoading = false;
            } else {
                this.axios.get('/api/cityList').then((res) => {
                    var msg = res.data.msg;
                    if (msg === 'ok') {
                        var cities = res.data.data.cities;

                        let {cityList, hotList} = this.formatCityList(cities)
                        this.cityList = cityList
                        this.hotList = hotList

                        this.isLoading = false;
                        // 返回的是数组，但数组不能直接存，因为本地存储存的是字符串类型，
                        // 所以为了不破坏结构需先用JSON.stringify转换一下
                        window.localStorage.setItem('cityList', JSON.stringify(cityList))
                        window.localStorage.setItem('hotList', JSON.stringify(hotList))
                    }
                });
            }
        },
        methods: {
            formatCityList(cities) {
                var cityList = [];
                var hotList = [];

                for (var i = 0; i < cities.length; i++) {
                    var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                    if (toCom(firstLetter)) {   /*新添加index*/
                        cityList.push({index: firstLetter, list: [{nm: cities[i].nm, id: cities[i].id}]})
                    } else {/*累加到已有index中*/
                        for (var j = 0; j < cityList.length; j++) {
                            if (cityList[j].index === firstLetter) {
                                cityList[j].list.push({nm: cities[i].nm, id: cities[i].id});
                            }
                        }
                    }
                }

                cityList.sort((n1, n2) => {  /*原生的排序方法*/
                    if (n1.index > n2.index) {
                        return 1;
                    } else if (n1.index < n2.index) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                // cityList.sort((n1, n2) => {  /*原生的排序方法*/
                //     return n1.index - n2.index;   /*从小到大排序,此处方法不对，不知为何*/
                // });

                for (var i = 0; i < cities.length; i++) {
                    if (cities[i].isHot === 1) {
                        hotList.push(cities[i]);
                    }
                }
                console.log(hotList);

                function toCom(firstLetter) {   /*含首字母的元素是否存在*/
                    for (var i = 0; i < cityList.length; i++) {
                        if (cityList[i].index === firstLetter) {
                            return false;  /*若存在就累加到已有index中，接上面*/
                        }
                    }
                    return true;
                }

                console.log(cityList);
                return {
                    cityList,
                    hotList
                }
            },

            handleToIndex(index) {
                let h2 = this.$refs.city_sort.getElementsByTagName('h2')
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop   /*parentNode是city_list类  原生方法*/
                this.$refs.city_List.toScrollTop(-h2[index].offsetTop)
                /*上面是better-scroll提供的方法，先通过refs拿到组件，然后就可以使用组件中的方法了
                * 左右联动的组件实现，最典型的左右联动比如城市的选择，和右边英文字母的缩写；*/
            },
            handleToCity(nm, id) {/*共享id和nm，通过该函数来搞定*/
                // console.log(nm)
                // console.log(id)
                this.$store.commit('city/CITY_INFO', {nm, id})/*mutations 里面写的，不是异步，所以直接commit
                                                            第一个参数为mutations里面的方法名，执行里面的方法，改变状态*/
                window.localStorage.setItem('nowNm', nm)/*查看状态通过vue插件来看*/
                window.localStorage.setItem('nowId', id)/*本地存储 在*/
                this.$router.push('/movie/nowPlaying')/*用编程式路由跳转到指定页面*/
            }
        //  @tap="handleToCity(item.nm, item.id)"  tap事件 点击触发、滑动不触发
        // 点击某一个city，执行handleToCity方法，先得到点击的city的nm和id，将该nm和id送到状态管理stores下的city状态管理中，
        // 通过commit来执行mutations中状态修改方法，改变状态；将得到的nm和id存储到本地，让状态中的nm和id在本地有的情况下取
        // 本地的值；通过this.$router.push跳转到指定页面
        }
        // formatCityList();
    }
</script>

<style scoped>
    #content .city_body {
        margin-top: 45px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }

    .city_body .city_list {
        flex: 1;
        overflow: auto;
        background: #FFF5F0;
    }

    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }

    .city_body .city_hot {
        margin-top: 20px;
    }

    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e63b76;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }

    .city_body .city_sort div {
        margin-top: 20px;
    }

    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_sort ul {
        padding-left: 10px;
        margin-top: 10px;
    }

    .city_body .city_sort ul li {
        line-height: 30px;
        line-height: 30px;
    }

    .city_body .city_index {
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
    }
</style>