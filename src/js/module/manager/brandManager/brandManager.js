define(function (require, exports, module) {
    module.exports = function () {
        var Toast = require('component/toast/toast.js');
        var util = require('util.js');

        var tplStr = require('./brandManager.tpl');
        var tpl = Handlebars.compile(tplStr);

        var urlRequestPrefix = 'http://115.28.156.235:9876/mng/manage/';
        // var urlRequestPrefix = 'http://localhost:9876/mng/manage';
        // var urlRequestPrefix = 'http://lalala0.ngrok.cc';

        var htmlStr = tpl();
        $('.content').html(htmlStr);

        var $wrap = $('.brand-manager');
        var canPost = true;

        var $submitBtn = $wrap.find('.submit-brand-btn'); // 确定按钮
        var $brandNameInput = $wrap.find('.form-input-brand-name'); // 品牌名称
        var $brandEmailInput = $wrap.find('.form-input-brand-email'); // 品牌邮箱

        $submitBtn.on('click', function (e) {
            var brandName = $brandNameInput.val();
            var brandEmail = $brandEmailInput.val();
            if ( brandName.length === 0 || brandName.length > 20 ) {
                Toast.show('品牌名称需要在0~20个');
                return null;
            }

            if ( !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.exec(brandEmail) ) {
                Toast.show('请输入正确的邮箱');
                return null;
            }

            canPost = false;
            util.ajax({
                url: urlRequestPrefix + '/insertLinkMan',
                method: 'post',
                data: {
                    brandName: brandName,
                    email: brandEmail
                },
                success: function (res) {
                    canPost = true;
                    $brandNameInput.val('');
                    $brandEmailInput.val('');

                    if ( res.success === true ) {
                        Toast.show('品牌管理员已经设置成功');
                    } else {
                        Toast.show(res.error);
                    }
                },
                error: function (err) {
                    canPost = true;
                    Toast.show(err);
                }
            })

        });
    };
});
