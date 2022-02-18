class UserInfo {
    constructor(menu) {
        this.menu = menu;

        this.photo = this.menu.root.settings.photo;
        this.username = this.menu.root.settings.username;
        this.$photo = $(`<img class="user-info-photo" src="${this.photo}" alt="您的头像">`);
        this.$username = $(`<div class="user-info-username">${this.username}</div>`);
        this.$user_settings = $(`
<div class="user-info-settings">
    <div class="user-info-settings-change-photo">
        修改头像
    </div>
</div>
`);

        this.$photo.show();
        this.$username.show();
        this.$user_settings.hide();

        this.menu.$menu.append(this.$photo);
        this.menu.$menu.append(this.$username);
        this.menu.$menu.append(this.$user_settings);

        this.$change_photo = this.$user_settings.find('.user-info-settings-change-photo');

        this.settings_show = false;

        this.start();
    }

    start() {
        this.add_listening_event();
    }

    add_listening_event() {
        let outer = this;

        this.$photo.click(function() {
            if (outer.settings_show) {
                outer.hide_settings();
            } else {
                outer.show_settings();
            }
        });

        this.$change_photo.click(function() {
            outer.hide_settings();
        });
    }

    hide_settings() {
        this.$user_settings.hide();
        this.settings_show = false;
    }

    show_settings() {
        this.$user_settings.show();
        this.settings_show = true;
    }
}
