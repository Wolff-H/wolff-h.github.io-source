import VueRouter from 'vue-router'

import Home from '@/components/framework/home/index.vue'
import Demos from '@/components/framework/demos/index.vue'

import DemosDefaultView from '@/components/resource/demos-default-view/index.vue'
import DemoDragScroll from '@/components/resource/drag-scroll/demo/index.vue'
import TSPGraphing from '@/components/resource/TSP-graphing/demo/index.vue'

const routes =
[
    {
        path: "/",
        component: Home,
    },
    {
        path: "/demos",
        component: Demos,
        children:
        [
            {
                path: "",
                component: DemosDefaultView,
            },
            {
                path: "drag-scroll",
                component: DemoDragScroll,
            },
            {
                path: "TSP-graphing",
                component: TSPGraphing,
            },
        ]
    },
]

const router = new VueRouter
(
    {
        // mode: 'history',
        routes: routes,
    }
)

export default router