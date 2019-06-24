<template>
    <footer id="footer">
        <ul>
            <router-link tag="li" to="/movie"><!--路由跳转-->
                <i class="iconfont icon-dianying"></i>
                <p>电影</p>
            </router-link>
            <router-link tag="li" to="/cinema">
                <i class="iconfont icon-yingyuan"></i>
                <p>影院</p>
            </router-link>
            <router-link tag="li" to="/mine">
                <i class="iconfont icon-wode"></i>
                <p>我的</p>
            </router-link>
        </ul>
    </footer>
</template>

<script>
    export default {
        name: "TabBar"/*在浏览器的vue中可看到*/
    }
</script>

<style scoped>
    #footer {
        width: 100%;
        height: 50px;
        background: white;
        /*border-top: 2px #ebe8e3 solid;*/
        border-top: 2px #38eb36 solid;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    #footer ul {
        display: flex;
        text-align: center;
        height: 50px;
        align-items: center;
    }
    #footer ul li {
        flex: 1;
        height: 40px;
    }
    #footer ul li.active {
        color: #f03d37;
    }
    #footer ul li.router-link-active {
        color: #f03d37;
    }
    #footer ul i {
        font-size: 20px;
    }
    /*p块级元素  i，u，em，a，b等是行内元素*/
    #footer ul p {
        font-size: 12px;
        line-height: 18px;
    }
</style>