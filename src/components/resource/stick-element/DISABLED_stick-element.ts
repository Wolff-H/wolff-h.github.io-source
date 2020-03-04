// jshint esversion: 6

function scrollHandler(event:any)
{
    console.log(event);
    
    // 从container上取回参数 //
    let { element, container, offset_limits } = event.target.StickElementData;

    // 竖直方向 //
    if(offset_limits.top != null && container.scrollTop > offset_limits.top)
    {
        element.style.top = container.scrollTop - offset_limits.top + 'px';
    }
    else
    {
        element.style.top = 0 +'px';
    }

    // 水平方向 //
    if(offset_limits.left != null && container.scrollLeft > offset_limits.left)
    {
        element.style.left = container.scrollLeft - offset_limits.left + 'px';
    }
    else
    {
        element.style.left = 0 +'px';
    }
}

function stickElement
(
    element_select:any = '',
    container_select:any = '',
    offset_limits_specs = {},
    destroy = false
)
{
    console.log(element_select);
    console.log(container_select);
    console.log(offset_limits_specs);
    console.log(destroy);
    
    
    
    
    // 验证入参 ------------------------------------------------------------------------------------
    if(!destroy && element_select == '')
    {
        console.log('element is not set');
        return;
    }

    // 设置变量 ------------------------------------------------------------------------------------
    let element, container;

    // 如果入参是string，用选择器获取元素；否则视为元素引用直接使用 //
    if(typeof(element_select) == 'string')
    {
        element = document.querySelector(element_select);
    }
    else
    {
        element = element_select;
    }

    if(typeof(container_select) == 'string')
    {
        container = document.querySelector(container_select);
    }
    else
    {
        container = container_select;
    }

    console.log(element);
    console.log(container);

    let offset_limits_default =
    {
        top: null,
        bottom: null,
        left: null,
        right: null,
    };

    let offset_limits = Object.assign({}, offset_limits_default, offset_limits_specs);    console.log(offset_limits);

    // 储存参数 ------------------------------------------------------------------------------------
    /*
        因为addEventListener中向具名函数传参8太行，所以曲线救国，把参数存到container元素上
    */
    container.StickElementData =
    {
        element: element,
        container: container,
        offset_limits: offset_limits,
    };

    // 是否移除 ------------------------------------------------------------------------------------
    if(destroy)
    {
        container.removeEventListener
        (
            'scroll',
            scrollHandler
        );

        delete container.StickElementData;

        return;
    }

    // 设置监听 ------------------------------------------------------------------------------------
    container.addEventListener
    (
        'scroll',
        scrollHandler
    );
}



export default stickElement
