function cln_proxy(account_id) {
  try {
    /*conf読み込み*/
    var confData = getConf();
    
    //チャットワークメッセージ部
    var retBody = "";
    
    //sheet指定
    var spreadsheet = SpreadsheetApp.openById(confData.key).getSheetByName('シート1');
    
    //代理対象ユーザー
    var who_reset = spreadsheet.getRange(2, 2).getValues();
    nlog('代理対象ユーザー:' + who_reset);
    
    //代理ユーザー
    var proxy_usr = '';

    //カウントリセット
    cnt_reset2()

    for(var i = 3; i <= 11; i++){
      var who_proxy_id = spreadsheet.getRange(i, 3).getValues();

      if(who_proxy_id == account_id.toString()){
        proxy_usr = spreadsheet.getRange(i, 1).getValues();
        nlog('代理ユーザー:' + proxy_usr);
        spreadsheet.getRange(i, 2).setValue(spreadsheet.getRange(i, 2).getValue() + 1);  //count +1
        break;
      }else {
        continue;
      }
    }
    spreadsheet.getRange(1, 2).setValue('proxy');
    spreadsheet.getRange(2, 2).setValue(who_reset);
    retBody = "[info][title]打掃bot_變更[/title]reset count user : " + who_reset + "\n 代理人 : " + proxy_usr + "[/info]" + "\n※別忘給一個餅乾";
    sendMessage(retBody,confData.room_id);
  } catch(ex) {
    //失敗したらlogに投げる
    var err_msg = "cln_proxy error";
    toErr(err_msg);
    return false;
  }
}