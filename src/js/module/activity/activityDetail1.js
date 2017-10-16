/*
* @Author: Helen
* @Date:   2017-02-26 02:18:20
* @Last Modified by:   Helen
* @Last Modified time: 2017-02-26 11:57:51
*/

'use strict';
define(function (require, exports, module) {
    module.exports = function (id, detailSave) { // id 是品牌列表页面传入进来的
        //var tplStr = require('./brandDetail.tpl');
        //var tpl = Handlebars.compile(tplStr);

        //var htmlStr = tpl();
        var $content = $('.content');
        //$content.append(htmlStr);
        //若传入id不为null则为显示活动信息，发送包含activityId的ajax请求活动信息后进行渲染(模拟：页面上输出一下id)
        if(id) {
            $content.html('show activityId:'+id);
        } else {    //若传入id为null则为新建活动，输入信息并向后台发送数据请求添加活动成功后返回时，调用活动管理页面传来的回调函数实现新建活动的数据的返回（模拟：用setTimeout调用）
            setTimeout(function(){
                detailSave({
                    activityId: 66,
                    activityName: '消费者喜爱品牌投票活动',
                    activityStartTime: '2017.02.24',
                    activityEndTime: '2017.06.24',
                });
            }, 1000);
        }
    };
});
