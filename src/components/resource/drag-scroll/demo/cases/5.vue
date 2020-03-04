<template>
    <div class="case case-5">
        <h2>
            scaled drag and scroll
        </h2> 
        <br><br>
            drag/scroll response is in the given ratio
        <br><br>
            normal drag-scroll (scale 1:1)
        <br><br>
        <div class="container" ref="container1">
            <div class="element" ref="element1">
                <span v-for="n in 20" :key="n">{{   n   }}</span>
            </div>
        </div>
        <br><br>
            drag is triggered per 2px (scale 2:1)
        <br><br>
        <div class="container" ref="container2">
            <div class="element" ref="element2">
                <span v-for="n in 20" :key="n">{{   n   }}</span>
            </div>
        </div>
        <br><br>
            per drag moves 2px scroll (scale 2:1)
        <br><br>
        <div class="container" ref="container3">
            <div class="element" ref="element3">
                <span v-for="n in 20" :key="n">{{   n   }}</span>
            </div>
        </div>
        <br><br>
            per 25px triggers a drag, and per drag moves 25px scroll (scale 25:25)
        <br><br>
        <div class="container" ref="container4">
            <div class="element" ref="element4">
                <span v-for="n in 20" :key="n">{{   n   }}</span>
            </div>
        </div>
        <br><br>
        <hr>
        <br>
        <h3>
            code
        </h3>
        <br>
        <pre>
            dragScroll
            (
                {
                    element: this.$refs.element1,
                    container: this.$refs.container1,
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element2,
                    container: this.$refs.container2,
                    x:
                    {
                        drag_scale: 2,
                    }
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element3,
                    container: this.$refs.container3,
                    x:
                    {
                        scroll_scale: 2,
                    }
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element4,
                    container: this.$refs.container4,
                    x:
                    {
                        drag_scale: 25,
                        scroll_scale: 25,
                    }
                }
            )
        </pre>
    </div>
</template>



<script lang="ts">
    import dragScroll from '../../drag-scroll'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            
        },
        data()
        {
            return{

            }
        },
        mounted()
        {
            dragScroll
            (
                {
                    element: this.$refs.element1,
                    container: this.$refs.container1,
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element2,
                    container: this.$refs.container2,
                    x:
                    {
                        drag_scale: 2,
                    }
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element3,
                    container: this.$refs.container3,
                    x:
                    {
                        scroll_scale: 2,
                    }
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element4,
                    container: this.$refs.container4,
                    x:
                    {
                        drag_scale: 25,
                        scroll_scale: 25,
                    }
                }
            )
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #drag-scroll .case.case-5
        
        >.container
            width (500 + 2)px
            height (50 + 2)px
            overflow-x auto
            border 1px solid black
            &::-webkit-scrollbar
                display none

            >.element
                height 50px
                width 1000px
                
                *
                    user-select none
                    cursor default
            
                >span
                    display inline-flex
                    align-items center
                    width 50px
                    height 100%
                    &:nth-child(2n)
                        background-color $black10


</style>
