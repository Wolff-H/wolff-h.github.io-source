<template>
    <div class="case case-3">
        <h2>
            capture behaviour
        </h2> 
        <br><br>
            element can be "captured" when it enters container's viewport
        <br><br>
        <div class="container"
            ref="container"
        >
            ·<br>·<br>·<br>·<br>·<br>1<br>·<br>·<br>·<br>·<br>·<br>2<br>·<br>·<br>·<br>·<br>·<br>3<br>·<br>·<br>·<br>·<br>·<br>4<br>·<br>·<br>·<br>·<br>·<br>5<br>·<br>·<br>·<br>·<br>·<br>6<br>·<br>·<br>·<br>·<br>·<br>
            <div class="pad-x">
                · · · · · · 1 · · · · · · 2 · · · · · · 3 · · · · · · 4 · · · · · · 5 · · · · · · 6 · · · · · · 7 · · · · · · 8 · · · · · · 9 · · · · · · 10 · · · · · · 11 · · · · · · 12 · · · · · · 13 · · · · · · 14 · · · · · · 15 · · · · · · 
                <div class="element"
                    ref="element"
                >
                    element
                </div>
            </div>
            7<br>·<br>·<br>·<br>·<br>·<br>8<br>·<br>·<br>·<br>·<br>·<br>
        </div>
        <br>
        <hr>
        <br>
        <h3>
            code
        </h3>
        <br>
        <pre>

        </pre>
    </div>
</template>



<script lang="ts">
    import stickElement from '../../stick-element'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            
        },
        data()
        {
            return{

            }
        },
        mounted()
        {
            stickElement
            (
                {
                    element: this.$refs.element,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        bottom: 50,
                    }
                }
            )


        },
    })
</script>



<style lang="stylus">
    @import _colorset
    // stateful ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // basic ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    #stick-element .case.case-3
        
        >.container
            width (800 + 2)px
            height (600 + 2)px
            overflow auto
            border 1px solid black
            padding 50px
            overflow auto

       
            
            >.pad-x
                position relative
                display inline-block
                width 1500px

                >.element
                    // position absolute
                    display inline-block
                    width 200px
                    height 50px
                    background-color $black03
                    border 1px solid $black40
                    padding 10px
        
</style>
