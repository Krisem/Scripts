/****************************
* Timed removal of campaign targetedLocations
* Version 0.1
* ChangeLog 0.1
* N/A
* Created By: Kristoffer Semelenge
****************************/

function main() {
  removeTargetedLocationById();
}

function removeTargetedLocationById() {
  var campaignIterator = AdWordsApp.campaigns()
      .withCondition("Status = ENABLED")
      .get();
  while(campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    // Remove targeting for France (location id = 2250). See
    // https://developers.google.com/adwords/api/docs/appendix/geotargeting
    // for details.
    var targetedLocationIterator = AdWordsApp.targeting()
        .targetedLocations()
        .withIds([[campaign.getId(), 20782]]).get();
    if (targetedLocationIterator.hasNext) {
      targetedLocationIterator.next().remove();
    }
  }
}
