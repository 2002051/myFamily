<template>
	<view class="layout">
		<!-- 公告区域 -->
		<view class="notice">
			<view class="left">
				<!-- <uni-icons type="sound-filled" size="20" color="#28B389"></uni-icons> -->
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in newList">
						<navigator url="">{{item}}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>

		<!-- 搜索区域  -->
		<view class="search">

			<uni-easyinput v-model="kw" placeholder="请输入相册关键字"></uni-easyinput>
			<button type="primary" @click="doSearch">搜索</button>
		</view>

		<!-- 相册区域-->
		<view class="content">

			<album v-for="item in albumList" :item="item" :key="item.id"></album>




			<!-- 	<view class="box">
				<swiper>
					<swiper-item>
						<view class="swiper-item"></view>
					</swiper-item>
				</swiper>

			</view> -->



		</view>




	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		apiGetAlbum,
		apiSearchAlbum
	} from "@/api/api.js"
	import {
		MediaUrl
	} from "@/conf/config.js"
	const newList = ref(["aaaaa", "bbbbbbbb", "cccccccc"])
	const albumList = ref([])
	const kw = ref("")

	onLoad(function() {
		apiGetAlbum().then(function(res) {
			console.log(res)
			albumList.value = res.data.results.map((x)=>{
				return {
					...x,
					cover: MediaUrl + x.cover
				}
				
			})
		
			
			
		}).catch(function(err) {
			console.log("err", err)
		})

	})

	async function GetAlbum() {
		let res = await apiGetAlbum()
		return res
	}

	async function SearchAlbum() {
		let res = await apiSearchAlbum({
			kw: kw.value
		})
		return res
	}

	function doSearch() {
		SearchAlbum().then(function(res) {
			console.log("res", res)
			albumList.value = res.data.map((x) => {
				return {
					...x,
					cover: MediaUrl + x.cover
				}
			})
			console.log("albumList.value",albumList.value)
		}).catch(err => {
			console.log(err)
		})
	}
</script>

<style lang="scss" scoped>
	.layout {
		.notice {
			width: 690rpx;
			height: 80rpx;
			background-color: #ebebeb;
			margin: 0 auto;
			display: flex;
			border-radius: 80rpx;
			line-height: 80rpx;

			.left {
				width: 140rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				:deep() {
					.uni-icons {
						color: #000000 !important;
					}
				}


				.text {
					color: #000000;
					font-weight: 600;
					font-size: 28rpx;
				}
			}

			.right {
				width: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.center {
				flex: 1;

				swiper {
					height: 100%; // 高度继承父级

					swiper-item {
						height: 100%;
						font-size: 30rpx;
						//  超出一定长度的内容,用...表示
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

			}
		}

		.search {
			display: flex;
			width: 670rpx;
			height: 80rpx;
			margin: 20rpx auto;

			button {
				margin-left: 5rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.content {
			// display: grid;
			// grid-template-columns: repeat(3, 1fr); /* 每行展示三个盒子 */
			// gap: 10rpx; /* 盒子之间的间距 */
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>