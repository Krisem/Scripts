/********************************************************************************
* This script will run through all your AdWords accounts and look for Ads that
* have been disapproved
*
* @author Russell Savage <russellsavage@gmail.com>
* @version 1.0
* FreeAdWordsScripts.com
*
* THIS SOFTWARE IS PROVIDED BY Russell Savage ''AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL Russell Savage BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
********************************************************************************/
var SCRIPT_NAME = 'Disapproved Ads Checker';
var NOTIFY = ['your_email@example.com'];
var ACCOUNTS_FILE_NAME = 'AdWords-Scripts-DisapprovedAds-AccountList.json';
var SPREADSHEET_PREFIX = 'AdWords-DisapprovedAds-';

function main() {
  var accountsList = readJSONFile(ACCOUNTS_FILE_NAME);
  if(!accountsList) { accountsList = []; }
  if(accountsList.length === 0) {
    //new run so let's build our list of accounts
    var acctIter = MccApp.accounts().get();
    while(acctIter.hasNext()) {
      var acct = acctIter.next();
      accountsList.push({ id : acct.getCustomerId(),
                          lastChecked : null });
    }
  }
  accountsList.sort(function(a,b) {
    if(a.lastChecked < b.lastChecked) {
      return -1;
    } else if(a.lastChecked > b.lastChecked) {
      return 1;
    } else {
      return 0;
    }
  });
  writeJSONFile(ACCOUNTS_FILE_NAME,accountsList);
  var toCheck = [];
  for(var i in accountsList) {
    toCheck.push(accountsList[i].id);
    if(toCheck.length==50) {
      break;
    }
  }
  Logger.log('Checking the following accounts: '+JSON.stringify(toCheck));
  MccApp.accounts().withIds(toCheck).executeInParallel('checkAdDisapprovalReasons', 'reportResults');
}

function checkAdDisapprovalReasons() {
  Logger.log('Processing account: '+AdWordsApp.currentAccount().getName());
  var adIter = AdWordsApp.ads().withCondition('CampaignStatus = ENABLED')
    .withCondition('AdGroupStatus = ENABLED')
    .withCondition('Status = ENABLED')
    .withCondition('ApprovalStatus = DISAPPROVED')
    .get();
  var results = [];
  while(adIter.hasNext()) {
    var ad = adIter.next();
    results.push({
      camp:ad.getCampaign().getName(),
      ag:ad.getAdGroup().getName(),
      headline:ad.getHeadline(),
      desc1:ad.getDescription1(),
      desc2:ad.getDescription2(),
      displayUrl:ad.getDisplayUrl(),
      destUrl:(ad.getDestinationUrl())?ad.getDestinationUrl():'',
      disapprovalReasons:ad.getDisapprovalReasons().join('. ')
    });
  }
  return JSON.stringify({
    accountId : AdWordsApp.currentAccount().getCustomerId(),
    accountName : AdWordsApp.currentAccount().getName(),
    disapprovedAdsCount : results.length,
    disapprovedAds : results
  });
}

