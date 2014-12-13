function template(a,b,c){"use strict";return a.replace(/\{([^\}]+)\}/g,function(a,d){return d in b?c?c(b[d]):b[d]:a})}var app=angular.module("ngSocial",[]);app.directive("ngSocialButtons",["$compile","$q","$parse","$http","$location",function(a,b,c,d,e){"use strict";return{restrict:"A",scope:{url:"=",title:"=",description:"=",image:"=",showcounts:"="},replace:!0,transclude:!0,template:'<div class="ng-social-container ng-cloak"><ul class="ng-social" ng-transclude></ul></div>',controller:["$scope","$q","$http",function(a,b,c){var d=function(){return a.url||e.absUrl()},f={init:function(a,b,c){c.counter&&f.getCount(a.options).then(function(b){a.count=b})},link:function(b){b=b||{};var c=b.urlOptions||{};return c.url=d(),c.title=a.title,c.image=a.image,c.description=a.description||"",f.makeUrl(b.clickUrl||b.popup.url,c)},clickShare:function(b,c){if(!b.shiftKey&&!b.ctrlKey){b.preventDefault(),c.track&&"undefined"!=typeof _gaq&&angular.isArray(_gaq)&&_gaq.push(["_trackSocial",c.track.name,c.track.action,a.url]);var d=!0;if(angular.isFunction(c.click)&&(d=c.click.call(this,c)),d){var e=f.link(c);f.openPopup(e,c.popup)}}},openPopup:function(a,b){var c=Math.round(screen.width/2-b.width/2),d=0;screen.height>b.height&&(d=Math.round(screen.height/3-b.height/2));var e=window.open(a,"sl_"+this.service,"left="+c+",top="+d+",width="+b.width+",height="+b.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");e?e.focus():location.href=a},getCount:function(e){var g=b.defer(),h=e.urlOptions||{};h.url=d(),h.title=a.title;var i=f.makeUrl(e.counter.url,h),j=angular.isUndefined(a.showcounts)?!0:a.showcounts;return j&&(e.counter.get?e.counter.get(i,g,c):c.jsonp(i).success(function(a){g.resolve(e.counter.getNumber?e.counter.getNumber(a):a)})),g.promise},makeUrl:function(a,b){return template(a,b,encodeURIComponent)}};return f}]}}]),app.directive("ngSocialFacebook",function(){"use strict";var a={counter:{url:"http://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=JSON_CALLBACK",getNumber:function(a){return a.data[0].total_count}},popup:{url:"http://www.facebook.com/sharer/sharer.php?u={url}",width:600,height:500},track:{name:"facebook",action:"send"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li><a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"><span class="ng-social-icon"></span><span class="ng-social-text" ng-transclude></span></a><span ng-show="count" class="ng-social-counter">{{ count }}</span></li>',link:function(b,c,d,e){c.addClass("ng-social-facebook"),e&&(b.options=a,b.ctrl=e,e.init(b,c,a))}}}),app.directive("ngSocialTwitter",function(){"use strict";var a={counter:{url:"http://urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK",getNumber:function(a){return a.count}},popup:{url:"http://twitter.com/intent/tweet?url={url}&text={title}&via=PlatformIOTool",width:600,height:450},click:function(a){return/[\.:\-–—]\s*$/.test(a.pageTitle)||(a.pageTitle+=":"),!0},track:{name:"twitter",action:"tweet"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',controller:["$scope",function(){}],link:function(b,c,d,e){c.addClass("ng-social-twitter"),e&&(b.options=a,b.ctrl=e,e.init(b,c,a))}}}),app.directive("ngSocialGooglePlus",["$parse",function(){"use strict";var a="https:"===location.protocol?"https:":"http:",b={counter:{url:"http:"===a?"http://share.yandex.ru/gpp.xml?url={url}":void 0,getNumber:function(a){return a.count},get:function(a,c){return b._?void c.reject():(window.services||(window.services={}),window.services.gplus={cb:function(a){b._.resolve(a)}},void(b._=c))}},popup:{url:"https://plus.google.com/share?url={url}",width:700,height:500},track:{name:"Google+",action:"share"}};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',link:function(a,c,d,e){c.addClass("ng-social-google-plus"),e&&(a.options=b,a.ctrl=e,e.init(a,c,b))}}}]),angular.module("ngSocial").directive("ngSocialGithub",function(){var a={counter:{url:"https://api.github.com/repos/{user}/{repository}?callback=JSON_CALLBACK",getNumber:function(a){return a.data.watchers_count}},clickUrl:"https://github.com/{user}/{repository}/"};return{restrict:"C",require:"^?ngSocialButtons",scope:!0,replace:!0,transclude:!0,template:'<li>                     <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button">                         <span class="ng-social-icon"></span>                         <span class="ng-social-text" ng-transclude></span>                     </a>                     <span ng-show="count" class="ng-social-counter">{{ count }}</span>                    </li>',controller:["$scope",function(){}],link:function(b,c,d,e){c.addClass("ng-social-github"),e&&(a.urlOptions={user:d.user,repository:d.repository},b.options=a,b.ctrl=e,e.init(b,c,a))}}});