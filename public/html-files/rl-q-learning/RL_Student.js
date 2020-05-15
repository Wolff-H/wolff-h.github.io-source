// RL_Student.js
// Computer Science 3200 - Assignment 5
RL = function(env, config) {
    var self = {};
    self.config = config;   // learning configuration settings
    self.env = env;         // the environment we will learn about

    self.Q = [];            // values array Q[x][y][a] = value of doing action a at (x,y)
    self.P = [];            // policy array P[x][y][a] = probability of doing action a at (x,y)

    self.state = [0, 0];    // the current location (state) of the agent on the map

    self.init = function() {

        // initialize all Q values to 0
        for (x=0; x<self.env.width; x++) {
            self.Q.push([]);
            for (y=0; y<self.env.height; y++) {
                self.Q[x].push([]);
                for (a=0; a<self.env.actions.length; a++) {
                    self.Q[x][y].push(0);
                }
            }
        }

        // initialize Policy to equiprobable actions
        for (x=0; x<self.env.width; x++) {
            self.P.push([]);
            for (y=0; y<self.env.height; y++) {
                self.P[x].push([]);
                for (a=0; a<self.env.actions.length; a++) {
                    self.P[x][y].push(1.0 / self.env.actions.length);
                }
            }
        }
    }

    // Args:
    //    none
    //
    // Returns:
    //    none
    //
    self.learningIteration = function() {
        if (self.env.isTerminal(self.state[0], self.state[1])) {
            let x = Math.floor(Math.random()*(self.env.width))
            let y = Math.floor(Math.random()*(self.env.height))
            while (self.env.isOOB(x, y) || self.env.isBlocked(x, y) || self.env.isTerminal(x, y)) {
                x = Math.floor(Math.random()*(self.env.width))
                y = Math.floor(Math.random()*(self.env.height))
            }
            self.state = [x, y]
        }
        let action = self.selectActionFromPolicy(self.state)
        let reward = self.env.getReward(self.state[0], self.state[1], action)
        let next_state = self.getNextState(self.state, action)
        self.updateValue(self.state, action, reward, next_state)
        self.updatePolicy(self.state)
        self.state = next_state
    }

    // Args:
    //    state - [x, y] state to retrieve the action for
    //
    // Returns:
    //    action - [x, y] action to perform based on the policy
    //
    self.selectActionFromPolicy = function(state) {
        let action = []
        let actions = self.env.getActions()
        if (Math.random() < self.config.epsilon ) {
            action = actions[Math.floor(Math.random() * actions.length)]
        }
        else {
            let x = state[0]
            let y = state[1]
            let max = self.P[x][y][0]
            let max_index = 0
            for (let a = 1; a < self.P[x][y].length; a++) {
                if (self.P[x][y][a] > max) {
                    max = self.P[x][y][a]
                    max_index = a
                }
            }
            action = actions[max_index]
        }

        return action;
    }

    // Args:
    //    state  - [x, y] state to retrieve the action for
    //    action - [x, y] action to do at the given state
    //
    // Returns:
    //    nextState  - [x, y] resulting state
    //
    self.getNextState = function(state, a) {
        let x = state[0]
        let y = state[1]
        let nx = x + a[0]
        let ny = y + a[1]
        let next_state = []
        if (self.env.isOOB(nx ,ny) || self.env.isBlocked(nx, ny)) {
            next_state = [x, y]
        }
        else {
            next_state = [nx, ny]
        }

        return next_state;
    }

    // Args:
    //    state     - [x, y] state  (S in slides)
    //    action    - [x, y] action (A in slides)
    //    reward    - reward obtained by doing A at S (real number)
    //    nextState - [x, y] state obtained by doing action A at state S (S' in slides)
    //
    // Returns:
    //    none
    //
    self.updateValue = function(state, action, reward, next_state) {

        // implement Q-Learning update function
        let x = state[0]
        let y = state[1]
        let nx = next_state[0]
        let ny = next_state[1]
        let actions = self.env.getActions()

        //get the max Q value of next state
        let max_Q_next = self.Q[nx][ny][0]
        for (let a = 1; a < actions.length; a++) {
            if (self.Q[nx][ny][a] > max_Q_next) {
                max_Q_next = self.Q[nx][ny][a]
            }
        }
        let index = -1
        for (let a = 0; a < actions.length; a++) {
            if (actions[a] == action) {
                index = a
                break
            }
        }

        if (index == -1) {
            return;
        }
        let adjustment = self.config.alpha * (reward + self.config.gamma*max_Q_next - self.Q[x][y][index])
        let new_Q = self.Q[x][y][index] + adjustment
        self.Q[x][y][index] = new_Q
    }

    // Args:
    //    state     - [x, y] state
    //
    // Returns:
    //    none
    //
    self.updatePolicy = function(state)
    {
        let x = state[0]
        let y = state[1]

        //get the max value and max action
        let max_action_value = self.Q[x][y][0]
        for (let a  = 1; a < self.Q[x][y].length; a++) {
            if (self.Q[x][y][a] > max_action_value) {
                max_action_value = self.Q[x][y][a]
            }
        }

        let max_actions = []
        let threshhold = 0.01
        for (let a  = 0; a < self.Q[x][y].length; a++) {
            if (Math.abs(self.Q[x][y][a] - max_action_value) < threshhold) {
                max_actions.push(a)
            }
        }

        for (let a  = 0; a < self.P[x][y].length; a++) {
            let found = false
            for (let b = 0; b < max_actions.length; b++) {
                if (a == max_actions[b]) {
                    found = true
                }
            }
            if (found) {
                self.P[x][y][a] = 1.0 / max_actions.length
            }
            else {
                self.P[x][y][a] = 0
            }
        }

    }

    self.init();
    return self;
}
