class ChangePhoto {
    constructor(menu) {
        this.menu = menu;

        this.username = this.menu.root.settings.username;
        this.cur_photo = this.menu.root.settings.photo;

        this.$change_user_photo = (`
<div class="change-photo">
    <div class="change-photo-username">
        用户名：${this.username}
    </div>
    <img class="change-photo-cur-photo-img" src="${this.cur_photo}" alt="您的头像">
    <div class="change-photo-cur-photo-src">
        当前头像的地址：${this.cur_photo}
    </div>
</div>
`);

        this.hide();

        this.menu.$menu.append(this.$change_user_photo);

        this.start();
    }

    start() {
    }

    show() {
        this.$change_user_photo.show();
    }

    hide() {
        this.$change_user_photo.hide();
    }
}
