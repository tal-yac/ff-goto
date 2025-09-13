'use strict';

const extId = "ff-goto";
let link;

browser.menus.create({
  id: extId,
  title: "Goto",
  contexts: ["selection"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === extId) {
    browser.tabs.create({
      url: link
    });
  }
});

function updateLink(info) {
  link = info.selectionText.trim();
  if (link.length == 0) return false;
  if (link.search("://") == -1) link = "https://" + link;
  return true;
}

function updateMenuItem() {
  browser.menus.update(extId, {
    title: `Goto "${link}"`
  });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  if (updateLink(info)) updateMenuItem();
});
