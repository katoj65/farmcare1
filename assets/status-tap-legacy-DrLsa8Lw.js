System.register(["./index-legacy-DumJZ7zc.js"],function(e,t){"use strict";var n,r,s,o,a;return{setters:[e=>{n=e.ak,r=e.al,s=e.am,o=e.an,a=e.ao}],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("startStatusTap",()=>{const e=window;e.addEventListener("statusTap",()=>{n(()=>{const t=e.innerWidth,n=e.innerHeight,i=document.elementFromPoint(t/2,n/2);if(!i)return;const c=r(i);c&&new Promise(e=>s(c,e)).then(()=>{o(async()=>{c.style.setProperty("--overflow","hidden"),await a(c,300),c.style.removeProperty("--overflow")})})})})})}}});
