import request from '@/utils/request'

export function login(data) {
    // return {
    //     code: 20000,
    //     data: {token: "admin-token"}
    // }

    // let newData = request({
    //     url: '/vue-admin-template/user/login',
    //     method: 'post',
    //     data
    // });
    //
    // console.log(newData);
    // return newData

    return request({
        url: '/vue-admin-template/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {

    // let newData = {
    //     code: 20000,
    //     data: {
    //     roles: ["admin"],
    //         introduction: "I am a super administrator",
    //         avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    //         name: "Super Admin"
    //     }
    // }

    return request({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: {token}
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}
export function login_BI(data) {
    return request({
        url: '/navigation/slot1',
        method: 'get',
        // data: data
    })
}
export function login_APP(data) {
    return request({
        url: '/login/app',
        method: 'post',
        data: data
    })
}
