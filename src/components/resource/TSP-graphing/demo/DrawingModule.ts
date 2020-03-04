// import Plotly from 'plotly.js/lib/core.js'
// import PlotyBar from 'plotly.js/lib/bar.js'
// import Plotly from 'plotly.js/dist/plotly.min.js';
// import * as Plotly from 'plotly.js';
var Plotly = require('plotly.js/dist/plotly.js')
// import Plotly from 'plotly.js-dist/plotly.js'
import Axios from 'axios'

/**********************************************************************************************************************/

// prepare data ////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadInstance()
{
    // 
}

async function getTestJsonFile()
{
    Axios
    (
        {
            method: 'POST',
            url: 'http://www.ga3hu.com/external/apps/wolff-h.github.io-backend/TSP-graphing/fetch-data.php',
            data:
            {
                target_resource: 'test',
            }
        }
    )
    .then
    (
        function(response)
        {
            // console.log(response)
        }
    )
}

async function fetchData(target_resource:string)
{
    return Axios
    (
        {
            method: 'POST',
            url: 'http://www.ga3hu.com/external/apps/wolff-h.github.io-backend/TSP-graphing/fetch-data.php',
            data:
            {
                target_resource: target_resource,
            }
        }
    )
}

// helpers -------------------------------------------------------------------------------------------------------------

function parseCoords(map:any)
{
    let plotly_coords:number[][] = [ [],[],[] ]

    for(let city of map)
    {
        plotly_coords[0].push(city[0])    //id
        plotly_coords[1].push(city[1])    //x-axis
        plotly_coords[2].push(city[2])    //y-axis
    }

    return plotly_coords
}
// draw ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawPlainMap(source:any, target:any)
{
    let plotly_coords = parseCoords(source)

    let traces:any =
    [
        {
            text: plotly_coords[0],
            x: plotly_coords[1],
            y: plotly_coords[2],
            mode: 'markers',
            type: 'scatter',
        },
    ]

    Plotly.newPlot
    (
        target,
        traces,
        {},
        {
            responsive: true,
        }
    )
}

function drawExperiment(source:any, generation_limit:number, target_time_cost:any, target_result:any)
{
    // x 都是测试序数 //
    let xs = []

    for(let i=0; i<source["description"]["evolution_all"]; i++)
    {   xs.push(i+1)   }

    // trials的time-costs统计 - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    let timecost_ys = []

    for(let i=0; i<source["evolutions"].length; i++)
    {
        timecost_ys.push(   source["evolutions"][i][0]["time_cost"]   )
    }

    let plotly_time_cost:any =
    [
        {
            x: xs,
            y: timecost_ys,
            mode: 'lines+markers',
            type: 'bar',
            name: 'time costs',
        }
    ]

    let layout1 =
    {
        xaxis: {   title: 'trial'   },
        yaxis: {   title: 'time cost'   },
    }

    Plotly.newPlot(   target_time_cost, plotly_time_cost, layout1, {responsive: true}   )

    // trials的distance统计 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    let best_ys = []
    let worst_ys = []
    let avg_ys = []

    for(let i=0; i<source["evolutions"].length; i++)
    {
        best_ys.push(   source["evolutions"][i][generation_limit]["best-individual-distance"]   )
        worst_ys.push(   source["evolutions"][i][generation_limit]["worst-individual-distance"]   )
        avg_ys.push(   source["evolutions"][i][generation_limit]["average-distance"]   )
    }

    let plotly_result:any =
    [
        {
            x: xs,
            y: best_ys,
            mode: 'lines+markers',
            fill: 'tonexty',
            name: 'best',
        },
        {
            x: xs,
            y: worst_ys,
            mode: 'lines+markers',
            fill: 'tonexty',
            name: 'worst',
        },
        {
            x: xs,
            y: avg_ys,
            mode: 'lines+markers',
            fill: 'tonexty',
            name: 'average',
        }
    ]

    Plotly.newPlot(   target_result, plotly_result, {}, {responsive: true}   )
}

