function ready(readyFn) {
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded',function (e) {
                readyFn && readyFn();
            },false);
        }else{
            var beReady = false;

            /*���ݷ���1*/
            document.attachEvent('onreadystatechange',function () {
                if(beReady){
                    return ;
                }
                if(document.readyState =='interactive' || document.readyState == 'complete'){
                    beReady = true;
                    readyFn && readyFn();
                }
            })

            /*���ݷ���2*/
            //�ж�iframe�Ƿ���� ��ʹ��window.frameElement ����ʹ����Ч
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