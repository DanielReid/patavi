var testUrl = process.env.PATAVI_TEST_URL;
module.exports = {
	"Is Patavi demo page up ? test": function(browser) {

		var expectedText = "Congratulations! It looks like you have configured the server correctly. You can now start any number of workers and access their tasks by using WAMP.";

		browser
			.url(testUrl)
			.waitForElementVisible('body', 5000)
			.assert.containsText("body > div:nth-child(2) > div > p", expectedText)
			.end();
	}
};
