export default class UserInfo {
    constructor({ name , info , avatar }) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return { 
            user: this._name.textContent,
            info: this._info.textContent,
            _id: this._id,
            avatar: this._avatar.src
        };
    }

    setUserInfo( name , info, _id, avatar ) {
        this._id = _id
        this._name.textContent = name;
        this._info.textContent = info;
        this._avatar.src = avatar;
    }

    setUserAvatar(avatar ) {
        this._avatar.src = avatar;
    }
}