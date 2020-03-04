<template>
    <div class="case case-1">
        <h2>
            seperate element and container
        </h2> 
        <br><br><br>
            use the touchpad right hand side to scroll the container <br><br>
        <div class="container"
            ref="container"
        >
            <img
                src="@/assets/images/landscape-coast.jpg"
                alt="landscape-coast"
                draggable="false"
            >
        </div>
        <div class="touchpad"
            draggable="false"
            ref="element"
        ></div>
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
                    element: '#drag-scroll .case.case-1 .touchpad',
                    container: '#drag-scroll .case.case-1 .container',
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
                }
            )
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #drag-scroll .case.case-1
        
        >.container
            display inline-block
            width 800px
            height 600px
            overflow auto
        
        >.touchpad
            display inline-block
            width 400px
            height 300px
            background-color $black20
            margin-left 100px

</style>
