<template>
	<view :style="{height:system.statusBarHeight + 'px'}">
		<!-- 撑起手机顶部状态栏高度 -->
	</view>
	<view class="layout">

		<view class="back">
			<uni-icons type="back" size="20"></uni-icons>
		</view>

		<view class="count">
			1/20
		</view>


		<view class="tool">
			<uni-icons type="download-filled" size="30"></uni-icons>

		</view>

		<view class="photo">
			<swiper circular>
				<swiper-item v-for="item in 10">
					<image src="/static/test/test4.jpeg" mode="aspectFit"></image>
				</swiper-item>
			</swiper>

		</view>
	</view>



</template>

<script setup>
	import {
		ref
	} from 'vue';
	const system = ref(uni.getSystemInfoSync()) //  system.value.statusBarHeight
	console.log(system.value)
</script>

<style lang="scss">
	.layout {
		width: 750rpx;
		height: 100vh;
		position: relative;

		.photo {
			width: 100%;
			height: 100%;

			swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.back {
			position: absolute;
			background-color: red;
			top: 30rpx;
			left: 30rpx;
		}

		.count {
			position: absolute;
			background-color: red;
			top: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.tool {
			position: absolute;
			background-color: red;
			bottom: 230rpx;
			left: 50%;
			transform: translateX(-50%);


		}
	}
</style>