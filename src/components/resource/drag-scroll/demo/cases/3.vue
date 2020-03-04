<template>
    <div class="case case-3">
        <h2>
            reverse scroll direction
        </h2> 
        <br><br><br>
        reverse both directions
        <div class="container"
            ref="container1"
        >
            <img
                src="@/assets/images/landscape-coast.jpg"
                alt="landscape-coast"
                draggable="false"
                ref="element1"
            >
        </div>
        <br><br>
        reverse only y direction
        <div class="container"
            ref="container2"
        >
            <img
                src="@/assets/images/landscape-coast.jpg"
                alt="landscape-coast"
                draggable="false"
                ref="element2"
            >
        </div>
        <br><br>
         reverse only x direction
        <div class="container"
            ref="container3"
        >
            <img
                src="@/assets/images/landscape-coast.jpg"
                alt="landscape-coast"
                draggable="false"
                ref="element3"
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
            dragScroll
            (
                {
                    element: this.$refs.element1,
                    container: this.$refs.container1,
                    x:
                    {
                        move: -1,
                    },
                    y:
                    {
                        move: -1,
                    },
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element2,
                    container: this.$refs.container2,
                    y:
                    {
                        move: -1,
                    },
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element3,
                    container: this.$refs.container3,
                    x:
                    {
                        move: -1,
                    },
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
                    x:
                    {
                        move: -1,
                    },
                    y:
                    {
                        move: -1,
                    },
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element2,
                    container: this.$refs.container2,
                    y:
                    {
                        move: -1,
                    },
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.element3,
                    container: this.$refs.container3,
                    x:
                    {
                        move: -1,
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
    #drag-scroll .case.case-3
        
        >.container
            width 800px
            height 600px
            overflow auto

</style>
