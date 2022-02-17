class OnlineDays {
    constructor(menu) {
        this.menu = menu;

        this.$onlinedays = this.calc_days();

        this.$onlinedays.show();

        this.menu.$menu.append(this.$onlinedays);

        this.start();
    }

    start() {
    }

    calc_days() {   // 计算当天距离2022-2-13的天数
        let date1 = new Date(2022, 1, 13);
        let date2 = new Date();
        date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diff = date2.getTime() - date1.getTime();
        const diffDate = diff / (24 * 60 * 60 * 1000) + 1;
        return $(`<div class="onlinedays">Warlock War 已上线 ${diffDate} 天</div>`);
    }

    show() {
        this.$onlinedays.show();
    }

    hide() {
        this.$onlinedays.hide();
    }
}
