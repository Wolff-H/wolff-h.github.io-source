<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>



<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend
    ({
        name: 'app',

        components: 
        {

        }
    })
</script>



<style lang="stylus">
    @import _colorset
    
    @import '~@/assets/stylesheets/overall/index.styl'

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #app
        // 
    // z-indexes ///////////////////////////////////////////////////////////////////////////////////////////////////////
    #app

        #demos

            >#headbar
                z-index 1000
</style>
