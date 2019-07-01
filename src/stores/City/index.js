const state = {/*状态码*/
    nm: window.localStorage.getItem('nowNm') || '北京',
    id: window.localStorage.getItem('nowId') || 1
};
const actions = {};
const mutations = {/*修改状态的方法 一般方法名字要求大写，表示是状态管理的方法*/
    CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id = payload.id;  /**/
    }
};
export default {
    namespaced: true,/*区分是哪一个状态管理下的数据*/
    state,
    actions,
    mutations
};
