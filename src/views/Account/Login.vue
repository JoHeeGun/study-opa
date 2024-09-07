<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/index';
import { useRouter } from 'vue-router';
import useAxios from '@/api/axios';

const userStore = useUserStore();
const router = useRouter();

let LOGIN_BODY = ref({
	userId: '',
	userPw: '',
})

const login = async () => {
	router.push('/');
	
	try {
		const { data } = await useAxios.post('/opa/common/login',LOGIN_BODY.value);
		if(data.success) {
			userStore.setLogin(data.data);
			router.push('/');
		} else {
			alert(data.message);
		}
	} catch(err) {
		console.log(err);
	}
}

onMounted(() => {
	if(Object.keys(userStore.getUserInfo).length !== 0) {
		router.replace('/');
	}
})
</script>

<template>
	<div class="flex items-center justify-center">
		<div class="w-full h-screen">
			<img 
				src="@/assets/images/opa_login_background.png"
				class="object-cover w-full h-full"
			>
		</div>
		<div class="flex flex-col h-screen w-[1000px]">
			<div class="h-full overflow-hidden overflow-y-auto">
				<div class="flex flex-col items-center justify-center w-auto px-2 pt-40 pb-20">
					<div class="w-full text-center">
						<div class="text-[40px] font-extrabold text-vimeal-blue-500 leading-[80px]">
							OPA 유전체 데이터 기반
						</div>
						<div class="text-[40px] font-bold text-black leading-[80px]">
							최적 치료 가이드라인 플랫폼
						</div>
						<div class="text-base font-normal text-gray-600">
							AI 기반 진단 및 치료제 분석 시스템
						</div>
					</div>
					<div class="flex flex-col items-center justify-center w-[500px] gap-6 pt-14">
						<div class="flex flex-col gap-2 text-gray-600">
							<div>
								아이디
							</div>
							<input
								v-model="LOGIN_BODY.userId"
								@keyup.enter="login()"
								type="text"
								class="w-[500px] p-4 rounded-5 bg-[#F0FAFF] font-medium text-base text-black placeholder:text-gray-500"
								placeholder="아이디를 입력해 주세요"
								
							/>
						</div>

						<div class="flex flex-col w-full gap-2 text-gray-600">
							<div>
								비밀번호
							</div>
							<input
								v-model="LOGIN_BODY.userPw"
								@keyup.enter="login()"
								type="password"
								class="w-[500px] p-4 rounded-5 bg-[#F0FAFF] font-medium text-base text-black placeholder:text-gray-500"
								placeholder="비밀번호를 입력해 주세요"
							/>
						</div>
					</div>
					<div class="flex justify-center w-full pt-20 pb-10">
						<button 
							@click="login()"
							class="w-[500px] vimeal-button-primary-large"
						>
							로그인
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
