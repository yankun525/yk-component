import axios from 'axios';

/* 用户登录 */
export function login(data) {
    return axios.get('/json/session-info.json');
}
/* 用户登出 */
export function logout() {
    return axios.get('/json/success.json');
}
/* 获取登录信息 */
export function sessionInfo() {
    return axios.get('/json/session-info.json', { redirect: false });
}
/* 统一登录ticket校验 */
export function ssologin() {
    return axios.post('/json/session-info.json');
}
/* 获取菜单权限 */
export function permission() {
    return axios.get('/json/permissions.json');
}

/* 获取字典项 */
export function getSelect() {
    return axios.get('/json/select.json');
}
/* 获取系统参数 */
export function getParams() {
    return axios.get('/json/params.json');
}

/* getTablePage */
export function getTablePage(data) {
    return axios.get('/json/table.json', { data: data });
}

/* getTree */
export function getTree(data) {
    return axios.get('/json/tree.json', { data: data });
}