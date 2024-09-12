<script setup>
import html2pdf from 'html2pdf.js';

import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useClinicalStore } from '@/store/index';
import { useRouter, useRoute } from 'vue-router';
import useAxios from '@/api/axios';
import ExcelUpload from '@/components/Modal/ExcelUpload.vue';
import Pdf from "@/components/file/Pdf.vue";

const clinicalStore = useClinicalStore();
const router = useRouter();
const route = useRoute();

let QUERY_DATA = computed(() => {
	return route.query;
})
let LIST_ROWS = computed(() => {
	return QUERY_DATA.value.rows ? Number(QUERY_DATA.value.rows) : 10;
})
let PAGE_NUM = computed(() => {
	return QUERY_DATA.value.pageNo ? Number(QUERY_DATA.value.pageNo) : 1;
})

let SEARCH_OPTION = ref({
	startAge: QUERY_DATA.value.startAge || null,
	endAge: QUERY_DATA.value.endAge || null,
	gender: QUERY_DATA.value.gender || null,
})
let PDF_CONTENTS = ref(null);
let PDF_ING = ref(false);

let OPEN_MODAL = ref(false);
let PAGING_ROWS = 10;
let LIST_DATA = ref([]);
let LIST_ROWS_LIST = [10,20,30,40,50,100];
let CHECK_ITEM = ref('');
let AGE_LIST = [
	{
		title: '전체',
		value: null
	},
	{
		title: '10대 이하',
		value: 10
	},
	{
		title: '20대',
		value: 20
	},
	{
		title: '30대',
		value: 30
	},
	{
		title: '40대',
		value: 40
	},

]

let TABLE_HEADER_LIST = ref([
	'pgmKey',
	'akt1',
	'alk',
	'braf',
	'egfr',

])


const ageChange = (event) => {
	if(event.target.value === '전체') {
		SEARCH_OPTION.value.startAge = null;
		SEARCH_OPTION.value.endAge = null;
	}
}

const search = () => {
	goPage({pageNo: 1, type: 'search'});
}

const goPage = ({pageNo, rows, type}) => {
	if(pageNo < 1) {
		pageNo = 1;
	}
	if(pageNo > LIST_DATA.value.PAGING?.lastPage) {
		pageNo = LIST_DATA.value.PAGING?.lastPage;
	}

	const startAge =  QUERY_DATA.value.startAge || SEARCH_OPTION.value.startAge;
	const endAge =  QUERY_DATA.value.endAge || SEARCH_OPTION.value.endAge;
	const gender  =  QUERY_DATA.value.gender || SEARCH_OPTION.value.gender;

	let reQuery = {
		rows,
		pageNo,
		startAge,
		endAge,
		gender,
	}

	if(!rows) {
		reQuery.rows = LIST_ROWS.value;
	}
	
	if(type === 'search') {
		reQuery.startAge = SEARCH_OPTION.value.startAge;
		reQuery.endAge = SEARCH_OPTION.value.endAge;
		reQuery.gender = SEARCH_OPTION.value.gender;
	}
	router.push({ query: reQuery });
}

const listRowsChange = (e) => {
	let selRows = e.target.value;
	goPage({pageNo: 1, rows: selRows});
}

const excelDownload = async () => {
	try {
		const body = {
			startAge: null,
			endAge: null,
			gender: null,
			pageNo : 1,
			rows : clinicalStore.getClinicalCount
		}
		const response = await useAxios.post('/opa/common/excel/down', body, {
			responseType: 'blob', // 파일 다운로드를 위해 blob 형식으로 응답 받기
		});

		// Blob 객체를 URL로 변환
		const url = window.URL.createObjectURL(new Blob([response.data]));

		// 다운로드 링크 생성
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'opa.xlsx'); // 다운로드할 파일 이름 설정

		// 링크 클릭하여 다운로드 실행
		document.body.appendChild(link);
		link.click();

		// 다운로드 완료 후 URL 해제
		window.URL.revokeObjectURL(url);
		document.body.removeChild(link);

	} catch(err) {
		console.log(err);
	}
}

