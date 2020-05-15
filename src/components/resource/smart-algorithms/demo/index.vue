<template>
    <div id="smart-algorithms" class="demo">
        <sidebar></sidebar>
        <div class="region case">
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
    #smart-algorithms

        .region.case

            .el-tabs
                height 100%

                .el-tabs__active-bar
                    height 4px

                .el-tabs__item
                    font-size 16px
                    font-weight bold

                .el-tabs__content
                    height calc(100% - 55px)

                    .el-tab-pane
                        height 100%
        
        iframe
            height 100%
            width 100%
            border none

</style>
