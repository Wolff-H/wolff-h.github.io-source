<template>
    <div id="in-viewport" class="demo">
        <p>
            This library is no more required, as there's a modern
            <a 
                href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
                target="_blank"
            >
                Intersection_Observer_API
            </a>
            available nowadays.
        </p>
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

            }
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #in-viewport
        display flex
        align-items center
        justify-content center

</style>
