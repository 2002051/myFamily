// 封装网络请求

import {
	request
} from "@/utils/request.js"



// 获取相册
export function apiGetAlbum() {
	return request({
		url: "/api/album/",
		method: "GET",
	})
}


// 执行搜索
export function apiSearchAlbum(data = {}) {
	return request({
		url: "/api/search/album/",
		method: "GET",
		data: data
	})
}


// 解锁相册
export function apiUnlockAlbum(data={}){
	return request({
		url: "/api/unlock/album/",
		method: "POST",
		data: data
	})
}


export function apiGetPhoto(data={}){
	return request({
		url: "/api/photo/",
		method: "GET",
		data: data
	})
}