import{s as m}from"../chunks/scheduler.Cy9pk9AM.js";import{S as l,i as c,e as f,k as u,c as p,a as d,l as h,d as i,m as _,g,n as $,o as v,p as w,q as j}from"../chunks/index.x6j4SjtJ.js";import"../chunks/entry.B3rq6gI2.js";import{C}from"../chunks/ContentHolder.DLIXFx65.js";function k(o){let e,n,a;return n=new C({props:{items:o[0].posts,title:"Recent Posts",link:"/posts/recent",user:o[0].user,jwt:o[0].jwt}}),{c(){e=f("div"),u(n.$$.fragment),this.h()},l(t){e=p(t,"DIV",{class:!0});var s=d(e);h(n.$$.fragment,s),s.forEach(i),this.h()},h(){_(e,"class","m-4 flex flex-col gap-4")},m(t,s){g(t,e,s),$(n,e,null),a=!0},p(t,[s]){const r={};s&1&&(r.items=t[0].posts),s&1&&(r.user=t[0].user),s&1&&(r.jwt=t[0].jwt),n.$set(r)},i(t){a||(v(n.$$.fragment,t),a=!0)},o(t){w(n.$$.fragment,t),a=!1},d(t){t&&i(e),j(n)}}}function q(o,e,n){let{data:a}=e;return o.$$set=t=>{"data"in t&&n(0,a=t.data)},[a]}class H extends l{constructor(e){super(),c(this,e,q,k,m,{data:0})}}export{H as component};
