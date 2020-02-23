<template>
    <div id="drag-scroll" class="demo">
        <sidebar></sidebar>
        <div class="region case">
            drag-scroll
            <router-view></router-view>
        </div>
    </div>
</template>



<script lang="ts">
    import Sidebar from './sidebar.vue'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            "sidebar": Sidebar,
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

</style>
