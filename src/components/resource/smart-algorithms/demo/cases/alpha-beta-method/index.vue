<template>
    <el-tabs id="alpha-beta-method" class="case"
        v-model="active_tab"
    >
        <el-tab-pane label="introduction" name="introduction">
            intro
        </el-tab-pane>
        <el-tab-pane label="application" name="application">
            <iframe
                src="./html-files/alpha-beta-method/index.html"
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
    #alpha-beta-method.case
        border none
        
</style>
