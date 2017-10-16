define(function (require, exports, module) {
    var urlRequestPrefix = 'http://139.129.238.102:9876/mng';

    var util = require('util.js');
    var tplStr = require('./frame.tpl');
    var tpl = Handlebars.compile(tplStr);

    var menuInfo = [
        {
            name: '活动管理',
            id: 1,
            className: 'icon-huodong2',
            subMenu: [
                {
                    name: '活动管理',
                    id: 11
                }
            ]
        },
        {
            name: '品牌管理',
            id: 2,
            className: 'icon-icon4',
            subMenu: [
                {
                    name: '全品牌管理',
                    id: 21
                }
            ]
        },
        {
            name: '抽奖管理',
            id: 3,
            className: 'icon-lottery',
            subMenu: [
                {
                    name: '奖项管理',
                    id: 31
                },
                {
                    name: '中奖详情',
                    id: 32
                }
            ]
        },
        {
            name: '官媒',
            id: 4,
            subMenu: [
                {
                    name: '官媒管理',
                    id: 41
                }
            ]
        },
        {
            name: '设置管理员',
            id: 5,
            className: 'icon-guanliyuan',
            subMenu: [
                {
                    name: '模块管理员',
                    id: 51
                },
                {
                    name: '品牌管理员',
                    id: 52
                }
            ]
        }
    ];

    // 定义回调函数
    var changeCb = function () {};
    exports.changeCb = function (cb) {
        changeCb = cb;
    };


    var init = function () {
        util.ajax({
            url: urlRequestPrefix + '/userinfo',
            method: 'post',
            success: function (res) {
                res.menuInfo = menuInfo.filter(function (item, index, array) {
                    // 过滤出该管理员有权限的菜单
                    var isFind = res.menu.find(function (_item, _index, _array) {
                        return _item === item.id;
                    });
                    if ( isFind != undefined ) {
                        return true;
                    }
                });

                // 渲染页面模板
                var resStr = tpl(res);
                $(document.body).prepend(resStr);

                var $navigation = $('.navigation');
                // 事件委托绑定事件 回调出点击的id
                $navigation.on('click', '.nav-item-sub-item', function (e) {
                    $target = $(e.target);
                    var clickId = $target.attr('data-id');

                    $navigation.find('.nav-item-sub-item').removeClass('active');
                    $target.addClass('active');

                    // 点击后运行回调
                    changeCb(clickId);
                });

                var firstMenuId = res.menuInfo[0].subMenu[0].id;
                changeCb(firstMenuId);
                $navigation.find('.nav-item-sub-item').eq(0).addClass('active');
            },
            error: function (err) {

            }
        });
    };
    exports.init = init;
});



















