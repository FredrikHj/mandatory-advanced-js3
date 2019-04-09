import { css } from 'glamor';

let indenticalCSS = {
  containerRegLogin:  css({
    'display': 'flex',
    'flexdDirection': 'row',
    'justifyContent': 'space-around',
    'alignContent': 'flex',
  })

}
/* ========================= Generall ========================= */
export const mainWindowCSS = {
  appBody: css({
    'marginLeft': 'calc(50% - 175px)',
    'marginTop': '10%',
    'width': '350px',
    'backgroundColor': 'white',
    'borderRadius': '30px',
    'paddingTop': '5px',
    'paddingLeft': '10px',
    'paddingRight': '10px',
    'paddingBottom': '15px',
  }),
  hr: css({
    'marginTop': '-28px',
    'width': '50%',
  }),
}
  
/* ========================= Header ========================= */
export const headerCSS = {  
  pagesHeadLine: css({
   'position': 'relative',
   'textAlign': 'center',
   'width': '100%',
  }),
  logOutBtn: css({
    'position': 'relative',
    'top': '21px',
    'right': '75px',
    'width': '70px',
  }),
  inloggedUser: css({
    'position': 'relative',
    'top': '-31px',
    'right': '-253px',
    'fontSize': '12px',
  }),
}
/* ========================= Reg ========================= */
export const regCSS = { 
  regContainer: indenticalCSS.containerRegLogin,
  regBtn: css({
    'marginLeft': '50px',
  }),
  errorRegContainer: css({   
    'marginTop': '11px', 
    'fontSize': '10px',
    'color': 'red',

  }),
  errorRegMess: css({
    'marginLeft': '50px',
  }),
  redToLogin: css({
    'position': 'relative', 
    'top': '5px',
    'witdh': '100px',
    'left': 'calc(50% - 50px)',
  }),
}
/* ========================= Login ========================= */
export const loginCSS = { 
  loginContainer: indenticalCSS.containerRegLogin,
  errorLoginContainer: css({
    'position': 'relative',
    'left': '11px',
  }),
  errorLoginMess: css({
    'fontSize': '10px',
    'color': 'red',
  }),
  regText: css({
    'display': 'block',
    'marginTop': '-22px',
    'marginLeft': '117px',
    'fontSize': '10px',
    'fontWeight': 'bold',
    'marginBottom': '-21px',
  }),
  logInBtn: css({
    'position': 'relative',
    'top': '-62.5px',
    'width': '70px',
    'left': '281.5px',
  }),
}
export const todoListCSS = { 
  todoListHead: css({
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'space-around',
  }),
  todoHeadline: css({
    'marginTop': '1px',
  }),

  todoItem: css({
    'display': 'inline-block',
    'marginLeft': '10px',
    'width': '71%',
    'border': '1px solid red',
  }),
  noneItem: css({
    'width': '100%',
    'textAlign': 'center',
    'letterSpacing': '1px',
    'color': 'red',
    'fontWeight': 'bold',
  }),
  itemContainer: css({
    'marginLeft': '30px',
    'width': '283px',
    'marginTop': '14px',
  }),
  listTable: css({
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'flex-start',
  }),
  todoTNr: css({
    'width': '25px',
  }),
  lineAddItem: css({
    'marginLeft': '10px',
  }),
  
  todoItem: css({
    'display': 'inline-block',
    'marginLeft': '10px',
    'width': '71%',
  }),
  removeTodo: css({
    'width': '23px',
    'height': '21px',
  }),
}