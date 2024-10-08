import{s as ie,r as ce}from"../chunks/scheduler.Cy9pk9AM.js";import{S as me,i as ue,e as $,k as W,s as A,t as P,c as w,a as E,l as X,d,f as q,b as B,m,g as fe,h as n,n as Y,v as le,j as ne,p as N,w as _e,o as O,q as Z,x as pe}from"../chunks/index.x6j4SjtJ.js";import{A as de}from"../chunks/arrow-back-ios-new.B1jJleYy.js";import"../chunks/entry.B3rq6gI2.js";import{C as he}from"../chunks/ContentHolder.DLIXFx65.js";import{C as be}from"../chunks/CommentsHolder.BB6Lc1bG.js";function ve(s){let t,r;return t=new be({props:{items:s[2].comments,user:s[4],jwt:s[3]}}),{c(){W(t.$$.fragment)},l(e){X(t.$$.fragment,e)},m(e,o){Y(t,e,o),r=!0},p(e,o){const i={};o&4&&(i.items=e[2].comments),o&16&&(i.user=e[4]),o&8&&(i.jwt=e[3]),t.$set(i)},i(e){r||(O(t.$$.fragment,e),r=!0)},o(e){N(t.$$.fragment,e),r=!1},d(e){Z(t,e)}}}function ge(s){let t,r;return t=new he({props:{items:s[2].posts,user:s[4],jwt:s[3]}}),{c(){W(t.$$.fragment)},l(e){X(t.$$.fragment,e)},m(e,o){Y(t,e,o),r=!0},p(e,o){const i={};o&4&&(i.items=e[2].posts),o&16&&(i.user=e[4]),o&8&&(i.jwt=e[3]),t.$set(i)},i(e){r||(O(t.$$.fragment,e),r=!0)},o(e){N(t.$$.fragment,e),r=!1},d(e){Z(t,e)}}}function ke(s){let t,r,e,o,i,u,f,h=s[2].name+"",D,I,c,F,V=s[2].username+"",S,G,b,v,J,U,K,g,L,y,M,C,_,p,k,Q,x;e=new de({});const ee=[ge,ve],j=[];function te(a,l){return a[1]===a[5].posts?0:1}return _=te(s),p=j[_]=ee[_](s),{c(){t=$("div"),r=$("a"),W(e.$$.fragment),i=A(),u=$("div"),f=$("h1"),D=P(h),I=A(),c=$("h1"),F=P("@"),S=P(V),G=A(),b=$("div"),v=$("button"),J=P("Posts"),K=A(),g=$("button"),L=P("Comments"),M=A(),C=$("div"),p.c(),this.h()},l(a){t=w(a,"DIV",{class:!0});var l=E(t);r=w(l,"A",{class:!0,href:!0});var H=E(r);X(e.$$.fragment,H),H.forEach(d),i=q(l),u=w(l,"DIV",{class:!0});var T=E(u);f=w(T,"H1",{class:!0});var se=E(f);D=B(se,h),se.forEach(d),I=q(T),c=w(T,"H1",{class:!0});var R=E(c);F=B(R,"@"),S=B(R,V),R.forEach(d),T.forEach(d),G=q(l),b=w(l,"DIV",{role:!0,class:!0});var z=E(b);v=w(z,"BUTTON",{role:!0,class:!0});var re=E(v);J=B(re,"Posts"),re.forEach(d),K=q(z),g=w(z,"BUTTON",{role:!0,class:!0});var ae=E(g);L=B(ae,"Comments"),ae.forEach(d),z.forEach(d),M=q(l),C=w(l,"DIV",{class:!0});var oe=E(C);p.l(oe),oe.forEach(d),l.forEach(d),this.h()},h(){m(r,"class","flex min-w-fit min-h-fit m-8"),m(r,"href",o=s[0].previous_route),m(f,"class","text-3xl"),m(c,"class","text-xl"),m(u,"class","flex flex-col mx-12 mb-12"),m(v,"role","tab"),m(v,"class",U="tab "+(s[1]===s[5].posts&&"tab-active")),m(g,"role","tab"),m(g,"class",y="tab "+(s[1]===s[5].comments&&"tab-active")),m(b,"role","tablist"),m(b,"class","tabs tabs-lifted"),m(C,"class","flex flex-col mx-12 my-12"),m(t,"class","prose bg-base-100 min-h-screen m-4 border")},m(a,l){fe(a,t,l),n(t,r),Y(e,r,null),n(t,i),n(t,u),n(u,f),n(f,D),n(u,I),n(u,c),n(c,F),n(c,S),n(t,G),n(t,b),n(b,v),n(v,J),n(b,K),n(b,g),n(g,L),n(t,M),n(t,C),j[_].m(C,null),k=!0,Q||(x=[le(v,"click",s[6]),le(g,"click",s[7])],Q=!0)},p(a,[l]){(!k||l&1&&o!==(o=a[0].previous_route))&&m(r,"href",o),(!k||l&4)&&h!==(h=a[2].name+"")&&ne(D,h),(!k||l&4)&&V!==(V=a[2].username+"")&&ne(S,V),(!k||l&2&&U!==(U="tab "+(a[1]===a[5].posts&&"tab-active")))&&m(v,"class",U),(!k||l&2&&y!==(y="tab "+(a[1]===a[5].comments&&"tab-active")))&&m(g,"class",y);let H=_;_=te(a),_===H?j[_].p(a,l):(pe(),N(j[H],1,1,()=>{j[H]=null}),_e(),p=j[_],p?p.p(a,l):(p=j[_]=ee[_](a),p.c()),O(p,1),p.m(C,null))},i(a){k||(O(e.$$.fragment,a),O(p),k=!0)},o(a){N(e.$$.fragment,a),N(p),k=!1},d(a){a&&d(t),Z(e),j[_].d(),Q=!1,ce(x)}}}function $e(s,t,r){let e,o,i;var u=(c=>(c[c.posts=0]="posts",c[c.comments=1]="comments",c))(u||{});let{data:f}=t,h=0;const D=()=>r(1,h=u.posts),I=()=>r(1,h=u.comments);return s.$$set=c=>{"data"in c&&r(0,f=c.data)},s.$$.update=()=>{s.$$.dirty&1&&r(4,e=f.user),s.$$.dirty&1&&r(3,o=f.jwt),s.$$.dirty&1&&r(2,i=f.profile)},[f,h,i,o,e,u,D,I]}class Ie extends me{constructor(t){super(),ue(this,t,$e,ke,ie,{data:0})}}export{Ie as component};