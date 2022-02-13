class GameHelper {
    constructor(menu) {
        this.menu = menu;
        this.$helper = $(`
<div class="ac-game-helper">
    <div class="ac-game-helper-text">
        AUTHOR: &emsp;潘江明-CN<br>
        <br>
        ===推荐PC端游玩===<br>
        移动：鼠标右键点击桌面即可移动至目标地点<br>
        攻击：按Q键 + 鼠标左键即可向目标处发射火球<br>
        闪现：按F键 + 鼠标左键即可瞬移至目标处<br>
        局内聊天(联网模式)：按ENTER键可呼唤出聊天框<br>
        若已输入内容，按ESC键可关闭聊天框，按ENTER键发送；<br>
        若未输入内容，按ENTER键可直接关闭聊天框
    </div>
    <br>
    <div class="ac-game-helper-back">
        返回
    </div>
</div>
`);

        this.$helper.hide();
        this.menu.root.$ac_game.append(this.$helper);
        this.$back = this.$helper.find('.ac-game-helper-back');

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$back.click(function() {
            outer.hide();
            outer.menu.show();
        });
    }

    show() {
        this.$helper.show();
    }

    hide() {
        this.$helper.hide();
    }
}
