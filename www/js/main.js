// This is a JavaScript file

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

function distance(lat1,lon1,lat2,lon2){
        var mode = false;
        var radlat1 = lat1 * Math.PI / 180.0; //経度1
        var radlon1 = lon1 * Math.PI / 180.0; //緯度1
        var radlat2 = lat2 * Math.PI / 180.0; //経度2
        var radlon2 = lon2 * Math.PI / 180.0; //緯度2
        //平均緯度
        var radLatAve = (radlat1 + radlat2) / 2;
        //緯度差
        var radLatDiff = radlat1 - radlat2;
        //経度差算
        var radLonDiff = radlon1 - radlon2;
 
        var sinLat = Math.sin(radLatAve);
        if(mode==true){
            //mode引数がtrueなら世界測地系で計算（デフォルト）
            var tmp =  1.0 - 0.00669438 * (sinLat*sinLat);
            var meridianRad = 6335439.0 / Math.sqrt(tmp*tmp*tmp); // 子午線曲率半径
            var dvrad = 6378137.0 / Math.sqrt(tmp); // 卯酉線曲率半径
        }else{
            //mode引数がfalseなら日本測地系で計算
            var tmp = 1.0 - 0.00667478 * (sinLat*sinLat);
            var meridianRad = 6334834.0 / Math.sqrt(tmp*tmp*tmp); // 子午線曲率半径
            var dvrad = 6377397.155 / Math.sqrt(tmp); // 卯酉線曲率半径
        }
        var t1 = meridianRad * radLatDiff;
        var t2 = dvrad * Math.cos(radLatAve) * radLonDiff;
        var dist = Math.sqrt((t1*t1) + (t2*t2));
 
        dist = Math.floor(dist); //小数点以下切り捨て
        return dist; //２点間の直線距離を返す (単位はm)
}