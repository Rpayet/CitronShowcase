
const urls = [
    { name: 'lemonify', url: '/' },
    { name: 'articles', url: '/articles' },
    { name: 'portfolio', url: '/portfolio' },
    { name: 'arcadepalace', url: '/arcadepalace' },
    { name: 'mktrials', url: '/arcadepalace/mktrials' },
    { name: 'wheels', url: '/arcadepalace/wheels' },
    { name: 'sonictactoe', url: '/arcadepalace/sonictactoe' },
];

const getUrl = (name) => {
    const urlObject = urls.find(url => url.name === name);
    return urlObject ? urlObject.url : null;
};

export default getUrl;