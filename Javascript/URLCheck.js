/****************************
* Find Broken Urls In Your Account
* Version 1.2
* ChangeLog v1.2
*  - Added 301&302 sites through followRedirects
*  - Added support for EXPANDED_TEXT_AD
* Created By: Russ Savage
* Modified By: Kristoffer Semelenge
* FreeAdWordsScripts.com
****************************/
function main() {
  // You can add more if you want: http://goo.gl/VhIX
  var BAD_CODES = [300,301,302,303,304,305,306,307,308,400,401,402,403,404,405,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,426,428,429,431,444,449,450,451,494,495,496,500];
  var TO = ['kristoffer.semelenge@iprospect.com'];
  var SUBJECT = 'Visma Services - Broken Url Report - ' + _getDateString();
  var HTTP_OPTIONS = {
    muteHttpExceptions:true,
    followRedirects:false
  };

  //Let's look at ads and keywords for urls
  var iters = [
    //For Ad Level Urls
    AdWordsApp.ads()
      .withCondition("Status = 'ENABLED'")
      .withCondition("AdGroupStatus = 'ENABLED'")
      .withCondition("CampaignStatus = 'ENABLED'")
      .withCondition("Type = 'EXPANDED_TEXT_AD'")
      .get(),
    AdWordsApp.ads()
      .withCondition("Status = 'ENABLED'")
      .withCondition("AdGroupStatus = 'ENABLED'")
      .withCondition("CampaignStatus = 'ENABLED'")
      .withCondition("Type = 'TEXT_AD'")
      .get(),
    //For Keyword Level Urls
    AdWordsApp.keywords()
      .withCondition("Status = 'ENABLED'")
      .withCondition("DestinationUrl != ''")
      .withCondition("AdGroupStatus = 'ENABLED'")
      .withCondition("CampaignStatus = 'ENABLED'")
      .get()
    ];

  var already_checked = {};
  var bad_entities = [];
  for(var x in iters) {
    var iter = iters[x];
    while(iter.hasNext()) {
      var entity = iter.next();
      if(entity.urls().getFinalUrl() == null) { continue; }
      var url = entity.urls().getFinalUrl();
      if(url.indexOf('{') >= 0) {
        //Let's remove the value track parameters
        url = url.replace(/\{[0-9a-zA-Z]+\}/g,'');
      }
      if(already_checked[url]) { continue; }
      var response_code;
      try {
        Logger.log("Testing url: "+url);
        response_code = UrlFetchApp.fetch(url, HTTP_OPTIONS).getResponseCode();
      } catch(e) {
        //Something is wrong here, we should know about it.
        bad_entities.push({e : entity, code : -1});
      }
      if(BAD_CODES.indexOf(response_code) >= 0) {
        //This entity has an issue.  Save it for later.
        bad_entities.push({e : entity, code : response_code});
      }
      already_checked[url] = true;
    }
  }
  var column_names = ['Type','CampaignName','AdGroupName','Id','Headline/Headline1','ResponseCode','Final URL'];
  var attachment = column_names.join(",")+"\n";
  for(var i in bad_entities) {
    attachment += _formatResults(bad_entities[i],",");
  }
  if(bad_entities.length > 0) {
    var options = { attachments: [Utilities.newBlob(attachment, 'text/csv', 'bad_urls_'+_getDateString()+'.csv')] };
    var email_body = "There are " + bad_entities.length + " urls that are broken. See attachment for details.";

    for(var i in TO) {
      MailApp.sendEmail(TO[i], SUBJECT, email_body, options);
    }
  }
}

//Formats a row of results separated by SEP
function _formatResults(entity,SEP) {
  var e = entity.e;
  if(typeof(e['getHeadline']) != "undefined") {
    //this is an ad entity
      if(e.getType() == "TEXT_AD") {
        return ["Ad",
            e.getCampaign().getName(),
            e.getAdGroup().getName(),
            e.getId(),
            e.getHeadline(),
            entity.code,
            e.urls().getFinalUrl()
           ].join(SEP)+"\n";
      } else if(e.getType() == "EXPANDED_TEXT_AD") {
          // and expanded text ad
          return ["Expanded Text Ad",
            e.getCampaign().getName(),
            e.getAdGroup().getName(),
            e.getId(),
            e.getHeadlinePart1(),
            entity.code,
            e.urls().getFinalUrl()
           ].join(SEP)+"\n";
  }} else {
     return ["Keyword",
             e.getCampaign().getName(),
             e.getAdGroup().getName(),
             e.getId(),
             e.getText(),
             entity.code,
             e.urls().getFinalUrl()
          ].join(SEP)+"\n";
        }
    }
//Helper function to format todays date
function _getDateString() {
  return Utilities.formatDate((new Date()), AdWordsApp.currentAccount().getTimeZone(), "yyyy-MM-dd");
}
