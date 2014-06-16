KityMinder.registerProtocal("svg", function() {
    return {
        fileDescription: 'SVG 矢量图（暂不支持IE）',
        fileExtension: '.svg',
        mineType: 'image/svg+xml',
        encode: function(json, km) {
            var domContainer = km.getPaper().container,
                svgXml,
                $svg,

                renderContainer = km.getRenderContainer(),
                renderBox = renderContainer.getRenderBox(),
                transform = renderContainer.getTransform(),
                width = renderBox.width,
                height = renderBox.height,
                padding = 20;

            svgXml = km.getPaper().container.innerHTML;

            $svg = $(svgXml).filter('svg');
            $svg.attr({
                width: width + padding * 2 | 0,
                height: height + padding * 2 | 0,
                style: 'font-family: Arial, "Microsoft Yahei","Heiti SC";'
            });
            $svg[0].setAttribute('viewBox', [renderBox.x - padding | 0,
                renderBox.y - padding | 0,
                width + padding * 2 | 0,
                height + padding * 2 | 0
            ].join(' '));

            // need a xml with width and height
            svgXml = $('<div></div>').append($svg).html();

            // svg 含有 &nbsp; 符号导出报错 Entity 'nbsp' not defined
            svgXml = svgXml.replace(/&nbsp;/g, '&#xa0;');

            // svg 含有 &nbsp; 符号导出报错 Entity 'nbsp' not defined
            return svgXml;
        },
        recognizePriority: -1
    };
});