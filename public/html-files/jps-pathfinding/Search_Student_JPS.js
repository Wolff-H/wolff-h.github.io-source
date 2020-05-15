// Search_Student_JPS.js 
// Computer Science 3200 - Assignment 2

Search_Student_JPS = function (grid, config) {
    let self = {};

    self.config = config;       // search configuration object
                                //   config.actions = array of legal [x, y] actions
                                //   config.actionCosts[i] = cost of config.actions[i]
                                //   config.heuristic = 'diag', 'card', 'dist', or 'zero'
    self.grid = grid;           // the grid we are using to search
    self.sx = -1;               // x location of the start state
    self.sy = -1;               // y location of the start state
    self.gx = -1;               // x location of the goal state
    self.gy = -1;               // y location of the goal state
    self.size = 1;              // the square side length (size) of the agent
    self.maxSize = 3;           // the maximum size of an agent
    self.objectSize = 0;

    self.inProgress = false;    // whether the search is in progress

    self.path = [];             // the path, if the search found one

    self.open = [];             // the current open list of the search
    self.closed = [];           // the current closed list of the search
    self.ignore = [];           // the current ignore list of the search
    self.cost = -1;             // the cost of the path found, -1 if no path
    self.map = [];              // the map of connected sectors
    self.ignoreList = [];       // list storing ignored nodes
    self.openedNode;

    // 判断一个坐标点能否盛放一个size格 //////////////////////////////////////////////////////////////
    self.fits = function(x, y, size)
    {
        var xy = self.grid.get(x,y);    //要判断够放的该坐标点

        for(let i=1; i<size; i++)    //竖直方向
        {   for(let j=1; j<size; j++)    //水平方向
            {   if(self.grid.get(x+i,y+j)!=xy)
                {   return false;   }
            }
        }

        return true;
    };

    // Args:
    //    sx, sy (int,int) : (x,y) position of the start state
    //    gx, gy (int,int) : (x,y) position of the goal state
    //    size   (int)     : the size of the agent for this search episode
    //
    // Returns:
    //    none             : this function does not return anything
    //
    self.startSearch = function (sx, sy, gx, gy, size)
    {
        // if the start location is not valid, return
        if (self.map[sx][sy][size-1] == 0) 
        {
            return;
        }

        // deals with an edge-case with the GUI, leave this line here
        if (sx == -1 || gx == -1) 
        {
            return;
        }

        // reset data 
        self.cost = -1;

        self.inProgress = true;     // the search is now considered started
        self.sx = sx;               // set the x,y location of the start state
        self.sy = sy;
        self.gx = gx;               // set the x,y location of the goal state
        self.gy = gy;
        self.objectSize = size;     // set the object size
        self.size = size;           // the size of the agent
        self.path = [];             // set an empty path

        self.closed = [];
        self.open = [];
        self.ignore = [];

        // 向open压入一个起始节点  new Node(x, y, parent, action, g_val, h_val) //
        let h = self.estimateCost(sx, sy, gx, gy);

        let start_node = new Node(sx, sy, null, null, 0, h, null);
        self.open.push(start_node);
    }

    // Args:
    //    x, y   (int,int) : (x,y) location of the given position
    //    gx, gy (int,int) : (x,y) location of the goal
    //    size             : the square side length size of the agent
    //
    // Returns:
    //    int              : the computed distance heuristic
    self.estimateCost = function (x, y, gx, gy)
    {
        if      (self.config.heuristic == 'diag')
        {   return (Math.abs(x - gx) + Math.abs(y - gy)) * 100 - Math.min(Math.abs(x - gx), Math.abs(y - gy)) * (200 - 141);   }
        else if (self.config.heuristic == 'card')
        {   return (Math.abs(x - gx) + Math.abs(y - gy)) * 100;   }
        else if (self.config.heuristic == 'dist')
        {   return Math.sqrt(Math.pow(x - gx, 2) + Math.pow(y - gy, 2)) * 100;   }
        else if (self.config.heuristic == 'zero')
        {   return 0;   }
    };

    self.isConnected = function (x1, y1, x2, y2, size)
    {
        if (self.map[x1][y1][size - 1] == 0) 
        {
            return false;
        }
        return self.map[x1][y1][size - 1] == self.map[x2][y2][size - 1];
    }

    // Args:
    //    x, y   (int,int) : (x,y) location of the given position
    //    size             : the square side length size of the agent
    //    action [int,int] : the action to be performed, representing the [x,y] movement
    //                       from this position. for example: [1,0] is move 1 in the x
    //                       direction and 0 in the y direction (move right). 
    //
    // Returns:
    //    bool : whether or not the given action is legal at the given location
    self.isLegalAction = function (x, y, size, action) 
    {
        let depth = size - 1;
        // if location valid
        if (
            !self.grid.isOOB(x + action[0], y + action[1], size) &&
            self.fits(x + action[0], y + action[1], size)
        )
        {
            // if the location isn't diagonal, only check if the locations are connected
            if (action[0] == 0 || action[1] == 0)
            {
                if (self.map[x][y][depth] != self.map[x + action[0]][y + action[1]][depth])
                {
                    return false;
                }
            }
            else 
            {
                if (
                    (self.map[x][y][depth] != self.map[x + action[0]][y][depth] &&
                    self.map[x][y][depth] != self.map[x][y + action[1]][depth]) ||
                    self.map[x][y][depth] != self.map[x + action[0]][y + action[1]][depth]
                )
                {
                    return false;
                }
            }
        }
        return true;
    }


    // this function starts a BFS for each area on the map for every size
    self.computeSectors = function () {
        //initialize an empty 3D array for the values
        let width = self.grid.width;
        let height = self.grid.height;
        let depth = 3;
        for (let i = 0; i < width; i++) {
            let column = [];
            for (let j = 0; j < height; j++) {
                let sizes = [];
                for (let k = 0; k < depth; k++) {
                    sizes.push(0);
                }
                column.push(sizes);
            }
            self.map.push(column);
        }
        
        // fill the array using BFS for each area
        for (let i = 1; i <= depth; i++) {
            let sectorNum = 1;
            for (let j = 0; j < height; j++) {
                for (let k = 0; k < width; k++) {
                    if (self.map[k][j][i-1] == 0 && !self.grid.isOOB(k, j, i) && self.fits(k, j, i)) {
                        self.findSector(k, j, i, sectorNum);
                        sectorNum++;
                    }
                }
            }
        }
    }

    // this function completes a BFS from a given point and marks all locations it reaches
    self.findSector = function (x, y, size, sectorNum) {
        //initialize arrays for search
        let bfsopen = [];
        let bfsclosed = [];
        bfsopen.push([x,y]);
        while(true) {
            // return when there is nothing left in the open list
            if (bfsopen.length == 0) {
                bfsopen = [];
                bfsclosed = [];
                return;
            }
            let next = bfsopen.shift();
            
            // check to make sure the node isn't in the closed list
            if (self.arrayIncludes(bfsclosed, next))
            {
                continue;
            }

            // add the node to the closed list
            bfsclosed.push(next);
            self.map[next[0]][next[1]][size-1] = sectorNum;

            // if an action is valid, add it to the open list
            for (let i = 4; i < self.config.actions.length; i++) {
                let nx = next[0] + self.config.actions[i][0];
                let ny = next[1] + self.config.actions[i][1];
                if (!self.grid.isOOB(nx, ny, size) && self.fits(nx, ny, size) && self.grid.get(next[0], next[1]) == self.grid.get(nx, ny)) {
                    bfsopen.push([nx, ny]);
                }
            }
        }
    }

    //this function checks if an array is included in the 2D array
    self.arrayIncludes = function (array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][0] == value[0] && array[i][1] == value[1]) {
                return true;
            }
        }
        return false;
    }

    // this function completes one iteration of A* search
    self.searchIteration = function () 
    {

        // if finished the search, do nothing
        if (!self.inProgress) 
        {
            return;
        }

        // do a quick check to see if the start and end goals are connected
        // if they aren't, then end the search before it starts
        if (!self.isConnected(self.sx, self.sy, self.gx, self.gy, self.objectSize)) 
        {
            self.inProgress = false; // we don't need to search any more
            return;
        }

        // if there is nothing left in the open list, return a failed state
        if (self.open.length == 0) 
        {
            self.path = [];
            self.inProgress = false;
            return;
        }

        //remove the smallest node in open list
        let index = self.getSmallestIndex(self.open);
        self.openedNode = self.open[index];
        self.open.splice(index, 1);

        // if the node is the goal, return the actions for the path
        if (self.openedNode.x == self.gx && self.openedNode.y == self.gy) 
        {
            let pathNode = self.openedNode;
            self.cost = pathNode.g;
            while (pathNode.parent != null) 
            {
                for (let i = 0; i < pathNode.action.length; i++) 
                {
                    self.path.splice(0, 0, pathNode.action[i]);
                }
                pathNode = pathNode.parent;
            }
            self.inProgress = false;
            return;
        }

        // check to make sure the node isn't in the closed list
        if ( self.checkClosed(self.openedNode.x, self.openedNode.y) ) 
        {
            return;
        }

        // add the node state to the closed list
        self.closed.push([self.openedNode.x, self.openedNode.y]);
        
        // first node has no parent
        if ( self.openedNode.parent == null ) 
        {
            actions_to_do = self.config.actions;
        }
        else {
            // ignore extra actions
            actions_to_do = self.ignoreExtraActions(self.openedNode);
        }
        
        // expand in horizontal and vertical first
        self.expandCardinal(self.openedNode, actions_to_do);
        // expand in diagonal direction (for the new nodes that generated from diagonal direction, the cardinal search will apply on these nodes too)
        self.expandDiagonal(self.openedNode, actions_to_do);

    }

    // A function to expand the node in cardinal directions
    self.expandCardinal = function(node, actions) {
        for (let a = 0; a < actions.length; a++) {
            // if the action is not the diagonal
            if ( actions[a][0] == 0 || actions[a][1] == 0 ) {
                let stop  = false;
                let pathActions = [];
                let cur_node = node;
                while (!stop) {
                    // check legal action and OOB
                    if (self.isLegalAction(cur_node.x, cur_node.y, self.objectSize, actions[a]) && !self.grid.isOOB(cur_node.x+actions[a][0], cur_node.y+actions[a][1], self.objectSize)) {
                        pathActions.push(actions[a]);
                        let new_node = self.newNode(cur_node, pathActions, node);
                        cur_node = new_node;

                        // if the node is goal node, add to the open list and stop the searching
                        if (cur_node.x == self.gx && cur_node.y == self.gy) {
                            if (node.x == self.openedNode.x && node.y == self.openedNode.y) {
                                self.open.push(cur_node);
                            }
                            else {
                                return true;
                            }
                            stop = true;
                        }

                        // if it doesn't reach the goal state, continue searching
                        else {
                            self.ignoreList.push(cur_node);
                            // if the node has the forced neighbor
                            let direction = self.checkForcedNeighbour(cur_node, actions[a]);
                            if (direction != null) {
                                if (node.x == self.openedNode.x && node.y == self.openedNode.y) {
                                    cur_node.direction = direction;
                                    self.open.push(cur_node);
                                }
                                else {
                                    return true;
                                }
                                stop = true;
                            }
                        }
                    }
                    // if it reach to the bound or obstcale, stop the searching
                    else {
                        stop = true;
                    }
                }
            }
        }
        return false;
    }

    // A function to expand the node in diagonal directions
    // The diagonal exploring will also contain cardinal search for each node
    self.expandDiagonal = function(node, actions) 
    {
        self.findForcedNeighbor = false;
        for (let a = 0; a < actions.length; a++) 
        {
            // if it is a diagonal action
            if ( actions[a][0] != 0 && actions[a][1] != 0 ) 
            {
                let stop = false;
                let pathActions = [];
                let cur_node = node;

                while (!stop) 
                {
                    // check legal action and OOB
                    if (
                        self.isLegalAction(cur_node.x, cur_node.y, self.objectSize, actions[a]) &&
                        !self.grid.isOOB(cur_node.x+actions[a][0], cur_node.y+actions[a][1], self.objectSize)
                    )
                    {
                        pathActions.push(actions[a]);
                        let new_node = self.newNode(cur_node, pathActions, node);
                        cur_node = new_node;

                        // if the node is goal node, add to the open list and stop the searching
                        if (cur_node.x == self.gx && cur_node.y == self.gy) 
                        {
                            self.open.push(cur_node);
                            stop = true;
                        }

                        // if it doesn't reach the goal state, continue searching
                        else 
                        {
                            self.ignoreList.push(cur_node);
                            // if the node has the forced neighbor
                            let direction = self.checkForcedNeighbour(cur_node, actions[a]);

                            if (direction != null) 
                            {
                                cur_node.direction = direction;
                                self.open.push(cur_node);
                                stop = true;
                            }
                            // search in cardinal for this current node
                            actions_to_do = [[actions[a][0], 0],[0, actions[a][1]]]
                            // if expanding this node find a new node that has forced neighbor, push this node into the open list
                            if (self.expandCardinal(cur_node, actions_to_do)) 
                            {
                                cur_node.direction =  actions[a];
                                self.open.push(cur_node);
                                stop = true;
                            } 
                        }
                    }
                    // if it reach to the bound or obstcale, stop the searching
                    else 
                    {
                        stop = true;
                    }
                } 
            }
        }
    } 

    // check the forced neighbour
    self.checkForcedNeighbour = function(node, action)
    {
        depth = self.objectSize - 1;

        if (action[0] == 0) 
        {
            if (
                !self.isLegalAction(node.x, node.y, self.objectSize, [1,0]) &&
                self.isLegalAction(node.x, node.y, self.objectSize, [1,action[1]])
            )
            {
                return [1, action[1]];
            }
            else if (
                !self.isLegalAction(node.x, node.y, self.objectSize, [-1,0]) &&
                self.isLegalAction(node.x, node.y, self.objectSize, [-1,action[1]])
            )
            {
                return [-1, action[1]];
            }
        }
        else if (action[1] == 0) 
        {
            if (
                !self.isLegalAction(node.x, node.y, self.objectSize, [0,1]) &&
                self.isLegalAction(node.x, node.y, self.objectSize, [action[0],1])
            )
            {
                return [action[0], 1];
            } 
            else if (
                !self.isLegalAction(node.x, node.y, self.objectSize, [0,-1]) &&
                self.isLegalAction(node.x, node.y, self.objectSize, [action[0],-1])
            )
            {
                return [action[0], -1];
            }
        }
        else 
        {
            if (
                !self.isLegalAction(node.x, node.y, self.objectSize, [-action[0],0]) &&
                self.isLegalAction(node.x, node.y, self.objectSize, [-action[0],action[1]])
            )
            {
                return [-action[0], action[1]];
            } 
            else if(
                !self.isLegalAction(node.x, node.y, self.objectSize, [0,-action[1]]) &&
                self.isLegalAction(node.x, node.y, self.objectSize, [action[0],-action[1]])
            )
            {
                return [action[0], -action[1]];
            }
        }
        
        return null;
    }

    //A function to construct a new node
    self.newNode = function(node, action, parent) 
    {
        let nx = node.x + action[action.length - 1][0];
        let ny = node.y + action[action.length - 1][1];
        let path = [];
        let index = 0;
        for (let i = 0; i < self.config.actions.length; i++) 
        {
            if (self.config.actions[i][0] == action[0][0] && self.config.actions[i][1] == action[0][1]) 
            {
                index = i;
            }
        }
        let g = self.config.actionCosts[index] * action.length;
        for (let i = 0; i < action.length; i++) 
        {
            path.push(action[i]);  
        }
        let h = self.estimateCost(nx, ny, self.gx, self.gy);
        let new_node = new Node(nx, ny, parent, path, g, h, null);

        return new_node;
    }

    //A function to ignore some actions in order to reduce calculation
    //up: (0,-1), down: (0,1), right: (1,0), Left: (-1,0), upRight: (1,-1), upLeft: (-1,-1), downRight: (1,1), downLeft: (-1, 1) 
    //self.config.actions = [ [1, 1], [-1, -1], [1, -1], [-1, 1], [0, 1], [0, -1], [1, 0], [-1, 0]]
    self.ignoreExtraActions = function(child) 
    {
        let actions = []

        //ignore the action that generated child node
        let a1 = child.direction[0];
        let a2 = child.direction[1];
        actions.push([a1, a2]); 
        actions.push([a1, 0]);
        actions.push([0, a2]);

        return actions;
    }

    //A function to check whether a node state is in closed list or not
    self.checkClosed = function (x, y) 
    {
        for (let i = 0; i < self.closed.length; i++) 
        {
            if ( x == self.closed[i][0] && y == self.closed[i][1] ) 
            {
                return true;
            }
        }

        return false;
    }

    // this function finds the index of the smallest heuristic value for A*
    self.getSmallestIndex = function(array) 
    {
        let smallest = 0;
        for (let i = 1; i < array.length; i++) 
        {
            let next = array[i].g + array[i].h;
            if (next < array[smallest].g + array[smallest].h) 
            {
                smallest = i;
            }
        }

        return smallest;
    }

    // Args:
    //    none
    //
    // Returns:
    //    openList : an array of unique [x, y] states that are currently on the open list
    //
    self.getOpen = function () 
    {
        let openNodes = [];
        for (let i = 0; i < self.open.length; i++) 
        {
            openNodes.push([self.open[i].x, self.open[i].y]);
        }

        return openNodes;
    }

    // Args:
    //    none
    //
    // Returns:
    //    closedList : an array of unique [x, y] states that are currently on the closed list
    //
    self.getClosed = function () 
    {
        //get the [x, y] coordinates for each states in the closed list
        return self.closed;
    }

    //A function to get the ignore list
    self.getIgnore = function () 
    {
        return self.ignoreList;
    }

    self.computeSectors();

    return self;
}

