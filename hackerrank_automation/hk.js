//puppeteer->npm
const puppeteer= require("puppeteer");

const codeObj=require("./codes");

let page;
let email="lefetac460@douwx.com"
let password="Rosero@60"
let loginLink="https://www.hackerrank.com/auth/login";
//launch the browser->chromium(launch)
const browserOpenPromise= puppeteer.launch({
        headless:false,
   args :['--start-maximized'],    //to open browser in full screen 
        defaultViewPort:null  
})
browserOpenPromise.then(function(browserObj){
   // console.log("Browser opened")
   let tabOpenPromise=browserObj.newPage();
   return tabOpenPromise;
   //find Page

}).then(function(newTab){
    page=newTab;   //default page
    let loginPagePromise=page.goto(loginLink)   //goto is a function
    return loginPagePromise;
})
//keyboard-page.type
.then(function(){
    let emailIsEntered=page.type("input[id='input-1']",email,{delay:50})
    return emailIsEntered;

}).then(function(){
    let passwordIsEntered=page.type("input[type='password']",password,{delay:50})
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked=page.click('button[data-analytics="LoginPassword"]',{delay:50})
    return loginButtonClicked;
}).then(function(){
    let clickOnAlgoPromise=waitAndClick('.topic-name[data-automation="algorithms"]',page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp=waitAndClick('input[value="warmup"]',page)
    return getToWarmUp;
}).then(function(){
    let waitfor3Seconds=page.waitFor(3000)
    return waitfor3Seconds;
}).then(function(){
    let allChallengesPromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})  //$$-document .query selector
     return allChallengesPromise;
}).then(function(questionsArr){
console.log("number of questions",questionsArr.length);
let questionWillBeSolved=questionSolver(page,questionsArr[0],codeObj.answers[0]);
return questionWillBeSolved;
})


function waitAndClick(selector,cPage){   //cpage->current page
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel=cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })


    })
}
 function questionSolver(page,question,answer){
     return new Promise(function(resolve,reject){
         let questionWillBeClicked=question.click();
         return questionWillBeClicked.then(function(){
          let editorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page)
         return editorInFocusPromise
      }).then(function(){
          return waitAndClick('.checkbox-input',page)
      }).then(function(){
          return page.waitForSelector('textarea.custominput',page)
      }).then(function(){
           return page.type('textarea.custominput',answer,{delay:10})
      }).then(function(){
          let ctrlIsPressed=page.keyboard.down('Control')
          return ctrlIsPressed;
      }).then(function(){ 
          let AIsPressed=page.keyboard.press('A',{delay:100})   //select all
          return AIsPressed;
      }).then(function(){
          let XIsPressed=page.keyboard.press('X',{delay:100})    //cut all
          return XIsPressed;
      }).then(function(){
          let ctrlIsUnpressed=page.keyboard.up('Control');
          return ctrlIsUnpressed;
      }).then(function(){
          let mainEditorInFocus=waitAndClick('.monaco-editor.no-user-select.vs',page)
          return mainEditorInFocus;
      }).then(function(){
        let ctrlIsPressed=page.keyboard.down('Control')
        return ctrlIsPressed;
      }).then(function(){
        let AIsPressed=page.keyboard.press('A',{delay:100})   //select all
        return AIsPressed;
      }).then(function(){
        let VIsPressed=page.keyboard.press('V',{delay:100})   //paste all
        return VIsPressed;
      }).then(function(){
        let ctrlIsUnpressed=page.keyboard.up('Control');
        return ctrlIsUnpressed;
      }).then(function(){
          return page.click('.hr-monaco__run-code', {delay:50});
      }).then(function(){
          resolve()
      }).catch(function(err){
          reject();
      })
 })

 }
