export default{
    path:'/mine',
    component:() => import('@/views/Mine'),/*按需引入组件  @代表src*/
    children:[
        {
            path:''
        }
    ]
}