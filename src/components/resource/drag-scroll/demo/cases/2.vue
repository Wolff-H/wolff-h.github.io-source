<template>
    <div class="case case-2">
        <h2>
            scroll on only one axis
        </h2> 
        <br><br><br>
        scroll only on y-axis <br><br>
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
        scroll only on x-axis <br><br>
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
                    element: '#drag-scroll .case.case-2 .element1',
                    container: '#drag-scroll .case.case-2 .container1',
                    x:
                    {
                        move: 0,
                    },
                }
            )

            dragScroll
            (
                {
                    element: '#drag-scroll .case.case-2 .element2',
                    container: '#drag-scroll .case.case-2 .container2',
                    y:
                    {
                        move: 0,
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
                        move: 0,
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
                        move: 0,
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
    #drag-scroll .case.case-2
        
        >.container
            width 800px
            height 600px
            overflow auto


</style>
