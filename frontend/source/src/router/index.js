import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ArticleWriting from '@/components/ArticleWriting'
import ArticleReview from '@/components/ArticleReview'
import PageNotFound from '@/components/PageNotFound'
import Recommenders from '@/components/Recommenders'
//import { store } from '@/store'
//import AlertService from '@/services/alert.service'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: {
                name: 'dashboard',
                isAdmin: true,
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                name: 'Dashboard',
                isAdmin: true,
            },
        },
        {
            path: '/create-new-article',
            name: 'create-new-article',
            component: ArticleWriting,
            meta: {
                name: 'create',
                isAdmin: true,
            },
        },
        {
            path: '/article-review',
            name: 'article-review',
            component: ArticleReview,
            meta: {
                name: 'review',
                isAdmin: true,
            },
        },
        {
            path: '/recommenders',
            name: 'recommenders',
            component: Recommenders,
            meta: {
                name: 'videos',
                isAdmin: true,
            },
        },
        {
            path: '/404',
            name: '404',
            component: PageNotFound,
            meta: {
                name: '404',
                isAdmin: false,
            },
        },
        {
            path: '*',
            redirect: '/404',
        },
    ]
});

router.beforeEach(async (to, from, next) => {
    //store.dispatch('getConfig');
    /*document.title = `Alice Admin - ${to.meta.name}`;
    const requiresAdmin = to.matched.some(record => record.meta.isAdmin);
    try {
        const account = await store.dispatch('account');
        if (requiresAdmin) {
            if (account.isAdmin) return next();
            return next({ path: '/404' });
        }
        return next();
    } catch (error) {
        AlertService.snackbar(error.data);
        window.location.reload();
    }*/
    next();
})

export default router;