var e={exports:{}},r={},o="function"==typeof Symbol&&Symbol.for,t=o?Symbol.for("react.element"):60103,n=o?Symbol.for("react.portal"):60106,f=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,a=o?Symbol.for("react.profiler"):60114,s=o?Symbol.for("react.provider"):60109,y=o?Symbol.for("react.context"):60110,u=o?Symbol.for("react.async_mode"):60111,i=o?Symbol.for("react.concurrent_mode"):60111,l=o?Symbol.for("react.forward_ref"):60112,p=o?Symbol.for("react.suspense"):60113,m=o?Symbol.for("react.suspense_list"):60120,$=o?Symbol.for("react.memo"):60115,d=o?Symbol.for("react.lazy"):60116,b=o?Symbol.for("react.block"):60121,S=o?Symbol.for("react.fundamental"):60117,M=o?Symbol.for("react.responder"):60118,x=o?Symbol.for("react.scope"):60119;function C(e){if("object"==typeof e&&null!==e){var r=e.$$typeof;switch(r){case t:switch(e=e.type){case u:case i:case f:case a:case c:case p:return e;default:switch(e=e&&e.$$typeof){case y:case l:case d:case $:case s:return e;default:return r}}case n:return r}}}function P(e){return C(e)===i}r.AsyncMode=u,r.ConcurrentMode=i,r.ContextConsumer=y,r.ContextProvider=s,r.Element=t,r.ForwardRef=l,r.Fragment=f,r.Lazy=d,r.Memo=$,r.Portal=n,r.Profiler=a,r.StrictMode=c,r.Suspense=p,r.isAsyncMode=function(e){return P(e)||C(e)===u},r.isConcurrentMode=P,r.isContextConsumer=function(e){return C(e)===y},r.isContextProvider=function(e){return C(e)===s},r.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===t},r.isForwardRef=function(e){return C(e)===l},r.isFragment=function(e){return C(e)===f},r.isLazy=function(e){return C(e)===d},r.isMemo=function(e){return C(e)===$},r.isPortal=function(e){return C(e)===n},r.isProfiler=function(e){return C(e)===a},r.isStrictMode=function(e){return C(e)===c},r.isSuspense=function(e){return C(e)===p},r.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===f||e===i||e===a||e===c||e===p||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===d||e.$$typeof===$||e.$$typeof===s||e.$$typeof===y||e.$$typeof===l||e.$$typeof===S||e.$$typeof===M||e.$$typeof===x||e.$$typeof===b)},r.typeOf=C,e.exports=r;var w=e.exports,v={};v[w.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},v[w.Memo]={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0};
