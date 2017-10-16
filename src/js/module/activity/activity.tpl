<div class="activity">
    <h3 class="activityTitle">活动管理</h3>
    <div class="createActivity">
        <div class="createActivityButton">新建</div>
    </div>
    <div class="activityInforContainer">
        <table class="activityInforTable">
            <thead>
                <td>活动名称</td>
                <td>时间</td>
                <td>活动状态</td>
                <td>查看</td>
                <td>是否停止</td>
            </thead>
            {{#each activityList}}
            <tr>
                <td>{{this.activityName}}</td>
                <td><span>{{this.activityStartTime}}</span>——<span class="actEndTime">{{this.activityEndTime}}</span></td>
                <td class="activityStatus">{{getStatus this.activityStatus}}</td>
                <td class="clickCheckActivity canClick">{{getIfCheckAct this.activityStatus}}</td>
                <td class="clickStopActivity canClick">{{getIfStopAct this.activityStatus}}</td>
            </tr>
            {{/each}}
        </table>
    </div>

</div>

