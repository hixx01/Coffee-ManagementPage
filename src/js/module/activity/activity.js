define(function (require, exports, module) {
    module.exports = function () {
        Handlebars.registerHelper('getStatus', function(value){
            if(value == 1){
                return '未开始';
            }else if(value == 2){
                return '进行中';
            }else if(value == 3){
                return '已结束';
            }
        });
        Handlebars.registerHelper('getIfCheckAct', function(value){
            if(value == 1){
                return '点击查看';
            }else if(value == 2){
                return '点击查看';
            }else if(value == 3){
                return '';
            }
        });
        Handlebars.registerHelper('getIfStopAct', function(value){
            if(value == 1){
                return '';
            }else if(value == 2){
                return '立即停止';
            }else if(value == 3){
                return '';
            }
        });
        var urlPre = 'http://zichu.tunnel.qydev.com/vote/activity';
        var tplStr = require('./activity.tpl');
        var tpl = Handlebars.compile(tplStr);
        var $content = $('.content');
        var oUtil = require('../../util.js');
        var activityMngHtml = '';

        // 给详情页面的回调函数,将详情页面传来的数据并添加到表格中，并添加相应的点击事件
        function detailSave (detailInfo) {
            //console.log(detailInfo);
            if(detailInfo.activityId){
                var activityTrContent='<tr><td>'+detailInfo.activityName+'</td><td><span>'+detailInfo.activityStartTime+'</span>——<span class="actEndTime">'+detailInfo.activityEndTime+'</span></td><td>未开始</td><td class="clickCheckActivity canClick">点击查看</td><td class="clickStopActivity canClick"></td></tr>';
                $('.activityInforTable').append(activityTrContent);

                //添加点击事件
                //'立即停止'按钮
                $('.clickStopActivity').on('click', function(){
                    //console.log('clickStop1');
                    //debugger;
                    var clickIndex = $('.clickStopActivity').index(this);
                    //console.log('clickIndex' + clickIndex);
                    //根据单元格内是否为空判断能否发送停止活动的请求
                    if($(this).html()){
                        oUtil.ajax({
                            //url: 'http://115.28.156.235:9876/mng/activityMng/stopActivity/'+$(this).parent().attr('activityId'),
                            url: urlPre + '/stopActivity/' + $(this).parent().attr('activityId'),
                            method: 'post',
                            dataType: 'json',
                            success: function(result){
                                //debugger;
                                //console.log('result:'+result);
                                if (result.success) {
                                    //debugger;
                                    $('.actEndTime').eq(clickIndex).html(result.data);
                                    //console.log(clickIndex + 'endTime' + result.data);
                                    $('.activityStatus').html('已结束');

                                }else{
                                    alert('停止活动失败'+result.error);
                                }
                            },
                            error: function(){
                                alert('网络不好，请稍候再试~');
                            }
                        });
                    }
                });

                //'点击查看'按钮
                $('.clickCheckActivity').on('click',function(){
                    if($(this).html()){
                        activityDetail($(this).parent().attr('activityId'),null);
                    }

                });
            }

        }

        oUtil.ajax({
            //url:'http://115.28.156.235:9876/mng/activityMngInfor',
            url: urlPre + '/searchActivity',
            method:'post',
            success: function(result){

                // 活动管理 调用活动管理的详情页模块
                var activityDetail = require('./activityDetail.js');

                //console.log(result);
                //可以成功取到模拟数据
                activityMngHtml = tpl({
                    activityList: result.data
                });

                $content.html(activityMngHtml);

                //给每一行活动添加一个activityId
                for (var i =  $('.activityInforTable tbody tr').length- 1; i >= 0; i--) {
                    $('.activityInforTable tbody tr').eq(i).attr('activityId',result.data[i].activityId);
                }

                //'立即停止'按钮
                $('.clickStopActivity').on('click', function(){
                    //console.log('clickStop1');
                    //debugger;
                    var clickIndex = $('.clickStopActivity').index(this);
                    //console.log('clickIndex' + clickIndex);
                    //根据单元格内是否为空判断能否发送停止活动的请求
                    if($(this).html()){
                        oUtil.ajax({
                            //url: 'http://115.28.156.235:9876/mng/activityMng/stopActivity/'+$(this).parent().attr('activityId'),
                            url: urlPre + '/stopActivity/' + $(this).parent().attr('activityId'),
                            method: 'post',
                            dataType: 'json',
                            success: function(result){
                                //debugger;
                                //console.log('result:'+result);
                                if (result.success) {
                                    //debugger;
                                    $('.actEndTime').eq(clickIndex).html(result.data);
                                    //console.log(clickIndex + 'endTime' + result.data);
                                    $('.activityStatus').html('已结束');

                                }else{
                                    alert('停止活动失败'+result.error);
                                }
                            },
                            error: function(){
                                alert('网络不好，请稍候再试~');
                            }
                        });
                    }
                });

                //'点击查看'按钮
                $('.clickCheckActivity').on('click',function(){
                    if($(this).html()){
                        activityDetail($(this).parent().attr('activityId'),null);
                    }

                });

                //'新建'按钮
                $('.createActivityButton').on('click',function(){
                    activityDetail(null,detailSave);
                });
            }
        });

    };
});
