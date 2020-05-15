/*
    节点：
        block0 = [   [0,0],[0,1],[0,2],...   ]    所有的坐标点
        blocks =
            [
                [   [x,y],[x,y],[x,y],[x,y],[x,y],   ],    //区1
                [   [x,y],[x,y],[x,y],[x,y],[x,y],   ],    //区2
                [   [x,y],[x,y],[x,y],[x,y],[x,y],   ],    //区3
                [   [x,y],[x,y],[x,y],[x,y],[x,y],   ],    //区4
                [   [x,y],[x,y],[x,y],[x,y],[x,y],   ],    //区5
            ]





    机制：
        循环（当 0区含有>=1）    //找区
            oneNewSector()
            {
                从 x1,y1 向外扩展，该区为1
                遍历完所有同色的块
            }
            在 剩下的0区的块中，找 先y最小，再x最小 的块x2,y2，该块所在区为2





*/
/*
var array = [   [0,0],[0,1],[0,2]   ];

array.find
(
    function(node)
    {
        console.log(node);
        if(node==[0,2])
        {
            console.log("sdfa");
        }
    }
);
*/

/* jshint esversion: 6 */


























//
