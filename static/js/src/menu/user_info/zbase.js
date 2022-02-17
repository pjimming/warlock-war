class UserInfo {
    constructor(menu) {
        this.menu = menu;

        this.photo = this.menu.root.settings.photo;
        this.username = this.menu.root.settings.username;
        this.$photo = $(`<img class="user-info-photo" src="${this.photo}" alt="您的头像">`);
        this.$username = $(`<div class="user-info-username">${this.username}</div>`);

        this.$photo.show();
        this.$username.show();

        this.menu.$menu.append(this.$photo);
        this.menu.$menu.append(this.$username);

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
    }
}
