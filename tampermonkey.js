// ==UserScript==
// @name         Auto SakuBot Chapter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://mangadex.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mangadex.org
// @grant        none
// ==/UserScript==

let url = "";
let page = 1;
let chapter = "";

function change(){
    const match = document.location.href.match(/https:\/\/mangadex.org\/(chapter)\/([^\/]*)\/?([0-9]*)/);
    console.log(match);
    if(match){
      const [lien,chapterfind,id,pagefind] = match;
      page = pagefind ? pagefind : 1;
      url = lien;
      if(chapterfind !== chapter){
          chapter = chapterfind
          activate();
      }
    }else{
      chapter = '';
      desactivate();
    }

}

function activate(){
    const buttonHTML = '<p class="textTamper"><span style="font-size: .875em; margin-right: .125em; position: relative; top: -.25em; left: -.125em">'
        +'📄<span style="position: absolute; top: .25em; left: .25em">📄</span>'
        +'</span><p>'
    const div = document.createElement("div");
    div.setAttribute("class","divTamper");
    div.setAttribute("id","copyChapter");
    div.innerHTML = buttonHTML;
    document.body.appendChild(div);
    div.addEventListener('click',()=> navigator.clipboard.writeText(getCommand()));
}
const getCommand = () => `/chapter url:${url} page:${page}`

function desactivate(){
   document.querySelector("#copyChapter").remove();
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


(function() {
    'use strict';
    let previousUrl = '';
    const observer = new MutationObserver(function(mutations) {
        console.log(location.href !== previousUrl);
        if (location.href !== previousUrl) {
            previousUrl = location.href;
            change();
        }
    });
    const config = {subtree: true, childList: true};
    observer.observe(document, config);


    addGlobalStyle('.textTamper{text-align:center}');
    addGlobalStyle('.divTamper{cursor:pointer;display: flex;flex-direction:column;justify-content:center; position:fixed; bottom:0;margin-bottom:3%;margin-left:3%;z-index:9999;background-color:rgb(158 158 158 / 20%);width:50px;height:50px;border-radius:50%;}');
    addGlobalStyle('.divTamper:hover{background-color:#648ed1}');
})();
