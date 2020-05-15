/*
    CS3200 Assignment 4
    Tingrui Hu, Zhiwei Liu
*/

/* jshint esversion: 6 */

BanditSelector = function(config) {
    var self = {};
    self.config = config;
    console.log(self.config);

    // Q[i] = bandit i's current value estimate, initialized to config value
    // N[i] = how many times the value for bandit i has been updated
    self.Q = new Array(self.config.numBandits).fill(self.config.initialValue);
    self.N = new Array(self.config.numBandits).fill(0);

    // an array stores historical Qs //
    self.Qs = [];
    for(let item of self.Q)
    {   self.Qs.push([item]);   }

    // function： random an integer in a given interval //
    self.randomInt = function(lower, upper)
    {   return Math.round( Math.random()*(upper - lower) ) + lower;   };

    // function: get the index of max-value action //
    self.maxIndex = function(array)
    {
        var max_val = -Infinity;
        var max_index = 0;
        for (let i=0; i<array.length; i++)
        {   if ( array[i] > max_val )
            {   max_val = array[i];
                max_index = i;
            }
        }
        return max_index;
    };

    // function： sum an array //
    self.sum = function(array)
    {   var sum = 0;
        for(let item of array)
        {   sum = sum + item;   }
        return sum;
    };




    self.chooseBandit = function()
    {
        self.time_step = self.time_step + 1;
        var action = 0;

        if (self.config.selection == 'EG')
        {
            if ( Math.random() < self.config.epsilon )
            {   action = self.randomInt(0, self.config.numBandits-1);   }
            else
            {   action = self.maxIndex(self.Q);   }
        }
        else if (self.config.selection == 'UCB')
        {
            var total_actions = self.sum(self.N);
            var ucbs = new Array(self.config.numBandits).fill(0);

            if(total_actions < self.config.numBandits)
            {
                action = total_actions;
            }
            else
            {
                for(let i=0; i<self.config.numBandits; i++)
                {
                    var ucb = self.Q[i] + self.config.ucbC * Math.sqrt( Math.log(total_actions)/self.N[i] );
                    ucbs[i] = ucb;
                }
                action = self.maxIndex(ucbs);
            }

        }
        return action;
    };

    self.updateBandit = function(index, value)
    {
        self.N[index] = self.N[index] + 1;

        if (self.config.valueEstimate == 'average')
        {
            self.Qs[index].push(value);
            self.Q[index] = self.sum(self.Qs[index]) / self.Qs[index].length;
        }
        else if (self.config.valueEstimate == 'target')
        {
            self.Q[index] = self.Q[index] + self.config.stepSize*(value - self.Q[index]);
        }
    };

    return self;
};
