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
    <div class="ac-game-changelog-close">
        ×
    </div>
    <div class="ac-game-changelog-text">
        2022.2.13
        <br>
        &emsp;上线
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
        this.$close.click(function() {
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
