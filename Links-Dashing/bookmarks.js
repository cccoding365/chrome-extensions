// 向background script发送请求以获取书签
chrome.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
    var bookmarksList = document.createElement("ul");
    response.bookmarks
        .slice(0, 72)
        .forEach((bookmark) => {
            var listItem = document.createElement("li");
            var link = document.createElement("a");
            link.target = '_blank';
            link.href = bookmark.url;
            link.textContent = bookmark.title;
            listItem.appendChild(link);
            bookmarksList.appendChild(listItem);
        });
    document.body.appendChild(bookmarksList);
});