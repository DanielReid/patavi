var assert = require('assert');
var testUrl = process.env.PATAVI_TEST_URL;

module.exports = {
  "Gemtc worker test": function(browser) {

    var method = 'gemtc';
    var input = '{"entries":[{"study":"10","treatment":1,"responders":3,"sampleSize":100},{"study":"1","treatment":1,"responders":9,"sampleSize":140},{"study":"3","treatment":1,"responders":79,"sampleSize":702},{"study":"20","treatment":1,"responders":0,"sampleSize":20},{"study":"4","treatment":1,"responders":18,"sampleSize":671},{"study":"19","treatment":1,"responders":20,"sampleSize":234},{"study":"5","treatment":1,"responders":8,"sampleSize":116},{"study":"18","treatment":1,"responders":5,"sampleSize":62},{"study":"6","treatment":1,"responders":75,"sampleSize":731},{"study":"7","treatment":1,"responders":2,"sampleSize":106},{"study":"8","treatment":1,"responders":58,"sampleSize":549},{"study":"9","treatment":1,"responders":0,"sampleSize":33},{"study":"17","treatment":1,"responders":64,"sampleSize":642},{"study":"11","treatment":1,"responders":1,"sampleSize":31},{"study":"12","treatment":1,"responders":6,"sampleSize":39},{"study":"13","treatment":1,"responders":95,"sampleSize":1107},{"study":"14","treatment":1,"responders":15,"sampleSize":187},{"study":"15","treatment":1,"responders":78,"sampleSize":584},{"study":"16","treatment":1,"responders":69,"sampleSize":1177},{"study":"2","treatment":2,"responders":11,"sampleSize":78},{"study":"5","treatment":2,"responders":19,"sampleSize":146},{"study":"4","treatment":2,"responders":21,"sampleSize":535},{"study":"3","treatment":2,"responders":77,"sampleSize":694},{"study":"22","treatment":2,"responders":7,"sampleSize":66},{"study":"21","treatment":2,"responders":20,"sampleSize":49},{"study":"1","treatment":3,"responders":23,"sampleSize":140},{"study":"7","treatment":3,"responders":9,"sampleSize":205},{"study":"13","treatment":3,"responders":134,"sampleSize":1031},{"study":"24","treatment":3,"responders":9,"sampleSize":55},{"study":"14","treatment":3,"responders":35,"sampleSize":504},{"study":"8","treatment":3,"responders":237,"sampleSize":1561},{"study":"15","treatment":3,"responders":73,"sampleSize":675},{"study":"12","treatment":3,"responders":17,"sampleSize":77},{"study":"16","treatment":3,"responders":54,"sampleSize":888},{"study":"9","treatment":3,"responders":9,"sampleSize":48},{"study":"17","treatment":3,"responders":107,"sampleSize":761},{"study":"2","treatment":3,"responders":12,"sampleSize":85},{"study":"18","treatment":3,"responders":8,"sampleSize":90},{"study":"10","treatment":3,"responders":31,"sampleSize":98},{"study":"19","treatment":3,"responders":34,"sampleSize":237},{"study":"6","treatment":3,"responders":363,"sampleSize":714},{"study":"11","treatment":3,"responders":26,"sampleSize":95},{"study":"23","treatment":3,"responders":12,"sampleSize":76},{"study":"21","treatment":3,"responders":16,"sampleSize":43},{"study":"20","treatment":4,"responders":9,"sampleSize":20},{"study":"22","treatment":4,"responders":32,"sampleSize":127},{"study":"2","treatment":4,"responders":29,"sampleSize":170},{"study":"23","treatment":4,"responders":20,"sampleSize":74},{"study":"1","treatment":4,"responders":10,"sampleSize":138},{"study":"24","treatment":4,"responders":3,"sampleSize":26}],"treatments":[{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"C"},{"id":4,"name":"D"}]}';
    var expectToBeginWith = '{"method": "smaa_v2", "results": { "ham-d-responders": {';

    function stringStartsWith(string, prefix) {
      return string.slice(0, prefix.length) == prefix;
    }

    assert(testUrl, 'test url environment not set');
    browser
      .url(testUrl)
      .waitForElementVisible('body', 5000)
      .clearValue('body > div:nth-child(4) > div.columns.large-4 > input')
      .setValue('body > div:nth-child(4) > div.columns.large-4 > input', method)
      .clearValue('body > div:nth-child(4) > div.columns.large-4 > textarea')
      .setValue('body > div:nth-child(4) > div.columns.large-4 > textarea', input)
      .assert.containsText('body > div:nth-child(4) > div.columns.large-4 > button', 'Submit new task')
      .click('body > div:nth-child(4) > div.columns.large-4 > button')
      .pause(2000)
      .assert.containsText("body > div:nth-child(4) > div:nth-child(3) > h2", 'Status')
      .pause(300000) // 5 minutes is current maximum patavi task length
      .assert.containsText("body > div:nth-child(4) > div:nth-child(4) > h2", 'Results')
      .end();
  }
};
