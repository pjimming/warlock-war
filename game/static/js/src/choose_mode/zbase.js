class ChooseMode {
    constructor(root) {
        this.root = root;
        this.$choose_mode = $(`
<div class="choose-mode">
    <div class="choose-mode-single-mode" title="除了自己，都是敌人">
        <img class="choose-mode-single-mode-img" src="https://app1356.acapp.acwing.com.cn/static/image/choose_mode/3.png">
        <div class="choose-mode-single-mode-title">
            单机模式
        </div>
    </div>
    <div class="choose-mode-multi-mode" title="和真实玩家来一场1v1的勇者对决">
        <img class="choose-mode-multi-mode-img" src="https://app1356.acapp.acwing.com.cn/static/image/choose_mode/2.png">
        <div class="choose-mode-multi-mode-title">
            联网模式
        </div>
    </div>
    <div class="choose-mode-back">
        返回
    </div>
</div>
`);

        this.$choose_mode.hide();
        this.root.$ac_game.append(this.$choose_mode);

        this.$single_mode = this.$choose_mode.find('.choose-mode-single-mode');
        this.$multi_mode = this.$choose_mode.find('.choose-mode-multi-mode');
        this.$back = this.$choose_mode.find('.choose-mode-back');

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;

        this.$single_mode.click(function() {
            outer.hide();
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function() {
            outer.hide();
            outer.root.playground.show("multi mode");
        });
        this.$back.click(function() {
            outer.hide();
            outer.root.menu.show();
        });
    }

    show() {
        this.$choose_mode.show();
    }

    hide() {
        this.$choose_mode.hide();
    }
}
