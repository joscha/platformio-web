!function(){"use strict";angular.module("siteApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","viewhead","angulartics","angulartics.google.analytics","hljs","ngDisqus","relativeDate","ngTable"]).constant("siteConfig",{apiURL:9013===parseInt(location.port)?"http://localhost:8080":"http://api.platformio.org"})}(),function(){"use strict";function a(a,b){return{responseError:function(c){return 404===c.status&&b.path("/404"),a.reject(c)}}}function b(a,b,c,d){a.html5Mode(!0),c.setShortname("platformio"),d.interceptors.push("httpErrorInterceptor"),d.defaults.cache=!0,b.when("/",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"vm",resolve:{pioStats:["dataService",function(a){return a.getPioStats().$promise}]}}).when("/get-started/:gsType?",{templateUrl:"views/get_started.html",controller:"GetStartedController",controllerAs:"vm"}).when("/platforms/:platformName?",{templateUrl:"views/platforms.html",controller:"PlatformsController",controllerAs:"vm",resolve:{platformsList:["dataService",function(a){return a.getPlatforms().$promise}],packagesList:["dataService",function(a){return a.getPackages().$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}]}}).when("/frameworks/:frameworkName?",{templateUrl:"views/frameworks.html",controller:"FrameworksController",controllerAs:"vm",resolve:{frameworksList:["dataService",function(a){return a.getFrameworks().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}]}}).when("/boards",{templateUrl:"views/boards.html",controller:"BoardsController",controllerAs:"vm",resolve:{boardsList:["dataService",function(a){return a.getBoards().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}]}}).when("/lib",{templateUrl:"views/lib_main.html",controller:"LibMainController",controllerAs:"vm",resolve:{libStats:["dataService",function(a){return a.getLibStats().$promise}]}}).when("/lib/search",{templateUrl:"views/lib_search.html",controller:"LibSearchController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibSearchResult({query:c.query,page:c.page?parseInt(c.page):1}).$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}]}}).when("/lib/examples",{templateUrl:"views/lib_examples.html",controller:"LibExamplesController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibExamples({query:c.query,page:c.page?parseInt(c.page):1}).$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}]}}).when("/lib/show/:libId/:libName/:activeTab?",{templateUrl:"views/lib_show.html",controller:"LibShowController",controllerAs:"vm",resolve:{libInfo:["$route","dataService",function(a,b){return b.getLibInfo(a.current.params.libId).$promise}]}}).when("/who-uses",{templateUrl:"views/who_uses.html"}).when("/platformio-ide",{templateUrl:"views/platformio-ide.html"}).when("/donate",{templateUrl:"views/donate.html"}).when("/404",{templateUrl:"views/404.html"}).otherwise({redirectTo:"/404"})}a.$inject=["$q","$location"],b.$inject=["$locationProvider","$routeProvider","$disqusProvider","$httpProvider"],angular.module("siteApp").factory("httpErrorInterceptor",a).config(b)}(),function(){"use strict";function a(a,b){function c(c){return a(b.apiURL+"/lib/search",c).get()}function d(c){return a(b.apiURL+"/lib/examples",c).get()}function e(c){return a(b.apiURL+"/lib/info/"+c).get()}function f(c){return a(b.apiURL+"/lib/download/"+c).get()}function g(){return a(b.apiURL+"/lib/stats").get()}function h(){return a(b.apiURL+"/stats").get()}function i(){return a(b.apiURL+"/boards").query()}function j(){return a(b.apiURL+"/frameworks").query()}function k(){return a(b.apiURL+"/platforms").query()}function l(){return a(b.apiURL+"/packages").get()}function m(){return[{image:"http://docs.platformio.org/en/stable/_images/platformio-demo-wiring.gif",title:"Blink Project",icon:"lightbulb-o"},{image:"http://docs.platformio.org/en/stable/_images/platformio-demo-platforms.gif",title:"Platform Manager",icon:"laptop"},{image:"http://docs.platformio.org/en/stable/_images/platformio-demo-lib.gif",title:"Library Manager",icon:"code"}]}function n(){return[{image:"http://docs.platformio.org/en/stable/_images/ide-cloud9-init-project.png",title:"Cloud9",url:"http://docs.platformio.org/en/stable/ide/cloud9.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-codeanywhere-init-project.png",title:"Codeanywhere (Cloud)",url:"http://docs.platformio.org/en/stable/ide/codeanywhere.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-eclipseche-demo.png",title:"Eclipse Che (Cloud)",url:"http://docs.platformio.org/en/stable/ide/eclipseche.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-eclipse.png",title:"Eclipse",url:"http://docs.platformio.org/en/stable/ide/eclipse.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-sublime-text-deviot.gif",title:"Sublime Text",url:"http://docs.platformio.org/en/stable/ide/sublimetext.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-vs-platformio-newproject-8.png",title:"Visual Studio",url:"http://docs.platformio.org/en/stable/ide/visualstudio.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-clion.png",title:"CLion",url:"http://docs.platformio.org/en/stable/ide/clion.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-netbeans.png",title:"NetBeans",url:"http://docs.platformio.org/en/stable/ide/netbeans.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-codeblocks.png",title:"CodeBlocks",url:"http://docs.platformio.org/en/stable/ide/codeblocks.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-qtcreator-7.png",title:"Qt Creator",url:"http://docs.platformio.org/en/stable/ide/qtcreator.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-vim.png",title:"Vim",url:"http://docs.platformio.org/en/stable/ide/vim.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-emacs.png",title:"Emacs",url:"http://docs.platformio.org/en/stable/ide/emacs.html"},{image:"http://docs.platformio.org/en/stable/_images/ide-atom-platformio.png",title:"Atom",url:"http://docs.platformio.org/en/stable/ide/atom.html"}]}return{getLibSearchResult:c,getLibExamples:d,getLibInfo:e,getLibDlUrl:f,getLibStats:g,getPioStats:h,getFrameworks:j,getPackages:l,getPlatforms:k,getBoards:i,getCLIDemos:m,getIDEDemos:n}}a.$inject=["$resource","siteConfig"],angular.module("siteApp").factory("dataService",a)}(),function(){"use strict";function a(a){function b(b){a.open({templateUrl:"views/lib_search_examples.html",controller:"LibModalSEController",controllerAs:"vm",size:"lg",resolve:{searchPath:function(){return b}}})}function c(){return navigator.appVersion.indexOf("Macintosh")!==-1?"Macintosh":navigator.appVersion.indexOf("Windows")!==-1?"Windows":navigator.appVersion.indexOf("Linux")!==-1?"Linux":""}return{showSearchExamples:b,osType:c()}}a.$inject=["$uibModal"],angular.module("siteApp").factory("siteUtils",a)}(),function(){"use strict";function a(a){function b(b,c,d){a(function(){if("undefined"!=typeof addthis){var a=b.lib.frameworks.join(" #"),d=b.lib.keywords.join(" #");a.length>0&&(a="#"+a),d.length>0&&(d="#"+d);var e={data_track_clickback:!1,data_track_addressbar:!1,data_ga_property:"UA-1768265-8",data_ga_social:!0},f={url:"http://platformio.org/lib/show/"+b.lib.id+"/"+b.lib.name,title:b.lib.name+" library"+(a?" for ":"")+a,description:b.lib.description+" "+d,templates:{twitter:"{{title}} {{url}} via @PlatformIO_Org "+d},url_transforms:{shorten:{twitter:"bitly"}}};addthis.init(),addthis.toolbox(c[0],e,f)}})}var c={link:b,restrict:"A",transclude:!0,replace:!0,scope:{lib:"="},template:"<div ng-transclude></div>"};return c}a.$inject=["$timeout"],angular.module("siteApp").directive("addthisLib",a)}(),function(){"use strict";function a(a){function b(b,c,d){c.on("click",function(){a.getSelection().toString()||this.setSelectionRange(0,this.value.length)})}var c={link:b,restrict:"A"};return c}a.$inject=["$window"],angular.module("siteApp").directive("selectOnClick",a)}(),function(){"use strict";function a(){return function(a,b){switch(b){case"frequency":a=a/1e6+" MHz";break;case"size":a%1024===0?a/=1024:a=Math.round(a/1024*10)/10,a+=" kB"}return a}}angular.module("siteApp").filter("embeddedFormatter",a)}(),function(){"use strict";function a(){return function(a,b){var c=a;return angular.forEach(b,function(b){"name"in b&&"title"in b&&b.name===a&&(c=b.title)}),c}}angular.module("siteApp").filter("nameToTitle",a)}(),function(){"use strict";function a(){return function(a,b,c){if(isNaN(b))return a;if(b<=0)return"";if(a&&a.length>b){if(a=a.substring(0,b),c)for(;" "===a.charAt(a.length-1);)a=a.substr(0,a.length-1);else{var d=a.lastIndexOf(" ");d!==-1&&(a=a.substr(0,d))}return a+"…"}return a}}angular.module("siteApp").filter("truncate",a)}(),function(){"use strict";function a(a,b,c,d){function e(a){return new RegExp(a).test(b.path())}var f=this;f.viewAutoScroll=!0,f.isNavBarCollapsed=!0,f.isRouteActive=e,f.isPhJSCrawler=c.navigator.userAgent.indexOf("PhantomJS")!==-1,f.siteUtils=d,a.$on("$routeChangeStart",function(a,b,c){if(f.viewAutoScroll=!0,c){var d=["GetStartedController","PlatformsController","FrameworksController","LibShowController"];angular.forEach(d,function(a){b.controller===a&&c.controller===a&&(f.viewAutoScroll=!1)})}})}a.$inject=["$rootScope","$location","$window","siteUtils"],angular.module("siteApp").controller("MainController",a)}(),function(){"use strict";function a(a){var b=this;b.stats={},angular.forEach(a,function(a,c){b.stats[c]=a.toLocaleString()})}a.$inject=["pioStats"],angular.module("siteApp").controller("HomeController",a)}(),function(){"use strict";function a(a,b,c,d,e,f){var g=this;g.gsType="ide",b.hasOwnProperty("gsType")&&(g.gsType=b.gsType),g.siteUtils=f,g.cliDemos=e.getCLIDemos(),g.cliDemoActive=0,g.ideDemos=e.getIDEDemos(),g.ideDemoActive=0,g.ideDemoInterval=5e3,g.slideHeight=c.innerHeight?Math.ceil(c.innerHeight/2):240,g.ideDlUrl="",a.search().dl&&(g.ideDlUrl="https://dl.bintray.com/platformio/ide-bundles/"+a.search().dl,c.location.href=g.ideDlUrl)}a.$inject=["$location","$routeParams","$window","$analytics","dataService","siteUtils"],angular.module("siteApp").controller("GetStartedController",a)}(),function(){"use strict";function a(a,b,c,d,e){function f(a){b.path("/platforms/"+a)}function g(a,b){var d=!1;return angular.forEach(c,function(c){c.name===b&&angular.forEach(c.packages,function(b){b.indexOf("framework-"+a)!==-1&&(d=!0)})}),d}var h=this;h.changePlatform=f,h.isCompatibleFramework=g,h.platforms=c,h.packages=d,h.frameworks=e,h.activeGroup=0,h.activePlatform=0,a.hasOwnProperty("platformName")&&(h.activeGroup=2,h.activePlatform=-1,angular.forEach(c,function(b,c){a.platformName===b.name&&(h.activeGroup=b.forDesktop?1:0,h.activePlatform=c)}))}a.$inject=["$routeParams","$location","platformsList","packagesList","frameworksList"],angular.module("siteApp").controller("PlatformsController",a)}(),function(){"use strict";function a(a,b,c,d){function e(a){b.path("/frameworks/"+a)}function f(a,b){var c=!1;return angular.forEach(d,function(d){d.name===a&&angular.forEach(d.packages,function(a){a.indexOf("framework-"+b)!==-1&&(c=!0)})}),c}var g=this;g.changeFramework=e,g.isCompatiblePlatform=f,g.active=0,g.frameworks=c,g.platforms=d,a.hasOwnProperty("frameworkName")&&angular.forEach(c,function(b,c){a.frameworkName===b.name&&(g.active=c)})}a.$inject=["$routeParams","$location","frameworksList","platformsList"],angular.module("siteApp").controller("FrameworksController",a)}(),function(){"use strict";function a(a,b,c,d,e,f,g,h,i){function j(){l.shareUrl=d.protocol()+"://"+d.host(),80!==parseInt(d.port())&&(l.shareUrl+=":"+d.port()),l.shareUrl+="/boards?"+b(l.tableParams.url())}function k(a){var b=[];return angular.forEach("platforms"===a?h:i,function(c){"platforms"===a&&c.forDesktop||angular.isObject(c)&&"title"in c&&b.push({id:c.name,title:c.title})}),b}var l=this;l.shareUrl="",l.shareInputShown=!1,l.platforms=h,l.frameworks=i,l.getFilterData=k,l.updateShareUrl=j,l.tableParams=new e(angular.extend({page:1,count:15,sorting:{name:"asc"}},d.search()),{counts:[15,30,50,100,1e3],dataset:g}),f.onAfterReloadData(j,a,l.tableParams)}a.$inject=["$scope","$httpParamSerializerJQLike","$filter","$location","NgTableParams","ngTableEventsChannel","boardsList","platformsList","frameworksList"],angular.module("siteApp").controller("BoardsController",a)}(),function(){"use strict";function a(a,b){function c(){a.url("/lib/search?query="+encodeURIComponent(d.searchQuery))}var d=this;d.submitSearchForm=c,d.searchQuery="",d.stats=b,d.searchPath="/lib/search",d.searchInputPlaceholder="Search for library ..."}a.$inject=["$location","libStats"],angular.module("siteApp").controller("LibMainController",a)}(),function(){"use strict";function a(a,b,c){function d(c){a.path(e.searchPath+"?query="+c),b.close()}var e=this;e.searchPath=c,e.search=d}a.$inject=["$location","$uibModalInstance","searchPath"],angular.module("siteApp").controller("LibModalSEController",a)}(),function(){"use strict";function a(a,b,c,d,e){function f(){var a={description:[],keywords:[]};return angular.forEach(h.searchResult.items,function(b){a.description.push(b.name),a.keywords=a.keywords.concat(b.name.split("-")),angular.forEach(["frameworks","platforms"],function(c){angular.forEach(b[c],function(b){a.description.push(b.title),a.keywords=a.keywords.concat([b.name,b.title])})})}),angular.forEach(["description","keywords"],function(b){a[b]=a[b].filter(function(a,b,c){return c.indexOf(a)===b})}),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function g(){a.search({query:encodeURIComponent(h.searchQuery),page:h.searchResult.page})}var h=this,i=a.search();h.siteUtils=b,h.frameworks=d,h.platforms=e,h.searchQuery="",h.searchResult=c,h.meta=f(),h.submitSearchForm=g,h.pageChanged=g,h.searchPath="/lib/search",h.searchInputPlaceholder="Search for library ...",i.query&&i.query.length&&(h.searchQuery=decodeURIComponent(i.query))}a.$inject=["$location","siteUtils","searchResult","frameworksList","platformsList"],angular.module("siteApp").controller("LibSearchController",a)}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){var a={title:m.lib.name,keywords:m.lib.keywords.slice(0),description:m.lib.description},b=[];angular.forEach(m.lib.authors,function(a){b.push(a.name)}),b.length&&(a.title+=" by "+b.join(", "));var c=[];return angular.forEach(["frameworks","platforms"],function(a){angular.forEach(m.lib[a],function(a){c.push(a.title)})}),a.keywords=a.keywords.concat(c),a.keywords=a.keywords.concat(m.lib.headers),a.keywords=a.keywords.join(", "),a}function h(){var a=[];return m.lib.examples.length?(angular.forEach(m.lib.examples,function(b){var c=b.split("/");a.push({url:b,name:c[c.length-1]})}),a):a}function i(){d.eventTrack("Download",{category:"Library",label:"#"+m.lib.id+" "+m.lib.name});var b=e.getLibDlUrl(m.lib.id).$promise;b.then(function(b){a.location.href=b.url+"?filename="+[m.lib.name.replace(/[\s]+/g,"-"),m.lib.version.name,m.lib.id].join("_")})}function j(b){if(d.eventTrack("Edit",{category:"Library",label:"#"+m.lib.id+" "+m.lib.name}),0===b.indexOf("https://raw.githubusercontent.com")){var c=b.match(new RegExp("content.com/([^/]+/[^/]+)/(.+)$"));if(c)return void(a.location.href="https://github.com/"+c[1]+"/blob/"+c[2])}a.location.href=b}function k(a){m.activeTab!==n.indexOf(a)&&b.url("/lib/show/"+c.libId+"/"+c.libName+"/"+a)}function l(){if(!c.hasOwnProperty("activeTab"))return 0;var a=n.indexOf(c.activeTab);return a!==-1?a:0}var m=this,n=["examples","installation","headers","manifest","discussion"];m.lib=f,m.meta=g(),m.examples=h(),m.activeTab=l(),m.currentExample={},m.showAllVersions=!1,m.downloadLib=i,m.editLibraryConf=j,m.changeTab=k,"discussion"!==c.activeTab&&0===b.hash().indexOf("comment-")&&b.url("/lib/show/"+c.libId+"/"+c.libName+"/discussion#"+b.hash()),m.examples.length&&(m.currentExample=m.examples[0]);var o=b.search();o.file&&angular.forEach(m.examples,function(a){if(a.name===o.file)return void(m.currentExample=a)})}a.$inject=["$window","$location","$routeParams","$analytics","dataService","libInfo"],angular.module("siteApp").controller("LibShowController",a)}(),function(){"use strict";function a(a,b,c,d,e,f,g,h,i){function j(){var a={description:[],keywords:[]};return angular.forEach(n.searchResult.items,function(b){a.description=a.description.concat([b.lib.name,b.name]),a.keywords=a.keywords.concat(b.name.split(/[\-\_\.]/))}),a.description=a.description.filter(m),a.keywords=a.keywords.filter(m),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function k(){a.search({query:encodeURIComponent(n.searchQuery),page:n.searchResult.page})}function l(a){var e,f,g=20;a.showFullCode=!1,a.shortCode="Loading...",e=c.get(a.url),e||(f=d.defer(),b.get(a.url,{cache:c,transformResponse:function(a,b){return a}}).success(function(a){f.resolve(a)}).error(function(a){console.log(a),f.resolve("Can't load an example code")}),e=f.promise),d.when(e).then(function(b){angular.isArray(b)?b=b[1]:angular.isObject(b)&&(b=b.data),b=b.replace(/(?:\s*\/\*[\s\S]+?\*\/\s*|\s*\/\/[\s\S]+?$\s)/m,""),a.shortCode=b.split("\n",g).splice(0,g).join("\n")})}function m(a,b,c){return c.indexOf(a)===b}var n=this,o=a.search();n.siteUtils=f,n.frameworks=h,n.platforms=i,n.searchQuery="",n.searchResult=g,n.meta=j(),n.submitSearchForm=k,n.pageChanged=k,n.searchPath="/lib/examples",n.searchInputPlaceholder="Search for example ...",o.query&&o.query.length&&(n.searchQuery=decodeURIComponent(o.query)),angular.forEach(n.searchResult.items,function(a){l(a)})}a.$inject=["$location","$http","$templateCache","$q","dataService","siteUtils","searchResult","frameworksList","platformsList"],angular.module("siteApp").controller("LibExamplesController",a)}();