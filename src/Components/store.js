import {BehaviorSubject} from "rxjs";
import SecureKey from 'jsonwebtoken';
let getLSData = window.localStorage.getItem("userToken");
console.log(getLSData);

// Get token and the userNam
//let userToken = JSON.parse(getLSData);
const userDecodedToken = SecureKey.decode(getLSData);

let userName = userDecodedToken;//.email;
console.log(userName);

export const userName$ = new BehaviorSubject(userName);
export const userToken$ = new BehaviorSubject(getLSData);
export function updateToken(userToken){
    if(userToken === null){
        window.localStorage.removeItem("userToken");
        userName$.next(userDecodedToken.email);
    }else{
        userName$.next(userDecodedToken.email);
    }
}

