import Plotly from 'plotly.js/lib/core.js'

function loadInstance()
{
    // 
}

function drawPlainMap(source:any, target:any)
{
    console.log('drawPlainMap');

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

export default
{
    drawPlainMap,
}