import VueRouter from 'vue-router'

import Home from '@/components/framework/home/index.vue'
import Demos from '@/components/framework/demos/index.vue'

import DemosDefaultView from '@/components/resource/demos-default-view/index.vue'

// drag-scroll ---------------------------------------------------------------------------------------------------------
import DragScroll from '@/components/resource/drag-scroll/demo/index.vue'
// cases //
import DragScroll_case_basic from '@/components/resource/drag-scroll/demo/cases/basic.vue'
import DragScroll_case_1 from '@/components/resource/drag-scroll/demo/cases/1.vue'
import DragScroll_case_2 from '@/components/resource/drag-scroll/demo/cases/2.vue'
import DragScroll_case_3 from '@/components/resource/drag-scroll/demo/cases/3.vue'
import DragScroll_case_4 from '@/components/resource/drag-scroll/demo/cases/4.vue'
import DragScroll_case_5 from '@/components/resource/drag-scroll/demo/cases/5.vue'
import DragScroll_case_6 from '@/components/resource/drag-scroll/demo/cases/6.vue'
import DragScroll_case_7 from '@/components/resource/drag-scroll/demo/cases/7.vue'

// stick-element -------------------------------------------------------------------------------------------------------
import StickElement from '@/components/resource/stick-element/demo/index.vue'
// cases //
import StickElement_case_basic from '@/components/resource/stick-element/demo/cases/basic.vue'
import StickElement_case_1 from '@/components/resource/stick-element/demo/cases/1.vue'
import StickElement_case_2 from '@/components/resource/stick-element/demo/cases/2.vue'
import StickElement_case_3 from '@/components/resource/stick-element/demo/cases/3.vue'

// in-viewport ---------------------------------------------------------------------------------------------------------
import InViewport from '@/components/resource/in-viewport/demo/index.vue'

// TSP-graphing --------------------------------------------------------------------------------------------------------
import TSPGraphing from '@/components/resource/TSP-graphing/demo/index.vue'

// smart-algorithms ----------------------------------------------------------------------------------------------------
import SmartAlgorithms from '@/components/resource/smart-algorithms/demo/index.vue'
// cases //
import SmartAlgorithms_case_Content from '@/components/resource/smart-algorithms/demo/cases/content/index.vue'
import SmartAlgorithms_case_AstarPathfinding from '@/components/resource/smart-algorithms/demo/cases/a-star-pathfinding/index.vue'
import SmartAlgorithms_case_MultiArmedBandit from '@/components/resource/smart-algorithms/demo/cases/multi-armed-bandit/index.vue'
import SmartAlgorithms_case_RLQLearning from '@/components/resource/smart-algorithms/demo/cases/rl-q-learning/index.vue'
import SmartAlgorithms_case_AlphaBetaMethod from '@/components/resource/smart-algorithms/demo/cases/alpha-beta-method/index.vue'
import SmartAlgorithms_case_JPSPathfinding from '@/components/resource/smart-algorithms/demo/cases/jps-pathfinding/index.vue'

/**********************************************************************************************************************/
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
                component: DragScroll,
                children:
                [
                    {
                        path: "",
                        component: DragScroll_case_basic,
                    },
                    {
                        path: "1",
                        component: DragScroll_case_1,
                    },
                    {
                        path: "2",
                        component: DragScroll_case_2,
                    },
                    {
                        path: "3",
                        component: DragScroll_case_3,
                    },
                    {
                        path: "4",
                        component: DragScroll_case_4,
                    },
                    {
                        path: "5",
                        component: DragScroll_case_5,
                    },
                    {
                        path: "6",
                        component: DragScroll_case_6,
                    },
                    {
                        path: "7",
                        component: DragScroll_case_7,
                    },
                ],
            },
            {
                path: "stick-element",
                component: StickElement,
                children:
                [
                    {
                        path: "",
                        component: StickElement_case_basic,
                    },
                    {
                        path: "1",
                        component: StickElement_case_1,
                    },
                    {
                        path: "2",
                        component: StickElement_case_2,
                    },
                    {
                        path: "3",
                        component: StickElement_case_3,
                    },
                ],
            },
            {
                path: "in-viewport",
                component: InViewport,
            },
            {
                path: "TSP-graphing",
                component: TSPGraphing,
            },
            {
                path: "smart-algorithms",
                component: SmartAlgorithms,
                children:
                [
                    {
                        path: "",
                        component: SmartAlgorithms_case_Content,
                    },
                    {
                        path: "a-star-pathfinding",
                        component: SmartAlgorithms_case_AstarPathfinding,
                    },
                    {
                        path: "multi-armed-bandit",
                        component: SmartAlgorithms_case_MultiArmedBandit,
                    },
                    {
                        path: "rl-q-learning",
                        component: SmartAlgorithms_case_RLQLearning,
                    },
                    {
                        path: "alpha-beta-method",
                        component: SmartAlgorithms_case_AlphaBetaMethod,
                    },
                    {
                        path: "jps-pathfinding",
                        component: SmartAlgorithms_case_JPSPathfinding,
                    },
                ],
            },
        ],
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