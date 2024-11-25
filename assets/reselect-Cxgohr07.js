var e=e=>Array.isArray(e)?e:[e];function t(e){const t=Array.isArray(e[0])?e[0]:e;return function(e,t="expected all items to be functions, instead received the following types: "){if(!e.every((e=>"function"==typeof e))){const n=e.map((e=>"function"==typeof e?`function ${e.name||"unnamed"}()`:typeof e)).join(", ");throw new TypeError(`${t}[${n}]`)}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}var n="undefined"!=typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}};function o(e,t={}){let o={s:0,v:void 0,o:null,p:null};const{resultEqualityCheck:r}=t;let s,c=0;function l(){var t;let l=o;const{length:u}=arguments;for(let e=0,n=u;e<n;e++){const t=arguments[e];if("function"==typeof t||"object"==typeof t&&null!==t){let e=l.o;null===e&&(l.o=e=new WeakMap);const n=e.get(t);void 0===n?(l={s:0,v:void 0,o:null,p:null},e.set(t,l)):l=n}else{let e=l.p;null===e&&(l.p=e=new Map);const n=e.get(t);void 0===n?(l={s:0,v:void 0,o:null,p:null},e.set(t,l)):l=n}}const i=l;let p;if(1===l.s)p=l.v;else if(p=e.apply(null,arguments),c++,r){const e=(null==(t=null==s?void 0:s.deref)?void 0:t.call(s))??s;null!=e&&r(e,p)&&(p=e,0!==c&&c--);s="object"==typeof p&&null!==p||"function"==typeof p?new n(p):p}return i.s=1,i.v=p,p}return l.clearCache=()=>{o={s:0,v:void 0,o:null,p:null},l.resetResultsCount()},l.resultsCount=()=>c,l.resetResultsCount=()=>{c=0},l}function r(n,...r){const s="function"==typeof n?{memoize:n,memoizeOptions:r}:n,c=(...n)=>{let r,c=0,l=0,u={},i=n.pop();"object"==typeof i&&(u=i,i=n.pop()),function(e,t="expected a function, instead received "+typeof e){if("function"!=typeof e)throw new TypeError(t)}(i,`createSelector expects an output function after the inputs, but received: [${typeof i}]`);const p={...s,...u},{memoize:a,memoizeOptions:f=[],argsMemoize:y=o,argsMemoizeOptions:d=[],devModeChecks:v={}}=p,m=e(f),h=e(d),b=t(n),w=a((function(){return c++,i.apply(null,arguments)}),...m),g=y((function(){l++;const e=function(e,t){const n=[],{length:o}=e;for(let r=0;r<o;r++)n.push(e[r].apply(null,t));return n}(b,arguments);return r=w.apply(null,e),r}),...h);return Object.assign(g,{resultFunc:i,memoizedResultFunc:w,dependencies:b,dependencyRecomputations:()=>l,resetDependencyRecomputations:()=>{l=0},lastResult:()=>r,recomputations:()=>c,resetRecomputations:()=>{c=0},memoize:a,argsMemoize:y})};return Object.assign(c,{withTypes:()=>c}),c}var s=r(o),c=Object.assign(((e,t=s)=>{!function(e,t="expected an object, instead received "+typeof e){if("object"!=typeof e)throw new TypeError(t)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);const n=Object.keys(e);return t(n.map((t=>e[t])),((...e)=>e.reduce(((e,t,o)=>(e[n[o]]=t,e)),{})))}),{withTypes:()=>c});
