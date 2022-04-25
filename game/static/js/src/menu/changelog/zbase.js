class Changelog {
    constructor(menu) {
        this.menu = menu;
        this.$changelog = $(`
<div class="ac-game-changelog">
    <div class="ac-game-changelog-logo"></div>
    <br>
    <div class="ac-game-changelog-author">
        AUTHOR: &ensp;潘江明
        <br><br>
    </div>
    <div class="ac-game-changelog-close" title="关闭">
        ×
    </div>
    <div class="ac-game-changelog-text">
        2022.3.8<br>
        &emsp;重磅：Warlock War实现QQ一键登录功能
        <br>
        <br>
        2022.2.28<br>
        &emsp;重磅：Warlock War启用新域名&ensp;<a class="a-link" href="https://pjmcode.top/">pjmcode.top</a>
        <br>
        <br>
        2022.2.27<br>
        &emsp;优化：调整部分技能的参数<br>
        &emsp;&emsp;疾跑：冷却[8s->5s]，速度提升[100%->80%]<br>
        &emsp;&emsp;闪现：冷却[3s->8s]<br>
        &emsp;新增：局内增加疾跑效果剩余时间提示
        <br>
        <br>
        2022.2.25<br>
        &emsp;修复：部分平台登录时，选择模式界面图片加载不出的bug<br>
        &emsp;新增：局内新增“疾跑”技能（按W即可，持续3s，冷却8s，速度提升100%）
        <br>
        <br>
        2022.2.24<br>
        &emsp;<a class="a-link" href="https://m.weibo.cn/search?containerid=231522type%3D1%26t%3D10%26q%3D%23%E5%85%B3%E6%B3%A8%E4%BF%84%E4%B9%8C%E5%B1%80%E5%8A%BF%E6%9C%80%E6%96%B0%E8%BF%9B%E5%B1%95%23&extparam=%23%E5%85%B3%E6%B3%A8%E4%BF%84%E4%B9%8C%E5%B1%80%E5%8A%BF%E6%9C%80%E6%96%B0%E8%BF%9B%E5%B1%95%23" target="_blank">俄乌局势最新进展</a><br>
        &emsp;修复：Warlock Chat同账号登录发送信息不会实时更新的bug<br>
        &emsp;修复：Warlock Chat再次登录同一账号会出现之前界面历史记录出现两次的bug
        <br>
        <br>
        2022.2.23<br>
        &emsp;优化：合并单机模式和联网模式，简洁菜单界面
        <br>
        <br>
        2022.2.22<br>
        &emsp;祝您在最有爱的日子里，有爱您的人相伴<br>
        &emsp;新增：菜单界面设置功能（可更换头像）
        <br>
        <br>
        2022.2.18<br>
        &emsp;修复：部分情况下，进入游戏后闪退的bug
        <br>
        <br>
        2022.2.17<br>
        &emsp;优化：局内聊天系统文本颜色优化<br>
        &emsp;优化：单机模式内 AI 皮肤颜色增加<br>
        &emsp;新增：菜单界面用户信息显示
        <br>
        <br>
        2022.2.16<br>
        &emsp;重磅：Warlock Chat 正式上线<br>
        &emsp;优化：游戏说明页面视觉优化<br>
        &emsp;优化：鼠标指针皮肤全面更新<br>
        &emsp;优化：游戏界面背景全面优化<br>
        &emsp;新增：Warlock War 上线天数显示
        <br>
        <br>
        2022.2.15<br>
        &emsp;元宵节快乐！<br>
        &emsp;优化：更换背景样式，使背景更贴合游戏主题氛围<br>
        &emsp;修复：在菜单模式中点击其他按钮后更新日志不会自动关闭的bug
        <br>
        <br>
        2022.2.14<br>
        &emsp;情人节快乐！<br>
        &emsp;优化：UI适配不同类型窗口<br>
        &emsp;优化：局内添加技能按键提示<br>
        &emsp;新增：火球到达最大距离后烟花爆炸效果（不造成伤害）<br>
        &emsp;新增：移动目的地的提示位置<br>
        &emsp;修复：某些情况下游戏结束后不能正常重新开始的bug
        <br>
        <br>
        2022.2.13<br>
        &emsp;Warlock War 1.0 正式上线
    </div>
</div>
`);

        this.$changelog.hide();
        this.menu.root.$ac_game.append(this.$changelog);
        this.$close = this.$changelog.find('.ac-game-changelog-close');
        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;
        this.$close.click(function () {  // 关闭changelog
            outer.hide();
        });
    }

    show() {
        this.$changelog.show();
    }

    hide() {
        this.$changelog.hide();
    }
}
