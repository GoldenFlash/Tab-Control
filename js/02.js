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
            "effect": 'fade', //切换效果
            "invoke": '1', //默认显示第几个
            "aotu": '1000', //是否自动切换，与自动切换的时间
        };

        // 扩展默认参数
        if (this.getConfig) {
            $.extend(this.config, this.getConfig());
        }
        //保存参数
        this.triggerType = this.config.triggerType;
        this.effect = this.config.effect;
        this.invoke = this.config.invoke;
        this.aotu = this.config.aotu;
        this.Index = this.invoke;
        this.time = "";

        //函数调用


        //事件注册


        if (this.triggerType === 'click' || this.triggerType != 'click') {
            that.tabNav.bind('click', function() {
                that.invoke($(this));
            });
        }
        if (this.triggerType === 'mouseover') {
            that.tabNav.bind(that.triggerType, function() {
                that.invoke($(this));
            });
        };

    };
    Tab.prototype = {
        //事件驱动函数
        invoke: function(currentTab) {
            var index = currentTab.index();
            currentTab.addClass('active').siblings().removeClass('active'),

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

    var tab = new Tab($(".tab").eq(0));
    window.tab = tab;
})(jQuery);