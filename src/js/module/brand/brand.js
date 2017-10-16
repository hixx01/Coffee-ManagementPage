define(function (require, exports, module) {
    module.exports = function () {
        var tplStr = require('./brand.tpl');
        var tpl = Handlebars.compile(tplStr);
        var html = tpl();
        var $content = $('.content');
        $content.html(html);
        var utilAjax = require('../../util.js');// 请求util.js的ajax方法

        //公用的ajax数据
        var ajaxData = {
            url: '',
            type: '',
            success: {},
            error: {}
        };

        // 缓存Dom
        var $classifySelect = $('.classification-select'); // 多选框
        var $classifySelectedDom = $('.classification-select option'); // 获取option
        var $brandListUl = $('.brand-all-show'); // 品牌展示ul
        var $paginationNum = $('.pagination-num'); // 底部分页ul
        var $bottomPagination = $('.pagination-num > li'); // 底部分页的最后一个li
        var $searchBox = $('.search-box > input'); // 获取输入框
        var $goHrefInput = $('.go-href-input'); // 获取跳转输入框
        var urlRequestPrefix = 'http://xiaoyu.tunnel.qydev.com/voteManager/brandmanage';

        // 渲染DOM结构的公用函数
        function createDomTree(getData, selecte) {
            console.log(getData);
            console.log(getData.success);
            if (getData.success) {
                // 渲染分类下拉
                $classifySelect.html('');
                var strClassesList = '<option value="0">全部分类</option>';
                $classifySelect.append(strClassesList);
                for (var i = 0; i < getData.data.classesList.length; i++) {
                    if (getData.data.classesList[i].name == selecte){
                        strClassesList = '<option value="' + getData.data.classesList[i].id + '"' + 'selected="selected"' +  '>' + getData.data.classesList[i].name + '</option>';
                    } else {
                        strClassesList = '<option value="' + getData.data.classesList[i].id + '"' +  '>' + getData.data.classesList[i].name + '</option>';
                    }
                    $classifySelect.append(strClassesList);
                }
                $classifySelectedDom = $('.classification-select option');

                // 渲染品牌主页面
                $brandListUl.html('');
                for (var j = 0; j < getData.data.brandsList.length; j++) {
                    var strBrandsList = '' +
                        '<li class="specific-brand">' +
                            '<div class="brand-link">' +
                                '<div class="brand-logo">' +
                                    '<img src="' + getData.data.brandsList[j].brandImg +'"/>' +
                                '</div>' +
                                '<div class="brand-info clearfix">' +
                                    '<span class="brand-name">' + getData.data.brandsList[j].brandName +'</span>' +
                                    '<span class="brand-ballot">' + getData.data.brandsList[j].brandVoteNum + '</span>' +
                                '</div>' +
                            '</div>' +
                        '</li>';
                    $brandListUl.append(strBrandsList);
                    $('.specific-brand').attr('data_id', getData.data.brandsList[j].brandId);
                }

                // 渲染底部分页
                $paginationNum.html('');
                var strbottomPagination = '<li class="back-flip">&lt;&lt;</li>' +
                    '<li class="on-the-page">&gt;&gt;</li>';
                $paginationNum.append(strbottomPagination);
                $bottomPagination = $('.pagination-num > li');
                if (getData.data.total < 10) {
                    for (var i = 0; i < getData.data.total; i++) {
                        strbottomPagination = '<li class="page-num">' + (i + 1) + '</li>';
                        $bottomPagination.last().before(strbottomPagination);
                    }
                } else {
                    strbottomPagination =  '<li class="page-num">' + 1 + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + 2 + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + 3 + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + 4 + '</li>';
                    strbottomPagination +=  '<li>' + '...' + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + (getData.data.total - 3) + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + (getData.data.total - 2) + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + (getData.data.total - 1) + '</li>';
                    strbottomPagination +=  '<li class="page-num">' + (getData.data.total - 0) + '</li>';
                    $bottomPagination.last().before(strbottomPagination);
                }
            }
        }

        //页面一进入渲染
        function theFirstTimeCreateDomTree() {
            //要传入的ajax对象
            ajaxData = {
                url: urlRequestPrefix + '/classification?classification=0&index=0',
                method: 'get',
                async: false,
                success: function (result) {
                    createDomTree(result); // 构建DOM树,渲染页面
                },
                error: function (errorData) {
                    console.log(errorData);
                }
            };

            utilAjax.ajax(ajaxData); // 调用ajax
        }
        theFirstTimeCreateDomTree();

        //点击分类的业务函数
        function chooseClassify() {
            var $selected = '';
            var $selectedId = '';
            $classifySelect.on('change', function () {

                // 获取当前选中的下拉选框的值
                $selected = $classifySelect.find('option:selected').text();
                $selectedId = $classifySelect.find('option:selected').val();

                // 传入需要发送的ajax的数据
                ajaxData = {
                    url: urlRequestPrefix + '/classification' + '?classification=' + $selectedId + '&index=0',
                    type: 'get',
                    async: false,
                    success: function (data) {
                        createDomTree(data, $selected); // 构建DOM树,渲染页面
                        console.log('------------分类ajax渲染成功-----------');
                    },
                    error: function (errorData) {
                        console.log(errorData);
                    }
                };

                utilAjax.ajax(ajaxData); // 调用ajax

                bottomPagination('classification', 'classification', $selectedId);
            });
        }
        chooseClassify();

        // 查询输入框查到某一品牌
        function brandsSearch() {

            var $searchBoxValue = '';
            $searchBox.on('change', function () {

                console.log($searchBox.val());
                $searchBoxValue = $searchBox.val();

                //传入需要发送的ajax的数据
                ajaxData = {
                    url: urlRequestPrefix + '/brandsearch' + '?keyword=' + $searchBoxValue + '&index=0',
                    type: 'get',
                    async: false,
                    success: function (data) {
                        createDomTree(data); // 构建DOM树,渲染页面
                        console.log('------------查询ajax渲染成功-----------');
                    },
                    error: function (errorData) {
                        console.log(errorData);
                    }
                };

                utilAjax.ajax(ajaxData); // 调用ajax

                bottomPagination('brandsearch', 'keyword', $searchBoxValue);
            });
        }
        brandsSearch();

        // 底部ajax分页
        function bottomPagination(urlClsOrSearch, classifyOrSearch, classifyOrSearchValue) {
            console.log($goHrefInput.val());
            console.log(urlClsOrSearch + '---------path');
            console.log(classifyOrSearch + '----------哪种类型');
            console.log(classifyOrSearchValue + '----------值');

            // 点击具体页数
            $paginationNum.on('click', 'li', function () {

                var pageNum = parseInt($(this).html());
                console.log(pageNum);
                console.log(urlClsOrSearch + '---------path');
                console.log(classifyOrSearch + '----------哪种类型');
                console.log(classifyOrSearchValue + '----------值');

                //传入需要发送的ajax的数据
                ajaxData = {
                    url: urlRequestPrefix + '/' + urlClsOrSearch + '?' + classifyOrSearch + '=' + classifyOrSearchValue + '&index=' + (pageNum - 1),
                    type: 'get',
                    async: false,
                    success: function (data) {
                        createDomTree(data); // 构建DOM树,渲染页面
                        console.log('------------分页点击具体页数  ajax渲染成功-----------');
                    },
                    error: function (errorData) {
                        console.log(errorData);
                    }
                };''

                utilAjax.ajax(ajaxData); // 调用ajax
            });

            // 输入框输入值
            $goHrefInput.on('change', function () {
               var pageNumInput = parseInt($goHrefInput.val());
               console.log(pageNumInput);
               console.log(urlClsOrSearch + '---------path');
               console.log(classifyOrSearch + '----------哪种类型');
               console.log(classifyOrSearchValue + '----------值');

                //传入需要发送的ajax的数据
                ajaxData = {
                    url: urlRequestPrefix + '/' + urlClsOrSearch + '?' +classifyOrSearch + '=' + classifyOrSearchValue + '&index=' + (pageNumInput - 1),
                    type: 'get',
                    async: false,
                    success: function (data) {
                        createDomTree(data); // 构建DOM树,渲染页面
                        console.log(urlRequestPrefix);
                        console.log('------------分页输入框  ajax渲染成功-----------');
                    },
                    error: function (errorData) {
                        console.log(errorData);
                    }
                };

                utilAjax.ajax(ajaxData); // 调用ajax
            });

        }

        // 给详情页面的回调函数 用来获取详情页面传来的数据
        function detailSave (detailInfo) {
            console.log(detailInfo);
        }

        // 品牌管理 调用品牌管理的详情页模块
        var brandDetail = require('./brandDetail.js');
        $('.specific-brand').on('click', function () {
            var $data_id = $(this).attr('data_id');
            brandDetail(1, $data_id, detailSave); // 需要传入品牌ID
        });
    };
});
