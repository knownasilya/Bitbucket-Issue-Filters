"use strict";function init(){getFilters(function(a){createFilterList(a)},this);var a=document.querySelector("#filters-filters");a&&addSaveSearchBtn(a)}function addSaveSearchBtn(a){var b=a.querySelector(".buttons-container button[type=submit]"),c=document.createElement("button");c.textContent="Save & Search",c.id="bb-save-search",c.setAttribute("type","button"),c.className="aui-button aui-style aui-button-primary",b.insertAdjacentHTML("afterend",c.outerHTML),a.querySelector("#bb-save-search").addEventListener("click",function(){var a=document.querySelector("#filters"),b=prompt("What would you like to call this filter?",currentFilter||"");if(a&&b){params=[];for(var c=0;c<a.childNodes.length;c++)parseFilter(a.childNodes[c]);addFilter(repoName,{name:b,params:serializeParams(params)},function(a){a&&window.open("http://bitbucket.org/"+repoName+"/issues?"+a.params,"_self")})}})}function parseFilter(a){if(a.className.indexOf("filter_")>-1){var b=a.className.split("_")[1],c=params[b],d=c?c.length:0,e=a.querySelector(".filter-comp select[name=comp_"+b+(d+1)+"]"),f=a.querySelector(".filter-query select[name="+b+(d+1)+"]");if(e&&f){var g=e.selectedOptions[0].value,h=f.selectedOptions[0].value;params[b]?params[b].push({modifier:g,value:h}):params[b]=[{modifier:g,value:h}]}}}function serializeParams(a){return encodeURI(Object.keys(a).map(function(b){var c=a[b];return c.map(function(a){return encodeURIComponent(b)+"="+a.modifier+a.value}).join("&")}).join("&"))}function addFilter(a,b,c){chrome.storage.sync.get(function(d){var e=d[a];e instanceof Array||(e=[]),updateFilter(e,{name:b.name,params:b.params},b.deleteMe,function(e){e?(d[a]=e,chrome.storage.sync.set(d,function(){c&&c(b)})):c&&c()})})}function updateFilter(a,b,c,d){var e=a.filter(function(a){return a&&a.name===b.name}).length>0;if(e){if(confirm(c?"Are you sure you want to delete this filter?":"There appears to already exist a '"+b.name+"' filter, would you like to overwrite it?"))return d(a.map(function(a){return c&&a.name===b.name?void 0:a&&a.name.toLowerCase()===b.name.toLowerCase()?b:a}).filter(function(a){return a}));d(!1)}else a.push(b),d(a)}function getFilters(a,b){chrome.storage.sync.get(function(c){a.call(b||this,c)})}function createFilterList(a){var b,c=document.querySelector("#issues-toolbar"),d=document.createElement("div"),e=document.createElement("div"),f=document.createElement("p"),g="bb-custom-filters-toolbar";return d.id=g,e.className="filter-container",f.className="filter-label",f.textContent="Custom Filters:",b=createFilterListItems(repoName,a),e.appendChild(f),e.appendChild(b),d.appendChild(e),!document.querySelector("#"+g)&&a[repoName]&&a[repoName].length&&insertAfter(c,d),{toolbar:d}}function createFilterListItems(a,b){if(b){var c=document.createElement("ul"),d=b[a],e=location.href.split("?"),f=e[0].split("/"),g="query"===f[f.length-1]?!0:!1,h=!1;return c.className="filter-control",d&&d.forEach(function(a){if(a){var b=document.createElement("li");h=!1,g?(2===e.length&&e[1]===a.params&&(h=!0,currentFilter=a.name),b=createDropdownLabel(b,a,h),c.appendChild(b)):(2===e.length&&e[1]===a.params&&(h=!0,currentFilter=a.name),b=createSimpleLabel(b,a,h),c.appendChild(b))}}),c}}function createDropdownLabel(a,b,c){var d=document.createElement("div"),e=document.createElement("button"),f=document.createElement("button"),g=document.createElement("div"),h=document.createElement("ul"),i=document.createElement("li"),j=document.createElement("a"),k=document.createElement("li"),l=document.createElement("a"),m=b.name?b.name:"unknown";return d.id="filter-"+m.toLowerCase(),d.className="aui-buttons",e.className="aui-button aui-button-compact aui-button-split-main",e.textContent=m,e.addEventListener("click",function(a){return window.open("http://bitbucket.org/"+repoName+"/issues?"+b.params,"_self"),a.preventDefault(),!1}),c&&e.setAttribute("aria-pressed",!0),f.className="aui-button aui-button-compact aui-dropdown2-trigger aui-button-split-more",f.setAttribute("aria-owns","filter-"+m.toLowerCase()+"-dropdown"),f.setAttribute("aria-haspopup","true"),f.textContent="more btn",g.id="filter-"+m.toLowerCase()+"-dropdown",g.className="aui-dropdown2 aui-style-default",g.setAttribute("data-container","filter-"+m.toLowerCase()),h.className="aui-list-truncate",j.textContent="Edit",j.setAttribute("href","http://bitbucket.org/"+repoName+"/issues/query?"+b.params),j.addEventListener("click",function(a){a.target}),l.textContent="Delete",l.addEventListener("click",function(){addFilter(repoName,{name:b.name,params:b.params,deleteMe:!0},function(a){a&&window.open("http://bitbucket.org/"+repoName+"/issues/query","_self")})}),d.appendChild(e),d.appendChild(f),i.appendChild(j),k.appendChild(l),h.appendChild(i),h.appendChild(k),g.appendChild(h),a.appendChild(d),a.appendChild(g),a}function createSimpleLabel(a,b,c){var d=document.createElement("a");return d.href="?"+b.params,d.textContent=b.name,c&&a.setAttribute("aria-pressed",!0),a.appendChild(d),a}function insertAfter(a,b){a.parentNode.insertBefore(b,a.nextSibling)}function getRepoName(){var a=document.querySelector("body"),b=a.getAttribute("data-current-repo"),c=b?JSON.parse(b):{};return c.fullslug}var repoName=getRepoName(),appId="bb-filters",projectId=appId+":"+repoName,currentFilter,params=[];Array.prototype.remove=function(a,b){var c=this.slice((b||a)+1||this.length);return this.length=0>a?this.length+a:a,this.push.apply(this,c)},init();