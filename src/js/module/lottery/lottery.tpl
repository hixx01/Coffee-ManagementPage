<div class="vote">
    <div class="toast-wrap">
        <span class="toast-text"></span>
    </div>
    <div class="vote-header">
        <div class="awards-manage">奖项管理</div>
        <div class="awards-list">奖品列表</div>
    </div>
    <div class="vote-center">
        <table id="vote-table" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>奖品内容</th>
                    <th>占比</th>
                    <th>数量</th>
                    <th>剩余量</th>
                    <th>奖品提供方</th>
                    <th class="vote-table-editor">点击编辑</th>
                    <th class="vote-table-save hide">点击保存</th>
                </tr>
            </thead>
            <tbody class="tbody"></tbody>
        </table>
        <div class="vote-add">奖品添加</div>
    </div>
    <div class="vote-footer">
        <div class="vote-footer-top">
            <div class="vote-footer-input">
                <form accept-charset="utf-8">
                    <div class="input">
                        <div class="des"><span>奖品内容:</span></div>
                        <div class="cnt">
                            <input type="input" value="" placeholder="请输入奖品内容，长度小于7" class="awards-cnt" />
                            <input type="button" value="添加谢谢参与" class="add-think" />
                        </div>
                    </div>
                    <div class="input">
                        <div class="des"><span>占比:</span></div>
                        <div class="cnt">
                            <input type="input" placeholder="如输入数字10，%会自动补全" class="proportion" />
                        </div>
                    </div>
                    <div class="input">
                        <div class="des"><span>奖品总量:</span></div>
                        <div class="cnt">
                            <input type="input" placeholder="请输入奖品总数" class="total-num" />
                        </div>
                    </div>
                    <div class="input">
                        <div class="des"><span>奖品提供方:</span></div>
                        <div class="cnt">
                            <input type="input" placeholder="请输入奖品提供方" class="awards-provide" />
                        </div>
                    </div>
                    <div class="manager-detail">
                        <div class="add-know">添加奖品须知:</div>
                        <ul>
                            <li>1、奖品字数不能大于六个;</li>
                            <li>2、共需添加满十项奖品方可提交;</li>
                            <li>3、十项奖品的占比和须等于100%;</li>
                            <li>4、奖品添加顺序请参考右侧转盘。</li>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="vote-footer-turntable">
                <div class="turntable">
                    <img src="../../../img/turnplate.jpg" alt="">
                </div>
                <div class="add-cnt">
                    <input type="button" value="确认添加" class="confirm-add" />
                </div>
            </div>
        </div>
        <div class="vote-footer-bottom">
            <input type="button" value="提交" class="last-btn" />
        </div>
    </div>
</div>
