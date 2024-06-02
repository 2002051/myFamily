import {
	StaticUrl
} from "@/conf/config.js"

export function request(config = {}) {
	let {
		url, //    /xxx/xxx/  的形式
		method = "GET",
		data = {},
		header = {}
	} = config
	let src = StaticUrl + url
	return new Promise((resolve, reject) => {


		uni.request({
			url: src,
			method: method,
			header: header,
			data: data,
			success: (res) => {
				if (res.data.code === 0) {
					resolve(res.data)
				} else {
					// uni.showModal({
					// 	title: "警告",
					// 	content: "请求出错",
					// })
					reject(res.data);
				}
			},


		})

	})


}