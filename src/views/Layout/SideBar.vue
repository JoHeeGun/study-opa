<script setup>
import { useUserStore, useClinicalStore } from '@/store/index';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const clinicalStore = useClinicalStore();
const router = useRouter();

const logOut = () => {
	userStore.setLogOut();
	clinicalStore.clearClinicalCount();
	router.push('/login');
}

</script>


<template>
	<div class="fixed w-[200px] h-full bg-gray-100">
		<div class="w-[200px] pt-24 flex flex-col p-4 bg-gray-100 border-r border-gray-200 border-solid">
			<div class="text-black text-xl font-bold leading-[29px]">
				{{ userStore.user.userNm }}
			</div>
			
			<div class="py-4">
				<div class="w-[156px] h-[0px] border border-gray-200"></div>
			</div>

			<div class="text-sm">
				등록 환자 수<br>
				<span class="font-bold text-vimeal-blue-500">{{ clinicalStore.getClinicalCount }}</span>명
			</div>

			<div class="py-6">
				<div class="w-[156px] h-[0px] border border-gray-200"></div>
			</div>

			<div 
				@click="logOut()"
				class="flex items-center gap-2 cursor-pointer"
			>
				<img 
					src="@/assets/Icons/logout_icon.png"
					class="w-5 h-5"
				>
				<div class="text-sm font-medium text-black">로그아웃</div>
			</div>
		</div>


		<div class="pt-[120px] text-center relative flex items-center justify-center">
			<img 
				src="@/assets/images/opa_side_bar_img.png"
				class="w-full h-full"
				alt="Side Bar Image"
			>
		</div>
	</div>
</template>