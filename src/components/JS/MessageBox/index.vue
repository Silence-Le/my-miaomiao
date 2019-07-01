<template>
    <div class="messageBox">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div>
            <div @touchstart="handleCancel">{{ cancel }}</div><!--点击后先触发上层JS中的事件，再触发上上层的Movie/index.vue中的事件-->
            <div @touchstart="handleOk">{{ ok}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageBox"
    }
</script>

<style scoped>
    .messageBox {
        /*z-index: 1000;*/
        width: 200px;
        height: 120px;
        border: 1px #ccc solid;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        background-color: white;
        -webkit-box-shadow: 3px 3px 3px 3px #ccc;
        -moz-box-shadow: 3px 3px 3px 3px #ccc;
        box-shadow: 3px 3px 3px 3px #ccc;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -60px 0 0 -100px;
    }

    .messageBox h2 {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
    }

    .messageBox p {
        text-align: center;
        line-height: 40px;
    }

    .messageBox > div {
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .messageBox > div div {
        flex: 1;
        text-align: center;
        line-height: 30px;
        border-right: 1px #ccc solid;
    }
    .messageBox > div div:last-child {
        border: none;
    }
</style>