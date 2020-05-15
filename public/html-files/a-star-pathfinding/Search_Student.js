// Search_Student.js
// Computer Science 3200 - Assignment 2
// Author(s): David Churchill [replace with your name(s)]
//
// All of your Assignment code should be in this file, it is the only file submitted.
// You may create additional functions / member variables within this class, but do not
// rename any of the existing variables or function names, since they are used by the
// GUI to perform specific functions.
//
// Recommended order of completing the assignment:
//#### 1. Construct a function which computes whether a given size agent can fit in given x,y
//    This will be used by computeSectors / isLegalAction
//#### 2. Complete the computeSectors algorithm using 4D BFS as shown in class slides
//#### 3. Use results of step 2 to complete the isConnected function, test it with GUI
//#### 4. Complete the isLegalAction function, which will be used by searchIteration
//#### 5. Complete the startSearch function, which is called before searchIteration
//#### 6. Complete the getOpen and getClosed functions, which will help you visualize / debug
//#### 7. Complete searchIteration using A* with a heuristic of zero. It should behave like UCS.
//#### 8. Implement estimateCost heuristic functions, and use it with A*
//
// Please remove these comments before submitting. If you did not get any of the
// functionality of the assignment to work properly, please explain here in a comment.
/*
    注：
        ！！！self.size的取值有问题，我在连通性检查中没法取到self.size的值。所以直接用的k值(自迭代)了。

*/
/**************************************************************************************************/

/* jshint esversion: 6 */

/**************************************************************************************************/

