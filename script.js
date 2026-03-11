/* ═══════════════════════════════════════
   Calcora — Theme Switcher & Shared Utils
   ═══════════════════════════════════════ */
(function(){
'use strict';
const TK='calcora-theme';
function getPref(){const s=localStorage.getItem(TK);if(s)return s;return matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';}
function apply(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem(TK,t);}
apply(getPref());
document.addEventListener('DOMContentLoaded',()=>{
const tog=document.getElementById('theme-toggle');
if(tog)tog.addEventListener('click',()=>{const c=document.documentElement.getAttribute('data-theme')||'dark';apply(c==='dark'?'light':'dark');});
window.C=window.C||{};
C.fillSlider=function(el){const p=((el.value-el.min)/(el.max-el.min))*100;el.style.background=`linear-gradient(90deg,var(--accent) ${p}%,var(--inputBg) ${p}%)`;};
C.initSliders=function(){document.querySelectorAll('input[type=range]').forEach(s=>{C.fillSlider(s);s.addEventListener('input',()=>C.fillSlider(s));});};
C.F=function(n){const r=Math.round(n),neg=r<0,s=Math.abs(r).toString();if(s.length<=3)return(neg?'-':'')+'₹'+s;let t=s.slice(-3),h=s.slice(0,-3);while(h.length>2){t=h.slice(-2)+','+t;h=h.slice(0,-2);}if(h)t=h+','+t;return(neg?'-':'')+'₹'+t;};
C.charts={};
C.doughnut=function(id,labels,data,colors){const ctx=document.getElementById(id);if(!ctx)return;C.charts[id]=new Chart(ctx.getContext('2d'),{type:'doughnut',data:{labels,datasets:[{data,backgroundColor:colors,borderColor:'rgba(255,255,255,.05)',borderWidth:2,hoverOffset:5,spacing:2,borderRadius:4}]},options:{responsive:true,maintainAspectRatio:true,cutout:'65%',plugins:{legend:{display:false},tooltip:{backgroundColor:'rgba(2,6,23,.92)',titleFont:{family:'Inter',size:11},bodyFont:{family:'Inter',size:10},padding:8,cornerRadius:8,borderColor:'rgba(255,255,255,.06)',borderWidth:1}},animation:{duration:400}}});};
C.uChart=function(id,data){const c=C.charts[id];if(c){c.data.datasets[0].data=data;c.update('none');}};
C.copy=function(text,btn){navigator.clipboard.writeText(text).then(()=>{const o=btn.textContent;btn.textContent='Copied!';setTimeout(()=>btn.textContent=o,1500);});};
C.initSliders();
});
})();
