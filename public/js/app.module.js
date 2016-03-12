angular.module("app").service("Day",["$http",function($http){this.get=function(){return $http.get("/api/day")},this.getFromRound=function(round_id){return $http.get("/api/day?round_id="+round_id)},this.last=function(){return $http.get("/api/day?last_day=1")},this.create=function(day){return console.log("day.service.js :10 creating new day:",day),$http.post("/api/day",day)},this["delete"]=function(day){return $http["delete"]("/api/day/"+day.id)}}]),angular.module("app").directive("loading",function(){return{restrict:"E",templateUrl:"app/directives/templates/loading.html",scope:{show:"="}}}),angular.module("app").directive("playerContainer",[function(){return{restrict:"E",templateUrl:"app/directives/templates/player.html",transclude:!0,scope:{player:"=player"},link:function(scope,el,attr){console.log("player.directive.js :11",scope)}}}]),angular.module("app").directive("prizeSlider",["Prize",function(Prize){return{restrict:"E",templateUrl:"app/directives/templates/prize-slider.html",controller:function($scope,$interval){Prize.get().then(function(res){$scope.prizes=res.data}),$scope.currentIndex=0,$scope.setCurrentSlideIndex=function(index){$scope.currentIndex=index},$scope.isCurrentSlideIndex=function(index){return $scope.currentIndex===index},$interval(function(){var index=$scope.currentIndex+1;$scope.prizes&&index>=$scope.prizes.length&&(index=0),$scope.setCurrentSlideIndex(index)},5e3)}}}]),angular.module("app").directive("mainContent",["Media",function(Media){return{restrict:"E",transclude:!0,templateUrl:"app/directives/templates/public-common-layout.html",controller:function($scope){$scope.sponsors=[],Media.getSponsors().then(function(res){$scope.sponsors=res.data})}}}]),angular.module("app").directive("publicNavigation",["Round","$state",function(Round,$state){return{link:function(scope,element){var handler=function(){var landingHeight=$("body").find(".landing-container").height()||!1;$(this).scrollTop()>landingHeight-25?$(element).addClass("nav-dark"):$(element).removeClass("nav-dark"),"public.login"===$state.current.name?$(element).fadeOut():$(element).fadeIn()};$("#navigation-container").click(function(e){$(e.target).parent().hasClass("dropdown")&&"true"===$("#navigation-container").attr("data-mobile")||$(".navbar-toggle").trigger("click")}),$(window).width()<=1090?$("#navigation-container").attr("data-mobile","true"):$("#navigation-container").attr("data-mobile","false");var $collapse=$("#navigation-container");$(".navbar-toggle").click(function(e){"true"===$(this).attr("data-open")?($collapse.css("height","0px"),$(this).attr("data-open","false"),$("#navigation-container").attr("data-open","false")):($collapse.css("height","350px"),$(this).attr("data-open","true"),$("#navigation-container").attr("data-open","true"))}),$(document).ready(handler),$(window).scroll(handler)},controller:function($scope){}}}]),angular.module("app").directive("scorers",["Player",function(Player){return{restrict:"E",templateUrl:"app/directives/templates/scorers.html",scope:{round:"="},controller:function($scope){Player.get($scope.round.id).then(function(res){console.log("scorers-excerpt.directive.js :13",res.data),$scope.scorers=res.data})}}}]),angular.module("app").directive("tableCalendars",function(){return{restrict:"E",templateUrl:"app/directives/templates/table-calendars.html",scope:{days:"=days"},link:function(scope,el,attr,ctrl,transclude){},controller:function($scope,$rootScope){$rootScope.$watch("rounds",function(newVal,oldVal){$scope.rounds=newVal||[]}),$scope.ready=!0,$scope.changeRound=function(round){return $scope.roundFilterId=round.id,!0},$scope.roundFilterId&&$scope.changeRound({id:Number($scope.roundFilterId)})}}}),angular.module("app").directive("tableLastDay",function(){return{restrict:"E",templateUrl:"app/directives/templates/table-last-day.html",scope:{days:"=days"},link:function(scope,el,attr,ctrl,transclude){},controller:function($scope,$rootScope){$rootScope.$watch("rounds",function(newVal,oldVal){$scope.rounds=newVal||[]}),console.log("table-last-day.directive.js :21",$scope),$scope.ready=!0,$scope.changeRound=function(round){return $scope.roundFilterId=round.id,!0},$scope.roundFilterId&&$scope.changeRound({id:Number($scope.roundFilterId)})}}}),angular.module("app").directive("tableRankings",function(){return{restrict:"E",templateUrl:"app/directives/templates/table-rankings.html",scope:{teams:"=teams"},link:function(scope,el,attr,ctrl,transclude){},controller:function($scope,$rootScope){$rootScope.$watch("rounds",function(newVal,oldVal){$scope.rounds=newVal||[]}),$scope.ready=!0,$scope.changeRound=function(round){return $scope.roundFilterId=round.id,!0},$scope.roundFilterId&&$scope.changeRound({id:Number($scope.roundFilterId)})}}}),angular.module("app").directive("tableScorers",function(){return{restrict:"E",templateUrl:"app/directives/templates/table-scorers.html",scope:{players:"=players"},link:function(scope,el,attr,ctrl,transclude){},controller:function($scope,$rootScope){$rootScope.$watch("rounds",function(newVal,oldVal){$scope.rounds=newVal||[]}),$scope.ready=!0,$scope.changeRound=function(round){return $scope.roundFilterId=round.id,!0},$scope.roundFilterId&&$scope.changeRound({id:Number($scope.roundFilterId)})}}}),angular.module("app").directive("lastMatches",["Match",function(Match){return{restrict:"E",templateUrl:"app/directives/templates/team-last-matches.html",scope:{matches:"="},controller:function($scope){function fetchMatchesData(){$scope.matches.forEach(function(match,index){Match.single(match.id).then(function(res){var match=sortScores(res.data);$scope.latestMatches.push(match)},function(err){console.log("team-last-matches.directive.js :22",err)})})}function sortScores(match){return match.team_a.scores=[],match.team_b.scores=[],match.scores.forEach(function(score,index){score.team_id===match.team_a.id?match.team_a.scores.push(score):match.team_b.scores.push(score)}),match}$scope.latestMatches=[],$scope.$watch("matches",function(newVal,oldVal){newVal&&newVal!=oldVal&&fetchMatchesData()},!0)}}}]),angular.module("app").filter("spaceless",function(){return function(input){return input.replace(new RegExp(" ","g"),"_")}}).filter("trustedUrl",["$sce",function($sce){return function(input){return $sce.trustAsResourceUrl(input)}}]).filter("roundFilter",function(){return function(array,round_id){if(array=array||[],!round_id)return array;var filtered=array.filter(function(index){return index.round_id===round_id});return filtered}}).filter("dayRoundFilter",function(){return function(array,round_id){if(array=array||[],!round_id)return array;var filtered=array.filter(function(index){return index.round_id===round_id});return filtered}}).filter("playerRoundFilter",function(){return function(array,round_id){if(!round_id)return array;var filtered=array.filter(function(index){return index.team.round_id===round_id});return filtered}}).filter("orderByScores",function(){return function(array,scores){return console.log("filters.js :47","asdasd"),_.sortBy(array,function(item){return item.scores.length})}}),angular.module("app").service("Auth",["$http","$rootScope",function($http,$rootScope){this.login=function(credential){return $http.post("/api/auth",credential)},this.check=function(){return $http.get("/api/auth/check")}}]),angular.module("app").controller("LoginCtrl",["$auth","$state","$scope","$rootScope","$http","Auth",function($auth,$state,$scope,$rootScope,$http,Auth){$rootScope.isLoginPage=!0,$scope.loginLoading=!1,$scope.loginError="",$scope.credential={},$scope.login=function(credential){$scope.loginLoading=!$scope.loginLoading,$auth.login(credential).then(function(res){$state.go("admin.dashboard")},function(err){$scope.loginLoading=!$scope.loginLoading,$scope.loginError="Credenziali non corrette, riprova!"})}}]),angular.module("app").controller("MatchCtrl",["$scope","$state","Match","Round","Day","Team","toastr",function($scope,$state,Match,Round,Day,Team,toastr){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data})}function getMatchs(){Match.get().then(function(res){$scope.matches=res.data,filterScores()},function(err){console.log("match.controller.js :27",err)})}function getDays(){Day.getFromRound($scope.filters.round_id).then(function(res){$scope.days=res.data})}function filterScores(){$scope.matches.forEach(function(match){match.team_a.match_score=[],match.team_b.match_score=[],match.scores.forEach(function(score){score.team_id===match.team_a.id?match.team_a.match_score.push(score):match.team_b.match_score.push(score)})})}$scope.matches=[],$scope.match={},$scope.rounds=[],$scope.round_id="",$scope.teams=[],$scope.days=[],$scope.choosen_day_id="",$scope.filters={day_id:void 0,round_id:void 0},$scope.$watch("filters",function(current,prev){console.log("match.controller.js :21","changed"),getDays(),getMatchs()},!0),getRounds(),$scope.getDataFromRound=function(round_id){$scope.teams=[],Team.getFromRound(round_id).then(function(res){$scope.teams=res.data},function(err){console.log("match.controller.js :37",err)})},$scope.create=function(match){Match.create(match).then(function(res){$scope.match={},toastr.success("Match creato!"),console.log("match.controller.js :63",res),getMatchs()},function(err){console.log("match.controller.js :46",err)})},$scope["delete"]=function(match){confirm("Sicuro di volerlo rimuovere?")&&Match["delete"](match).then(function(res){console.log("match.controller.js :30",res),toastr.warning("Rimosso!"),getMatchs()},function(err){toastr.error(err,"Errore..."),console.log("match.controller.js :32",err)})},$scope.selectRound=function(round){$scope.selectedRound=round.id}}]),angular.module("app").service("Match",["$http",function($http){this.get=function(){return $http.get("/api/match")},this.single=function(id){return $http.get("/api/match/"+id)},this.getWithFilter=function(filters){return $http.get("/api/match?day_id="+filters.day_id+"&round_id="+filters.round_id)},this.create=function(data){return $http.post("/api/match",data)},this["delete"]=function(match){return $http["delete"]("/api/match/"+match.id)},this.edit=function(result){return $http.put("/api/match/"+result.id,result)}}]),angular.module("app").controller("ResultCtrl",["$scope","$state","$stateParams","toastr","Match",function($scope,$state,$stateParams,toastr,Match){function getMatch(){Match.single($stateParams.match_id).then(function(res){$scope.match=res.data,$scope.match.team_a.player.forEach(function(player){player.score=0,$scope.match.scores.forEach(function(score){score.player_id===player.id&&player.score++}),player.attendance.forEach(function(attend){attend.match_id===$scope.match.id?player.attendance=!0:player.attendance=!1}),player.warning.forEach(function(warning){warning.match_id===$scope.match.id&&(player.penalty="warning")}),player.expulsion.forEach(function(expulsion){expulsion.match_id===$scope.match.id&&(player.penalty="expulsion")})}),$scope.match.team_b.player.forEach(function(player){player.score=0,$scope.match.scores.forEach(function(score){score.player_id===player.id&&player.score++}),player.attendance.forEach(function(attend){attend.match_id===$scope.match.id?player.attendance=!0:player.attendance=!1}),player.warning.forEach(function(warning){warning.match_id===$scope.match.id&&(player.penalty="warning")}),player.expulsion.forEach(function(expulsion){expulsion.match_id===$scope.match.id&&(player.penalty="expulsion")})})})}$scope.match={},$scope.teamAScores=[],$scope.teamBScores=[],getMatch(),$scope.edit=function(result){result.played=!0,result.attendances=[],result.all_scores=$scope.teamAScores.concat($scope.teamBScores),Match.edit(result).then(function(res){console.log("result.controller.js :25",res.data),getMatch(),toastr.success("Risultato salvato!")})},$scope.$watch("match",function(newVal,oldVal){if("undefined"!=typeof newVal.id){var match=newVal,teamAScores=[],teamBScores=[];match.team_a.player.forEach(function(player){if(player.score&&player.score>=0){player.player_id=player.id,player.match_id=$scope.match.id;for(var i=0;i<player.score;i++)teamAScores.push(player)}$scope.teamAScores=teamAScores}),match.team_b.player.forEach(function(player){if(player.score&&player.score>=0){player.player_id=player.id,player.match_id=$scope.match.id;for(var i=0;i<player.score;i++)teamBScores.push(player)}$scope.teamBScores=teamBScores}),$scope.teamAScores.length===$scope.teamBScores.length&&($scope.match.winner_id=null),$scope.teamAScores.length>$scope.teamBScores.length&&($scope.match.winner_id=$scope.match.team_a.id),$scope.teamAScores.length<$scope.teamBScores.length&&($scope.match.winner_id=$scope.match.team_b.id)}},!0)}]),angular.module("app").controller("MediaCtrl",["$scope","$auth","$sce","toastr","Media",function($scope,$auth,$sce,toastr,Media){function getVideos(){Media.getVideos().then(function(data){$scope.videos=data.data},function(err){console.log("media.controller.js :39",err)})}function getSponsors(){Media.getSponsors().then(function(data){$scope.sponsors=data.data},function(err){console.log("media.controller.js :39",err)})}function getPhotos(){Media.getPhotos().then(function(data){$scope.photos=data.data},function(err){console.log("media.controller.js :48",err)})}$scope.upload={},$scope.videos=[],$scope.photos=[],getPhotos(),getVideos(),getSponsors(),$scope.createVideo=function(video){Media.createVideo(video).then(function(res){toastr.success("Video aggiunto!"),getVideos()},function(err){toastr.error("Impossibile aggiungere il video","Error...")})},$scope.uploadPhotoSucces=function(){toastr.success("Photo Uploaded!"),getPhotos()},$scope.uploadSponsorSucces=function(){toastr.success("Photo Uploaded!"),getSponsors()},$scope["delete"]=function(media){confirm("Sicuro di volerlo rimuovere?")&&Media["delete"](media).then(function(res){toastr.warning("Media rimosso!"),getVideos(),getPhotos()})}}]),angular.module("app").service("Media",["$http",function($http){this.createVideo=function(video){return $http.post("/api/video",video)},this["delete"]=function(media){return $http["delete"]("/api/media/"+media.id)},this.get=function(){return $http.get("/api/media")},this.getPhotos=function(){return $http.get("/api/media?type=photo")},this.getVideos=function(){return $http.get("/api/media?type=video")},this.getSponsors=function(){return $http.get("/api/media?type=sponsor")}}]),angular.module("app").controller("AdminCtrl",["$auth","$scope","$rootScope","$state","Auth",function($auth,$scope,$rootScope,$state,Auth){$rootScope.$on("$stateChangeStart",function(e,toState){$scope.adminActive=toState.name}),$scope.logout=function(){$auth.logout(),$state.go("public.login")},$scope.isAuthenticated=function(){return $auth.isAuthenticated()}}]),angular.module("app").controller("ContactsCtrl",["$scope","toastr","News",function($scope,toastr,News){function getContacts(){News.index("contacts").then(function(res){console.log("contacts.controller.js :27",res.data),$scope.contacts=res.data[0]},function(err){console.log("contacts.controller.js :30",err)})}$scope.rules={},getContacts(),$scope.create=function(contacts){contacts.title="contacts",contacts.type="contacts",News.create(contacts).then(function(res){console.log("contacts.controller.js :13",res),200===res.status&&toastr.success("Contatti "+(contacts.id?"modificati":"creati"),"Success!")},function(err){console.log("news.controller.js :38",err)})}}]),angular.module("app").controller("NewsCtrl",["$rootScope","$scope","$state","toastr","News","Season",function($rootScope,$scope,$state,toastr,News,Season){function getPosts(){News.index($scope.postType).then(function(res){$scope.posts=res.data})}$scope.postType=void 0,$scope.posts=[],$scope.post={},getPosts(),$scope.submit=function($files,$event,$flow){$scope.uploadingBlock=!0,$flow.opts.target="/api/media?type=featured",$flow.upload()},$scope.uploaded=function($file,$message,$flow){if(console.log("news.controller.js :16",$flow.files),$message){var dbRecord=JSON.parse($message);$scope.post.featured_id=dbRecord.id,$scope.post.featured={path:dbRecord.path}}toastr.success("Immagine di copertina aggiunta!"),$scope.uploadingBlock=!1},$scope.create=function(post){News.create(post).then(function(res){console.log("news.controller.js :30",res),200===res.status&&(toastr.success("Post "+(post.id?"modificato":"creato"),"Success!"),$scope.editMode=!1,getPosts(),$scope.post={})},function(err){console.log("news.controller.js :38",err)})},$scope["delete"]=function(post){confirm("Sicuro di volerlo cancellare?")&&News["delete"](post).then(function(res){console.log("news.controller.js :26",res),200==res.status&&(toastr.warning("Post cancellato!"),getPosts())},function(err){console.log("news.controller.js :53",err)})},Season.get().then(function(res){$scope.seasons=res.data}),$scope.$watch("post",function(newVal,oldVal){newVal&&newVal!==oldVal&&($scope.post.excerpt=$scope.post.body?String($scope.post.body).replace(/<[^>]+>/gm,""):"")},!0)}]),angular.module("app").service("News",["$http",function($http){this.create=function(post){return $http.post("/api/news",post)},this.index=function(type){return type?$http.get("/api/news?type="+type):$http.get("/api/news")},this.get=function(id){return $http.get("/api/news/"+id)},this["delete"]=function(post){return $http["delete"]("/api/news/"+post.id)}}]),angular.module("app").controller("RulesCtrl",["$scope","toastr","News",function($scope,toastr,News){function getRules(){News.index("rules").then(function(res){console.log("rules.controller.js :27",res.data),$scope.rules=res.data[0]},function(err){console.log("rules.controller.js :30",err)})}$scope.rules={},getRules(),$scope.create=function(rules){rules.type="rules",News.create(rules).then(function(res){console.log("rules.controller.js :13",res),200===res.status&&toastr.success("Regole "+(rules.id?"modificate":"create"),"Success!")},function(err){console.log("news.controller.js :38",err)})}}]),angular.module("app").controller("PlayerCtrl",["$scope","toastr","Player",function($scope,toastr,Player){function getPlayers(){Player.get().then(function(res){$scope.players=res.data},function(err){console.log("player.controller.js :13",err)})}$scope.players=[],getPlayers(),$scope["delete"]=function(player){confirm("Sicuro di volerlo rimuovere")&&Player["delete"](player).then(function(res){toastr.warning("Giocatore rimosso"),getPlayers()},function(err){err&&(toastr.error("Error..."),console.log("player.controller.js :14",err))})}}]),angular.module("app").service("Player",["$http",function($http){this.get=function(round_id){return round_id?$http.get("/api/player?round_id="+round_id):$http.get("/api/player")},this.getSingle=function(player_id){return console.log("player.service.js :10",player_id),$http.get("/api/player/"+player_id)},this.getScorers=function(limit){return limit=limit||3,$http.get("/api/player?scorers="+limit)},this.create=function(data){return $http.post("/api/player",data)},this.edit=function(player){return $http.put("/api/player/"+player.id,player)},this["delete"]=function(player){return $http["delete"]("/api/player/"+player.id)}}]),angular.module("app").controller("SinglePlayerCtrl",["$scope","$stateParams","toastr","Player",function($scope,$stateParams,toastr,Player){function getPlayer(){console.log("single.controller.js :9",$stateParams),Player.getSingle($stateParams.player_id).then(function(res){console.log("single.controller.js :11",res),$scope.player=res.data},function(err){console.log("single.controller.js :13",err)})}$scope.player={},getPlayer(),$scope.submit=function($files,$event,$flow,player){$flow.opts.target="/api/media?type=avatar&player_id="+player.id,$flow.upload()},$scope.upload=function(){toastr.success("Avatar caricato!"),getPlayer()},$scope.edit=function(player){Player.edit(player).then(function(res){console.log("single.controller.js :20",res.data),toastr.success("Giocatore modificato!"),getPlayer(),$scope.editMode=!$scope.editMode},function(err){toastr.error(err,"Error...")})}}]),angular.module("app").controller("PrizeCtrl",["$rootScope","$scope","toastr","Season","Prize",function($rootScope,$scope,toastr,Season,Prize){function getPrizes(){Prize.get().then(function(res){$scope.prizes=res.data})}function getSeasons(){Season.get().then(function(res){$scope.seasons=res.data},function(err){console.log("prize.controller.js :16",err)})}$scope.prizes=[],$scope.seasons=[],$scope.prize={},getSeasons(),getPrizes(),$scope.create=function(prize){Prize.create(prize).then(function(data){$scope.prize={},getPrizes(),toastr.success("Premio salvato!")},function(err){toastr.error(err,"Error..."),console.log("prize.controller.js :20",err)})},$scope["delete"]=function(prize){confirm("Sicuro di volerlo rimuovere?")&&Prize["delete"](prize).then(function(res){getPrizes(),toastr.warning("Premio rimosso!"),console.log("prize.controller.js :30",res)},function(err){toastr.error(err,"Error..."),console.log("prize.controller.js :20",err)})},$scope.submit=function($files,$event,$flow){$flow.opts.target="/api/media?type=prize",$flow.upload()},$scope.uploaded=function($file,$message,$flow,prize){$img=JSON.parse($message),prize.media_id=$img.id,$scope.create(prize),toastr.success("Immagine di copertina aggiunta!")}}]),angular.module("app").service("Prize",["$http",function($http){this.create=function(prize){return console.log("prize.service.js :6",prize),$http.post("/api/prize",prize)},this.get=function(){return $http.get("/api/prize")},this["delete"]=function(prize){return $http["delete"]("/api/prize/"+prize.id)}}]),angular.module("app").controller("PublicCtrl",["$rootScope","$scope","$state",function($rootScope,$scope,$state){$scope.headerBg=$scope.headerBg}]),angular.module("app").controller("RoundsCtrl",["$rootScope","$scope","$http","toastr","Season","Round","Media",function($rootScope,$scope,$http,toastr,Season,Round,Media){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data},function(err){$scope.seasons=[],console.log("season.controller.js :12",err)})}function getSeasons(callback){Season.get().then(function(res){$scope.seasons=res.data,callback()},function(err){$scope.seasons=[],callback(),console.log("season.controller.js :12",err)})}$scope.alphabet=["A","B","C","D","E","F","G","H","I","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],$scope.seasons=[],$scope.rounds=[],$scope.round={},getSeasons(function(){$scope.seasons.length&&getRounds()}),$scope.create=function(round){Round.create(round).then(function(res){200===res.status&&($scope.round={},toastr.success("Girone creato!")),getRounds()},function(err){toastr.error(err,"Errore...")})},$scope.edit=function(round){Round.edit(round).then(function(res){getRounds(),toastr.success("Modificato!")},function(err){toastr.error(err,"Error...")})},$scope["delete"]=function(round){confirm("Sicuro di volerlo rimuovere?")&&Round["delete"](round).then(function(res){getRounds(),toastr.warning("Rimosso!"),console.log("round.controller.js :40",res)},function(err){console.log("round.controller.js :42",err),toastr.error(err,"Error...")})}}]),angular.module("app").service("Round",["$http",function($http){this.get=function(){return $http.get("/api/round")},this.getSingle=function(id){return $http.get("/api/round/"+id)},this.create=function(round){return $http.post("/api/round",round)},this.edit=function(round){return console.log("round.service.js :14",round),$http.put("/api/round/"+round.id,round)},this["delete"]=function(round){return $http["delete"]("/api/round/"+round.id)}}]),angular.module("app").controller("SingleRoundCtrl",["$stateParams","$scope","$http","toastr","Season","Round","Day",function($stateParams,$scope,$http,toastr,Season,Round,Day){function getRound(){Round.getSingle($stateParams.round_id).then(function(res){$scope.round=res.data,console.log("single.controller.js :53",res.data)},function(err){console.log("season.controller.js :12",err)})}$scope.round={},$scope.editMode=!1,getRound(),$scope.createDay=function(){Day.create({round_id:$scope.round.id}).then(function(res){console.log("day.controller.js :27",res),200===res.status&&(toastr.success("Giornata creata!"),getRound())},function(err){console.log("day.controller.js :33",err),toastr.error(err,"Errore...")})},$scope.submit=function($files,$event,$flow,round){$flow.opts.target="/api/media?type=club&round_id="+round.id,$flow.upload()},$scope.uploaded=function(){toastr.success("Avatar club caricato!"),getRound()},$scope.editRound=function(round){Round.edit(round).then(function(res){$scope.editMode=!1,getRound(),toastr.success("Modificato!")},function(err){toastr.error(err,"Error...")})},$scope.deleteDay=function(day){confirm("Sicuro di volerlo rimuovere?")&&Day["delete"](day).then(function(res){getRound(),toastr.warning("Rimosso!")},function(err){console.log("day.controller.js :42",err),toastr.error(err,"Error...")})}}]),angular.module("app").controller("SeasonCtrl",["$scope","$http","Season","toastr",function($scope,$http,Season,toastr){function getSeasons(){Season.get().then(function(data){$scope.seasons=data.data},function(err){console.log("season.controller.js :12",err)})}$scope.seasons=null,getSeasons(),$scope.create=function(season){Season.create(season).then(function(res){200===res.status&&toastr.success("New Season Created!"),getSeasons()},function(err){toastr.error(err,"Errore...")})},$scope["delete"]=function(season){confirm("Sicuro di volerlo rimuovere?")&&Season["delete"](season).then(function(res){console.log("season.controller.js :30",res),toastr.warning("Rimosso!"),getSeasons()},function(err){toastr.error(err,"Errore..."),console.log("season.controller.js :32",err)})},$scope.edit=function(season){confirm("Vuoi settare la stagione "+season.year+" come stagione corrente?")&&Season.edit(season).then(function(data){console.log("season.controller.js :39",data),$scope.seasons=[],getSeasons()},function(err){console.log("season.controller.js :41",err)})}}]),angular.module("app").service("Season",["$http","$rootScope",function($http,$rootScope){this.get=function(){return $http.get("/api/season")},this.getCurrentSeason=function(callback){$http.get("/api/season").then(function(data){var seasons=data.data;seasons.forEach(function(season){return season.current?callback(season):void 0})})},this.create=function(season){return $http.post("/api/season",season)},this["delete"]=function(season){return $http["delete"]("/api/season/"+season.id)},this.edit=function(season){return $http.put("/api/season/"+season.id,season)}}]),angular.module("app").controller("SingleTeamCtrl",["$scope","$stateParams","toastr","Team","Round","Player",function($scope,$stateParams,toastr,Team,Round,Player){function getTeam(){Team.getTeam($stateParams.team_id).then(function(res){$scope.team=res.data,console.log("single.controller.js :11",res.data)})}function getRounds(){Round.get().then(function(res){console.log("single.controller.js :66",res.data),$scope.rounds=res.data})}$scope.team={},$scope.rounds=void 0,$scope.editMode=!1,getTeam(),getRounds(),$scope.submit=function($files,$event,$flow,team){$flow.opts.target="/api/media?type=avatar&team_id="+team.id,$flow.upload()},$scope.upload=function(){getTeam()},$scope.submitGroupPhoto=function($files,$event,$flow,team){$flow.opts.target="/api/media?type=team",$flow.upload()},$scope.uploadedGroupPhoto=function($file,$message,$flow,team){if($message){var img=JSON.parse($message);team.group_photo_id=img.id,$scope.editTeam(team)}},$scope.editTeam=function(team){Team.edit(team).then(function(res){console.log("single.controller.js :14",res.data),toastr.warning("Modificato"),getTeam(),$scope.editMode=!1},function(err){toastr.error(err,"Error...")})},$scope.deletePlayer=function(player){confirm("Sicuro di volerlo rimuovere?")&&Player["delete"](player).then(function(res){console.log("player.controller.js :30",res),toastr.warning("Rimosso!"),getTeam()},function(err){toastr.error(err,"Errore..."),console.log("player.controller.js :32",err)})},$scope.createPlayer=function(player){player.team_id=$scope.team.id,Player.create(player).then(function(res){200===res.status&&($scope.player={},toastr.success("Giocatore creato!"),getTeam())},function(err){console.log("player.controller.js :33",err),toastr.error(err,"Error...")})}}]),angular.module("app").controller("TeamsCtrl",["$scope","toastr","Team","Round",function($scope,toastr,Team,Round){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data})}function getTeams(){Team.get().then(function(res){res.status&&($scope.teams=res.data)},function(err){$scope.error=err})}$scope.teams=[],$scope.team={round_id:void 0,name:""},$scope.rounds=[],getRounds(),getTeams(),$scope.create=function(team){Team.create(team).then(function(res){200===res.status&&($scope.team={},toastr.success("Team creato!"),getTeams())},function(err){err&&toastr.error(err,"Errore...")})},$scope["delete"]=function(team){confirm("Sicuro di volerlo rimuovere?")&&Team["delete"](team).then(function(res){console.log("team.controller.js :36",res.data),toastr.warning("Rimosso!"),getTeams()},function(err){toastr.error(err.data,"Errore..."),console.log("team.controller.js :40",err)})}}]),angular.module("app").service("Team",["$http",function($http){this.get=function(){return $http.get("/api/team")},this.getFromRound=function(round_id){return $http.get("/api/team?round_id="+round_id)},this.getTeam=function(team_id){return $http.get("/api/team/"+team_id)},this.create=function(data){return console.log("team.service.js :10",data),$http.post("/api/team",data)},this.edit=function(team){return $http.put("/api/team/"+team.id,team)},this["delete"]=function(team){return $http["delete"]("/api/team/"+team.id)}}]),angular.module("app").controller("UserCtrl",["$scope","Auth","$http",function($scope,Auth,$http){$scope.user={},$scope.createUser=function(credential){credential.username?credential.pwd===credential.pwdRetype?$http.post("/api/user",credential).then(function(data){console.log("user.controller.js :10",data)},function(err){console.log("user.controller.js :14",err),err&&($scope.error=err.data)}):$scope.error="Password mismatch!":$scope.error="No username provided!"}}]),angular.module("app").controller("PublicCalendarsCtrl",["$scope","$stateParams","Day","Round",function($scope,$stateParams,Day,Round){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data},function(err){console.log("calendars.controller.js :15",err)})}function getDays(){Day.get().then(function(res){$scope.days=res.data},function(err){console.log("calendars.controller.js :23",err)})}$scope.roundFilterId=$stateParams.round||void 0,$scope.days=[],$scope.rounds=[],getRounds(),getDays(),$scope.changeRound=function(round_id){$scope.round_id=round_id}}]),angular.module("app").controller("PublicContactsCtrl",["$scope","News",function($scope,News){function getContacts(){News.index("contacts").then(function(res){console.log("contacts.controller.js :11",res),$scope.contacts=res.data[0]},function(err){console.log("contacts.controller.js :14",err)})}$scope.contacts={},getContacts()}]),angular.module("app").controller("HomeCtrl",["$scope","Round","News","Media","Day",function($scope,Round,News,Media,Day){$scope.slickConfig={enabled:!0,autoplay:!0,draggable:!1,infinite:!0,slidesToShow:5,slidesToScroll:5,autoplaySpeed:3500,responsive:[{breakpoint:1440,settings:{slidesToShow:4,slidesToScroll:4,autoplaySpeed:3500}},{breakpoint:1440,settings:{slidesToShow:3,slidesToScroll:3,autoplaySpeed:3500}},{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,autoplaySpeed:3500}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2,autoplaySpeed:2500}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,autoplaySpeed:1500}}],event:{beforeChange:function(event,slick,currentSlide,nextSlide){},afterChange:function(event,slick,currentSlide,nextSlide){}}},News.index("news").then(function(res){$scope.news=res.data},function(err){console.log("home.controller.js :9",err)}),Media.getSponsors().then(function(res){$scope.sponsors=res.data,$scope.sponsorLoaded=!0},function(err){console.log("home.controller.js :16",err)}),Media.getPhotos().then(function(res){console.log("home.controller.js :21",res.data),
$scope.photos=res.data},function(err){console.log("home.controller.js :23",err)}),Day.last().then(function(res){console.log("home.controller.js :35",res.data),$scope.days=res.data},function(err){console.log("home.controller.js :38",err)})}]),angular.module("app").controller("PublicMediasCtrl",["$scope","$stateParams","Media",function($scope,$stateParams,Media){function getPhotos(){Media.getPhotos().then(function(res){$scope.media=res.data,$scope.loading=!0})}function getVideos(){Media.getVideos().then(function(res){console.log("medias.controller.js :25",res),$scope.media=res.data,$scope.loading=!0})}$scope.media=[],$scope.type=$stateParams.type,"photo"==$stateParams.type?getPhotos():getVideos()}]),angular.module("app").controller("PublicNewsCtrl",["$scope","$stateParams","News",function($scope,$stateParams,News){function getNews(){News.index().then(function(res){$scope.news=res.data})}$scope.news=[],$scope.newsType=$stateParams.type||void 0,getNews()}]),angular.module("app").controller("PublicSingleNewsCtrl",["$scope","ResolvedPost",function($scope,ResolvedPost){$scope.post=ResolvedPost}]),angular.module("app").controller("PublicRankingsCtrl",["$scope","$stateParams","Team",function($scope,$stateParams,Team){function getTeams(){Team.get().then(function(res){$scope.teams=res.data},function(err){console.log("rankings.controller.js :13",err)})}$scope.teams=[],getTeams(),$scope.roundFilterId=$stateParams.round||void 0}]),angular.module("app").controller("PublicRulesCtrl",["$scope","News",function($scope,News){$scope.rules={},News.index("rules").then(function(res){$scope.rules=res.data[0]},function(err){console.log("rules.controller.js :10",err)})}]),angular.module("app").controller("PublicScorersCtrl",["$scope","Player","Round",function($scope,Player,Round){function getRounds(){Round.get().then(function(res){$scope.rounds=res.data})}function getPlayers(){Player.get().then(function(res){$scope.players=res.data,$scope.loadingOff=!0},function(err){console.log("scorers.controller.js :12",err)})}$scope.players=[],getRounds(),getPlayers(),$scope.roundChange=function(round_id){$scope.round_id=round_id}}]),angular.module("app").controller("PublicTeamCtrl",["$scope","$stateParams","Team",function($scope,$stateParams,Team){function getTeam(){Team.getTeam(team_id).then(function(res){console.log("team.controller.js :13",res),$scope.team=res.data},function(err){console.log("team.controller.js :15",err)})}var team_id=$stateParams.team_id;$scope.team={},getTeam()}]);