const reset = () => {
	SEARCH_OPTION.value = { 
		startAge: null,
		endAge: null,
		gender: null,
	}
	router.push('/');
	getTotalCount();
}

const excelUploadModal = () => {
	alert('업로드에 성공하셨습니다');
	if(route.fullPath !== '/') {
		reset();
	} else {
		getList();
		getTotalCount();
	}
}

const getList = async () => {
	
	try {
		const body = {
			startAge: Number(QUERY_DATA.value.startAge) || SEARCH_OPTION.value.startAge,
			endAge: Number(QUERY_DATA.value.endAge) || SEARCH_OPTION.value.endAge,
			gender: QUERY_DATA.value.gender || SEARCH_OPTION.value.gender,
			pageNo : PAGE_NUM.value,
			rows : LIST_ROWS.value
		}

		const { data } = await useAxios.post('/opa/common/patient/gene/list',body);
		if(data.success) {
			LIST_DATA.value = data.data;

			LIST_DATA.value.TOTAL_COUNT = data.totalCount;
			LIST_DATA.value.PAGING = {
				currentPage: data.curPage,
				group: [],
				lastPage: data.lastPage
			};
			
			let pagingStNm = (PAGING_ROWS * Math.ceil(PAGE_NUM.value/PAGING_ROWS) - (PAGING_ROWS -1));
			let pagingEnNm = pagingStNm + PAGING_ROWS;

			if(pagingEnNm > data.lastPage) {
				pagingEnNm = data.lastPage + 1;
			}
			for (let i = pagingStNm; i < pagingEnNm; i++) {
				LIST_DATA.value.PAGING.group.push(i);
			}
				
			LIST_DATA.value.forEach(item => {
				item.checked = false
			})

		} else {
			console.log('err');
		}
	} catch(err) {
		console.log(err);
	}
}

const getTotalCount = async () => {

	try {
		const { data } = await useAxios.get('/opa/common/patient/totalCount');
		if(data.success) {
			clinicalStore.setClinicalCount(data.data.totCnt);
		} else {
			console.log('err');
		}
	} catch(err) {
		console.log(err);
	}
}

const treatmentAnalysis = async () => {
	
	try {
		const body = { 
			pgmKey: CHECK_ITEM.value
		}
		const { data } = await useAxios.post('/opa/common/pdf/print', body);
		if(data.success) {

			PDF_CONTENTS.value = data.data;
			PDF_CONTENTS.value.totalLength = (PDF_CONTENTS.value.cureInfoList.length/3) + 1

			const chunkSize = 3;
			PDF_CONTENTS.value.pageList = Array.from({ length: Math.ceil(PDF_CONTENTS.value.cureInfoList.length / chunkSize) }, (_, i) =>
			PDF_CONTENTS.value.cureInfoList.slice(i * chunkSize, i * chunkSize + chunkSize)
			);

			PDF_CONTENTS.value.leftList = PDF_CONTENTS.value.garList.slice(0,6);
			PDF_CONTENTS.value.rightList = PDF_CONTENTS.value.garList.slice(6,11);
			
			const options = {
				fileName: `pdf_${PDF_CONTENTS.value.userNm}`,
				margin: [ 22,0,20,0 ],
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 4 },
				jsPDF: { unit: 'px', format: [610, 860]},
			};
			PDF_ING.value = true;
			const content = document.getElementById('pdf_content'); 
			await nextTick();
			await html2pdf(content,options);
		} else {
			console.log('err');
		}
	} catch(err) {
		console.log(err);
	}
	PDF_CONTENTS.value = null;
	PDF_ING.value = false;
}

const checkItem = (pgmKey) => {
	CHECK_ITEM.value = CHECK_ITEM.value === pgmKey ? '' : pgmKey;
}

watch(QUERY_DATA, async (newData, oldData) => {
	if(newData !== oldData) {
		getList();
	}
})

onMounted(() => {
	getList();
	getTotalCount();
})

