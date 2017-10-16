define(function (require, exports, module) {
    module.exports = function () {
        var tplStr = require('./activity1.tpl');
        var tpl = Handlebars.compile(tplStr);
        var $content = $('.content');
        $content.html(tpl());


        // 品牌管理 调用品牌管理的详情页模块

        var brandDetail = require('./activityDetail.js');
        $('.jump-to-activity-detail').on('click', function () {
            brandDetail(); // 需要传入品牌ID
        });

    };

});
