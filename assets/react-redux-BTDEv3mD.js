import{r as e}from"./react-BRShYvXP.js";import{w as t}from"./use-sync-external-store-BaE4T82b.js";var n={notify(){},get:()=>[]};var r=(()=>!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement))(),o=(()=>"undefined"!=typeof navigator&&"ReactNative"===navigator.product)(),u=(()=>r||o?e.useLayoutEffect:e.useEffect)(),s=Symbol.for("react-redux-context"),c="undefined"!=typeof globalThis?globalThis:{};function a(){if(!e.createContext)return{};const t=c[s]??(c[s]=new Map);let n=t.get(e.createContext);return n||(n=e.createContext(null),t.set(e.createContext,n)),n}var i=a();var l=function(t){const{children:r,context:o,serverState:s,store:c}=t,a=e.useMemo((()=>{const e=function(e){let t,r=n,o=0,u=!1;function s(){i.onStateChange&&i.onStateChange()}function c(){o++,t||(t=e.subscribe(s),r=function(){let e=null,t=null;return{clear(){e=null,t=null},notify(){(()=>{let t=e;for(;t;)t.callback(),t=t.next})()},get(){const t=[];let n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0;const o=t={callback:n,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){r&&null!==e&&(r=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}())}function a(){o--,t&&0===o&&(t(),t=void 0,r.clear(),r=n)}const i={addNestedSub:function(e){c();const t=r.subscribe(e);let n=!1;return()=>{n||(n=!0,t(),a())}},notifyNestedSubs:function(){r.notify()},handleChangeWrapper:s,isSubscribed:function(){return u},trySubscribe:function(){u||(u=!0,c())},tryUnsubscribe:function(){u&&(u=!1,a())},getListeners:()=>r};return i}(c);return{store:c,subscription:e,getServerState:s?()=>s:void 0}}),[c,s]),l=e.useMemo((()=>c.getState()),[c]);u((()=>{const{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),l!==c.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}}),[a,l]);const f=o||i;return e.createElement(f.Provider,{value:a},r)};function f(t=i){return function(){return e.useContext(t)}}var b=f();function d(e=i){const t=e===i?b:f(e),n=()=>{const{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var v=d();function p(e=i){const t=e===i?v:d(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var S=p(),g=(e,t)=>e===t;function y(n=i){const r=n===i?b:f(n),o=(n,o={})=>{const{equalityFn:u=g}="function"==typeof o?{equalityFn:o}:o,s=r(),{store:c,subscription:a,getServerState:i}=s;e.useRef(!0);const l=e.useCallback({[n.name]:e=>n(e)}[n.name],[n]),f=t.useSyncExternalStoreWithSelector(a.addNestedSub,c.getState,i||c.getState,l,u);return e.useDebugValue(f),f};return Object.assign(o,{withTypes:()=>o}),o}var x=y();export{l as P,x as a,S as u};
