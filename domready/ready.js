function ready(readyFn) {
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded',function (e) {
                readyFn && readyFn();
            },false);
        }else{
            var beReady = false;

            /*兼容方案1*/
            document.attachEvent('onreadystatechange',function () {
                if(beReady){
                    return ;
                }
                if(document.readyState =='interactive' || document.readyState == 'complete'){
                    beReady = true;
                    readyFn && readyFn();
                }
            })

            /*兼容方案2*/
            //判断iframe是否存在 ，使用window.frameElement 跨域使用无效
            if(window.parent === window){
                setTimeout(checkDoScroll,1);
            }
            
            function checkDoScroll() {
                try{
                    document.documentElement.doScroll('left');
                    if(beReady){
                        return ;
                    }
                    beReady = true;
                    readyFn && readyFn();
                }catch (e){
                    setTimeout(checkDoScroll,1);
                }
            }


        }
    }