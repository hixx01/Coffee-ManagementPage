
'use strict';
define(function (require, exports, module) {
    module.exports = function (id, detailSave) {

        var $content = $('.content');
        if(id) {
            $content.html('show activityId:'+id);
        } else {
            setTimeout(function(){
                detailSave({
                    activityId: 66,
                    activityName: '',
                    activityStartTime: '2017.02.24',
                    activityEndTime: '2017.06.24',
                });
            }, 1000);
        }
    };
});
