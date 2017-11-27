// Copyright 2015, Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @name Bid To Position
 *
 * @overview The Bid To Position script adjusts your bids and allows you to
 *     steer ads in an advertiser account into a desired position in the search
 *     results. See
 *     https://developers.google.com/adwords/scripts/docs/solutions/bid-to-position
 *     for more details.
 *
 * @author AdWords Scripts Team [adwords-scripts@googlegroups.com]
 *
 * @version 1.0
 *
 * @changelog
 * - version 1.0
 *   - Released initial version.
 */

// Ad position you are trying to achieve.
var TARGET_AVERAGE_POSITION = 3;

// Once the keywords fall within TOLERANCE of TARGET_AVERAGE_POSITION,
// their bids will no longer be adjusted.
var TOLERANCE = 0.1;

// How much to adjust the bids.
var BID_ADJUSTMENT_COEFFICIENT = 1.05;

function main() {
  raiseKeywordBids();
  lowerKeywordBids();
}

function raiseKeywordBids() {
  // Condition to raise bid: Average position is greater (worse) than
  // target + tolerance
  var keywordsToRaise = AdWordsApp.keywords()
    .withCondition('Status = ENABLED')
    .withCondition('AveragePosition > ' + (TARGET_AVERAGE_POSITION + TOLERANCE))
    .orderBy('AveragePosition ASC')
    .forDateRange('LAST_7_DAYS')
    .get();

  while (keywordsToRaise.hasNext()) {
    var keyword = keywordsToRaise.next();
    keyword.setMaxCpc(keyword.getMaxCpc() * BID_ADJUSTMENT_COEFFICIENT);
  }
}

function lowerKeywordBids() {
  // Conditions to lower bid: Ctr greater than 1% AND
  // average position better (less) than target - tolerance
  var keywordsToLower = AdWordsApp.keywords()
    .withCondition('Ctr > 0.01')
    .withCondition('AveragePosition < ' + (TARGET_AVERAGE_POSITION - TOLERANCE))
    .withCondition('Status = ENABLED')
    .orderBy('AveragePosition DESC')
    .forDateRange('LAST_7_DAYS')
    .get();


  while (keywordsToLower.hasNext()) {
    var keyword = keywordsToLower.next();
    keyword.setMaxCpc(keyword.getMaxCpc() / BID_ADJUSTMENT_COEFFICIENT);
  }
}
