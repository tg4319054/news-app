(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{410:function(t,e,r){var content=r(420);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(51).default)("6130b3fd",content,!0,{sourceMap:!1})},416:function(t,e,r){var n=r(417),o=r(418);t.exports=function(t,e,r){var i=e&&r||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var d=(t=t||{}).random||(t.rng||n)();if(d[6]=15&d[6]|64,d[8]=63&d[8]|128,e)for(var c=0;c<16;++c)e[i+c]=d[c];return e||o(d)}},417:function(t,e){var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var n=new Uint8Array(16);t.exports=function(){return r(n),n}}else{var o=new Array(16);t.exports=function(){for(var t,i=0;i<16;i++)0==(3&i)&&(t=4294967296*Math.random()),o[i]=t>>>((3&i)<<3)&255;return o}}},418:function(t,e){for(var r=[],i=0;i<256;++i)r[i]=(i+256).toString(16).substr(1);t.exports=function(t,e){var i=e||0,n=r;return[n[t[i++]],n[t[i++]],n[t[i++]],n[t[i++]],"-",n[t[i++]],n[t[i++]],"-",n[t[i++]],n[t[i++]],"-",n[t[i++]],n[t[i++]],"-",n[t[i++]],n[t[i++]],n[t[i++]],n[t[i++]],n[t[i++]],n[t[i++]]].join("")}},419:function(t,e,r){"use strict";r(410)},420:function(t,e,r){(e=r(50)(!1)).push([t.i,".md-triple-line[data-v-f3d40db8]{margin-top:3rem}.label[data-v-f3d40db8]{margin:.5rem 1rem;color:hsla(0,0%,100%,.7)}.md-field[data-v-f3d40db8]{display:block}.box[data-v-f3d40db8]{text-align:center}",""]),t.exports=e},427:function(t,e,r){"use strict";r.r(e);r(70),r(28),r(29),r(17),r(52),r(88);var n=r(27),o=(r(40),r(4)),d=r(416),c=r.n(d);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={data:function(){return{text:""}},fetch:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.store,n=t.params,e.next=3,r.dispatch("loadHeadline",n.slug);case 3:case"end":return e.stop()}}),e)})))()},computed:{headline:function(){return this.$store.getters.headline},loading:function(){return this.$store.getters.loading},user:function(){return this.$store.getters.user}},methods:{sendComment:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={id:c()(),text:t.text,user:t.getCommentUserData(),publishedAt:Date.now(),likes:0},e.next=3,t.$store.dispatch("sendComment",r);case 3:t.text="";case 4:case"end":return e.stop()}}),e)})))()},likeComment:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$store.dispatch("likeComment",t);case 2:case"end":return r.stop()}}),r)})))()},getCommentUserData:function(){var t=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},this.user);return t.username=t.email.split("@")[0],t}}},f=(r(419),r(41)),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"md-layout md-alignment-center",staticStyle:{margin:"5em 0"}},[r("div",{staticClass:"md-layout-item md-size-75 md-small-size-80 md-xsmall-size-100",staticStyle:{padding:"0 2rem 10rem"}},[r("md-card",[r("md-card-media",{staticStyle:{height:"300px"},attrs:{"md-ratio":"16:9"}},[r("img",{attrs:{src:t.headline.urlToImage,alt:t.headline.title}})]),t._v(" "),r("md-card-header",[r("div",{staticClass:"md-title"},[r("a",{attrs:{href:t.headline.url,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.headline.title))])]),t._v(" "),r("div",[t._v("\n            "+t._s(t.headline.source.name)+"\n            "),r("md-icon",[t._v("book")])],1),t._v(" "),t.headline.author?r("span",{staticClass:"md-subhead"},[t._v("\n            "+t._s(t.headline.author)+"\n            "),r("md-icon",[t._v("face")])],1):t._e()]),t._v(" "),r("md-card-content",[t._v(t._s(t.headline.content))])],1),t._v(" "),t.user?r("form",{on:{submit:function(e){return e.preventDefault(),t.sendComment(e)}}},[r("md-field",[r("label",[t._v("Enter your comment")]),t._v(" "),r("md-textarea",{attrs:{disable:t.loading||!t.user},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),t._v(" "),r("md-icon",[t._v("description")])],1),t._v(" "),t.user?r("md-button",{staticClass:"md-primary md-raised",attrs:{type:"submit",disable:t.loading||!t.user}},[t._v("Send Comment")]):t._e()],1):t._e(),t._v(" "),t.user?t._e():r("md-field",{staticClass:"none"},[r("p",{staticClass:"label"},[t._v("\n        You can only see the comments of others. "),r("br"),t._v("\n        To write comment please login or register.\n      ")]),t._v(" "),r("br"),t._v(" "),r("div",{staticClass:"box"},[r("md-button",{staticClass:"md-primary",attrs:{to:"/login"}},[t._v("Login")]),t._v(" "),r("md-button",{staticClass:"md-primary",attrs:{to:"/register"}},[t._v("Register")])],1)]),t._v(" "),r("md-list",{staticClass:"md-triple-line"},t._l(t.headline.comments,(function(e){return r("md-list-item",{key:e.id},[r("md-avatar",[r("img",{attrs:{src:e.user.avatar,alt:e.user.username}})]),t._v(" "),r("div",{staticClass:"md-list-item-text"},[r("span",[t._v(t._s(e.user.username))]),t._v(" "),r("span",[t._v(t._s(t._f("commentTimeToNow")(e.publishedAt)))]),t._v(" "),r("p",[t._v(t._s(e.text))])]),t._v(" "),r("md-badge",{staticClass:"md-primary",attrs:{"md-position":"bottom","md-content":e.likes}}),t._v(" "),r("md-button",{staticClass:"md-icon-button",attrs:{disabled:t.loading||!t.user},on:{click:function(r){return t.likeComment(e.id)}}},[r("md-icon",[t._v("thumb_up")])],1)],1)})),1),t._v(" "),r("md-button",{staticClass:"md-fixed md-fab-bottom-right md-fab md-primary",on:{click:function(e){return t.$router.go(-1)}}},[r("md-icon",[t._v("arrow_back")])],1)],1)])}),[],!1,null,"f3d40db8",null);e.default=component.exports}}]);