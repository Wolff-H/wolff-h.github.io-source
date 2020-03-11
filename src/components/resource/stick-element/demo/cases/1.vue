<template>
    <div class="case case-1">
        <h2>
            cross-level sticky
        </h2> 
        <br><br>
            element can be sticky to any container, rather than only its direct parent <br>
            for example, some cells in table below are sticky, where the table has structure as following
        <br><br>
        <pre>
            div.container
                table
                    thead
                        tr
                            th
                                span
                                    [text]
                    tbody
                        tr
                            td
                                [text]
                                

        </pre>
        <div class="container"
            ref="container"
        >
            <table>
                <thead>
                    <tr>  
                        <th class="th1" ref="th1">  <span>th1</span>  </th>
                        <th class="th2">  <span>th2</span>  </th>
                        <th class="th3">  <span>th3</span>  </th>
                        <th class="th4">  <span>th4</span>  </th>
                        <th class="th5">  <span>th5</span>  </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
                    </tr>
                    <tr>
                        <td>21</td><td ref="td22">22</td><td>23</td><td>24</td><td>25</td>
                    </tr>
                    <tr>
                        <td>31</td><td>32</td><td>33</td><td>34</td><td>35</td>
                    </tr>
                    <tr>
                        <td>41</td><td>42</td><td>43</td><td>44</td><td>45</td>
                    </tr>
                    <tr>
                        <td>51</td><td>52</td><td>53</td><td>54</td><td>55</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <hr>
        <br>
        <h3>
            code
        </h3>
        <br>
        <pre>
            stickElement
            (
                {
                    element: this.$refs.th1,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        top: 50,
                    }
                }
            )
            stickElement
            (
                {
                    element: this.$refs.td22,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        top: 200,
                        left: 200,
                    }
                }
            )
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
                    element: this.$refs.th1,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        top: 50,
                    }
                }
            )
            stickElement
            (
                {
                    element: this.$refs.td22,
                    container: this.$refs.container,
                    offset_limits:
                    {
                        top: 200,
                        left: 200,
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
    #stick-element .case.case-1
        
        >.container
            width (800 + 2)px
            height (600 + 2)px
            overflow auto
            border 1px solid black
            padding 50px

            table

                th
                    position: relative
                    height: 100px
                    border: 1px solid $black60
                    background-color: $orange20
                    z-index 100

                td
                    position relative
                    width: 400px
                    min-width: 400px
                    height: 200px
                    min-height: 200px
                    border: 1px solid $black20
                    text-align center
                    // z-index 100
                
                tr:nth-child(2n+1)>td:nth-child(2n+1)
                    background-color: $black05
            
            
</style>
