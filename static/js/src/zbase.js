export class AcGame {
    constructor (id, acwingos) {
        this.id = id;
        this.$ac_game = $('#' + id);

        // 这个AcWingOS是额外的一个参数，这个参数是你自己自定义的。比如现在我们加了acwingos，当我们在acwing app中打开应用，它在实例化AcGame这个类的时候就会加上AcWingOS这个参数（里面是acwing云端app的一些接口）。那么如果你自己把AcGame部署到了小程序或者哪里，你也可以再添加AcGame的实例化的参数，来表明来自哪个前端。
        this.acwingos = acwingos;

        this.settings = new Settings(this);             // 注册登录界面
        // this.menu = new AcGameMenu(this);            // 菜单界面
        this.choose_mode = new ChooseMode(this);        // 选择模式界面
        this.playground = new AcGamePlayground(this);   // 游戏界面

        this.start();
    }

    start() {
    }
}
