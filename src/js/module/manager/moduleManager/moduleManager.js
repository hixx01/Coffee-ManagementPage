define(function (require, exports, module) {
    module.exports = function () {
        var urlRequestPrefix = 'http://115.28.156.235:9876/mng/manage';
        // var urlRequestPrefix = 'http://localhost:9876/mng/manage';
        // var urlRequestPrefix = 'http://lalala0.ngrok.cc';

        var tplStr = require('./moduleManager.tpl');
        var tpl = Handlebars.compile(tplStr);

        var htmlStr = tpl();
        $('.content').html(htmlStr);

        var $wrap = $('.module-manager');

        var util = require('util.js');
        var Toast = require('component/toast/toast.js');

        var moduleMap = {
            1: '投票',
            2: '官媒',
            3: '论坛',
            4: '呵呵',
            5: '管理员设置'
        };

        var moduleInfo = {};
        var $emailInput = $wrap.find('.module-email'); // 输入框
        var $btn = $wrap.find('.confirm-btn'); // 确定按钮
        var $moduleSel = $wrap.find('.module-info-select'); // 选择框

        util.ajax({
            url: urlRequestPrefix + '/findModuleRootEmail',
            method: 'get',
            success: function (res) {
                moduleInfo = res.data;

                var optionStr = '';
                moduleInfo && moduleInfo.forEach(function (item, index, array) {
                    optionStr += '<option value="' + item.moduleId + '">' + moduleMap[item.moduleId] + '</option>';
                });
                $moduleSel.html(optionStr);
                if ( moduleInfo[0].email ) {
                    $emailInput.val(moduleInfo[0].email).prop('disabled', true)
                }
                $moduleSel.on('change', selectHandler)
            },
            error: function (err) {
                Toast.show(err);
            }
        });

        function selectHandler (e) {
            var $target = $(e.target);
            var val = $target.val();
            var curModule = moduleInfo.find(function (item, index, array) {
                if ( item.moduleId == val ) {
                    return true;
                }
            });

            if ( curModule.email ) {
                $emailInput.val(curModule.email).prop('disabled', true)
            } else {
                $emailInput.val('').prop('disabled', false);
            }
        }

        $btn.on('click', function (e) {
            var selVal = $moduleSel.val();

            var curModule = moduleInfo.find(function (item, index, array) {
                if ( item.moduleId == selVal ) {
                    return true;
                }
            });

            if ( curModule.email ) {
                Toast.show('您已经设置过该模块的管理员了');
            } else {
                var emailVal = $emailInput.val();
                if ( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.exec(emailVal) ) {
                    util.ajax({
                        url: urlRequestPrefix + '/insertModuleRoot',
                        method: 'post',
                        data: {
                            moduleId: curModule.moduleId,
                            email: emailVal
                        },
                        success: function (res) {
                            if ( res.success === true ) {
                                Toast.show('设置成功');
                                debugger;
                                $emailInput.val(res.data.email).prop('disabled', true);
                            } else {
                                Toast.show(res.error);
                            }
                        },
                        error: function (err) {
                            Toast.show(err);
                        }
                    })
                } else {
                    Toast.show('请输入正确的邮箱');
                }
            }
        });

    };
});


























