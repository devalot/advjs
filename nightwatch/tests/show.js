module.exports = {
  "Can click on an artist and see details": function(browser) {
    var artistLink = "li:first-child a[data-artist-id]";
    browser
      .url(browser.launchUrl)
      .waitForElementVisible(artistLink, 1000)
      .click(artistLink)
      .waitForElementVisible("#artist-details", 1000)
      .assert.containsText("#view", "Website:")
      .end();
  },
};
