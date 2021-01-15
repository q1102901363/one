$(function() {
    aRound({ //调用
        ulCss: ".ul", //必填：长滚轮css
        butsCss: "ol li", //选填：小点css
        actiClass: "active", //选填：高亮小点class
        butOn: "mouseenter", //选填：小点翻页的事件 click/mouseenter(默认)
        wiLeCss: ".left", //选填：左翻页按钮css
        wiRiCss: ".right" //选填：右翻页按钮css
    }, 4000 /*轮播频率*/ );

    function aRound(bannCss, tiam = 3000) { //jqery无缝轮播
        //1.准备工作
        var this_ = this,
            axle = null,
            give = true, //动画状态
            timFlg = false, //定时器状态
            index = 0,
            ul = $(bannCss.ulCss),
            length = ul.children().length,
            width = ul.children(":first").width(),
            buts, active, winLe, winRi, butsOn;
        ul.css({
            width: (length + 1) * width
        }).children(":first").clone().appendTo(".ul");

        //2.功能添加
        function axleYes() { //开定时器
            if (!timFlg) {
                axle = setInterval(drum, tiam);
                timFlg = true;
            }
        };

        function axleNo() { //关定时器
            clearInterval(axle);
            timFlg = false;
        };
        ul.parent().hover(function() { //hover
            axleNo();
        }, function() {
            axleYes();
        });

        function gabby(posi) { //点亮该索引的小点 到达该索引的位置
            give = false;
            var giAb = Math.abs(posi);
            if (buts) {
                buts.eq(index == length ? 0 : false || giAb).addClass(active).siblings().removeClass(active);
            }
            ul.stop().animate({
                left: width * posi
            }, function() {
                give = true;
            });
            index = giAb;
        }

        function drum() { //走一格
            index++;
            if (index > length) {
                ul.css({
                    left: 0
                });
                index = 1;
            }
            gabby(-index);
        }

        //3.附加项
        if (bannCss.butsCss) {
            buts = $(bannCss.butsCss);
            active = bannCss.actiClass ? bannCss.actiClass : null;
            buts.first().addClass(active).siblings().removeClass(active);
            butsOn = bannCss.butOn ? bannCss.butOn : "mouseenter";
            buts.on(butsOn, function() {
                if (index == length && $(this).index() == 0) { //特殊状况
                    ul.stop().animate({
                        left: -width * length
                    }, 120, function() {
                        ul.css({
                            left: 0
                        });
                        index = 0;
                    });
                    return;
                }
                gabby(-$(this).index());
            });
        }
        if (bannCss.wiLeCss && bannCss.wiRiCss) {
            $(bannCss.wiRiCss).click(function() {
                if (give) {
                    drum();
                }
            });
            $(bannCss.wiLeCss).click(function() {
                if (give) {
                    index--;
                    if (index == -1) {
                        ul.css({
                            left: -width * length
                        });
                        index = length - 1;
                    }
                    gabby(-index);
                }
            });
        }
        axleYes();
    }
})