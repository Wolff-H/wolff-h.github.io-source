// jshint esversion: 6

function mousedownHandler(event, element)
{
    // 记录按点 //
    element.DragScrollData.start_pos.x = event.clientX;
    element.DragScrollData.start_pos.y = event.clientY;

    // 记录容器既有滚动 //
    element.DragScrollData.scroll_original.x = element.DragScrollData.specs.container.scrollLeft;
    element.DragScrollData.scroll_original.y = element.DragScrollData.specs.container.scrollTop;

    // 更改状态 //
    element.DragScrollData.if_dragging = true;
}

function mousemoveHandler(event, element)
{
    if(element.DragScrollData.if_dragging)
    {
        // 拖动，以指定度量 //
        let drag_x = (element.DragScrollData.start_pos.x - event.clientX) / element.DragScrollData.specs.x.drag_scale;
        let drag_y = (element.DragScrollData.start_pos.y - event.clientY) / element.DragScrollData.specs.y.drag_scale;

        let scroll_x, scroll_y;

        // 滚动，以指定度量、翻转 //
        if(!element.DragScrollData.specs.reverse)
        {
            scroll_x = drag_x * element.DragScrollData.specs.x.scroll_scale;
            scroll_y = drag_y * element.DragScrollData.specs.y.scroll_scale;
        }
        else
        {
            scroll_x = drag_y * element.DragScrollData.specs.x.scroll_scale;
            scroll_y = drag_x * element.DragScrollData.specs.y.scroll_scale;
        }

        // 滚动，以指定启用、方向 //
        if(element.DragScrollData.specs.x.move != 0)
        {
            element.DragScrollData.specs.container.scrollLeft = scroll_x * element.DragScrollData.specs.x.move + element.DragScrollData.scroll_original.x;
        }
        if(element.DragScrollData.specs.y.move != 0)
        {
            element.DragScrollData.specs.container.scrollTop = scroll_y * element.DragScrollData.specs.y.move + element.DragScrollData.scroll_original.y;
        }
    }
}

function mouseupHandler(event, element)
{
    element.DragScrollData.if_dragging = false;
}


function dragScroll(specs_input)
{
    // 验证入参 ------------------------------------------------------------------------------------


    // 设置变量 ------------------------------------------------------------------------------------
    let specs_default =
    {
        element: null,
        container: null,
        avoid: [],
        x:
        {
            move: 1,
            drag_scale: 1,
            scroll_scale: 1,
        },
        y:
        {
            move: 1,
            drag_scale: 1,
            scroll_scale: 1,
        },
        reverse: false,
        destroy: false,
    };

    let specs = Object.assign({}, specs_default, specs_input);
    specs.x = Object.assign({}, specs_default.x, specs_input.x);
    specs.y = Object.assign({}, specs_default.y, specs_input.y);

    // 如果入参是string，用选择器获取元素；否则视为元素引用直接使用 //
    if(typeof(specs_input.element) == 'string')
    {
        specs.element = document.querySelector(specs_input.element);
    }
    else
    {
        specs.element = specs_input.element;
    }

    if(typeof(specs_input.container) == 'string')
    {
        specs.container = document.querySelector(specs_input.container);
    }
    else
    {
        specs.container = specs_input.container;
    }

    // 此处检查avoid数组 //
    /*
        简单起见，avoid必须全都是是元素引用，不允许引用和选择器混用
        【待补：以后有空再写吧】
    */



    // 储存参数 ------------------------------------------------------------------------------------
    let element = specs.element;
    element.DragScrollData =
    {
        specs: specs,
        start_pos: {},
        scroll_original: {},
        if_dragging: false,
    };

    // 是否移除 ------------------------------------------------------------------------------------
    /*
        这个囿于js的机制，没法实现
    */

    // 设置监听 ------------------------------------------------------------------------------------
    element.addEventListener
    (
        'mousedown',
        function(event){   mousedownHandler(event, element);   }
    );

    document.addEventListener
    (
        'mousemove',
        function(event){   mousemoveHandler(event, element);   }
    );

    document.addEventListener
    (
        'mouseup',
        function(event){   mouseupHandler(event, element);   }
    );
}



export default dragScroll;
