import { createApp, h } from 'vue';
import { createStore } from 'vuex';
import {createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import App from './App';
import Wechat from './utils/wechat_auth.js'

Wechat.init({
	appid: 'wx4a8fb707007a7e7e',
	title: "title",
	desc: "desc", 
	link: "https://g.zhuahudong.com/bh/20210806/index.html", 
	imgUrl: "https://g.zhuahudong.com/bh/20210806/images/share_img.jpg"
});

// 创建数据仓库
const store = createStore({
    state: {},
    mutations: {}
})

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// 路由前置守卫
router.beforeEach((to, from) => {
    
})

// 创建app
const app = createApp({
    render: () => h(App)
});
app.config.productionTip = false;
app.use(store)
app.use(router);
app.config.globalProperties.$app = app;
app.mount('#app');