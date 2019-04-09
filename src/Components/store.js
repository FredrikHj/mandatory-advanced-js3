import {BehaviorSubject} from "rxjs";
import SecureKey from 'jsonwebtoken';
console.log('Store');


//let userName = userDecodedToken;//.email;

export const userName$ = new BehaviorSubject();
export const userToken$ = new BehaviorSubject(window.localStorage.getItem("userToken"));
export function updateToken(userToken){
    console.log(userToken);
// Get token and decode it for display the userNam
//let userToken = JSON.parse(getLSData);
const userDecodedToken = SecureKey.decode(userToken);

    if(userToken === null){
        window.localStorage.removeItem("userToken");

        userToken$.next(userToken);
    }else{

        userToken$.next(userToken);
    }
}

