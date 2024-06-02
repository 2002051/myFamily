<template>
	<view class="layout">
		<view class="box" v-for="item in dataList" :key="item.id">
			<!-- 	<view class="pic" v-for="item in 20"></view> -->
			<image :src="item.url" mode="aspectFill" @click="gotoDetail"></image>

		</view>

	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	import {
		apiGetPhoto
	} from "@/api/api.js"

	const dataList = ref([])
	onLoad(function(e) {
		let {
			id
		} = e
		getPhoto({
			album: id,
			offset:dataList.value.length
		})
		console.log("dataList.value",dataList.value)
		console.log("onload")

	})

	async function getPhoto(data = {}) {
		return await apiGetPhoto(data).then(res => {
			console.log("res.data.results", res.data.results);
			if (res.code === 0) {
				dataList.value = [...dataList.value, ...res.data.results]
			}
		}).catch(err => {
			console.log("err", err);
		})
	}


	function gotoDetail() {
		uni.navigateTo({
			url: "/pages/photodetail/photodetail"
		})
	}
	// const GetPhoto = async function() {
	// 	await
	// }
</script>

<style lang="scss">
	.layout {
		display: flex;
		flex-wrap: wrap;

		.box {

			width: 235rpx;
			height: 350rpx;
			margin-left: 12rpx;
			margin-top: 60rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>