</script>

<style scoped>
.select-input {
	background-image: url(@/assets/Icons/arrowBottom-black-ver1.svg);
	background-position: 80%;
}

.select-input-full {
	background-image: url(@/assets/Icons/arrowBottom-black-ver1.svg);
	background-position: 95%;
}
</style>

<template>
	<div class="w-full h-screen bg-gray-150 pl-[200px] overflow-auto">
		<div class="w-full h-full pt-20 bg-gray-150">
			<div class="w-full p-[40px] flex flex-col">
				<div>
					<div class="text-black text-[28px] font-bold leading-[42px] pb-3">데이터 검색</div>
					<div class="flex flex-col p-4 bg-white rounded-[10px] shadow-lg h-[105px] justify-center">
						<div class="flex gap-6">
							<div class="flex items-center gap-4">
								나이
								<select 
									v-model="SEARCH_OPTION.startAge"
									@change="ageChange($event)"
									class="pr-[35px] pl-4 py-2 text-black bg-white bg-no-repeat border border-gray-300 border-solid appearance-none rounded-8 select-input w-[127px] text-base font-normal"
								>
									<option 
										v-for="(item,index) in AGE_LIST" :key="index"
										:value="item.value"
									>
										{{ item.title }}
									</option>
								</select>
								- 
								<select 
									v-model="SEARCH_OPTION.endAge"
									@change="ageChange($event)"
									class="pr-[35px] pl-4 py-2 text-black bg-white bg-no-repeat border border-gray-300 border-solid appearance-none rounded-8 select-input w-[127px] text-base font-normal"
								>
									<option 
										v-for="(item,index) in AGE_LIST" :key="index"
										:value="item.value"
									>
										{{ item.title }}
									</option>
								</select>
							</div>
							<div class="flex items-center gap-4 pl-4">
								성별
								<select
									v-model="SEARCH_OPTION.gender"
									class="pr-[35px] pl-4 py-2 text-black bg-white bg-no-repeat border border-gray-300 border-solid appearance-none rounded-8 select-input w-24"
								>
									<option :value="null">
										전체
									</option>
									<option value="M">
										남자
									</option>
									<option value="F">
										여자
									</option>
								</select> 
							</div>
							<button
								@click="search()"
								class="px-8 vimeal-button-primary-medium"
							>
								검색
							</button>

							<button
								@click="reset()"
								class="px-8 vimeal-button-primary-medium"
							>
								초기화
							</button>
						</div>
					</div>
				</div>

				<div class="flex justify-between w-full pt-10 pb-4">
					
					<button 
						@click="treatmentAnalysis()"
						class="px-8 vimeal-button-primary-medium"
						:disabled="CHECK_ITEM === ''"
					>
						치료법 분석하기
					</button>

					<div class="flex items-center justify-end">
						<div class="flex gap-4 ">
							<button 
								@click="OPEN_MODAL= true"
								class="px-8 vimeal-button-primary-medium"
							>
								엑셀 업로드
							</button>
							<button 
								@click="excelDownload()"
								class="px-8 vimeal-button-primary-medium"
							>
								엑셀 다운로드
							</button>
						</div>
					</div>
				</div>

				<div v-if="LIST_DATA.length == 0">
					<div class="w-full pt-40 text-center h-[300px] bg-white">
						조회할 데이터가 없습니다.
					</div>
				</div>

				<div
					v-else
					class="p-4 rounded-[10px] shadow-lg bg-white w-full"
				>
					<div class="flex w-full overflow-auto">
						<div class="sticky left-0 bg-white border-r border-solid border-[#E0F4FF] text-xs">
							<table class="whitespace-nowrap w-[400px]">
								<thead>
									<tr class="font-semibold leading-3 text-white bg-green">
										<th class="w-[100px]"></th>
										<th class="py-4 w-[100px]">환자명</th>
										<th class="py-4 w-[100px]">나이</th>
										<th class="py-4 w-[100px]">성별</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) in LIST_DATA" :key="index">
										<th class="w-[100px] flex justify-center items-center h-[48px]">
											<div
												@click="checkItem(item.pgmKey)"
												class="flex items-center justify-center p-1 rounded-8 w-[22px] h-[22px] cursor-pointer"
												:class="CHECK_ITEM === item.pgmKey ? 'bg-vimeal-blue-500' : 'bg-white border border-solid border-gray-350'"
											>
												<img src="@/assets/Icons/check_icon.svg">
											</div>
										</th>
										<th class="py-4 w-[100px]">
											{{ item.userNm }}
										</th>
										<th class="py-4 w-[100px]">
											{{ item.age }}
										</th>
										<th class="py-4 w-[100px]">
											{{ item.gender === 'M' ? '남' : '여' }}
										</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="w-full overflow-auto">
							<table class="whitespace-nowrap font-semibold leading-3 text-xs w-[2400px]">
								<thead>
									<tr class="text-white bg-green">
										<th 
											v-for="(item,index) in TABLE_HEADER_LIST" :key="index" 
											class="w-[100px] py-4"
										>
											{{ item }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in LIST_DATA" :key="index">
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.pgmKey }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.akt1 }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.alk }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.braf }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.egfr }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.erbb2 }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.kit }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.kras }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.nras }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.pik3ca }}
										</td>
										<td class="py-4 text-center w-[100px] h-[48px]">
											{{ item.tp53 }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>

					</div>
					<div 
						v-if="LIST_DATA.length !== 0"
						class="pt-8"
					>
						<div class="flex justify-center py-[20px] gap-2 w-full relative">
							<div
								class="flex items-center justify-center rotate-90 border border-gray-300 border-solid cursor-pointer aspect-square h-[30px] min-w-[30px]"
								:class="{ 'opacity-30 pointer-events-none' : PAGE_NUM <= 1 }"
								@click="goPage({pageNo: PAGE_NUM-1})"
							>
								<img src="@/assets/Icons/arrowBottom-black-ver1.svg">
							</div>
							<div
								@click="goPage({pageNo: item})"
								v-for="(item, index) in LIST_DATA.PAGING?.group" :key="`paging_${index}`"
								class="border border-gray-300 border-solid cursor-pointer min-w-[30px] h-[30px] px-[10px] flex justify-center items-center aspect-square"
								:class="{ 'bg-vimeal-blue-500 text-white' : item === PAGE_NUM }"
							>
								{{ item }}
							</div>
							<div
								class="flex items-center justify-center -rotate-90 border border-gray-300 border-solid cursor-pointer aspect-square h-[30px] min-w-[30px]"
								:class="{ 'opacity-30 pointer-events-none' : PAGE_NUM >= LIST_DATA.PAGING?.lastPage }"
								@click="goPage({pageNo: PAGE_NUM+1})"
							>
								<img src="@/assets/Icons/arrowBottom-black-ver1.svg">
							</div>

							<select 
								@change="listRowsChange"
								class="p-2.5 pr-[35px] text-black bg-white bg-no-repeat border border-gray-300 border-solid appearance-none rounded-8 absolute right-0 select-input"
							>
								<option
									v-for="item in LIST_ROWS_LIST" :key="item.id"
									:value="item"
									:selected="item === LIST_ROWS"
								>
									{{ item }}개씩
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<ExcelUpload
		v-if="OPEN_MODAL"
		@closeModal="OPEN_MODAL = false;"
		@excelUploadModal="excelUploadModal"
	/>
	<!-- <div
		id="pdf_content"
		class="w-full"
	>
		<Pdf 
			:PDF_CONTENTS="PDF_CONTENTS"
			:PDF_ING="PDF_ING"
		/>
	</div> -->

	<div :class="{ 'hidden pt-40' : !PDF_ING }">
		<div
			id="pdf_content"
			class="w-full"
		>
			<Pdf 
				:PDF_CONTENTS="PDF_CONTENTS"
				:PDF_ING="PDF_ING"
			/>
		</div>
	</div>
</template>