(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[4],{1057:function(e,t,n){"use strict";var r=n(3),o=n(0),i=n(13),a=n(6),s=n(143),f=n(113),c=n(69);function p(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function u(e){return e instanceof p(e).Element||e instanceof Element}function l(e){return e instanceof p(e).HTMLElement||e instanceof HTMLElement}function d(e){return"undefined"!==typeof ShadowRoot&&(e instanceof p(e).ShadowRoot||e instanceof ShadowRoot)}var m=Math.max,h=Math.min,v=Math.round;function b(e,t){void 0===t&&(t=!1);var n=e.getBoundingClientRect(),r=1,o=1;if(l(e)&&t){var i=e.offsetHeight,a=e.offsetWidth;a>0&&(r=v(n.width)/a||1),i>0&&(o=v(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function g(e){var t=p(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function y(e){return e?(e.nodeName||"").toLowerCase():null}function w(e){return((u(e)?e.ownerDocument:e.document)||window.document).documentElement}function x(e){return b(w(e)).left+g(e).scrollLeft}function O(e){return p(e).getComputedStyle(e)}function j(e){var t=O(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function E(e,t,n){void 0===n&&(n=!1);var r=l(t),o=l(t)&&function(e){var t=e.getBoundingClientRect(),n=v(t.width)/e.offsetWidth||1,r=v(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),i=w(t),a=b(e,o),s={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(r||!r&&!n)&&(("body"!==y(t)||j(i))&&(s=function(e){return e!==p(e)&&l(e)?{scrollLeft:(t=e).scrollLeft,scrollTop:t.scrollTop}:g(e);var t}(t)),l(t)?((f=b(t,!0)).x+=t.clientLeft,f.y+=t.clientTop):i&&(f.x=x(i))),{x:a.left+s.scrollLeft-f.x,y:a.top+s.scrollTop-f.y,width:a.width,height:a.height}}function D(e){var t=b(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function P(e){return"html"===y(e)?e:e.assignedSlot||e.parentNode||(d(e)?e.host:null)||w(e)}function A(e){return["html","body","#document"].indexOf(y(e))>=0?e.ownerDocument.body:l(e)&&j(e)?e:A(P(e))}function R(e,t){var n;void 0===t&&(t=[]);var r=A(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=p(r),a=o?[i].concat(i.visualViewport||[],j(r)?r:[]):r,s=t.concat(a);return o?s:s.concat(R(P(a)))}function k(e){return["table","td","th"].indexOf(y(e))>=0}function L(e){return l(e)&&"fixed"!==O(e).position?e.offsetParent:null}function M(e){for(var t=p(e),n=L(e);n&&k(n)&&"static"===O(n).position;)n=L(n);return n&&("html"===y(n)||"body"===y(n)&&"static"===O(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&l(e)&&"fixed"===O(e).position)return null;for(var n=P(e);l(n)&&["html","body"].indexOf(y(n))<0;){var r=O(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var W="top",B="bottom",T="right",H="left",S="auto",C=[W,B,T,H],q="start",V="end",N="viewport",I="popper",U=C.reduce((function(e,t){return e.concat([t+"-"+q,t+"-"+V])}),[]),F=[].concat(C,[S]).reduce((function(e,t){return e.concat([t,t+"-"+q,t+"-"+V])}),[]),z=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function _(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function J(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var X={placement:"bottom",modifiers:[],strategy:"absolute"};function Y(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function G(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?X:o;return function(e,t,n){void 0===n&&(n=i);var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},X,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],s=!1,f={state:o,setOptions:function(n){var s="function"===typeof n?n(o.options):n;c(),o.options=Object.assign({},i,o.options,s),o.scrollParents={reference:u(e)?R(e):e.contextElement?R(e.contextElement):[],popper:R(t)};var p=function(e){var t=_(e);return z.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,o.options.modifiers)));return o.orderedModifiers=p.filter((function(e){return e.enabled})),o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,i=e.effect;if("function"===typeof i){var s=i({state:o,name:t,instance:f,options:r}),c=function(){};a.push(s||c)}})),f.update()},forceUpdate:function(){if(!s){var e=o.elements,t=e.reference,n=e.popper;if(Y(t,n)){o.rects={reference:E(t,M(n),"fixed"===o.options.strategy),popper:D(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<o.orderedModifiers.length;r++)if(!0!==o.reset){var i=o.orderedModifiers[r],a=i.fn,c=i.options,p=void 0===c?{}:c,u=i.name;"function"===typeof a&&(o=a({state:o,options:p,name:u,instance:f})||o)}else o.reset=!1,r=-1}}},update:J((function(){return new Promise((function(e){f.forceUpdate(),e(o)}))})),destroy:function(){c(),s=!0}};if(!Y(e,t))return f;function c(){a.forEach((function(e){return e()})),a=[]}return f.setOptions(n).then((function(e){!s&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var K={passive:!0};function Q(e){return e.split("-")[0]}function Z(e){return e.split("-")[1]}function $(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ee(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?Q(o):null,a=o?Z(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case W:t={x:s,y:n.y-r.height};break;case B:t={x:s,y:n.y+n.height};break;case T:t={x:n.x+n.width,y:f};break;case H:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?$(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case q:t[c]=t[c]-(n[p]/2-r[p]/2);break;case V:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}var te={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ne(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,s=e.position,f=e.gpuAcceleration,c=e.adaptive,u=e.roundOffsets,l=e.isFixed,d=!0===u?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:v(t*r)/r||0,y:v(n*r)/r||0}}(a):"function"===typeof u?u(a):a,m=d.x,h=void 0===m?0:m,b=d.y,g=void 0===b?0:b,y=a.hasOwnProperty("x"),x=a.hasOwnProperty("y"),j=H,E=W,D=window;if(c){var P=M(n),A="clientHeight",R="clientWidth";if(P===p(n)&&"static"!==O(P=w(n)).position&&"absolute"===s&&(A="scrollHeight",R="scrollWidth"),P=P,o===W||(o===H||o===T)&&i===V)E=B,g-=(l&&D.visualViewport?D.visualViewport.height:P[A])-r.height,g*=f?1:-1;if(o===H||(o===W||o===B)&&i===V)j=T,h-=(l&&D.visualViewport?D.visualViewport.width:P[R])-r.width,h*=f?1:-1}var k,L=Object.assign({position:s},c&&te);return f?Object.assign({},L,((k={})[E]=x?"0":"",k[j]=y?"0":"",k.transform=(D.devicePixelRatio||1)<=1?"translate("+h+"px, "+g+"px)":"translate3d("+h+"px, "+g+"px, 0)",k)):Object.assign({},L,((t={})[E]=x?g+"px":"",t[j]=y?h+"px":"",t.transform="",t))}var re={left:"right",right:"left",bottom:"top",top:"bottom"};function oe(e){return e.replace(/left|right|bottom|top/g,(function(e){return re[e]}))}var ie={start:"end",end:"start"};function ae(e){return e.replace(/start|end/g,(function(e){return ie[e]}))}function se(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&d(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function fe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ce(e,t){return t===N?fe(function(e){var t=p(e),n=w(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,a=0,s=0;return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,s=r.offsetTop)),{width:o,height:i,x:a+x(e),y:s}}(e)):u(t)?function(e){var t=b(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):fe(function(e){var t,n=w(e),r=g(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=m(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=m(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-r.scrollLeft+x(e),f=-r.scrollTop;return"rtl"===O(o||n).direction&&(s+=m(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}(w(e)))}function pe(e,t,n){var r="clippingParents"===t?function(e){var t=R(P(e)),n=["absolute","fixed"].indexOf(O(e).position)>=0,r=n&&l(e)?M(e):e;return u(r)?t.filter((function(e){return u(e)&&se(e,r)&&"body"!==y(e)&&(!n||"static"!==O(e).position)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],a=o.reduce((function(t,n){var r=ce(e,n);return t.top=m(r.top,t.top),t.right=h(r.right,t.right),t.bottom=h(r.bottom,t.bottom),t.left=m(r.left,t.left),t}),ce(e,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function ue(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function le(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function de(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.boundary,a=void 0===i?"clippingParents":i,s=n.rootBoundary,f=void 0===s?N:s,c=n.elementContext,p=void 0===c?I:c,l=n.altBoundary,d=void 0!==l&&l,m=n.padding,h=void 0===m?0:m,v=ue("number"!==typeof h?h:le(h,C)),g=p===I?"reference":I,y=e.rects.popper,x=e.elements[d?g:p],O=pe(u(x)?x:x.contextElement||w(e.elements.popper),a,f),j=b(e.elements.reference),E=ee({reference:j,element:y,strategy:"absolute",placement:o}),D=fe(Object.assign({},y,E)),P=p===I?D:j,A={top:O.top-P.top+v.top,bottom:P.bottom-O.bottom+v.bottom,left:O.left-P.left+v.left,right:P.right-O.right+v.right},R=e.modifiersData.offset;if(p===I&&R){var k=R[o];Object.keys(A).forEach((function(e){var t=[T,B].indexOf(e)>=0?1:-1,n=[W,B].indexOf(e)>=0?"y":"x";A[e]+=k[n]*t}))}return A}function me(e,t,n){return m(e,h(t,n))}function he(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ve(e){return[W,T,B,H].some((function(t){return e[t]>=0}))}var be=G({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,s=void 0===a||a,f=p(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach((function(e){e.addEventListener("scroll",n.update,K)})),s&&f.addEventListener("resize",n.update,K),function(){i&&c.forEach((function(e){e.removeEventListener("scroll",n.update,K)})),s&&f.removeEventListener("resize",n.update,K)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=ee({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:Q(t.placement),variation:Z(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ne(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ne(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];l(o)&&y(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});l(r)&&y(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=F.reduce((function(e,n){return e[n]=function(e,t,n){var r=Q(e),o=[H,W].indexOf(r)>=0?-1:1,i="function"===typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[H,T].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,b=Q(v),g=f||(b===v||!m?[oe(v)]:function(e){if(Q(e)===S)return[];var t=oe(e);return[ae(e),t,ae(t)]}(v)),y=[v].concat(g).reduce((function(e,n){return e.concat(Q(n)===S?function(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?F:f,p=Z(r),u=p?s?U:U.filter((function(e){return Z(e)===p})):C,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=de(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[Q(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,j=!0,E=y[0],D=0;D<y.length;D++){var P=y[D],A=Q(P),R=Z(P)===q,k=[W,B].indexOf(A)>=0,L=k?"width":"height",M=de(t,{placement:P,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),V=k?R?T:H:R?B:W;w[L]>x[L]&&(V=oe(V));var N=oe(V),I=[];if(i&&I.push(M[A]<=0),s&&I.push(M[V]<=0,M[N]<=0),I.every((function(e){return e}))){E=P,j=!1;break}O.set(P,I)}if(j)for(var z=function(e){var t=y.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},_=m?3:1;_>0;_--){if("break"===z(_))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,c=n.rootBoundary,p=n.altBoundary,u=n.padding,l=n.tether,d=void 0===l||l,v=n.tetherOffset,b=void 0===v?0:v,g=de(t,{boundary:f,rootBoundary:c,padding:u,altBoundary:p}),y=Q(t.placement),w=Z(t.placement),x=!w,O=$(y),j="x"===O?"y":"x",E=t.modifiersData.popperOffsets,P=t.rects.reference,A=t.rects.popper,R="function"===typeof b?b(Object.assign({},t.rects,{placement:t.placement})):b,k="number"===typeof R?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),L=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,S={x:0,y:0};if(E){if(i){var C,V="y"===O?W:H,N="y"===O?B:T,I="y"===O?"height":"width",U=E[O],F=U+g[V],z=U-g[N],_=d?-A[I]/2:0,J=w===q?P[I]:A[I],X=w===q?-A[I]:-P[I],Y=t.elements.arrow,G=d&&Y?D(Y):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ee=K[V],te=K[N],ne=me(0,P[I],G[I]),re=x?P[I]/2-_-ne-ee-k.mainAxis:J-ne-ee-k.mainAxis,oe=x?-P[I]/2+_+ne+te+k.mainAxis:X+ne+te+k.mainAxis,ie=t.elements.arrow&&M(t.elements.arrow),ae=ie?"y"===O?ie.clientTop||0:ie.clientLeft||0:0,se=null!=(C=null==L?void 0:L[O])?C:0,fe=U+oe-se,ce=me(d?h(F,U+re-se-ae):F,U,d?m(z,fe):z);E[O]=ce,S[O]=ce-U}if(s){var pe,ue="x"===O?W:H,le="x"===O?B:T,he=E[j],ve="y"===j?"height":"width",be=he+g[ue],ge=he-g[le],ye=-1!==[W,H].indexOf(y),we=null!=(pe=null==L?void 0:L[j])?pe:0,xe=ye?be:he-P[ve]-A[ve]-we+k.altAxis,Oe=ye?he+P[ve]+A[ve]-we-k.altAxis:ge,je=d&&ye?function(e,t,n){var r=me(e,t,n);return r>n?n:r}(xe,he,Oe):me(d?xe:be,he,d?Oe:ge);E[j]=je,S[j]=je-he}t.modifiersData[r]=S}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=Q(n.placement),f=$(s),c=[H,T].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return ue("number"!==typeof(e="function"===typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:le(e,C))}(o.padding,n),u=D(i),l="y"===f?W:H,d="y"===f?B:T,m=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],h=a[f]-n.rects.reference[f],v=M(i),b=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,g=m/2-h/2,y=p[l],w=b-u[c]-p[d],x=b/2-u[c]/2+g,O=me(y,x,w),j=f;n.modifiersData[r]=((t={})[j]=O,t.centerOffset=O-x,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!==typeof r||(r=t.elements.popper.querySelector(r)))&&se(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=de(t,{elementContext:"reference"}),s=de(t,{altBoundary:!0}),f=he(a,r),c=he(s,o,i),p=ve(f),u=ve(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}}]}),ge=n(544),ye=n(1),we=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","TransitionProps"],xe=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition"];function Oe(e){return"function"===typeof e?e():e}var je={},Ee=o.forwardRef((function(e,t){var n=e.anchorEl,c=e.children,p=e.direction,u=e.disablePortal,l=e.modifiers,d=e.open,m=e.placement,h=e.popperOptions,v=e.popperRef,b=e.TransitionProps,g=Object(a.a)(e,we),y=o.useRef(null),w=Object(s.a)(y,t),x=o.useRef(null),O=Object(s.a)(x,v),j=o.useRef(O);Object(f.a)((function(){j.current=O}),[O]),o.useImperativeHandle(v,(function(){return x.current}),[]);var E=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,p),D=o.useState(E),P=Object(i.a)(D,2),A=P[0],R=P[1];o.useEffect((function(){x.current&&x.current.forceUpdate()})),Object(f.a)((function(){if(n&&d){Oe(n);var e=[{name:"preventOverflow",options:{altBoundary:u}},{name:"flip",options:{altBoundary:u}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:function(e){var t=e.state;R(t.placement)}}];null!=l&&(e=e.concat(l)),h&&null!=h.modifiers&&(e=e.concat(h.modifiers));var t=be(Oe(n),y.current,Object(r.a)({placement:E},h,{modifiers:e}));return j.current(t),function(){t.destroy(),j.current(null)}}}),[n,u,l,d,h,E]);var k={placement:A};return null!==b&&(k.TransitionProps=b),Object(ye.jsx)("div",Object(r.a)({ref:w,role:"tooltip"},g,{children:"function"===typeof c?c(k):c}))})),De=o.forwardRef((function(e,t){var n=e.anchorEl,s=e.children,f=e.container,p=e.direction,u=void 0===p?"ltr":p,l=e.disablePortal,d=void 0!==l&&l,m=e.keepMounted,h=void 0!==m&&m,v=e.modifiers,b=e.open,g=e.placement,y=void 0===g?"bottom":g,w=e.popperOptions,x=void 0===w?je:w,O=e.popperRef,j=e.style,E=e.transition,D=void 0!==E&&E,P=Object(a.a)(e,xe),A=o.useState(!0),R=Object(i.a)(A,2),k=R[0],L=R[1];if(!h&&!b&&(!D||k))return null;var M=f||(n?Object(c.a)(Oe(n)).body:void 0);return Object(ye.jsx)(ge.a,{disablePortal:d,container:M,children:Object(ye.jsx)(Ee,Object(r.a)({anchorEl:n,direction:u,disablePortal:d,modifiers:v,ref:t,open:D?!k:b,placement:y,popperOptions:x,popperRef:O},P,{style:Object(r.a)({position:"fixed",top:0,left:0,display:b||!h||D&&!k?null:"none"},j),TransitionProps:D?{in:b,onEnter:function(){L(!1)},onExited:function(){L(!0)}}:null,children:s}))})})),Pe=n(177),Ae=o.forwardRef((function(e,t){var n=Object(Pe.a)();return Object(ye.jsx)(De,Object(r.a)({direction:null==n?void 0:n.direction},e,{ref:t}))}));t.a=Ae}}]);