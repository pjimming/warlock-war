class FinallBoard extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.state = null;  // win or lose

        this.win_img = new Image();
        this.win_img.src = "https://cdn.acwing.com/media/article/image/2022/02/12/106788_3c4e02858c-win.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://cdn.acwing.com/media/article/image/2022/02/12/106788_3546c3128c-lose.png";
    }

    start() {
    }

    win() {
        this.state = "win";

        let outer = this;
        setTimeout(function() { // 2s后自动返回菜单界面
            outer.playground.hide();
            outer.playground.root.menu.show();
        }, 2000);
    }

    lose() {
        this.state = "lose";

        let outer = this;
        setTimeout(function() { // 2s后自动返回菜单界面
            outer.playground.hide();
            outer.playground.root.menu.show();
        }, 2000);
    }

    late_update() { // 最后渲染一遍，保证在画布最上面
        this.render();
    }

    render() {  // 渲染
        let height = this.playground.height / 2;
        let width = this.playground.width / 2;
        if (this.state === "win") {
            this.ctx.drawImage(this.win_img, this.playground.width / 2 - width / 2, this.playground.height / 2 - height / 2, width, height);
        } else if (this.state === "lose") {
            this.ctx.drawImage(this.lose_img, this.playground.width / 2 - width / 2, this.playground.height / 2 - height / 2, width, height);
        }
    }
}
