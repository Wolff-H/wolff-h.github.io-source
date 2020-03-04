<template>
    <div class="case basic">
        <h2>
            basic - content in its container
        </h2> 
        <br><br><br>
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
            dragScroll
            (
                {
                    element: this.$refs.element,
                    container: this.$refs.container,
                }
            )
        </pre>
        <h4>
            select element/container with a selector string
        </h4>
        <pre>
            dragScroll
            (
                {
                    element: '#drag-scroll .case.basic .container>img',
                    container: '#drag-scroll .case.basic .container',
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
    #drag-scroll .case.basic
        
        >.container
            width 800px
            height 600px
            overflow auto
</style>
