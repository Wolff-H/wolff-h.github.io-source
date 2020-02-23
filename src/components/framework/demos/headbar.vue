<template>
    <div class="headbar">
        <el-select class="demo-select"
            v-model="using_demo"
            placeholder="select a project"
            @change="routeToDemo()"
        >
            <el-option label="drag-scroll" value="drag-scroll"></el-option>
            <el-option label="float-element" value="float-element"></el-option>
            <el-option label="in-viewport" value="in-viewport"></el-option>
            <el-option label="stick-element" value="stick-element"></el-option>
            <el-option label="TSP-graphing" value="TSP-graphing"></el-option>
        </el-select>
        <!-- <img class="operation refresh"
            alt="refresh"
            src="@/assets/icons/other/refresh.svg"
            @click="refresh()"
        > -->
        <img class="operation home"
            alt="home"
            src="@/assets/icons/other/home.svg"
            @click="routeToHome()"
        >
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
            // 0 //
            return{
                using_demo: '',
            }
        },
        methods:
        {
            routeToHome() :void
            {
                this.$router.push({path: '/'})
            },
            routeToDemo() :void
            {
                console.log(this.using_demo)

                if(this.using_demo != this.$router.currentRoute.fullPath)
                {
                    this.$router.push({path: `/demos/${this.using_demo}`})
                }
            },
            refresh() :void
            {
                this.$router.go(0)
            },
        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #demos>.headbar
        display flex
        position fixed
        width 100%
        height 56px
        background-color $black03
        border-bottom 1px solid $black40
        align-items center

        >.demo-select
            width 363px
            margin 0px 10px 0px 10px
        
        >.operation
            width 40px
            height 40px
            margin 0px 10px 0px 10px
            opacity 0.5
            cursor pointer

        >.home
            position absolute
            right 10px
            

</style>
