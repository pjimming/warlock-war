class GameMap extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas tabindex=0></canvas>`);  //canvas是画布
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);   // 把地图加入到acanvas里面

        this.background_img = new Image();
        // 游戏地图选择
        if (this.playground.mode === "single mode") {
            this.background_img.src = "https://cdn.acwing.com/media/article/image/2022/02/16/106788_4d7828ed8f-single.jpg";
        } else if (this.playground.mode === "multi mode") {
            this.background_img.src = "https://cdn.acwing.com/media/article/image/2022/02/16/106788_7f79857a8f-multi.jpg";
        }
    }

    start() {
        this.$canvas.focus();
    }

    resize() {  // 更改界面大小
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.drawImage(this.background_img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    update() {
        this.render();
    }

    render() {  // 画图
        this.ctx.globalAlpha = 0.28;    // 设置透明度，拖尾效果
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.drawImage(this.background_img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 1;
    }
}
