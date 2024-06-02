<template>
	<view class="box" @click="doJump(item.id)">
		<view class="pic">
			<image :src="item.cover" mode="aspectFill" lazy-load></image>
		</view>
		<view class="text">
			{{item.title}}
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		StaticUrl
	} from "@/conf/config.js"

	import {
		apiUnlockAlbum
	} from "@/api/api.js"

	defineProps({
		item: {
			type: Object,
			default () {
				return {
					name: '相册条目',
					id: 1

				}
			},

		}

	})
	

	async function ValidatePwd(id, password) {
		// 相册id 和 密码
		let res = await apiUnlockAlbum({album_id:id,password:password})
		return res
	}



	function doJump(id) {

		uni.showModal({
			title: "提示",
			content: null,
			placeholderText: "请输入相册密码",
			editable: true,
			success: function(res) {
				if(!!res.confirm){
					ValidatePwd(id,res.content).then(res=>{
						// 校验成功
						uni.showToast({
							title:"密码校验成功",//err.detail
							icon:"none",
							duration:2000
						})
						uni.navigateTo({
							url: "/pages/albumlist/albumlist?id=" + id
						})
						console.log("结果",res)
					}).catch(err=>{
						// 校验失败
						uni.showToast({
							title:err.detail,//err.detail
							icon:"none",
						})
						console.log("err1",err)
					})
					
				}else{
					console.log("用户取消了")
				}
				
				// console.log("res",res) //{confirm: true, cancel: false, content: '123', errMsg: 'showModal:ok'}
				// console.log(StaticUrl)
				//  发送网络请求，通过密码校验才能成功跳转相册列表页，同时，如果已经输入密码，将会在缓存保存1小时，此后不需要重新输入
			
				
				// uni.navigateTo({
				// 	url: "/pages/albumlist/albumlist?id=" + id
				// })
			},
			fail: (err) => {
				console.log("err", err)
			}
		})
	}
</script>

<style lang="scss" scoped>
	//  每一个盒子左右间隔为10rpx
	.box {
		background-color: yellow;
		height: 380rpx;
		width: 235rpx;
		margin-left: 10rpx;
		margin-top: 15rpx;
		border-radius: 20rpx;

		.pic {
			border-radius: 20rpx 20rpx 0 0;
			// background-color: red;
			height: 330rpx;
			width: 100%;

			image {
				border-radius: 20rpx 20rpx 0 0;
				height: 100%;
				width: 100%;
			}
		}

		.text {
			border-radius: 0 0 20rpx 20rpx;
			height: 50rpx;
			width: 100%;
			background-color: wheat;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>