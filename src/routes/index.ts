import {createRouter, createWebHistory, RouteLocationNormalizedGeneric} from 'vue-router'
import HomeView from "../views/HomeView.vue";
import NotFoundView from '../views/NotFoundView.vue';
import NetworkErrorView from "../views/NetworkErrorView.vue";
import DetailView from "../views/passenger/DetailView.vue";
import LayoutView from "../views/passenger/LayoutView.vue";
import AirlineView from '../views/passenger/AirlineView.vue';


const routes = [
    {
        path: '/',
        component: HomeView,
        name: 'home',
        props: (route: RouteLocationNormalizedGeneric) => ({
            page: parseInt(route.query?.page?.toString() || "1"),
            per_page: parseInt(route.query?.per_page?.toString() || "10")
        }),
    },
    {
        path: "/:id",
        component: LayoutView,
        props: true,
        children: [
            {path: "details", name: "passenger-detail-view", component: DetailView, props: true},
            {path: "airline", name: "passenger-airline-view", component: AirlineView, props: true}
        ]
    },
    {path: '/network-error', component: NetworkErrorView, name: 'network-error'},
    {path: '/:resource(.*)', component: NotFoundView, name: 'not-found', props: true},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router