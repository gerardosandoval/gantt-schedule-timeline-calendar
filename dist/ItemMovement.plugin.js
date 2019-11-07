!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).ItemMovement=e()}(this,(function(){"use strict";
/**
   * ItemMovement plugin
   *
   * @copyright Rafal Pospiech <https://neuronet.io>
   * @author    Rafal Pospiech <neuronet.io@gmail.com>
   * @package   gantt-schedule-timeline-calendar
   * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
   * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
   */return function(t={}){t={moveable:!0,resizeable:!0,resizerContent:"",collisionDetection:!0,outOfBorders:!1,snapStart:(t,e)=>t+e,snapEnd:(t,e)=>t+e,ghostNode:!0,...t};const e={};function i(i,n){let o,r,s=i.querySelector(".gantt-schedule-timeline-calendar__chart-timeline-items-row-item-content");if(!t.moveable&&!t.resizeable)return;function a(e){let i=t.resizeable&&(!e.item.hasOwnProperty("resizeable")||!0===e.item.resizeable);return e.row.hasOwnProperty("resizeable")&&i&&(i=e.row.resizeable),i}function m(t){const i=t.item.id;return void 0===e[i]&&(e[i]={moving:!1,resizing:!1}),e[i]}function l(e,i){if(t.ghostNode){const t=m(e),n=i.x-t.ganttLeft-t.itemLeftCompensation,r=o.get("config.scroll.compensation");t.ghost.style.left=n+"px",t.ghost.style.top=i.y-t.ganttTop-t.itemTop+r+"px"}}function c(i){t.ghostNode&&(void 0!==e[i]&&void 0!==e[i].ghost&&(o.get("_internal.elements.chart-timeline").removeChild(e[i].ghost),delete e[i].ghost),s.style.opacity="1")}function d(e){let i=t.snapStart;return"function"==typeof e.item.snapStart&&(i=e.item.snapStart),i}function f(e){let i=t.snapEnd;return"function"==typeof e.item.snapEnd&&(i=e.item.snapEnd),i}o=n.state;const u=`<div class="${(r=n.api).getClass("chart-timeline-items-row-item-content-resizer")}">${t.resizerContent}</div>`;s.insertAdjacentHTML("beforeend",u);const g=s.querySelector(".gantt-schedule-timeline-calendar__chart-timeline-items-row-item-content-resizer");function p(e){if(e.stopPropagation(),0!==e.button)return;s=i.querySelector(".gantt-schedule-timeline-calendar__chart-timeline-items-row-item-content");const r=m(n);r.moving=!0;const a=o.get(`config.chart.items.${n.item.id}`),l=o.get("_internal.chart.time.leftGlobal"),c=o.get("_internal.chart.time.timePerPixel"),d=o.get("_internal.elements.chart-timeline").getBoundingClientRect();r.ganttTop=d.top,r.ganttLeft=d.left,r.itemX=Math.round((a.time.start-l)/c),r.itemLeftCompensation=e.x-r.ganttLeft-r.itemX,function(e,i,n,r){const a=m(e);if(!t.ghostNode||void 0!==a.ghost)return;const l=s.cloneNode(!0),c=getComputedStyle(s);l.style.position="absolute",l.style.left=i.x-n-a.itemLeftCompensation+"px";const d=i.y-r-e.row.top-s.offsetTop;a.itemTop=d,l.style.top=i.y-r-d+"px",l.style.width=c.width,l.style["box-shadow"]="10px 10px 6px #00000020";const f=s.clientHeight+"px";l.style.height=f,l.style["line-height"]=f,l.style.opacity="0.75",o.get("_internal.elements.chart-timeline").appendChild(l),a.ghost=l}(n,e,d.left,d.top)}function h(t){if(t.stopPropagation(),0!==t.button)return;const e=m(n);e.resizing=!0;const i=o.get(`config.chart.items.${n.item.id}`),r=o.get("_internal.chart.time.leftGlobal"),s=o.get("_internal.chart.time.timePerPixel"),a=o.get("_internal.elements.chart-timeline").getBoundingClientRect();e.ganttTop=a.top,e.ganttLeft=a.left,e.itemX=(i.time.end-r)/s,e.itemLeftCompensation=t.x-e.ganttLeft-e.itemX}function v(e,i,n,s){if(!t.collisionDetection)return!1;const a=o.get("_internal.chart.time");if(t.outOfBorders&&(n<a.from||s>a.to))return!0;let m=r.time.date(s).diff(n,"milliseconds");if(-1===Math.sign(m)&&(m=-m),m<=1)return!0;const l=o.get("config.list.rows."+e);for(const t of l._internal.items)if(t.id!==i){if(n>=t.time.start&&n<=t.time.end)return!0;if(s>=t.time.start&&s<=t.time.end)return!0;if(n<=t.time.start&&s>=t.time.end)return!0}return!1}function y(e){const i=m(n);let r,s,c,u,g;(i.moving||i.resizing)&&(e.stopPropagation(),r=o.get(`config.chart.items.${n.item.id}`),s=o.get(`config.chart.items.${n.item.id}.rowId`),c=o.get(`config.list.rows.${s}`),u=o.get("config.chart.time.zoom"),g=o.get("_internal.chart.time.timePerPixel"));const p=function(e){let i=t.moveable;return e.item.hasOwnProperty("moveable")&&i&&(i=e.item.moveable),e.row.hasOwnProperty("moveable")&&i&&(i=e.row.moveable),i}(n);if(i.moving){if((!0===p||"x"===p||Array.isArray(p)&&p.includes(s))&&function(t,e,i,r,s){t.stopPropagation();const a=m(n),c=t.x-a.ganttLeft-a.itemLeftCompensation;l(n,t);const u=o.get("_internal.chart.time.leftGlobal")+c*s-i.time.start,g=i.time.start,p=d(n)(i.time.start,u,i)-g,h=v(e.id,i.id,i.time.start+p,i.time.end+p);p&&!h&&o.update(`config.chart.items.${n.item.id}.time`,(function(t){return t.start+=p,t.end=f(n)(t.end,p,i)-1,t}))}(e,c,r,0,g),!p||"x"===p)return;let t=function(t,e,i,r,s){t.stopPropagation(),l(n,t);const a=m(n),c=t.y-a.ganttTop,d=o.get("_internal.list.visibleRows"),f=o.get("config.scroll.compensation");let u=0;for(const t of d){if(t.top+f>c)return u>0?u-1:0;u++}return u}(e);const i=o.get("_internal.list.visibleRows");void 0===i[t]&&(t>0?t=i.length-1:t<0&&(t=0));const a=i[t],u=a.id,h=v(u,r.id,r.time.start,r.time.end);u===r.rowId||h||Array.isArray(p)&&!p.includes(u)||a.hasOwnProperty("moveable")&&!a.moveable||o.update(`config.chart.items.${r.id}.rowId`,u)}else!i.resizing||void 0!==r.resizeable&&!0!==r.resizeable||function(t,e,i,r,s){if(t.stopPropagation(),!a(n))return;const l=o.get("_internal.chart.time"),c=m(n),u=t.x-c.ganttLeft-c.itemLeftCompensation,g=l.leftGlobal+u*s-i.time.end;if(i.time.end+g<i.time.start)return;const p=i.time.end,h=f(n)(i.time.end,g,i)-1-p,y=v(e.id,i.id,i.time.start,i.time.end+h);h&&!y&&o.update(`config.chart.items.${n.item.id}.time`,t=>(t.start=d(n)(t.start,0,i),t.end=f(n)(t.end,h,i)-1,t))}(e,c,r,0,g)}function b(t){const i=m(n);(i.moving||i.resizing)&&t.stopPropagation(),i.moving=!1,i.resizing=!1;for(const t in e)e[t].moving=!1,e[t].resizing=!1,c(t)}return a(n)?g.style.visibility="visible":g.style.visibility="hidden",s.addEventListener("mousedown",p),g.addEventListener("mousedown",h,{capture:!0}),document.addEventListener("mousemove",y,{capture:!0,passive:!0}),document.addEventListener("mouseup",b,{capture:!0,passive:!0}),{update(t,e){a(n=e)?g.style.visibility="visible":g.style.visibility="hidden"},destroy(t,e){s.removeEventListener("mousedown",p),g.removeEventListener("mousedown",h),document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",b),g.remove()}}}return function(t){t.state.update("config.actions.chart-timeline-items-row-item",t=>(t.push(i),t))}}}));
//# sourceMappingURL=ItemMovement.plugin.js.map
