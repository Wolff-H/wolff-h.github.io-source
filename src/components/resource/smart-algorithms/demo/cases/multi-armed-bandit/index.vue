<template>
    <el-tabs id="multi-armed-bandit" class="case"
        v-model="active_tab"
    >
        <el-tab-pane label="introduction" name="introduction">
            intro
        </el-tab-pane>
        <el-tab-pane label="application" name="application">
            <iframe
                src="./html-files/multi-armed-bandit/index.html"
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
    #multi-armed-bandit.case
        border none
        
</style>
