<template>
    <div class="case case-2">
        <h2>
            update/disable/destroy stick-element
        </h2>
        <br><br>
            1. when apply options to an existing stick-element, it'll update its settings. <br>
            2. destroy stick-element will remove all data and listeners for the target element. <br>
            if there's no longer alive element related to a container, it's also applied to the container. <br>
            3. disable stick-element will only disable the function for the target element.
        <br><br>
        <el-button>
            toggle element1
        </el-button>
        <el-button
            @click="stick_ele1()"
        >
            set element1 sticky
        </el-button>
        <el-button
            @click="freeze_ele1()"
        >
            set element1 freeze
        </el-button>
        <div class="container"
            ref="container"
        >
            <div class="element1"
                ref="element1"
            >
                e l e m e n t 1
            </div>
            <div class="pad-x">
                · · · · · · 1 · · · · · · 2 · · · · · · 3 · · · · · · 4 · · · · · · 5 · · · · · · 6 · · · · · · 7 · · · · · · 8 · · · · · · 9 · · · · · · 10 · · · · · · 11 · · · · · · 12 · · · · · · 13 · · · · · · 14 · · · · · · 15 · · · · · · 
            </div>
            
            <div class="element2"
                ref="element2"
            >
                e<br>l<br>e<br>m<br>e<br>n<br>t<br>2
            </div>
            ·<br>·<br>·<br>·<br>·<br>1<br>·<br>·<br>·<br>·<br>·<br>2<br>·<br>·<br>·<br>·<br>·<br>3<br>·<br>·<br>·<br>·<br>·<br>4<br>·<br>·<br>·<br>·<br>·<br>5<br>·<br>·<br>·<br>·<br>·<br>6<br>·<br>·<br>·<br>·<br>·<br>
        </div>
        <br>
        <hr>
        <br>
        <h3>
            code
        </h3>
        <br>
        <h4>
            select element/container by passing a reference (e.g. in a Vue component)
        </h4>
        <pre>
            
        </pre>
        <h4>
            select element/container with a selector string
        </h4>
        <pre>
            
        </pre>
    </div>
</template>



<script lang="ts">
    import stickElement from '../../stick-element'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            
        },
        data()
        {
            return{
                if_enable_ele1: true,
            }
        },
        methods:
        {
            stick_ele1()
            {
                stickElement
                (
                    {
                        element: this.$refs.element1,
                        container: this.$refs.container,
                        offset_limits:
                        {
                            top: 50,
                            left: 50,
                        },
                    }
                )
            },
            freeze_ele1()
            {
                stickElement
                (
                    {
                        element: this.$refs.element1,
                        container: this.$refs.container,
                        offset_limits:
                        {
                            top: 0,
                            left: 0,
                        },
                    }
                )
            },
            toggle_ele1()
            {
                // 
            }
        },
        mounted()
        {
            stickElement
            (
                {
                    element: this.$refs.element2,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        left: 50,
                    },
                }
            )
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #stick-element .case.case-2
        
        >.container
            width (800 + 2)px
            height (600 + 2)px
            overflow auto
            border 1px solid black
            padding 50px
            overflow auto
        
            >.element1
                position relative
                display inline-block
                width 200px
                height 50px
                background-color $black03
                border 1px solid $black40
                padding 10px
            
            >.pad-x
                display inline-block
                width 1500px

            >.element2
                position relative
                width 50px
                height 200px
                background-color $black03
                border 1px solid $black40
                padding 10px
                // writing-mode vertical-lr
            
</style>
