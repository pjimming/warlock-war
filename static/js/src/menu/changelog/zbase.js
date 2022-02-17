class Changelog {
    constructor(menu) {
        this.menu = menu;
        this.$changelog = $(`
<div class="ac-game-changelog">
    <div class="ac-game-changelog-logo"></div>
    <br>
    <div class="ac-game-changelog-author">
        AUTHOR: &ensp;潘江明-CN
        <br><br>
    </div>
    <div class="ac-game-changelog-close" title="关闭">
        ×
    </div>
    <div class="ac-game-changelog-text">
        2022.2.17<br>
        &emsp;优化：局内聊天系统文本颜色优化<br>
        &emsp;优化：单机模式内 AI 皮肤颜色增加
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
        this.$close.click(function() {  // 关闭changelog
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
