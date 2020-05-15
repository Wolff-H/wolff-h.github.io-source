// Player_Student.js 
// Computer Science 3200 - Assignment 3
// Author(s): David Churchill [replace with your name(s)]
//
// All of your Assignment code should be in this file, it is the only file submitted.
// You may create additional functions / member letiables within this class, but do not
// rename any of the existing letiables or function names, since they are used by the
// GUI to perform specific functions.

Player_Student = function(config) {
    let self = {};
    self.config = config;
    self.searchStartTime = 0;

    // Student TODO:
    // You WILL need extra member letiables here in order to implement IDAB properly
    // For example, you will need to store:
    //     - The maximum depth of the current iteration of IDAB search
    //     - The best action found so far for the current iteration of IDAB search 
    //     - The best action found so far for the previous COMPLETED depth of IDAB search
    self.bestAction = null;
    self.currentBestAction = null;
    self.currentMaxDepth = 1;
    // Function which is called by the GUI to get the action
    self.getAction = function(state) {
        return self.IDAlphaBeta(state);
    }
    
    // Student TODO: Implement this function
    //
    // This funtion should compute a heuristic evaluation of a given state for a given player.
    // It should return a large positive value for a 'good' state for the player, and a large
    // negative value for a 'bad' state for the player. Assign the maximum possible values to
    // winning and losing states, and be sure to assign values in between for states of a game
    // in progress. 
    //
    // This is one of the most important factors in your program performing well in the
    // class competition - poor heursitic functions cannot always be saved by good search.
    //
    // Args:
    //    state        : the state to evaluate
    //    player       : the player to evaluate the state for
    //
    // Returns:
    //    value (int)  : the heuristic evaluation of the state
    //
    self.eval = function(state, player) {
        let winner = state.winner();
        if (winner == player) { return 10000; }
        else if (winner == PLAYER_NONE) { 
            
            
            return 0; 
        }
        else if (winner == PLAYER_DRAW) { return 0; }
        else { return -10000; }
    }

    // Student TODO: Implement this function
    //
    // This funtion should implement Iterative Deepening Alpha Beta (IDAB). It should call the
    // separate AlphaBeta function which implements the MiniMax search with Alpha Beta pruning.
    // This function should use the self.config configuration options for the following:
    // 
    //     config.timeLimit - search time limit in milliseconds
    //                      - timeLimit of 0 means there is no time limit
    //     config.maxDepth  - maximum depth for IDAB  (depth > maxDepth) = eval()
    //                      - maxDepth of 0 means no max depth
    //
    //     You can assume one of timeLimit or maxDepth will always be greater than 0
    //
    // Please note that both of these limits should be used, and whichever one happens first
    // should be the stopping condition.
    //
    // Be sure to return the best action from the last COMPLETED AlphaBeta search.
    //
    // Args:
    //    state        : the state for which to find the best action for the player to move
    //
    // Returns:
    //    action (int) : the best action for the player to move
    //
    self.IDAlphaBeta = function(state) {
        // here is the syntax to record the time in javascript
        self.searchStartTime = performance.now();

        for (let depth = 1; depth < self.config.maxDepth; d++) {
            try {
                AlphaBeta(state, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, depth, true);
                self.bestAction = self.currentBestAction;
            }
            catch (TimeOutException) {
                break;
            }
        }
        // return the best action found
        return self.bestAction;
    }

    // Student TODO: Implement this function
    //
    // This funtion should implement MiniMax with Alpha-Beta Pruning. It is recommended
    // to first get vanilla MiniMax search working properly before implementing the Alpha
    // Beta pruning enhancement. 
    //
    // Please be aware that this function does not return an action - it returns a state value.
    // Actions must be set to a self letiable, rather than returned. 
    //
    // It is important that you COPY states [via state.copy()] before generating children,
    // otherwise you will be modifying reference to states on different levels of recursion.
    // (Disregard this if you have implemented an action-undo functionality)
    //
    // Args:
    //    state        : the state for the current node in the search tree
    //    alpha (int)  : the current alpha value of the search
    //    beta  (int)  : the current beta value of the search
    //    depth (int)  : the current depth of the search
    //    max (bool)   : whether the current player is maximizing or not
    //
    // Returns:
    //    value (int)  : the value of the state
    //
    self.AlphaBeta = function(state, alpha, beta, depth, max) {

        // code for AlphaBeta goes here

        // here is the syntax to calculate how much time has elapsed since the search began
        // you should compare this to self.config.
        let timeElapsed = performance.now() - self.searchStartTime;

        //check if it is reach to the maximum depth
        if ( depth >= self.currentMaxDepth ) {
            return self.eval(state, state.player == 1 ? 0 : 1);
        }

        //check if it is exceed the time limit
        if ( timeElapsed > self.config.timelimit ) {
            throw ( TimeOutException );
        }

        let actions = state.getLegalActions();

        if (max) {
            let v = Number.NEGATIVE_INFINITY;
            for (let i = 0; i < actions.length; i++) {
                let child = state.copy();
                child.doAction(actions[i]);
                let val = self.AlphaBeta(child, alpha, beta, depth+1, !max);

                if ( val > v ) { v = val; }
                if ( val >= beta ) { return v; }
                if ( val > alpha ) { 
                    alpha = val; 
                    if ( depth == 0 ) { self.currentBestAction = actions[i]; }
                }
            }
            return v;
        }
        else {
            let v= Number.POSITIVE_INFINITY;
            for (let i = 0; i < actions.length; i++ ) {
                let child = state.copy();
                child.doActions(action[i]);
                let val = self.AlphaBeta(child, alpha, beta, depth+1, max);

                if ( val < v ) { v = val; }
                if ( val <= alpha ) { return v; }
                if ( val < beta ) { beta = val; }
            }
            return v;
        }
    }

    return self;
}