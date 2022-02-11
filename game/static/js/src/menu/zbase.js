class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-helper">
        ===推荐PC端游玩===<br>
        移动：鼠标右键点击桌面即可移动至目标地点<br>
        攻击：按Q键 + 鼠标左键即可向目标处发射火球<br>
        闪现：按F键 + 鼠标左键即可瞬移至目标处<br>
        局内聊天(联网模式)：按ENTER键可呼唤出聊天框<br>
        若已输入内容，按ESC键可关闭聊天框，按ENTER键发送；<br>
        若未输入内容，按ENTER键可直接关闭聊天框
    </div>
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单机模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            联网模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            退出
        </div>
    </div>
</div>
`);

        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        /*
         * 在function中调用this会直接使用function的this
         * 因此用outer保存外部的this，方便在function中调用
         */
        this.$single_mode.click(function() {    // 单机模式
            outer.hide();
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function() {     // 联网模式
            outer.hide();
            outer.root.playground.show("multi mode");
        });
        this.$settings.click(function() {       // 退出
            outer.root.settings.logout_on_remote();
        });
    }

    show() {    //显示menu界面
        this.$menu.show();
    }

    hide() {    //关闭menu界面
        this.$menu.hide();
    }
}
