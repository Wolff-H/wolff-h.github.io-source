<template>
    <div id="demos">
        <headbar></headbar>
        <router-view></router-view>
    </div>
</template>



<script lang="ts">
    import Headbar from './headbar.vue'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            "headbar": Headbar,
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
    #demos
        position relative

        >.demo
            position fixed
            top 56px
            height calc(100vh - 56px)
            width 100%
            overflow-y auto

            >.sidebar
                width 384px
                height 100%
                background-color $black03
                border-right 1px solid $black40
                overflow-y scroll
        
                *
                    user-select none
                
                li
                    cursor default

                li.entry.o-selected
                    background-color $blue20

                ul
                    list-style-type none

                .topic
                    display flex
                    align-items center
                    width 100%
                    height 48px
                    font-size 24px
                    padding-left 8px

                .entry
                    display flex
                    align-items center
                    width 100%
                    height 40px
                    padding-left 24px
                    &:not(.o-selected):hover
                        background-color $black10

            >.region.case
                position absolute
                top 0px
                left 384px
                width calc(100% - 384px)
                height 100%
                padding 10px
                overflow auto

                >.case
                    width 100%
                    height 100%

                    pre
                        font-family microsoft yahei mono
                        font-size 16px



</style>
