<template>
    <div class="content case">
        <h2>Content</h2>
        <br>
        <p>
            This demo includes several smart algorithms.
            The basic framework is given in class for an algorithm. I implemented the algorithms in code from scratch, you can inspect code in the project source.
        </p>
        <p>
            For each algorithm, there is an <i>introduction</i> tab telling how it works, and an <i>application</i> tab holding the visualization app.
        </p>
        <br>
        <p>
            Here is a brief explain of the algorithms. I will update more in the future.
        </p>
        <br>
        <ul>
            <li>
                <h4>
                    A-star pathfinding
                </h4>
                <p>
                    A-star (A*) is a graph traversal and path search algorithm, due to its completeness, optimality, and optimal efficiency, it's widely used in computer science.
                    The visualization app provides 10 different maps and plenty options for search operation.
                </p>
                <p>
                    I store a preprocessed sector map before the search starts, therefore my code runs ten times faster than the solution algorithm. However it can still take some time to run the preprocessing before you enter a new map.
                </p>
            </li>
            <br>
            <li>
                <h4>
                    JPS pathfinding
                </h4>
                <p>
                    Jump point search (JPS) is an optimization to the A* search algorithm for uniform-cost grids. It reduces symmetries in the search procedure by means of graph pruning,[1] eliminating certain nodes in the grid based on assumptions.
                </p>
                <p>
                    This algorithm utilizes the same framework as A-star's.
                </p>
            </li>
            <br>
            <li>
                <h4>
                    Alpha-Beta method
                </h4>
                <p>
                    Alpha–beta pruning is a search algorithm that seeks to decrease the number of nodes that are evaluated by the minimax algorithm in its search tree.
                </p>
                <p>
                    Connect Four is a two-player connection board game in which the players first choose a color and then take turns dropping one colored disc from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.
                </p>
            </li>
            <br>
            <li>
                <h4>
                    ...
                </h4>
                <p>
                    <i>More will be posted as I set them up ~</i>
                </p>
            </li>
        </ul>
    </div>
</template>



<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend
    ({

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
    #smart-algorithms .case.content
        
        ul
            margin-left 50px
</style>
