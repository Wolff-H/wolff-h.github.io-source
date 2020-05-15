<template>
    <div class="sidebar">
        <ul>
            <li>
                <div class="topic">Links</div>
                <ul>
                    <li>
                        <a class="entry"
                            href="https://github.com/Wolff-H/COMP-3-200/blob/master/README.md"
                            target="_blank"
                        >
                            readme
                        </a>
                    </li>
                    <li>
                        <a class="entry"
                            href="https://github.com/Wolff-H/COMP-3-200"
                            target="_blank"
                        >
                            github
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <div class="topic">Demos</div>
                <ul>
                    <li class="entry"
                        v-for="(case_info, case_name) in cases"
                        :key="case_name"
                        :class="highlightEntry(case_name)"
                        @click="routeToCase(case_name)"
                    >
                        {{   case_info[1]   }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>



<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            
        },
        data()
        {
            return{
                using_case: '0',
                // cases //
                /*
                    {
                        case_name: [route_name, title]
                    }
                */
                cases:
                {
                    'content':                  ['' ,                       'Content'                               ],
                    'a-star-pathfinding':       ['a-star-pathfinding',      'A-star pathfinding'                    ],
                    'jps-pathfinding':          ['jps-pathfinding',         'JPS pathfinding'                       ],
                    'alpha-beta-method':        ['alpha-beta-method',       'Alpha-Beta method'                     ],
                    'multi-armed-bandit':       ['multi-armed-bandit',      'Reinforcement Learning: N-Armed Bandit'],
                    'rl-q-learning':            ['rl-q-learning',           'Reinforcement Learning: Q-Learning'    ],
                }
            }
        },
        methods:
        {
            routeToCase(case_name:string) :void
            {
                if(case_name != this.using_case)
                {
                    this.$router.push({path: `/demos/smart-algorithms/${this.cases[case_name][0]}`})
                }

                this.using_case = case_name
            },
            highlightEntry(case_name:string)
            {
                return this.using_case == case_name ? {'o-selected': true} : {'o-selected': false}
            }
        },
        watch:
        {
            $router: function()
            {
                console.log(this.$router);
            }
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // .sidebar
        
    //     *
    //         user-select none
        
    //     li
    //         cursor default

    //     li.entry.o-selected
    //         background-color $blue20

</style>
