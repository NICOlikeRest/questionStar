/**
 * @description 储存、获取user-token
 */

const KEY = 'USER_TOKEN';

// 设置token
export function setToken(token: string) {
	localStorage.setItem(KEY, token);
}

// 获取token
export function getToKen() {
	return localStorage.getItem(KEY) || '';
}

// 删除token
export function removeToken() {
	localStorage.removeItem(KEY);
}
