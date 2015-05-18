
function MainCtrl($scope){
  
  $scope.randomGreetings = function(){
    var ary=['Hello!','Bonjour!', 'Hey Yo!','¡Hola!','Ciao!','你好！','安安～','こんにちは','안녕하세요','你吃早餐了嗎？'];
    $scope.greet=ary[Math.floor(Math.random() * 10)];
  }
  $scope.randomGreetings();
  $scope.recordsShow = false;
  $scope.clearData=function(){
      if(confirm("確定要重置所有紀錄嗎？")){
        localStorage.clear();
        location.reload();
      };
      
  };

  var replacer=function(key, val) {
     if (key == '$$hashKey') {
         return undefined;
     }
     return val;
};

  $scope.inputName='';
  $scope.people=[];
  $scope.records=[];
  $scope.recentPerson=0;
  $scope.recordsShow = false;
  $scope.youGive=[];
  $scope.youOwe = null;
  $scope.showDetailArray=[];
  $scope.youGaveIsActive = true;
  $scope.inputMoney=null;
  $scope.inputDate=null;
  $scope.inputDescription=null;

  var emptyArray=[];

  if(!localStorage.getItem('people')){
    localStorage.setItem('people',JSON.stringify(emptyArray));
  }
  else{
    $scope.people=JSON.parse(localStorage.getItem('people'));
  }
 

  
  $scope.addPerson = function(name){
    
    var newPerson = {
      name:name,
      records:[]
    };
    $scope.people.push(newPerson);
    localStorage.setItem('people',JSON.stringify($scope.people,replacer));
    $scope.inputName=null;
  };
  
  $scope.NewRecord = function(money,date,description){
    this.money=money;
    this.date=date;
    this.description=description;
  };
  
  $scope.saveRecord = function(personIndex){
   
    if($scope.youGaveIsActive){
      $scope.inputMoney = Math.abs($scope.inputMoney);
    }
    else{
      $scope.inputMoney = Math.abs($scope.inputMoney)*(-1);
    }
    var newRecord = new $scope.NewRecord($scope.inputMoney,$scope.inputDate,$scope.inputDescription);
    
    $scope.people[personIndex].records.push(newRecord);
    localStorage.setItem('people',JSON.stringify($scope.people,replacer)); 
    
    $scope.records=$scope.people[personIndex].records;
    var length = $scope.records.length;
    for(var i=0; i<length; i++){
      if ($scope.records[i].money>=0) {
        $scope.youGive[i] = true;
      }
      else{
        $scope.youGive[i] = false;
      }
    }
    $scope.inputMoney = null;
    $scope.inputDate = null;
    $scope.inputDescription = null;
       
  };
  $scope.ngReload = function(){
    $route.reload();
  }
  $scope.showRecords = function(personIndex){
    $scope.people=JSON.parse(localStorage.getItem('people'));
    
    $scope.recordsShow = true;
    $scope.records=$scope.people[personIndex].records;
    console.log($scope.records);
    var length = $scope.records.length;
    for(var i=0; i<length; i++){
      if ($scope.records[i].money>=0) {
        $scope.youGive[i] = true;
      }
      else{
        $scope.youGive[i] = false;
      }
    }
    $scope.recentPerson=personIndex;

    for(var i = 0; i< $scope.records.length; i++){
      $scope.showDetailArray[i]=false;
    }
    
  };
  
  $scope.total = function(){
    var sum = 0;
    var length = $scope.records.length;
    
    for(var i = 0; i<length; i++){
      sum+=$scope.records[i].money;
    }
    if (sum>=0) {
      $scope.youOwe=false;
    }
    else{
      $scope.youOwe=true;
    };
    return sum;
  };
  
  $scope.deleteRecord = function(recordIndex){
    $scope.records.splice(recordIndex,1);
    $scope.people[$scope.recentPerson].records = $scope.records;
    localStorage.setItem('people',JSON.stringify($scope.people,replacer));
    $scope.showRecords($scope.recentPerson);
  };

  $scope.whoGaveWho = function(){
    if($scope.youGaveIsActive){
      $scope.youGaveIsActive=false;
      
    }
    else{
      $scope.youGaveIsActive=true;
      
    }
  }
  $scope.showDetail = function(recordIndex){
    for(var i = 0; i< $scope.records.length; i++){
      $scope.showDetailArray[i]=false;
    }
    $scope.showDetailArray[recordIndex]=true;
    
  }
  $scope.hideDetail = function(recordIndex){
    $scope.showDetailArray[recordIndex]=false;
    
    
  }
  $scope.showHome = function(){
    $scope.recordsShow = false;
  }
  $scope.deletePerson = function(){
    if (confirm("確定要刪除此人嗎？")) {
      $scope.people.splice($scope.recentPerson,1);
      localStorage.setItem('people',JSON.stringify($scope.people,replacer));
      location.reload();
    };
    
  }


  
   
}

