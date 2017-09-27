;
(function($) {
    var Tab = function(tab) {
        that = this;
        this.tab = tab;
        this.tabNav = tab.find('.tab-nav li');
        this.tabItem = tab.find('.content-wrap .content-item');
        //默认配置参数
        this.config = {
            "triggerType": 'mouseover', //触发类型
            "invoke": '1', //默认显示第几个
            "aotu": '1000', //是否自动切换，与自动切换的时间
        };

        // 扩展默认参数
        $.extend(this.config, this.getConfig());
        //保存参数
        this.triggerType = this.config.triggerType;
        this.invoke = this.config.invoke;
        this.aotu = this.config.aotu;
        this.Index = this.invoke;
        this.time = "";

        //函数调用
        this.getConfig();
        that.change();
        that.aotuPlay();

        //事件注册
        this.tabNav.on(this.triggerType, function() {
            that.Index = that.tabNav.index(this);
            if (that.tabItem.is(":animated")) {
                that.tabItem.stop(true, true);
                that.change();
            } else {
                that.change();
            }
        });

        // 清除自动播放
        this.tab.on('mouseenter', function() {
            clearInterval(that.timer);

        }).on('mouseleave', function() {
            that.aotuPlay();
        });

    };

    Tab.prototype = {
        //判断参数类型

        //设置自动播放
        aotuPlay: function() {
            if (this.aotu != "") {
                that.timer = setInterval(function() {
                    if (that.Index < that.tabNav.length - 1) {
                        that.Index = that.Index + 1;
                    } else {
                        that.Index = 0;
                    }
                    that.change();
                }, that.aotu);
            }

        },
        //事件驱动函数
        // change1: function(currentIndex) {

        //     currentIndex.addClass('active').siblings().removeClass('active');
        //     that.tabItem.eq(that.Index).fadeIn().addClass('current').siblings().fadeOut().removeClass('current');
        // },
        change: function() {
            that.tabNav.eq(that.Index).addClass('active').siblings().removeClass('active');
            that.tabItem.eq(that.Index).fadeIn().addClass('current').siblings().fadeOut().removeClass('current');

        },
        //获取配置参数
        getConfig: function() {
            var dataConfig = this.tab.attr('data-config');

            if (dataConfig && dataConfig != "") {

                return $.parseJSON(dataConfig);

            } else {
                return null;
            }
        },

    };
    Tab.init = function(tabs) {
        var _this_ = this;
        tabs.each(function() {
            new _this_($(this));
        });
    };
    // var tab = new Tab($(".tab").eq(0));
    window.tab = Tab;
})(jQuery);