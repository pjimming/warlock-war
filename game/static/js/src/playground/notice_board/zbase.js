class NoticeBoard extends AcGameObject {
    constructor(playground) {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.text = "已就绪：0人";
        this.sprint_text = "";
    }

    start() {
    }

    write(text) {   // 更改notice_board的内容
        this.text = text;
    }

    write_sprint(text) {    // 更改sprint时间
        this.sprint_text = text;
    }

    update() {
        this.render();
    }

    render() {  // 渲染
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text, this.playground.width / 2, 20);
    }

    render_sprint() {
        this.ctx.font = "25px serif";
        this.ctx.fillText(this.sprint_text, this.playground.width / 2, 50);
    }
}
