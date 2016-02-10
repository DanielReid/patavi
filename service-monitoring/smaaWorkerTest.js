var assert = require('assert');
var testUrl = process.env.PATAVI_TEST_URL;

module.exports = {
  "Smaa v2 worker test": function(browser) {

    var method = 'smaa_v2';
    var input = '{"title":"Fava et al, 2002 BR","description":"Based on Fava et al. (2002), \\\"Acute Efficacy of Fluoxetine Versus Sertraline and Paroxetine in Major Depressive Disorder Including Effects of Baseline Insomnia\\\".","criteria":{"ham-d-responders":{"title":"HAM-D Responders","scale":[0,1],"unitOfMeasurement":"Proportion","description":"Responders on the HAM-D rating scale","pvf":{"direction":"increasing","type":"linear","range":[0.5171553859214775,0.8078871960422865]},"$$hashKey":"object:29"},"diarrhea":{"title":"Diarrhea","scale":[0,1],"unitOfMeasurement":"Proportion","pvf":{"direction":"decreasing","type":"linear","range":[0.09732465134247342,0.356531640423518]},"$$hashKey":"object:30"},"dizziness":{"title":"Dizziness","scale":[0,1],"unitOfMeasurement":"Proportion","pvf":{"direction":"decreasing","type":"linear","range":[0.03628024982782403,0.2421973035973817]},"$$hashKey":"object:31"},"headache":{"title":"Headache","scale":[0,1],"unitOfMeasurement":"Proportion","pvf":{"direction":"decreasing","type":"linear","range":[0.14792600963531238,0.3785782896606996]},"$$hashKey":"object:32"},"insomnia":{"title":"Insomnia","scale":[0,1],"unitOfMeasurement":"Proportion","pvf":{"direction":"decreasing","type":"linear","range":[0.11893289594950326,0.356531640423518]},"$$hashKey":"object:33"},"nausea":{"title":"Nausea","scale":[0,1],"unitOfMeasurement":"Proportion","pvf":{"direction":"decreasing","type":"linear","range":[0.09317817992947135,0.34541917103483943]},"$$hashKey":"object:34"}},"alternatives":{"fluoxetine-200-600-mgday":{"title":"Fluoxetine 20.0-60.0 mg/day"},"sertraline-500-2000-mgday":{"title":"Sertraline 50.0-200.0 mg/day"},"paroxetine-200-600-mgday":{"title":"Paroxetine 20.0-60.0 mg/day"}},"performanceTable":[{"alternative":"fluoxetine-200-600-mgday","criterion":"ham-d-responders","performance":{"type":"dbeta","parameters":{"alpha":58,"beta":36}}},{"alternative":"sertraline-500-2000-mgday","criterion":"ham-d-responders","performance":{"type":"dbeta","parameters":{"alpha":71,"beta":27}}},{"alternative":"paroxetine-200-600-mgday","criterion":"ham-d-responders","performance":{"type":"dbeta","parameters":{"alpha":65,"beta":33}}},{"alternative":"fluoxetine-200-600-mgday","criterion":"diarrhea","performance":{"type":"dbeta","parameters":{"alpha":18,"beta":76}}},{"alternative":"sertraline-500-2000-mgday","criterion":"diarrhea","performance":{"type":"dbeta","parameters":{"alpha":26,"beta":72}}},{"alternative":"paroxetine-200-600-mgday","criterion":"diarrhea","performance":{"type":"dbeta","parameters":{"alpha":16,"beta":82}}},{"alternative":"fluoxetine-200-600-mgday","criterion":"dizziness","performance":{"type":"dbeta","parameters":{"alpha":9,"beta":85}}},{"alternative":"sertraline-500-2000-mgday","criterion":"dizziness","performance":{"type":"dbeta","parameters":{"alpha":8,"beta":90}}},{"alternative":"paroxetine-200-600-mgday","criterion":"dizziness","performance":{"type":"dbeta","parameters":{"alpha":16,"beta":82}}},{"alternative":"fluoxetine-200-600-mgday","criterion":"headache","performance":{"type":"dbeta","parameters":{"alpha":24,"beta":70}}},{"alternative":"sertraline-500-2000-mgday","criterion":"headache","performance":{"type":"dbeta","parameters":{"alpha":28,"beta":70}}},{"alternative":"paroxetine-200-600-mgday","criterion":"headache","performance":{"type":"dbeta","parameters":{"alpha":22,"beta":76}}},{"alternative":"fluoxetine-200-600-mgday","criterion":"insomnia","performance":{"type":"dbeta","parameters":{"alpha":18,"beta":76}}},{"alternative":"sertraline-500-2000-mgday","criterion":"insomnia","performance":{"type":"dbeta","parameters":{"alpha":26,"beta":72}}},{"alternative":"paroxetine-200-600-mgday","criterion":"insomnia","performance":{"type":"dbeta","parameters":{"alpha":21,"beta":77}}},{"alternative":"fluoxetine-200-600-mgday","criterion":"nausea","performance":{"type":"dbeta","parameters":{"alpha":15,"beta":79}}},{"alternative":"sertraline-500-2000-mgday","criterion":"nausea","performance":{"type":"dbeta","parameters":{"alpha":21,"beta":77}}},{"alternative":"paroxetine-200-600-mgday","criterion":"nausea","performance":{"type":"dbeta","parameters":{"alpha":25,"beta":73}}}],"preferences":{},"method":"scales"}';
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
      .pause(300000) // 5 minutes is current maximum patavi task length
      .assert.containsText("body > div:nth-child(4) > div:nth-child(4) > h2", 'Results')
      .end();
  }
};
