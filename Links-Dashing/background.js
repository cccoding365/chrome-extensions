// 点击扩展图标打开新标签页
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url?.startsWith("chrome://")) return;
    chrome.tabs.create({
        url: "bookmarks.html"
    });
});

// 从书签树中递归提取所有书签
function extractBookmarks(bookmarkNode, bookmarks) {
    if (bookmarkNode.children) {
        bookmarkNode.children.forEach((childNode) => {
            extractBookmarks(childNode, bookmarks);
        });
    }
    if (bookmarkNode.url && bookmarkNode.title) {
        bookmarks.push(bookmarkNode);
    }
}

// 当content script请求获取书签时，发送所有书签数据
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "getBookmarks") {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            var bookmarks = [];
            extractBookmarks(bookmarkTreeNodes[0], bookmarks);
            sendResponse({ bookmarks: bookmarks });
        });
        return true;
    }
});