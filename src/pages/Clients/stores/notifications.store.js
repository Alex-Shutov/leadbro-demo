import {makeAutoObservable} from "mobx";

export class NotificationsStore {
    notifications=[]
    constructor(root) {
        this.root = root
        makeAutoObservable(this)
    }

    setNotifications(result){
        this.notifications = result
    }

    getNotifications(){
        return this.notifications
    }

}