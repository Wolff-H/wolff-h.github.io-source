<template>
    <div class="case case-4">
        <h2>
            swap controls
        </h2> 
        <br><br><br>
        vertical dragging controls horizontal drag-scroll <br>
        horizontal dragging controls vertical drag-scroll <br>
        <br>
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
            dragScroll
            (
                {
                    element: this.$refs.element,
                    container: this.$refs.container,
                    swapped: true,
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
                    element: this.$refs.element,
                    container: this.$refs.container,
                    swapped: true,
                }
            )
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #drag-scroll .case.case-4
        
        >.container
            width 800px
            height 600px
            overflow auto


</style>
