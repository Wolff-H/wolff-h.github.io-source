<template>
    <div id="TSP-graphing" class="demo">
        <div class="title">
            TSP solving by GA Graphing Tool
        </div>
        <el-popover
            placement="bottom"
            title="Guide"
            width="500"
            trigger="click"
        >
            <el-button class="button guide"
                slot="reference"
                size="small"
            >
                Guide
            </el-button>
            <h4>grey options</h4>
            <p>
                If an option (of instance selector or algorithm selector) is grey, it means the relevant data or datafile is currently not available.
                I will make updates in the future. Some data could be too big to use (e.g. Canada).
            </p>
        </el-popover>
        <div class="main">
            <el-tabs class="tabs"
                type="border-card"
            >
                <el-tab-pane class="pane experiment"
                    :style="if_show_dashboard ? 'width: calc(100% - 400px);' : 'width: initial;'"
                    label="Experiment"
                >
                    <div>
                        <div class="title">Time Cost</div>
                        <div class="subtitle">time cost of each trial</div>
                        <div class="figure time-cost"></div>
                    </div>
                    <div class="divbar"></div>
                    <div>
                        <div class="title">Result</div>
                        <div class="subtitle">based on each generation's max、avg、min distance</div>
                        <div class="figure result"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="pane evolution"
                    :style="if_show_dashboard ? 'width: calc(100% - 400px);' : 'width: initial;'"
                    label="Evolution"
                >
                    <div class="title">Distance Trend</div>
                    <div class="subtitle">based on each generation's max、avg、min distance</div>
                    <div class="figure distance-trend"></div>
                </el-tab-pane>
                <el-tab-pane class="pane generation"
                    :style="if_show_dashboard ? 'width: calc(100% - 400px);' : 'width: initial;'"
                    label="Generation"
                >
                    <!--  -->
                </el-tab-pane>
                <el-tab-pane class="pane individual"
                    :style="if_show_dashboard ? 'width: calc(100% - 400px);' : 'width: initial;'"
                    label="Individual"
                >
                    <!--  -->
                </el-tab-pane>
                <el-tab-pane class="pane plain-map"
                    :style="if_show_dashboard ? 'width: calc(100% - 400px);' : 'width: initial;'"
                    label="Plain Map"
                >
                    <div class="figure plain-map" ref="figure_plain_map"></div>
                </el-tab-pane>
            </el-tabs>
            <el-select class="selector instance"
                v-model="using_instance"
                placeholder="select an instance"
                @change="drawPlainMap()"
            >
                <el-option :key="0" :value="'WesternSahara'">WesternSahara</el-option>
                <el-option :key="1" :value="'Uruguay'">Uruguay</el-option>
                <el-option :key="2" :value="'Canada'" disabled>Canada</el-option>
            </el-select>
            <el-select class="selector algorithm"
                v-model="using_algorithm"
                placeholder="select an algorithm"
            >
                <el-option :key="0" :value="'basic'" disabled>basic</el-option>
                <el-option :key="1" :value="'advanced'">advanced</el-option>
            </el-select>
            <el-button class="dashboard button"
                @click="toggleDashboard()"
                size="medium"
            >
                Dashboard
            </el-button>
            <div class="dashboard panel"
                v-show="if_show_dashboard"
            >
                <div class="title">Trial</div>
                <el-slider 
                    v-model="trial_n"
                    :min="1"
                    :max="trial_all"
                    show-input
                ></el-slider>
                <div class="divbar"></div>
                <div class="title">Generation</div>
                <el-slider 
                    v-model="generation_n"
                    :min="1"
                    :max="generation_all"
                    show-input
                ></el-slider>
                <div class="divbar"></div>
                <div class="title">Individual (best-worst)</div>
                <el-slider 
                    v-model="individual_n"
                    :min="1"
                    :max="2"
                    show-input
                ></el-slider>
                <div class="divbar"></div>
                <div class="title">Details</div>
                <div class="details">
                    <ul>
                        <li>
                            <ul>
                                Generation
                                <li>average distance: ???</li>
                                <li>shortest distance: ???</li>
                                <li>longtest distance: ???</li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                Individual
                                <li>
                                    progress ratio: ???
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="divbar"></div>
                <div class="title">Route</div>
                <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="here shows current route"
                    v-model="using_route">
                </el-input>
            </div>
        </div>
    </div>
</template>



<script lang="ts">
    import coords_WesternSahara from '../data/coords_WesternSahara'
    import coords_Uruguay from '../data/coords_Uruguay'
    // import coords_Canada from '../data/coords_Canada'
    import DrawingModule from './DrawingModule'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            
        },
        data()
        {
            return{
                using_instance: '',
                using_algorithm: 'advanced',

                if_show_dashboard: true,

                trial_n: 1,
                trial_all: 10,

                generation_n: 1,
                generation_all: 100,

                individual_n: 1,

                using_route: '',

            }
        },
        methods:
        {
            toggleDashboard() :void
            {
                this.if_show_dashboard = !this.if_show_dashboard
            },

            // plain map //
            drawPlainMap()
            {
                switch(this.using_instance)
                {
                    case 'WesternSahara':
                        DrawingModule.drawPlainMap(coords_WesternSahara, this.$refs.figure_plain_map)
                        break
                    case 'Uruguay':
                        DrawingModule.drawPlainMap(coords_Uruguay, this.$refs.figure_plain_map)
                        break
                    // case 'Canada':
                    //     DrawingModule.drawPlainMap(coords_Canada, this.$refs.figure_plain_map)
                    //     break
                    default:
                        break
                }
            }
        },
        mounted()
        {

        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #TSP-graphing.demo
        padding 8px

        >.title
            display flex
            align-items center
            justify-content center
            font-size 24px
            height 40px
        
        .button.guide
            position absolute
            left 8px
            top 10px

        >.main
            position relative
            height 1000px
            
            >.tabs
                height 100%

                .pane
                    overflow auto
                    
                    .title
                        font-weight bold
                        color $black60

                    .subtitle
                        color $black60
                    
                    .figure.time-cost, .figure.result
                        height 400px
                        width 1850px
                        border 1px solid $black10
                    
                    .figure.plain-map
                        height 900px
                        width 1850px
                
                .divbar
                    width 100%
                    border-bottom 1px solid $black20
                    margin 5px 0px 5px 0px
            
            >.selector.instance, >.selector.algorithm
                position absolute
                top 0px
                height 40px
                width 200px

                input
                    border-radius 0px
                    background-color $black03
                    
            >.selector.instance
                right 600px
            
            >.selector.algorithm
                right 400px

            >.dashboard.button
                position absolute
                right 0px
                top 0px
                height 40px
                border-radius 0px
                width 400px
                background-color $black03

            >.dashboard.panel
                position absolute
                top 40px
                right 0px
                height (1000 - 40)px
                width 401px
                background-color $black03
                border 1px solid $black10
                border-left-width 2px
                border-top none
                padding 10px

                >.title
                    font-weight bold
                    color $black60
                    padding 5px 0px 10px 0px
                
                >.divbar
                    width 100%
                    border-bottom 1px solid $black20
                    margin 15px 0px 10px 0px

                .el-slider__button-wrapper, .el-slider__button.hover, .el-slider__button:hover
                    cursor pointer

                >.details

                    li
                        list-style-type none
                        color $black60
                        margin-left 20px
                    
                    >ul>li>ul>li
                        font-size 14px



</style>
