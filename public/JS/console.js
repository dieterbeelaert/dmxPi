/**
 * Created by Dieter Beelaert on 16/07/2014.
 */

//angular stuff
 function dmxConsoleCtrl($scope,$http) {
    $scope.command = '';

    $scope.sendCommand = function(){
        console.log("bam");
        if($scope.command != '' && $scope.command.indexOf('@') != -1) {
            var cmd = $scope.command.split('@');
            $http({
                method: "post",
                url: "/console/cmd",
                data: {"channel": cmd[0], "value": cmd[1]}
            }).error(function (err) {
                console.log(err);
            });
            $scope.command = '';
        }
    }

    $scope.submit = function(){
       if(event.keyCode === 13)
            $scope.sendCommand();
    }

    $scope.addVal = function(val){
        $scope.command += val;
    }

    $scope.doBackspace = function(){
       $scope.command = $scope.command.substr(0,$scope.command.length -1);
    }
}
