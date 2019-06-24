export default{
    path:'/movie',
    component:() => import('@/views/Movie'),/*一级路由时，按需引入组件  @代表src*/
    children:[   /*二级路由用children来配置，和一级路由写法很像*/
        {
            path: 'city',/*注意不要加斜杠，加斜杠则还是绝对路径，不加为相对，它能和上面的/Movie拼接在一起*/
            component: () =>import('@/components/City'),/*做成一个通用的组件来引入City*/
        },
        {
            path: 'nowPlaying',/*注意不要加斜杠，加斜杠则还是绝对路径，不加为相对，它能和上面的/Movie拼接在一起*/
            component: () =>import('@/components/NowPlaying'),/*做成一个通用的组件来引入City*/
        },
        {
            path: 'comingSoon',/*注意不要加斜杠，加斜杠则还是绝对路径，不加为相对，它能和上面的/Movie拼接在一起*/
            component: () =>import('@/components/ComingSoon'),/*做成一个通用的组件来引入City*/
        },
        {
            path: 'search',/*注意不要加斜杠，加斜杠则还是绝对路径，不加为相对，它能和上面的/Movie拼接在一起*/
            component: () =>import('@/components/Search'),/*做成一个通用的组件来引入City*/
        },
        {/*二级路由的重定向*/
            path:'/movie', redirect: '/movie/nowPlaying' /*路由重定向*/
        }
    ]
}