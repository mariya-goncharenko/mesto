export default class UserInfo {
    constructor({ name , info }) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
    }

    getUserInfo() {
        return { 
            user: this._name.textContent,
            info: this._info.textContent 
        };
    }

    setUserInfo( name , info ) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}