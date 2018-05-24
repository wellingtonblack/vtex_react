import { UserModel } from "../models/user.model";

declare const $: any;
export class DataUserService {

    public static userbd: string =  "userdb";
    public static getCurrentUser(): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/no-cache/profileSystem/getProfile",
                success: (data: UserModel) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });

    }

    public static logout(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: "/no-cache/user/logout",
                success: () => {
                    this.removeUser();
                    resolve();
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public static setUser(user: UserModel) {
        sessionStorage.setItem(this.userbd, JSON.stringify(user));
    }

    public static getUser(): UserModel {
        return JSON.parse(sessionStorage.getItem(this.userbd));
    }

    public static removeUser(): void {
        sessionStorage.removeItem(this.userbd);
    }
}