import {BehaviorSubject} from "rxjs";
let currentPage = '';
export const currentPage$ = new BehaviorSubject(currentPage);
export const userToken$ = new BehaviorSubject(window.localStorage.getItem("userToken"));

export function updateCurrentPage(currentPage){
    console.log(currentPage);
    if(currentPage) currentPage$.next(currentPage);
}
export function updateToken(userToken){
    console.log(userToken);
    if(userToken === null){
        window.localStorage.removeItem("userToken");
        userToken$.next(userToken);
    }else{
        userToken$.next(userToken);
    }
}

