<template>
    <div id="home">
        <div class="front">
            <!-- <img src="@/assets/images/desktop.jpeg" alt=""> -->
            <div class="title">
                Wolff-H's github site
            </div>
            <div class="subtitle">
                The site is especially for hosting my project demos, or recording information. <br>
                Please feel free to open issue if you find any bugs or have some suggestions. <br>
                <br>
                Happy coding! \(^o^)/
            </div>
        </div>
        <div class="entries">
            <div class="entry demos"
                @click="routeToDemos()"
            >
                Demos
            </div>
            <div class="entry resume"
                @click="jumpToResume()"
            >
                Resume
            </div>
            <div class="entry github"
                @click="jumpToGithub()"
            >
                Github
            </div>
            <div class="entry site-source-repo"
                @click="jumpToSiteSourceRepo()"
            >
                Source Repo
            </div>
            <div class="entry site-repo"
                @click="jumpToSiteRepo()"
            >
                Site Repo
            </div>
        </div>
        <div class="demos-list">
            <el-popover popper-class="project-preview-popover"
                content="drag-scroll"
                trigger="hover"
            >
                <div class="preview"
                    slot="reference"
                    @click="routeToDemo('drag-scroll')"
                >
                    <img src="@/assets/images/demo-previews/drag-scroll.png" alt="drag-scroll">
                </div>
            </el-popover>
            <el-popover popper-class="project-preview-popover"
                content="stick-element"
                trigger="hover"
            >
                <div class="preview"
                    slot="reference"
                    @click="routeToDemo('stick-element')"
                >
                    <img src="@/assets/images/demo-previews/stick-element.png" alt="stick-element">
                </div>
            </el-popover>
            <el-popover popper-class="project-preview-popover"
                content="tsp-graphing"
                trigger="hover"
            >
                <div class="preview"
                    slot="reference"
                    @click="routeToDemo('tsp-graphing')"
                >
                    <img src="@/assets/images/demo-previews/tsp-graphing.png" alt="tsp-graphing">
                </div>
            </el-popover>
            <el-popover popper-class="project-preview-popover"
                content="smart-algorithms"
                trigger="hover"
            >
                <div class="preview"
                    slot="reference"
                    @click="routeToDemo('smart-algorithms')"
                >
                    <img src="@/assets/images/demo-previews/smart-algorithms.png" alt="smart-algorithms">
                </div>
            </el-popover>
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
            jumpToResume() :void
            {
                window.open('./single-files/Resume-Tingrui_Hu.pdf', '_blank')
            },
            jumpToGithub() :void
            {
                window.open('https://github.com/Wolff-H/', '_blank')
            },
            jumpToSiteRepo() :void
            {
                window.open('https://github.com/Wolff-H/wolff-h.github.io', '_blank')
            },
            jumpToSiteSourceRepo() :void
            {
                window.open('https://github.com/Wolff-H/wolff-h.github.io-source', '_blank')
            },
            routeToDemo(demo_name:string) :void
            {
                this.$router.push({ path: `/demos/${demo_name}` })
            },
        },
    })
</script>



<style lang="stylus">
    @import _colorset

    // basic //////////////////////////////////////////////////////////////////////////////////////////////////////////
    #home

        >.front
            height 432px
            background-color #159957
            // background-image linear-gradient(120deg, #155799, #159957)
            background-image url('~@/assets/images/desktop.jpeg')
            background-size 100%
            // background-position-y -500px
            background-position bottom
    
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
            
            >.entry.resume
                background-color $black70
                &:hover
                    background-color $black60
            
            >.entry.github, >.entry.site-repo, >.entry.site-source-repo
                float right
                background-color $black40
                &:hover
                    background-color $black30
        
        >.demos-list
            display flex
            padding 20px 20%
            flex-wrap wrap

            .preview
                display flex
                align-items center
                width 268px
                height 268px
                border 1px solid $black20
                margin 0px 20px 20px 0px
                cursor pointer
                &:hover
                    box-shadow: 0px 0px 10px $blue60

                >img
                    // height 100%
                    width 100%
    
    body
        
        .project-preview-popover.el-popover
            padding 12px
            min-width initial
            font-size 16px
            font-weight bold

        

        
</style>
