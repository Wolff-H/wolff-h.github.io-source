<template>
    <div class="sidebar">
        <ul>
            <li>
                <div class="topic">Links</div>
                <ul>
                    <li>
                        <a class="entry"
                            href="https://github.com/Wolff-H/stick-element/blob/master/README.md"
                            target="_blank"
                        >
                            readme
                        </a>
                    </li>
                    <li>
                        <a class="entry"
                            href="https://github.com/Wolff-H/stick-element/"
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
                    '0':     ['' , 'basic'],
                    '1':     ['1', 'cross-level sticky'],
                    '2':     ['2', 'update/disable/distroy stick-element'],
                    '3':     ['3', 'case 3'],
                }
            }
        },
        methods:
        {
            routeToCase(case_name:string) :void
            {
                if(case_name != this.using_case)
                {
                    this.$router.push({path: `/demos/stick-element/${this.cases[case_name][0]}`})
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
    

</style>
