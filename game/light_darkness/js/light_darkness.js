// sessionStorage
const SESSION_WHITE='LIGHT_DARKNESS_WHITE';//ホワイト目線での進行Noを保持
const SESSION_BLACK='LIGHT_DARKNESS_BLACK';//ブラック目線での進行Noを保持

const MAX_STATUS_WHITE=12;
const MAX_STATUS_BLACK=12;

var intStatus=0; //進行度合い
var isWhite; //true:ホワイト、false:ブラック

window.addEventListener('DOMContentLoaded', function() {//htmlファイルの読み込みが完了したタイミング
    if(document.getElementById('wb_type').value=='white') { //white
        isWhite=true;
        intStatus=Number(window.sessionStorage.getItem([SESSION_WHITE]));
    }
    else{ //black
        isWhite=false;
        intStatus=Number(window.sessionStorage.getItem([SESSION_BLACK]));
    }
    for(let i = 0; i <= intStatus; i++){
        if (i == intStatus){
            _build(i);
        }
        else{
            _build(i,function(){_disabled(i);});
        }
    } 
    if(intStatus >= 10){
        $("#include_branch_reset").load("include/branch_reset.html");
        document.getElementById("include_branch_reset").style.display = 'block';
    }
})

function reset(){
    if(window.confirm('すべての回答がクリアされますがよろしいですか？\n（最初から解きたい場合や動作がおかしい場合のみ実行してください）')){
        if(isWhite) window.sessionStorage[SESSION_WHITE] = '0';
        else window.sessionStorage[SESSION_BLACK] = '0';
        intStatus=0;
        window.location.reload();
    } else {
        // 何もしない
    }
}


function branch_reset(){
    if(window.confirm('エンディング分岐地点に戻りますがよろしいですか？')){
        if(isWhite) window.sessionStorage[SESSION_WHITE] = '9';
        else window.sessionStorage[SESSION_BLACK] = '9';
        intStatus=9;
        window.location.reload();
    } else {
        // 何もしない
    }
}

function _build(_intStatus, _callback = function(){}) {
    if(isWhite){ //white
        $("#include_w"+_intStatus).load("include/w"+_intStatus+".html",_callback);
        document.getElementById("include_w"+_intStatus).style.display = 'block';
    }
    else{ //black
        $("#include_b"+_intStatus).load("include/b"+_intStatus+".html",_callback);
        document.getElementById("include_b"+_intStatus).style.display = 'block';
    }
}

function _disabled(_intStatus){
    if (document.getElementById("send" + (_intStatus)) != null){
        document.getElementById("send" + (_intStatus)).disabled = true;
    }
    if (document.getElementById("answer" + (_intStatus)) != null){
        document.getElementById("answer" + (_intStatus)).disabled = true;
    }
}

function _setStatus(_intStatus){
    if(isWhite) window.sessionStorage[SESSION_WHITE] = _intStatus;
    else window.sessionStorage[SESSION_BLACK] = _intStatus;
    intStatus=_intStatus;
    _build(_intStatus);
    _disabled(_intStatus - 1);
}

function send(_intN){
    var ans=document.getElementById("answer"+_intN);
    var a = (ans!=null) ? toHalfWidth(ans.value) : null;
    var isCorrect;
    if(isWhite){ //white
        switch(_intN){
            case 0: isCorrect = true; break;
            case 1: isCorrect = true; break;
            case 2: isCorrect = (a==3577); break; 
            case 3: isCorrect = (a=="2C" || a=="C2" || a=="2c" || a=="c2"); break; 
            case 4: isCorrect = true; break;
            case 5: isCorrect = (a=="9201B"); break; 
            case 6: isCorrect = (a==19); break; 
            case 7: isCorrect = (a=="4C" || a=="C4" || a=="4c" || a=="c4"); break; 
            case 8: isCorrect = true; break;
            case 10: isCorrect = (a=="通信技術"); break; 
            case 11: isCorrect = (a=="浄化魔法"); break; 
        }
    }
    else{ //black
        switch(_intN){
            case 0: isCorrect = true; break;
            case 1: isCorrect = true; break;
            case 2: isCorrect = (a==3577); break; 
            case 3: isCorrect = (a=="2C" || a=="C2" || a=="2c" || a=="c2"); break; 
            case 4: isCorrect = true; break;
            case 5: isCorrect = (a=="しんでん" || a=="神殿"); break; 
            case 6: isCorrect = (a=="holy"); break; 
            case 7: isCorrect = (a=="4C" || a=="C4" || a=="4c" || a=="c4"); break; 
            case 8: isCorrect = true; break;
            case 10: isCorrect = (a=="回復魔法"); break; 
            case 11: isCorrect = (a=="土木技術"); break; 
        }
    }

    if(isCorrect){
        _setStatus(_intN + 1);
        document.getElementById("ans_message"+_intN).innerHTML="";
    }
    else{
        if(ans==""){
            document.getElementById("ans_message"+_intN).innerHTML="入力してください";
        }
        else{
            document.getElementById("ans_message"+_intN).innerHTML="「"+a+"」は間違っているようだ";
        }
    }
}

function send9(){
    var ans=document.getElementById("answer9").elements['mark'];
    var a = (ans!=null) ? ans.value : null; 
    if(isWhite){ //white
        switch(a){
            case "1": window.location.href = 'end_bad1.html'; break;
            case "2": window.location.href = 'end_nomalw.html'; break;
            case "3": window.location.href = 'end_bad1.html'; break;
            case "4": window.location.href = 'end_bad1.html'; break;
            case "5": window.location.href = 'end_bad2w.html'; break;
            case "6": window.location.href = 'end_bad1.html'; break;
            case "7": window.location.href = 'end_bad1.html'; break;
            case "8": 
                _setStatus(10); 
                $("#include_branch_reset").load("include/branch_reset.html");
                document.getElementById("include_branch_reset").style.display = 'block';
                break;
            case "9": window.location.href = 'end_bad1.html'; break;
            default: document.getElementById("ans_message9").innerHTML="選択してください";break;
        }
    }
    else{ //black
        switch(a){
            case "1": window.location.href = 'end_bad1.html'; break;
            case "2": window.location.href = 'end_bad2b.html'; break;
            case "3": window.location.href = 'end_bad1.html'; break;
            case "4": window.location.href = 'end_bad1.html'; break;
            case "5": window.location.href = 'end_nomalb.html'; break;
            case "6": window.location.href = 'end_bad1.html'; break;
            case "7": window.location.href = 'end_bad1.html'; break;
            case "8": 
                _setStatus(10); 
                $("#include_branch_reset").load("include/branch_reset.html");
                document.getElementById("include_branch_reset").style.display = 'block';
                break;
            case "9": window.location.href = 'end_bad1.html'; break;
            default: document.getElementById("ans_message9").innerHTML="選択してください";break;
        }
    }
    
}

function send12(){
    var ans=document.getElementById("answer12");
    var a = (ans!=null) ? toHalfWidth(ans.value) : null;
    var isCorrect;
    isCorrect = (a==637);
    if(isCorrect){
        if(isWhite){ //white
            include_branch_reset
            window.location.href = 'end_truew.html';
        }
        else{ //black
            window.location.href = 'end_trueb.html';
        }
        _setStatus(_intN + 1);
        document.getElementById("ans_message12").innerHTML="";
    }
    else{
        if(ans==""){
            document.getElementById("ans_message12").innerHTML="入力してください";
        }
        else{
            document.getElementById("ans_message12").innerHTML="「"+a+"」は間違っているようだ";
        }
    }
}

function toHalfWidth(str) {
  // 全角英数字を半角に変換
  str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  return str;
}

