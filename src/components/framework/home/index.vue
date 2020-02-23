<template>
    <div id="home">
        <div class="front">
            <div class="title">
                Wolff-H's github site
            </div>
            <div class="subtitle">
                The site is especially for hosting my project demos, or recording information. <br>
                Please feel free to open issue if you find any bugs or have some suggestions.
            </div>
        </div>
        <div class="entries">
            <div class="entry demos"
                @click="routeToDemos()"
            >
                Demos
            </div>
            <div class="entry github"
                @click="jumpToGithub()"
            >
                Github
            </div>
            <div class="entry site-repo"
                @click="jumpToSiteRepo()"
            >
                Site Repo
            </div>
        </div>
        <div class="demos-list">
            <div class="preview"></div>
            <div class="preview"></div>
            <div class="preview"></div>
            <div class="preview"></div>
            <div class="preview"></div>
            <div class="preview"></div>
            <div class="preview"></div>
        </div>
    </div>
</template>



<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {

        },
        methods:
        {
            routeToDemos() :void
            {
                this.$router.push({path: '/demos'})
                // this.$router.push({path: '/demos/dragscroll'})
            },
            jumpToGithub() :void
            {
                window.open('https://github.com/Wolff-H/', '_blank')
            },
            jumpToSiteRepo() :void
            {
                window.open('https://github.com/Wolff-H/wolff-h.github.io', '_blank')
            },
        },
    })
</script>



<style lang="stylus">
    @import _colorset

    // basic //////////////////////////////////////////////////////////////////////////////////////////////////////////
    #home

        >.front
            height 400px
            background-color #159957
            background-image linear-gradient(120deg, #155799, #159957)
    
            >.title
                font-size 48px
                text-align center
                padding 100px
    
            >.subtitle
                text-align center
        
        >.entries
            border-bottom 1px solid $black40
            padding 5px 20%
            background-color $black03

            >.entry
                display inline-flex
                align-items center
                justify-content center
                height 40px
                width 160px
                cursor pointer
                margin-right 5px
                color white
            
            >.entry.demos
                background-color $blue60
                &:hover
                    background-color $blue50
            
            >.entry.github
                float right
                background-color $black40
                &:hover
                    background-color $black30

            >.entry.site-repo
                float right
                background-color $black40
                &:hover
                    background-color $black30
        
        >.demos-list
            display flex
            padding 20px 20%
            flex-wrap wrap

            >.preview
                width 200px
                height 200px
                border 1px solid $black20
                margin 0px 20px 20px 0px

        

        
</style>
