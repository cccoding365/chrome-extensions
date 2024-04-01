// 向background script发送请求以获取书签
chrome.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
    console.log(response);
    var bookmarksList = document.createElement("div");
    bookmarksList.className = 'link-list';
    response.bookmarks
        .slice(0, 72)
        .forEach((bookmark) => {
            bookmarksList.appendChild(createLinkItem(bookmark));
        });
    document.body.appendChild(bookmarksList);
});

const createLinkItem = (bookmark) => {
    const container = document.createElement('div');
    container.innerHTML = `
        <a href="${bookmark.url}" class="link-item" target="_blank">
            <div class="link-item_icon" style="background-color:${getColorByDomain(bookmark.url)};" >
                ${bookmark.title.charAt(0)}
            </div>
            <div class="link-item_title">
                ${bookmark.title}
            </div>
        </a>
    `;
    return container;
};

// 根据顶级域名生成不同的配色
const getColorByDomain = (url) => {
    const colorStrategies = {
        com: '#409EFF',  // 亮蓝色
        cn: '#F56C6C',   // 亮红色
        net: '#faad14',  // 亮橙色
        org: '#67C23A',  // 亮绿色
        edu: '#9254de',  // 亮紫色
        gov: '#E6A23C',  // 亮黄色
        io: '#36cfc9',   // 亮青色
        default: '#909399' // 亮灰色
    };

    const domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/i) || [url];
    const topLevelDomain = domain[1].split('.').slice(-1)[0];

    const colorStrategy = colorStrategies[topLevelDomain] || colorStrategies.default;

    return colorStrategy;
};