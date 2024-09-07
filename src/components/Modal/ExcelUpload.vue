<script setup>
import { ref, defineEmits } from 'vue';
import { useUserStore } from '@/store/index';
import useAxios from '@/api/axios';

const userStore = useUserStore();
const emit = defineEmits();

const getFileUrl = (name) => {
	return new URL(`/src/assets/files/${name}`, import.meta.url).href
}

let FILE_NAME = ref('');
let FORM_DATA = ref(new FormData());

const selectFile = () => {
	const excelInput = document.createElement("input");
	excelInput.type = "file";
	excelInput.style.display = "none";
	excelInput.addEventListener("change", handleFileChange);
	document.body.appendChild(excelInput).click();
}

const handleFileChange = (e) => {
	const files = Array.from(e.target.files);
	FILE_NAME.value = files[0].name;
	FORM_DATA.value = new FormData();
	FORM_DATA.value.append("files", files[0]);
}

const excelUpload = async () => {

	if(FILE_NAME.value) {			
		try {
			const { data } = await useAxios.post (
				'/opa/common/excel/upload',
				FORM_DATA.value,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if(data.success) {
				emit('excelUploadModal');
				emit('closeModal');
			} else {
				alert(data.message);
				emit('closeModal');
			}
		} catch(err) {
			alert(err);
			emit('closeModal');
		}
	} else {
		alert('파일을 등록해주세요');
	}
}

</script>

<template>
	<div class="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 w-[500px] border rounded-5 top-1/2 left-1/2 bg-white overflow-y-auto max-h-[800px] scrollbar-hide flex flex-col shadow-lg">
		<div class="px-4 pt-4 pb-2 font-bold text-gray-600">
			엑셀 업로드
		</div>
		
		<div class="pt-4 px-4 pb-8 border-y-[5px] border-gray-200 border-solid">
			<div
				@click="selectFile()" 
				class="w-full h-12 px-4 py-3 bg-gray-150 rounded-[5px] justify-between items-center inline-flex cursor-pointer">
				<div class="text-base font-normal leading-normal text-gray-500">
					{{ FILE_NAME }}
				</div>
				<div class="flex items-center justify-center w-6 h-6 p-1">
					<img 
						src="@/assets/Icons/search_icon.svg"
						class="relative w-5 h-5"
					>
				</div>
			</div>
			<div class="py-4 text-sm font-medium text-gray-600">
				※ 양식 다운 버튼을 클릭하여 해당 양식에 맞게 내용 작성하여 파일 첨부
			</div>

			<div 
				class="w-[120px] h-7 px-[18px] bg-black border-b border-black justify-center items-center inline-fle cursor-pointer text-center"
			>
				<a 
					:href="`${getFileUrl('Snvinde_upload_sample.xlsx')}`"
					download
					class="text-sm font-bold leading-snug text-center text-white"
				>
					양식 다운
				</a>	
			</div>
		</div>

		<div class="flex justify-end gap-2 p-4">
			<button 
				@click="emit('closeModal')"
				class="w-[150px] vimeal-button-disabled-medium"
			>
				취소
			</button>
			<button 
				@click="excelUpload()"
				class="w-[150px] vimeal-button-primary-medium"
			>
				엑셀 업로드
			</button>
		</div>
	</div>
</template>