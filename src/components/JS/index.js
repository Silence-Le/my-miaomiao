import Vue from 'vue'  /*因为要用vue的功能*/
import MessageBox from './MessageBox'
export let messageBox = (function () {  /*闭包，导出*/
    let defaults = {  /*默认值*/
        tittle: '',/*定位*/
        content: '',   /*北京*/
        cancel: '', /*取消*/
        ok: '',  /*切换定位*/
        handleCancel: null,/*点击取消函数*/
        handleOk: null/*点解ok函数*/
    };
    let MyComponent = Vue.extend(MessageBox);/*MessageBox（JS） 和 vue结合 ，返回一个新类*/
    return function (opts) {  /*弹窗时候的函数  opts 配置参数*/
        for (var attr in opts) {
            defaults[attr] = opts[attr];
        }
        // let MyComponent = Vue.extend(MessageBox);/*MessageBox（JS） 和 vue结合 ，返回一个新类*/   可以提到外面
        let vm = new MyComponent({
            el: document.createElement('div'),/*这里的div是作为容器来装template，
                                                        不会被渲染出来（当vue实例有template时，template会覆盖掉el）*/
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel() {/*要让这个方法拿到这个组件的vm对象  defaults.handleCancel 在defaults下面调用handleCancel方法*/
                    console.log(defaults.handleCancel)
                    defaults.handleCancel && defaults.handleCancel.call(this); //用call 不能用bind，会改变this指向，无法触发，需再次调用才触发
                    document.body.removeChild(vm.$el);  /*点击取消后 删除弹窗*/
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);/*点击后 删除弹窗*/
                }
            }
        });
        document.body.appendChild(vm.$el);  /*将这个vm添加到body中*/
    };
})();/*立即执行函数*/