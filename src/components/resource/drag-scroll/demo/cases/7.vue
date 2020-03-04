<template>
    <div class="case case-7">
        <h2>
            Example: a dragscrollable and sticky table
        </h2> 
        <br><br>
            drag table head to scroll horizontally <br>
            drag first column to scroll vertically <br>
            the sticky behaviour is carried by <router-link to="/demos/stick-element/">stick-element</router-link> <br>
        <br><br>
        <div class="container"
            ref="container"
        >
            <table class="whole">
                <tr>
                    <td>
                        <table class="col-1-drag"
                            ref="col_1_drag"
                        >
                            <thead
                                ref="col_1_head"
                            >
                                <tr>
                                    <th>
                                        row_n
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                
                            >
                                <tr
                                    v-for="(row, row_n) in dataset.rows"
                                    :key="row_n"
                                >
                                    <td>{{   row_n+1   }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>
                        <table class="main">
                            <thead
                                ref="thead"
                            >
                                <tr>
                                    <th
                                        v-for="(column_name) in dataset.columns"
                                        :key="column_name"
                                    >
                                        {{   column_name   }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(row, row_n) in dataset.rows"
                                    :key="row_n"
                                >
                                    <td
                                        v-for="(item, item_n) in row"
                                        :key="item_n"
                                    >
                                        {{   item   }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </table>
        </div>

        <br><br>
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
    import dragScroll from '../../drag-scroll'
    import stickElement from '../../../stick-element/stick-element'
    import {columns, rows} from './example_dataset'

    import Vue from 'vue'

    export default Vue.extend
    ({
        components: 
        {
            
        },
        data()
        {
            return{
                dataset:
                {
                    columns: columns,
                    rows: rows,
                }
            }
        },
        methods:
        {

        },
        mounted()
        {
            dragScroll
            (
                {
                    element: this.$refs.thead,
                    container: this.$refs.container,
                    y:
                    {
                        move: 0,
                    },
                }
            )
            stickElement
            (
                {
                    element: this.$refs.thead,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        top: 50,
                    }
                }
            )
            dragScroll
            (
                {
                    element: this.$refs.col_1_drag,
                    container: this.$refs.container,
                    x:
                    {
                        move: 0,
                    },
                }
            )
            stickElement
            (
                {
                    element: this.$refs.col_1_drag,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        left: 50,
                    }
                }
            )
            stickElement
            (
                {
                    element: this.$refs.col_1_head,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        top: 50,
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
    #drag-scroll .case.case-7
        
        >.container
            position relative
            padding 50px
            width (800 + 2)px
            height (600 + 2)px
            border 1px solid black
            overflow scroll
            &::-webkit-scrollbar
                display none

            table
                position relative
                border-spacing 0

            table.col-1-drag
                position relative
                border-collapse collapse
                table-layout fixed
                cursor grab
                user-select none
                z-index 100

                >thead
                    display table-caption
                    position relative

                    th
                        min-height 40px
                        height 40px
                        border 1px solid $black40
                        background-color $black10
                        min-width 55px
                
                >tbody
                    position relative

                    td
                        height 40px
                        border 1px solid $black10
                        background-color $black03
                        padding-left 10px
                        color $black60
                        min-width 55px

            table.main
                position relative
                border-collapse collapse
                table-layout fixed
                
                >thead
                    display table-caption
                    position relative
                    user-select none
                    cursor grab

                    th
                        min-height 40px
                        height 40px
                        border 1px solid $black40
                        background-color $black10
                        min-width 220px
                        border-left none

                >tbody

                    td
                        height 40px
                        border 1px solid $black10
                        padding-left 10px
                        color $black60
                        min-width 220px
                        border-left none
            
                >.col-1-drag
                    position absolute
                    top 0px
                    width 55px
                    height 100%
                    background-color $shadow20



</style>
