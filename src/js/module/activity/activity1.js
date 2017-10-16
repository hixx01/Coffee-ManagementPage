define(function (require, exports, module) {
    module.exports = function () {
        var tplStr = require('./activity1.tpl');
        var tpl = Handlebars.compile(tplStr);
        var $content = $('.content');
        $content.html(tpl());

        var brandDetail = require('./activityDetail.js');
        $('.jump-to-activity-detail').on('click', function () {
            brandDetail();
        });

    };

});
