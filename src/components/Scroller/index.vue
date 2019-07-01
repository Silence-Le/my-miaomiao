<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot><!--使用vue中的插槽将内容分发过来，然后可以将它配成一个全局的组件---因为它引用的地方较多-->
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "Scroller",
        props:{
            handleToScroll:{
                type:Function,
                default:function () {}
            },
            handleToTouchEnd:{
                type:Function,
                default:function () {}
            }
        },
        mounted() {
            let scroll = new BScroll(this.$refs.wrapper, {
                tap: true,  //想要让tap事件生效，需要开启一下
                probeType: 1 //滚动的时候会派发scroll事件，会截流
            });

            this.scroll = scroll;

            scroll.on('scroll', (pos) => {
                this.handleToScroll(pos);
            });
            scroll.on('touchEnd', (pos) => {
                this.handleToTouchEnd(pos);
            });
        },
        methods:{
            toScrollTop(y) {/*City中的联动滚动*/
                this.scroll.scrollTo(0, y);/* x为0，只是y轴跳转 */
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100%;
    }
</style>