function reportResults(responses) {
  var accountsList;
  var indexMap = {};
  accountsList = readJSONFile(ACCOUNTS_FILE_NAME);
  for(var i = 0; i < accountsList.length; i++) {
    indexMap[accountsList[i].id] = i;
  }

  var summaryEmailData = [];
  var dateTimeStr = Utilities.formatDate(new Date(), AdWordsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd HH:m:s');
  var spreadsheetName = SPREADSHEET_PREFIX+' - '+dateTimeStr;
  for(var i in responses) {
    if(!responses[i].getReturnValue()) { continue; }
    var res = JSON.parse(responses[i].getReturnValue());
    var sheetUrl = writeResultsToSpreadsheet(res,spreadsheetName);
    summaryEmailData.push({accountId:res.accountId,
                           accountName:res.accountName,
                           disapprovedAdsCount:res.disapprovedAdsCount,
                           sheetUrl:sheetUrl});
    accountsList[indexMap[res.accountId]].lastChecked = dateTimeStr;
  }
  if(summaryEmailData.length > 0) {
    sendSummaryEmail(summaryEmailData);
  }
  writeJSONFile(ACCOUNTS_FILE_NAME,accountsList);
}

//This function builds the summary email and sends it to the people in
//the NOTIFY list
function sendSummaryEmail(summaryEmailData) {
  var subject = SCRIPT_NAME+' Summary Results';
  var body = subject;
  var htmlBody = '<html><body>'+subject;
  htmlBody += '<br/ ><br/ >';
  htmlBody += '<table border="1" width="95%" style="border-collapse:collapse;">';
  htmlBody += '<tr>';
  htmlBody += '<td align="left"><b>Acct Id</b></td>';
  htmlBody += '<td align="left"><b>Acct Name</b></td>';
  htmlBody += '<td align="center"><b>Disapproved Ads Found</b></td>';
  htmlBody += '<td align="center"><b>Full Report</b></td>';
  htmlBody += '</tr>';
  for(var i in summaryEmailData) {
    var row = summaryEmailData[i];
    htmlBody += '<tr><td align="left">'+ row.accountId +
               '</td><td align="left">' + row.accountName +
               '</td><td align="center">' + row.disapprovedAdsCount +
               '</td><td align="left"><a href="'+row.sheetUrl+'">' + 'Show Details' +
           '</a></td></tr>';
  }
  htmlBody += '</table>';
  htmlBody += '<br/ >';
  htmlBody += Utilities.formatDate(new Date(),AdWordsApp.currentAccount().getTimeZone(),'MMMM dd, yyyy @ hh:mma z');
  htmlBody += '.  Completed. '+Object.keys(summaryEmailData).length+' Accounts checked.<br/ >';
  htmlBody += 'Powered by <a href="http://www.freeadwordsscripts.com">FreeAdWordsScripts.com</a>.';
  htmlBody += '</body></html>';
  var options = { htmlBody : htmlBody };
  for(var i in NOTIFY) {
    MailApp.sendEmail(NOTIFY[i], subject, body, options);
  }
}

function writeResultsToSpreadsheet(res,name) {
  var file = getFile(name,true);
  var spreadsheet;
  var maxRetries = 3;
  while(maxRetries > 0) {
    try {
      spreadsheet = SpreadsheetApp.openById(file.getId());
      break;
    } catch(e) {
      maxRetries--;
      Utilities.sleep(1000);
    }
  }
  if(!spreadsheet) { throw 'Could not open file: '+name; }
  if(spreadsheet.getSheetByName('Sheet1')) {
    spreadsheet.getSheetByName('Sheet1').setName(res.accountId);
  }
  var sheet = spreadsheet.getSheetByName(res.accountId);
  if(!sheet) {
    sheet = spreadsheet.insertSheet(res.accountId, spreadsheet.getSheets().length);
  }
  var toWrite = [['Disapproval Reasons','Campaign','AdGroup','Headline','Description 1','Description 2','Display Url','Destination Url']];
  for(var i in res.disapprovedAds) {
    var row = res.disapprovedAds[i];
    toWrite.push([row.disapprovalReasons,
                  row.camp,
                  row.ag,
                  row.headline,
                  row.desc1,
                  row.desc2,
                  row.displayUrl,
                  row.destUrl]);
  }
  var lastRow = sheet.getLastRow();
  var numRows = sheet.getMaxRows();
  if((numRows-lastRow) < toWrite.length) {
    sheet.insertRowsAfter(lastRow,toWrite.length-numRows+lastRow);
  }
  var range = sheet.getRange(lastRow+1,1,toWrite.length,toWrite[0].length);
  range.setValues(toWrite);
  if((sheet.getMaxColumns() - sheet.getLastColumn()) > 0) {
    sheet.deleteColumns(sheet.getLastColumn()+1, sheet.getMaxColumns() - sheet.getLastColumn());
  }
  file = DriveApp.getFileById(spreadsheet.getId());
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch(e) {
    file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW);
  }
  //This gives you a link directly to the spreadsheet sheet.
  return (spreadsheet.getUrl() + '#gid=' + sheet.getSheetId());
}


//This function quickly writes the url data to a file
//that can be loaded again for the next run
function writeJSONFile(fileName,toWrite) {
  var file = getFile(fileName,false);
  file.setContent(JSON.stringify(toWrite));
}

//And this loads that stored file and converts it to an object
function readJSONFile(fileName) {
  var file = getFile(fileName,false);
  var fileData = file.getBlob().getDataAsString();
  if(fileData) {
    return JSON.parse(fileData);
  } else {
    return null;
  }
}

//This function finds a given file on Google Drive
//If it does not exist, it creates a new file
//if isSpreadsheet is set, it will create a new spreadsheet
//otherwise, it creates a text file.
function getFile(fileName,isSpreadsheet) {
  var maxRetries = 3;
  var errors = [];
  while(maxRetries > 0) {
    try {
      var fileIter = DriveApp.getFilesByName(fileName);
      if(!fileIter.hasNext()) {
        Logger.log('Could not find file: '+fileName+' on Google Drive. Creating new file.');
        if(isSpreadsheet) {
          return SpreadsheetApp.create(fileName);
        } else {
          return DriveApp.createFile(fileName,'');
        }
      } else {
        return fileIter.next();
      }
    } catch(e) {
      errors.push(e);
      maxRetries--;
      Utilities.sleep(1000);
    }
  }
  if(maxRetries === 0) {
    throw errors.join('. ');
  }
}
