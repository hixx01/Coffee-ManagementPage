
define(function (require, exports, module) {
    module.exports = function (activityId,detailSave) {
        var tplStr = require('./activityDetail.tpl');
        var tpl = Handlebars.compile(tplStr);
        var $content = $('.content');
        $content.append(tpl());


        //页面js部分如下
        //var activityId = 1;
        //判断如果activityId存在，则渲染页面
        //var objObtainUrl = '';
        if(activityId){
            $.ajax({
                type :'get',
                url : 'http://elechen.viphk.ngrok.org/cnfia/voteManager/activity/findActivity?activityId=' + activityId ,//将activityId拼接到url里
                data : {},
                dataType : 'json',
                success : function (data) {
                    //objObtainUrl = data;
                    var obj = data.data;
                    var startTimeHaoMiao = obj.activity.startTime;
                    var endTimeHaoMiao = obj.activity.endTime;
                    //debugger
                    //转换获取的毫秒数的函数
                    function getMyDate(HaoMiao){
                        var oDate = new Date(HaoMiao),
                            oYear = oDate.getFullYear(),
                            oMonth = oDate.getMonth()+1,
                            oDay = oDate.getDate(),
                            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间
                        return oTime;
                    };
                    function getzf(num){  //补0操作
                        if(parseInt(num) < 10){
                            num = '0'+num;
                        }
                        return num;
                    }


                    if(data.success){

                        $('.home-page-img-url').prepend('<img src="" id="home-page-img-url">');

                        $('#activity-name').val(obj.activity.name); //这里用html()不行
                        $('#dpd1').val(getMyDate(startTimeHaoMiao));
                        //console.log(getMyDate(startTimeHaoMiao));
                        $('#dpd2').val(getMyDate(endTimeHaoMiao));
                        $('#home-page-img-url').attr('src',obj.activity.mainImgUrl);
                        $('.home-page-img-url .icon-tianjia1').css('display','none');
                        //debugger
                        $('#limitCount').val(obj.activity.limitCount);

                       //渲染单位信息
                        function companyRender (companyClassify,contentBox) {
                            for(var attr in companyClassify){
                                var companylist =  '<li>' +
                                                    '<img src="' + companyClassify[attr].logoImgUrl + '">' +
                                                    '<span>' + companyClassify[attr].name + '</span>' +
                                                    '<i class="iconfont icon-iconshanchu company-remove"></i>' +
                                                '</li>';
                                contentBox.prepend(companylist);
                            }
                        }
                        companyRender (obj.notaries,$('#notary-exist-list'));
                        companyRender (obj.supportSponsors,$('#support-sponsor-exist-list'));
                        companyRender (obj.titleSponsors,$('#title-sponsor-exist-list'));
                        companyRender (obj.sponsors,$('#sponsor-exist-list'));

                        //分类渲染
                        for(var attr1 in obj.classifications){
                            var classifyList = '<li style="background-color: #' + obj.classifications[attr1].color + '">' +
                                '<img src="' + obj.classifications[attr1].iconImgUrl + '">' +
                                '<p>' + obj.classifications[attr1].name + '</p>' +
                                '<i class="iconfont icon-shanchu classify-remove"></i>' +
                                '</li>';
                            $('.classify-box').append(classifyList);
                        }

                        //规则渲染
                        for(var attr2 in obj.rules){
                            var ruleList = '<li class="clearfix">' +
                                                '<span>' + obj.rules[attr2].order + '</span>' +
                                                '<span>' + obj.rules[attr2].detail + '</span>' +
                                                '<i class="iconfont icon-iconshanchu rule-shanchu"></i>' +
                                            '</li>';
                            $('.rule-item').append(ruleList);
                        }

                        //查看时所有按钮不可点击（逻辑问题，页面框架加载进来的时候所有按钮已经绑定事件了，解决方法：遮罩层！！哈哈哈哈哈哈！！）
                        $('.add-classify').remove();
                        $('.add-color').remove();  //查看状态时新建分类的模块要隐藏掉
                        $('#cover-page').css('display','block');
                        $('#cover-page').css('opacity','0');
                        $('#cover-page').css('z-index','1');
                        $('#submit-btn').css('z-index','2');
                        $('#return-input-button').css('z-index','2');

                        $('.create').css('display','none');
                        $('.change-button').css('display','none');
                        $('.icon-iconshanchu').css('display','none');
                        $('.add-btn').css('display','none');


                        //点击返回和确认返回活动管理首页

                        $('.submit-btn').on('click',function () {
                            $('.activity-detail').remove();
                        });
                        $('#return-input-button').on('click',function () {
                            $('.activity-detail').remove();
                        });

                    }
                },
                error : function (data) {
                    //window.location.href = './error.html';
                    alert('错误');
                }
            });
        }
        else {
            //如果未收到活动id，则进入新建页面
            $('#limitCount').css('border','1px #e7e7eb solid'); //给票数限制输入框加样式
            $('#return-input-button').on('click',function () {
                $('.activity-detail').remove();
            });

            $('.preview-img').append('<img src="" id="preview-classify-logo">');
            $('.add-classification-logo').append('<img src="" id="add-classification-logo-url">');

            $('.home-page-img-url .change-button').on('click',function () {
                $('.home-page-img-url').append('<img src="" id="home-page-img-url">');
            });

            $('.sponsor .change-button').on('click',function () {
                $('.sponsor .add-list').append('<img src="" id="sponsor-logo-url">');
            });
            $('.title-sponsor .change-button').on('click',function () {
                $('.title-sponsor .add-list').append('<img src="" id="title-sponsor-logo-url">');
            });
            $('.support-sponsor .change-button').on('click',function () {
                $('.support-sponsor .add-list').append('<img src="" id="support-sponsor-logo-url">');
            });
            $('.notary .change-button').on('click',function () {
                $('.notary .add-list').append('<img src="" id="notary-logo-url">');
            });

            $('.submit-btn').on('click',function () {
                var result = {
                    activity: {
                        name: $('#activity-name').val(),
                        startTime: $('#dpd1').val(),
                        endTime: $('#dpd2').val(),
                        mainImgUrl: $('#home-page-img-url').attr('src'),
                        limitCount: $('#limitCount').val()
                    },
                    sponsors: [],
                    titleSponsors: [],
                    supportSponsors: [],
                    notaries: [],
                    classifications: [],
                    rules: []
                };

                for(var i = 0; i < $('#sponsor-exist-list').length; i++){
                    var sponsors = '';
                    sponsors = {
                        name: $('#sponsor-exist-list li span').eq(i).text(),
                        logoImgUrl: $('#sponsor-exist-list li img').eq(i).attr('src')
                    };
                    result.sponsors.push(sponsors);
                }

                for(var i = 0; i < $('#title-sponsor-exist-list').length; i++){
                    var titleSponsors = '';
                    titleSponsors = {
                        name: $('#title-sponsor-exist-list li span').eq(i).text(),
                        logoImgUrl: $('#title-sponsor-exist-list li img').eq(i).attr('src')
                    };
                    result.titleSponsors.push(titleSponsors);
                }

                for(var i = 0; i < $('#support-sponsor-exist-list').length; i++){
                    var supportSponsors = '';
                    supportSponsors = {
                        name: $('#support-sponsor-exist-list li span').eq(i).text(),
                        logoImgUrl: $('#support-sponsor-exist-list li img').eq(i).attr('src')
                    };
                    result.supportSponsors.push(supportSponsors);
                }

                for(var i = 0; i < $('#notary-exist-list').length; i++){
                    var notaries = '';
                    notaries = {
                        name: $('#notary-exist-list li span').eq(i).text(),
                        logoImgUrl: $('#notary-exist-list li img').eq(i).attr('src')
                    };
                    result.notaries.push(notaries);
                }

                for(var i = 0; i < $('.classify-box').length; i++){
                    var classifications = '';
                    classifications = {
                        name: $('.classify-box li span').eq(i).text(),
                        iconImgUrl: $('.classify-box li img').eq(i).attr('src'),
                        color: $('.classify-box li').eq(i).css('background-color')
                    };
                    result.classifications.push(classifications);
                }

                for(var i = 0; i < $('.rule-item').length; i++){
                    var rules = '';
                    rules = {
                        order: $('.rule-item span:nth-child(1)').eq(i).text(),
                        detail: $('.rule-item span:nth-child(2)').eq(i).text()
                    };
                    result.rules.push(rules);
                }
                $.ajax({
                    type : 'post',
                    url : 'http://elechen.viphk.ngrok.org/cnfia/voteManager/activity/insertActivity',
                    data : JSON.stringify(result) ,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    dataType : 'json',
                    success : function (data) {
                        if(data.success){
                            alert('新建成功');
                            detailSave({
                                activityId: data.data,
                                activityName: $('#activity-name').val(),
                                activityStartTime: $('#dpd1').val(),
                                activityEndTime: $('#dpd2').val()
                            });
                            $('.activity-detail').remove();
                        } else {
                            alert(data.error);
                        }
                    },
                    error : function () {
                     //window.location.href = './error.html';
                        alert('错误');
                    }
                });
            });

        }



        //以下为页面动态效果

        //jQuery时间选择器插件
        var choiceDate = function (aim) {
            aim.fdatepicker({
                format: 'yyyy-mm-dd',
            });
        };
        choiceDate($('#dpd1'));
        choiceDate($('#dpd2'));
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        var checkin = $('#dpd1').fdatepicker({
            onRender: function (date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date);
                newDate.setDate(newDate.getDate() + 1);
                checkout.update(newDate);
            }
            checkin.hide();
            $('#dpd2')[0].focus();
        }).data('datepicker');
        var checkout = $('#dpd2').fdatepicker({
            onRender: function (date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');


        //单位列表点击添加按钮生成添加标签，点击确定生成预览
        var changeBtns = document.getElementsByClassName('change-button');
        var existList = document.getElementsByClassName('exist-list');
        var addList = document.getElementsByClassName('add-list');
        var companyQueren = document.getElementsByClassName('company-queren');

        //用for循环来绑定click事件，点击添加按钮出现添加框
        for (var i = 1; i < changeBtns.length; i++) {  //i从1开始是为了不获取上一个修改按钮（我起名的锅。。。）
            changeBtns[i].index = i;
            changeBtns[i].onclick = function () {
                addList[this.index - 1].style.display = 'block';
                this.style.display = 'none';
            };
        }

        //首页图生成预览
        //var changeImgUrl = 'http://192.168.1.114:8080/platform/brandManage/imgServer'; //请求图片的地址
        //var changeImgUrl = 'http://115.28.156.235:9876/mng/testImgUrl'; //请求图片的地址
        var changeImgUrl = 'http://192.168.1.114:8080/voteManager/platform/brandManage/imgServer'; //请求图片的地址
        //首页图生成预览
        $('.home-page-img-url').prepend('<img src="" id="home-page-img-url">');
        $('#img-kuang').on('change', function() {
            var fileUp = document.getElementById('img-kuang');
            var sendForm = new FormData();
            var xhr = new XMLHttpRequest();
            sendForm.append('uploadImgs',fileUp.files[0]);
            xhr.open('POST',changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('#home-page-img-url').attr('src', obj.data[0]);
                        $('.icon-tianjia1').css('display','none');
                    }
                }
            };
        });

        //点击确认按钮生成新的单位列表，点击删除即可删除，将输入的内容加入
        for (var j = 0; j < companyQueren.length; j++) {
            companyQueren[j].index = j;
            companyQueren[j].onclick = function () {
                addList[this.index].style.display = 'none';
                changeBtns[this.index + 1].style.display = 'block';
                var newList =
                    '<li>' +
                    '<img src="' + $(addList[this.index]).find('img').attr('src') + '" alt="主办单位logo">' +
                    '<span>' + $(addList[this.index]).find('input').eq(1).val() + '</span>' +
                    '<i class="iconfont icon-iconshanchu company-remove"></i>' +
                    '</li>';
                $(existList[this.index]).prepend(newList);  //加$()后成功添加

                //注意逻辑顺序，添加之后再删除即可获取到新生成的删除标签
                $('.company-remove').on('click', function () {
                    //$(this).parent().remove();  //this是window
                    for (var i = 0; i < $('.company-remove').length; i++) {
                        $(this).parent().remove();
                    }
                });
            };
        }

        //主办单位图片生成预览
        $('.sponsor .add-list').append('<img src="" id="sponsor-logo-url">');
        $('#sponsor-logo').on('change', function() {
            var fileUp = document.getElementById('sponsor-logo');
            var sendForm = new FormData();
            var xhr = new XMLHttpRequest();
            sendForm.append('uploadImgs',fileUp.files[0]);
            xhr.open('POST',changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('#sponsor-logo-url').attr('src', obj.data[0]);
                        console.log('obj.data'+obj.data[0]);
                        $('.icon-tianjia').css('display','none');
                    }
                }
            };
        });

        //冠名单位图片生成预览
        $('#title-sponsor-logo').on('change', function() {
            var fileUp = document.getElementById('title-sponsor-logo');
            var sendForm = new FormData();
            var xhr = new XMLHttpRequest();
            sendForm.append('uploadImgs',fileUp.files[0]);
            xhr.open('POST',changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('#title-sponsor-logo-url').attr('src', obj.data[0]);
                        $('.icon-tianjia').css('display','none');
                    }
                }
            };
        });

        //支持单位图片生成预览
        $('#support-sponsor-logo').on('change', function() {
            var fileUp = document.getElementById('support-sponsor-logo');
            var sendForm = new FormData();
            var xhr = new XMLHttpRequest();
            sendForm.append('uploadImgs',fileUp.files[0]);
            xhr.open('POST',changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('#support-sponsor-logo-url').attr('src', obj.data[0]);
                        $('.icon-tianjia').css('display','none');
                    }
                }
            };
        });

        //公正单位图片生成预览
        $('#notary-logo').on('change', function() {
            var fileUp = document.getElementById('notary-logo');
            var sendForm = new FormData();
            var xhr = new XMLHttpRequest();
            sendForm.append('uploadImgs',fileUp.files[0]);
            xhr.open('POST',changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('#notary-logo-url').attr('src', obj.data[0]);
                        $('.icon-tianjia').css('display','none');
                    }
                }
            };
        });

        //添加分类图片生成预览，若未上传图片会有错误提示
        $('#add-classification-logo').on('change', function() {
            var fileUp = document.getElementById('add-classification-logo');
            var sendForm = new Formta();
            var xhr = new Xquest();
            sendForm.append('uploadImgs',fileUp.files[0]);
            xhr.open('POST',changeImgUrl, true);
            xhr.send(sendForm);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.success) {
                        $('#add-classification-logo-url').attr('src', obj.data[0]);
                        $('#preview-classify-logo').attr('src', obj.data[0]);
                        $('.icon-tianjia1').css('display','none');
                    }
                }
            };
        });
        $('#create-btn').on('click',function () {
            var newClassifyList =   '<li style="' + $('.preview').attr('style') + '">' +
                '<img src="' + $('#preview-classify-logo').attr('src') +'">' +
                '<p class="">' + $('.user-input-classify-name').val() + '</p>' +
                '<i class="iconfont icon-shanchu classify-remove"></i>' +
                '</li>';
            if( $('#preview-classify-logo').attr('src') && $('.user-input-classify-name').val() ){
                $('.classify-box').append(newClassifyList);
            } else {
                $('#create-error-tips').css('display','block');
                setInterval(function () {
                    $('#create-error-tips').css('display','none');
                },4000);
            }

            //分类点击删除按钮，该分类隐藏（注意逻辑，同样是添加之后点击删除才会获取到新添加的li）
            $('.classify-remove').on('click', function () {
                for (var k = 0; k < $('.classify-remove').length; k++) {
                    $(this).parent().css('display','none');
                }
            });

        });

        //鼠标移出颜色块时加border
        for (var a = 0; a < $('.choose-color li').length; a++) {
            $('.choose-color li')[a].onmouseover = function () {
                this.style.border = '1px #000 solid';
            };
            for (var i = 0; i < $('.choose-color li').length; i++) {
                $('.choose-color li')[i].onmouseout = function () {
                    $(this).css('border', 'none');
                };
            }

            //点击生成预览颜色
            for (var b = 0; b < $('.choose-color li').length; b++) {
                $('.choose-color li')[b].onclick = function () {
                    $('.preview').css('background-color',$(this).css('background-color'));
                };
            }
        }

        //输入框内容实时预览(没能实现实时，只是失去焦点时改变)
        $('.user-input-classify-name').change(function () {
            $('.preview-classify-name').text($('.user-input-classify-name').val());
        });

        //输入规则，点击确定生成，点击删除即可删除
        //先生成再删除(可是删除会依赖确认按钮的点击)
        $('.rule-queren').on('click', function () {
            var newRuleList =   '<li class="clearfix">' +
                '<span>' +  ($('.rule-item li').length+1) + '</span>' +
                '<span>' + $('#user-input-rule').val() + '</span>' +
                '<i class="iconfont icon-iconshanchu rule-shanchu"></i>' +
                '</li>';
            $('.rule-item').append(newRuleList);
            $('#user-input-rule').val('');  //为什么用.text('')和.html('')不能清空？

            $('.rule-shanchu').on('click', function () {
                $(this).parent().remove();
                for (var j=0; j<$('.rule-item > li').length; j++) {
                    $('.rule-item li span:nth-child(1)').eq(j).html(j+1);
                }
            });

        });

    };

});
