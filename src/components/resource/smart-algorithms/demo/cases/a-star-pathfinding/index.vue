<template>
    <el-tabs id="a-star-pathfinding" class="case"
        v-model="active_tab"
    >
        <el-tab-pane label="introduction" name="introduction">
            intro
        </el-tab-pane>
        <el-tab-pane label="application" name="application">
            <iframe
                src="./html-files/a-star-pathfinding/index.html"
            ></iframe>
        </el-tab-pane>
    </el-tabs>
</template>



<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend
    ({

        data()
        {
            return{
                active_tab: 'application',
            }
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #a-star-pathfinding.case
        border none
        
</style>