function drawEvolution(source:any, target:any, generation_limit:number, trial_n: number)
{
    // x 都是世代序数 //
    let xs = []

    for(let i=0; i<generation_limit; i++)
    {   xs.push(i+1)   }

    // 选中的测试的各世代max、min、avg分布 - - - - - - - - - - - - - - - - - - - - - - - -
    let best_ys = []
    let worst_ys = []
    let avg_ys = []

    for(let i=1; i<=generation_limit; i++)
    {
        best_ys.push(   source["evolutions"][trial_n-1][i]["best-individual-distance"]   )
        worst_ys.push(   source["evolutions"][trial_n-1][i]["worst-individual-distance"]   )
        avg_ys.push(   source["evolutions"][trial_n-1][i]["average-distance"]   )
    }

    let plotly_evolution =
    [
        {
            x: xs,
            y: best_ys,
            mode: 'lines',
            fill: 'tonexty',
            name: 'best',
        },
        {
            x: xs,
            y: worst_ys,
            mode: 'lines',
            fill: 'tonexty',
            name: 'worst',
        },
        {
            x: xs,
            y: avg_ys,
            mode: 'lines',
            fill: 'tonexty',
            name: 'average',
        }
    ]

    Plotly.newPlot(   target, plotly_evolution, {}, {responsive: true}   )
}

function drawGeneration(source:any, target:any, generation_limit:number, trial_n: number, generation_n:number) :any
{
    // x 都是世代序数 //
    let xs = []

    for(let i=0; i<generation_limit; i++)
    {   xs.push(i+1)   }

    // 选中的世代的所有个体的distance分布 - - - - - - - - - - - - - - - - - - - - - - - -
    let ys = []

    for(let i=0; i<generation_limit; i++)
    {  ys.push(   source["evolutions"][trial_n-1][generation_n]["individual-distances"][i]   )   }

    let plotly_generation =
        [
            {
                x: xs,
                y: ys,
                mode: 'lines',
                fill: 'tonexty',
                name: 'individual distance',
            }
        ]

    Plotly.newPlot(   target, plotly_generation, {}, {responsive: true}   )

    // 返回仪表盘数据 //
    return{
        avg: source["evolutions"][trial_n-1][generation_n]["average-distance"],
        best: source["evolutions"][trial_n-1][generation_n]["best-individual-distance"],
        worst: source["evolutions"][trial_n-1][generation_n]["worst-individual-distance"],
    }
}

function drawIndividual(source:any, target:any, generation_limit:number, trial_n:number, generation_n:number, individual_n:number, plain_map:number[][]) :string
{
    let ids = []
    let xs = []
    let ys = []
    
    if( individual_n == 1 )    //best
    {
        ids = source["evolutions"][trial_n-1][generation_n]["best-individual-sequence"]
        ids.push(ids[0])

        for(let i=0; i<source["description"]["city_all"]+1; i++)
        {
            xs.push( plain_map[1][ ids[i]-1 ] )
            ys.push( plain_map[2][ ids[i]-1 ] )
        }
    }
    else if( individual_n == 2 )    //worst
    {
        ids = source["evolutions"][trial_n-1][generation_n]["worst-individual-sequence"]
        ids.push(ids[0])

        for(let i=0; i<source["description"]["city_all"]+1; i++)
        {
            xs.push( plain_map[1][ ids[i]-1 ] )
            ys.push( plain_map[2][ ids[i]-1 ] )
        }
    }

    let individual_plotly =
    [
        {
            x: xs,
            y: ys,
            text: ids,
            mode: 'lines+markers',
            name: 'individual route',
        }
    ]

    Plotly.newPlot(   target, individual_plotly, {}, {responsive: true}   )

    // 返回路径序列 //
    // $(".dashboard textarea").text( ids.toString() );
    return ids.toString()
}

/**********************************************************************************************************************/

export default
{
    getTestJsonFile,
    parseCoords,
    fetchData,
    drawPlainMap,
    drawExperiment,
    drawEvolution,
    drawGeneration,
    drawIndividual,
}