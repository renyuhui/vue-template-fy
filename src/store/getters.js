const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    BIBG: state => state.settings.BIBG,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    date_value: state => state.date.date,
    area: state => state.date.area,
    detail: state => state.settings.detail,
    titles: state => state.settings.titles,
    menuList: state => state.settings.menuList,
    noMenuList: state => state.settings.noMenuList,
    newsList: state => state.news.newsList,
    province: state => state.province,

}
export default getters
