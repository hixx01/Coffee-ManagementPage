<div class="activity-detail">
    <p class="activity-management-title">活动管理</p>
    <div class="return-button" >
        <input type="button" value="返回" id='return-input-button'>
    </div>
    <div class="activity-main-message clearfix">
        <div id="cover-page"></div>
        <section class="left-side">
            <div class="activity-name">
                <span>活动名称:</span>
                <input type="text" id="activity-name">
            </div>
            <div class="start-time clearfix">
                <span>开始时间:</span>
                <div class="time-table">
                    <input type="text" id="dpd1">
                </div>
            </div>
            <div class="over-time clearfix">
                <span>结束时间:</span>
                <div class="time-table">
                    <input type="text" id="dpd2">
                </div>
            </div>
            <div class="home-page-img clearfix">
                <span>首 页 图 :</span>
                <div class="home-page-img-url">
                    <form id="home-page-img" enctype="multipart/form-data">
                        <input id="img-kuang" name="upLoadImgs" type="file"  multiple />
                    </form>
                    <i class="iconfont icon-tianjia1"></i>
                    <div class="change-button clearfix">
                        <label for="img-kuang">修改</label>
                    </div>
                </div>
            </div>
            <div class="sponsor clearfix">
                <p>主办单位:</p>
                <div class="company-list">
                    <ul class="exist-list" id="sponsor-exist-list">
                        <li class="change-button clearfix">
                            <p>添加</p>
                        </li>
                    </ul>
                    <div class="add-list">
                        <form enctype="multipart/form-data">
                            <input id="sponsor-logo" type="file" name="upLoadImgs" multiple>
                        </form>
                        <i class="iconfont icon-tianjia"></i>
                        <input type="text" placeholder="填写单位名称">
                        <i class="iconfont icon-queren company-queren" ></i>
                    </div>
                </div>
            </div>
            <div class="title-sponsor clearfix">
                <p>冠名单位:</p>
                <div class="company-list">
                    <ul class="exist-list" id="title-sponsor-exist-list">
                        <li class="change-button clearfix">
                            <p>添加</p>
                        </li>
                    </ul>
                    <div class="add-list">
                        <form enctype="multipart/form-data">
                            <input id="title-sponsor-logo" type="file" name="upLoadImgs" multiple>
                        </form>
                        <i class="iconfont icon-tianjia"></i>
                        <input type="text" placeholder="填写单位名称">
                        <i class="iconfont icon-queren company-queren"></i>
                    </div>
                </div>
            </div>
            <div class="support-sponsor clearfix">
                <p>支持单位:</p>
                <div class="company-list">
                    <ul class="exist-list" id="support-sponsor-exist-list">
                        <li class="change-button clearfix">
                            <p>添加</p>
                        </li>
                    </ul>
                    <div class="add-list">
                        <form enctype="multipart/form-data">
                            <input id="support-sponsor-logo" type="file" name="img-url" multiple>
                        </form>
                        <i class="iconfont icon-tianjia"></i>
                        <input type="text" placeholder="填写单位名称">
                        <i class="iconfont icon-queren company-queren"></i>
                    </div>
                </div>
            </div>
            <div class="notary clearfix">
                <p>公正单位:</p>
                <div class="company-list">
                    <ul class="exist-list" id="notary-exist-list">
                        <li class="change-button clearfix">
                            <p>添加</p>
                        </li>
                    </ul>
                    <div class="add-list">
                        <form enctype="multipart/form-data">
                            <input id="notary-logo" type="file" name="upLoadImgs" multiple>
                        </form>
                        <i class="iconfont icon-tianjia"></i>
                        <input type="text" placeholder="填写单位名称">
                        <i class="iconfont icon-queren company-queren"></i>
                    </div>
                </div>
            </div>
        </section>
        <section class="right-side">
            <div class="classify-management clearfix">
                <span class="classify-title">分类管理：</span>
                <ul class="classify-box clearfix"></ul>
            </div>
            <div class="add-classify clearfix">
                <div class="add-name">
                    <span>分类名称：</span>
                    <input type="text" class="user-input-classify-name">
                </div>
                <div class="add-classification-logo">
                    <span>图标上传：</span>
                    <form enctype="multipart/form-data">
                        <input id="add-classification-logo" type="file" name="upLoadImgs" multiple>
                    </form>
                    <i class="iconfont icon-tianjia1"></i>
                </div>
            </div>
            <div class="add-color clearfix">
                <div class="color-box clearfix">
                    <span>选择颜色：</span>
                    <div class="all-color">
                        <ul class="choose-color clearfix">
                            <li style="background-color: #94d1bd;"></li>
                            <li style="background-color: #9ed6e6;"></li>
                            <li style="background-color: #f2b688;"></li>
                            <li style="background-color: #f6d790;"></li>
                            <li style="background-color: #d4a4ca;"></li>
                        </ul>
                        <ul class="choose-color clearfix">
                            <li style="background-color: #bba7da;"></li>
                            <li style="background-color: #a7bbda;"></li>
                            <li style="background-color: #daa7c3;"></li>
                            <li style="background-color: #ccdaa7;"></li>
                            <li style="background-color: #dabfa7;"></li>
                        </ul>
                        <ul class="choose-color clearfix">
                            <li style="background-color: #83b1d4;"></li>
                            <li style="background-color: #83d4cb;"></li>
                            <li style="background-color: #a5d194;"></li>
                            <li style="background-color: #f69090;"></li>
                            <li style="background-color: #d1f690;"></li>
                        </ul>
                        <ul class="choose-color clearfix">
                            <li style="background-color: #88c9f2;"></li>
                            <li style="background-color: #f288b7;"></li>
                            <li style="background-color: #b4bee6;"></li>
                            <li style="background-color: #b4e6cf;"></li>
                            <li style="background-color: #e6d5b4;"></li>
                        </ul>
                    </div>
                </div>
                <div class="preview">
                    <div class="preview-img"></div>
                    <p class="preview-classify-name">乳制品</p>
                </div>
            </div>
            <div class="create clearfix" >
                <input value="生成" type="button" id="create-btn">
                <span id="create-error-tips">填写完整才能生成哦~</span>
            </div>
            <div class="limitCount">
                <span>每人每天最多投票数： <input id="limitCount" value="" >票</span>
            </div>
            <div class="rule clearfix">
                <span class="rule-title">投票详情：</span>
                <ul class="rule-item"></ul>
                <div class="add-btn">
                    <input type="text" placeholder="在此输入新规则" id="user-input-rule">
                    <i class="iconfont icon-queren rule-queren"></i>
                </div>
            </div>
        </section>
    </div>
    <input type="submit" value="确定" class="submit-btn">
</div>