Search_Student = function (grid, config)
{
    var self = {};

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

    self.inProgress = false;    // whether the search is in progress

    self.path = [];             // the path, if the search found one
    /*
    self.open = [];             // the current open list of the search (stores Nodes)
    self.closed = [];           // the current closed list of the search
    */
    self.open = new BinaryHeap    //用二叉堆来存放open
    (
        function(node)    //评价函数 = g(node) + h(node)
        {
            return node.g + self.estimateCost(node.x, node.y, self.gx, self.gy);
        }
    );

    self.isInClosed = function(x, y)    // 判断坐标是否在closed中
    {
        for(let i=0; i<self.closed.length; i++)
        {
            if( x == self.closed[i][0] && y == self.closed[i][1] )
            {   return true;   }
        }

        return false;
    };

    self.isHigherThanOpen = function(node)    // 判断n.state==step.state && n.g <= step.g
    {
        if(self.open.content.length != 0)
        {
            for(let i=0; i<self.open.content.length; i++)
            {
                if( node.x == self.open.content[i].x && node.y == self.open.content[i].y )
                {
                    var step_f = node.g+node.h;
                    var open_f = self.open.content[i].g+self.open.content[i].h;
                    if(step_f >= open_f)
                    {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    self.closed = [];    //用数组来存放closed

    self.cost = 'Search Not Completed';    // the cost of the path found, -1 if no path
                            //   0       1      2       3      4      5      6       7
    self.config.actions = [   [0,-1], [1,0], [0,1], [-1,0], [-1,-1], [1,-1], [1,1], [-1,1]   ];
    self.config.actionCosts = [   100, 100, 100, 100, 141, 141, 141, 141   ];

    self.map = [   [],[],[],[]   ];    //定义一个变量map，用来存地图的 [占位][宽1][宽2][宽3]
    Window.sectors = [];    //定义一个全局变量sectors，用来存区块的

    // 判断一个坐标点能否盛放一个size格 //////////////////////////////////////////////////////////////
    self.fits = function(size, x, y)
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

    self.startSearch = function(sx, sy, gx, gy, size)
    {
        // deals with an edge-case with the GUI, leave this line here
        if (sx == -1 || gx == -1) { return; }

        self.inProgress = true;     // the search is now considered started
        self.sx = sx;               // set the x,y location of the start state
        self.sy = sy;
        self.gx = gx;               // set the x,y location of the goal state
        self.gy = gy;
        self.size = size;           // the size of the agent
        self.path = [];             // set an empty path

        // TODO: everything else necessary to start a new search
        // 重置数据 //
        self.open = null;
        self.open = new BinaryHeap
        (
            function(node)
            {
                return node.g + self.estimateCost(node.x, node.y, self.gx, self.gy);
            }
        );
        self.closed = [];
        self.cost = -1;

        // 向open压入一个起始节点  new Node(x, y, parent, action, g_val, h_val) //
        var h_val = self.estimateCost(sx, sy, self.gx, self.gy);

        var start_node = new Node(sx, sy, null, null, 0, h_val);
        self.open.push(start_node);
    };

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
        return self.map[self.size][y1][x1][0] == self.map[self.size][y2][x2][0];
    };

    self.isLegalAction = function (x, y, s, a)
    {    // 原本：x, y, size, action
        var nx = x + a[0];
        var ny = y + a[1];

        var f = function (x)
        {
            return x < 0 ? x : 0;
        };

        if ( self.grid.isOOB(x, y, s) || self.grid.isOOB(nx, ny, s) )
        {
            return false;
        }

        for (i = 0; i < s + Math.abs(a[0]); i++)
        {
            for (j = 0; j < s + Math.abs(a[1]); j++)
            {
                if (self.grid.get(x, y) != self.grid.get(x + f(a[0]) + i, y + f(a[1]) + j))
                {
                    return false;
                }
            }
        }
        return true;
    };

    // 计算所有的区块 ///////////////////////////////////////////////////////////////////////////////
    self.computeSectors = function()
    {
        // 所需数据 --------------------------------------------------------------------------------
        var width = self.grid.width;    //图宽
        var height = self.grid.height;    //图高

        // 生成一个map，存放节点信息 -----------------------------------------------------------------
        for(let k=1; k<4; k++)
        {
            for(var j=0; j<height; j++)    //rows:j
            {
                var row = [];
                for(var i=0; i<width; i++)    //cols:i
                {
                    row.push([0,self.grid.get(i,j)]);    //一个块=[区域，颜色]
                }
                self.map[k].push(row);
            }
        }

        // 工作流 ----------------------------------------------------------------------------------
        for(let k=1; k<4; k++)    //三张图对应三种size
        {
            var num_sector0 = width*height;    //初始时，0区含有格位数量
            var sector_num = 1;    //起始区号为1
            var open = [];
            var closed = [];
            while(num_sector0 > 0)
            {
                // 以下整段是“一次搜索” - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                // 新搜索的起始位 //
                /*
                    在0区内找y最小，x最小的块，从这个块开始搜索
                */
                for (let j=0; j<height; j++)
                {
                    for (let i=0; i<width; i++)
                    {
                        if (self.map[k][j][i][0]==0)    //就是这个块
                        {
                            // 初始化 //
                                var start_coord = [i,j];
                                open.push(start_coord);

                            // 搜索过程 //
                            do
                            {
                                // open表为空，退出搜索，什么也不干 //
                                if (open.length==0)
                                {
                                    num_sector0 = num_sector0 - closed.length;
                                    break;
                                }

                                var next = open.shift();    //弹出一个最先压入的点

                                // 检查该点是否在close中，不在则继续 //
                                var in_closed = false;

                                for (let i=0; i<closed.length; i++)
                                {
                                    var closed_coord = closed[i];
                                    if (   closed_coord[0]==next[0] && closed_coord[1]==next[1]   )
                                    {
                                        in_closed = true;
                                    }
                                }

                                if(in_closed==false)    //不在，继续
                                {
                                    // 把这个块压入closed，如果这个块可以放sizeN，在地图上标记区号 //
                                    closed.push(next);

                                    if(!self.grid.isOOB(next[0], next[1], k) && self.fits(k, next[0], next[1]))
                                    {
                                        self.map[k][ next[1] ][ next[0] ][0] = sector_num;
                                    }

                                    // 检查可行的步进点，压入open //
                                    for (let i=0; i<4; i++)
                                    {
                                        var nx = next[0] + self.config.actions[i][0];
                                        var ny = next[1] + self.config.actions[i][1];
                                        var nxy = [nx,ny];
                                        if ( !self.grid.isOOB(nx, ny, k) && self.grid.get(next[0], next[1])==self.grid.get(nxy[0], nxy[1])  && self.fits(k, nx, ny))
                                        {
                                            open.push([nx, ny]);
                                        }
                                    }
                                }
                            }while(true);

                            sector_num = sector_num+1;
                        }
                    }
                }
            }
        }
    };

    self.searchIteration = function() {

        // if we've already finished the search, do nothing
        if (!self.inProgress)
        {   return;   }

        // we can do a quick check to see if the start and end goals are connected
        // if they aren't, then we can end the search before it starts
        // don't bother searching if the start and end points don't have the same type
        // this code should remain for your assignment
        if (!self.isConnected(self.sx, self.sy, self.gx, self.gy, self.size)) {
            self.inProgress = false; // we don't need to search any more
            self.cost = -1; // no path was possible, so the cost is -1
            return;
        }

        // nothing left in the open list, return failure
        if (self.open.content.length == 0)
        {
            self.inProgress = false;
            return;
        }

        var node = self.open.pop();

        // if found the goal, construct path
        if (node.x == self.gx && node.y == self.gy)
        {
            var path_node = node;
            self.cost = path_node.g;
            while (path_node.parent != null)
            {
                self.path.splice(0, 0, path_node.action);
                path_node = path_node.parent;
            }
            self.inProgress = false;
            return;
        }

        if( !self.isInClosed(node.x, node.y) )
        {
            self.closed.push([node.x, node.y]);

            for (let i=0; i<8; i++)
            {
                if ( self.isLegalAction(node.x, node.y, self.size, self.config.actions[i]) )
                {
                    var setp_x = node.x + self.config.actions[i][0];
                    var step_y = node.y + self.config.actions[i][1];
                    var g = node.g + self.config.actionCosts[i];
                    var h = self.estimateCost(setp_x, step_y, self.gx, self.gy);
                    var step = new Node(setp_x, step_y, node, self.config.actions[i], g, h);
                    self.open.push(step);
                }
            }
        }
    };

    self.getOpen = function()
    {
        var open_list = [];
        for (var i = 0; i < self.open.content.length; i++)
        {
        	open_list.push([self.open.content[i].x, self.open.content[i].y]);
        }
        return open_list;
    };

    self.getClosed = function()
    {
        return self.closed;
    };

    self.computeSectors();
    return self;
};

// calcSectors()用的节点类 /////////////////////////////////////////////////////////////////////////
Nodex = function(x, y, action, parent) {
    self = {};
    self.x = x;
    self.y = y;
    self.action = action;
    self.parent = parent;
    return self;
};
