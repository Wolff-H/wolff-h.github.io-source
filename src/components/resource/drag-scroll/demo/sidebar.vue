<template>
    <div class="sidebar">
        <ul>
            <li>
                <div class="topic">Links</div>
                <ul>
                    <li>
                        <a class="entry"
                            href="https://github.com/Wolff-H/drag-scroll/blob/master/README.md"
                            target="_blank"
                        >
                            readme
                        </a>
                    </li>
                    <li>
                        <a class="entry"
                            href="https://github.com/Wolff-H/drag-scroll/"
                            target="_blank"
                        >
                            github
                        </a>
                    </li>
                    <li>
                        <a class="entry"
                            href="https://www.npmjs.com/package/@wolff-h/drag-scroll"
                            target="_blank"
                        >
                            npm
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
                    '0':     ['' , 'basic'],
                    '1':     ['1', 'seperate element and container'],
                    '2':     ['2', 'scroll only on one axis'],
                    '3':     ['3', 'reverse scroll direction'],
                    '4':     ['4', 'swap controls'],
                    '5':     ['5', 'scaled drag and scroll'],
                    '6':     ['6', 'update & disable an existing drag-scroll'],
                    '7':     ['7', 'Example: a dragscrollable table'],
                }
            }
        },
        methods:
        {
            routeToCase(case_name:string) :void
            {
                if(case_name != this.using_case)
                {
                    this.$router.push({path: `/demos/drag-scroll/${this.cases[case_name][0]}`})
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
