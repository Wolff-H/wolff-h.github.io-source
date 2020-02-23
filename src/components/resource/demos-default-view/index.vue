<template>
    <div class="demo default-view">
        <span>
            Select a project name to view its demos
        </span>
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
    #demos .demo.default-view
        display flex
        align-items center
        justify-content center

        >span
            color $black40
            font-size 24px

</style>
