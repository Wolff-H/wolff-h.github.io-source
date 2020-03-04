<template>
    <div class="case case-6">
        <h2>
            update & disable an existing drag-scroll
        </h2> 
        <br><br>
            <el-button
                @click="setDragScroll_1to1()"
            >
                set 1:1 drag-scroll
            </el-button>
            <el-button
                @click="setDragScroll_50to50()"
            >
                set 50:50 drag-scroll
            </el-button>
            <el-button
                @click="disableDragScroll()"
            >
                disable drag-scroll
            </el-button>
        <br><br>
        <div class="container"
            ref="container"
        >
            <img
                src="@/assets/images/landscape-coast.jpg"
                alt="landscape-coast"
                draggable="false"
                ref="element"
            >
        </div>
        <br><br>
        <hr>
        <br>
        <h3>
            code
        </h3>
        <br>
        <pre>
            setDragScroll_1to1() :void
            {
                dragScroll
                (
                    {
                        element: this.$refs.element,
                        container: this.$refs.container,
                    }
                )
            },

            setDragScroll_50to50() :void
            {
                dragScroll
                (
                    {
                        element: this.$refs.element,
                        container: this.$refs.container,
                        x:
                        {
                            drag_scale: 50,
                            scroll_scale: 50,
                        },
                        y:
                        {
                            drag_scale: 50,
                            scroll_scale: 50,
                        },
                    }
                )
            },

            disableDragScroll() :void
            {
                dragScroll
                (
                    {
                        element: this.$refs.element,
                        container: this.$refs.container,
                        disabled: true,
                    }
                )
            },
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
        methods:
        {
            setDragScroll_1to1() :void
            {
                dragScroll
                (
                    {
                        element: this.$refs.element,
                        container: this.$refs.container,
                    }
                )
            },
            setDragScroll_50to50() :void
            {
                dragScroll
                (
                    {
                        element: this.$refs.element,
                        container: this.$refs.container,
                        x:
                        {
                            drag_scale: 50,
                            scroll_scale: 50,
                        },
                        y:
                        {
                            drag_scale: 50,
                            scroll_scale: 50,
                        },
                    }
                )
            },
            disableDragScroll() :void
            {
                dragScroll
                (
                    {
                        element: this.$refs.element,
                        container: this.$refs.container,
                        disabled: true,
                    }
                )
            },
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
    #drag-scroll .case.case-6
        
        >.container
            width 800px
            height 600px
            overflow auto


</style>
