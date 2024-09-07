<script setup>
const props = defineProps({
	PDF_CONTENTS: {
		Type: Object,
		default: {}
	},

	PDF_ING: {
		Type: Boolean,
		default: false
	}
})

// 이미지 동적경로 사용
const getIconUrl = (type) => {
	const name = `type${type}.png`;
	return new URL(`/src/assets/Images/${name}`, import.meta.url).href;
}
</script>

<template>
	<section v-if="PDF_ING">
		<!-- 1 page -->
		<div class="w-[610px] h-[818px] flex flex-col px-4">
			<div class="flex flex-col items-end justify-end pb-4 text-xs font-normal border-b-8 border-gray-800 border-solid">
				날짜: {{ PDF_CONTENTS.regDt }}
			</div>
			<div class="text-lg font-bold">
				암 종류 : 비소세포성 폐암
			</div>

			<div class="flex w-full gap-10 py-8 text-base font-normal">
				<span>
					성명: {{ PDF_CONTENTS.userNm }}
				</span>
				<span>
					성별: {{ PDF_CONTENTS.gender === 'M' ? '남' : '여' }}
				</span>
				<span>
					연령: {{ PDF_CONTENTS.age }}세
				</span>
			</div>

			<div class="pb-2 text-xs font-bold border-b border-solid text-vimeal-blue-500 border-vimeal-blue-500">
				비소세포성 폐암 관련 OPA 기반 유전자 분석 결과
			</div>
			<div class="flex items-start w-full border-b border-solid border-gray-350 text-[10px]">

				<div class="flex flex-col w-[50%]">
					<div class="flex items-center justify-start w-full pb-3 border-b border-solid border-gray-350 h-[40px]">
						<div class="w-[30%] flex justify-center">
							유전자
						</div>
						<div class="w-[70%] flex justify-center">
							검사결과
						</div>
					</div>

					<div class="flex flex-col w-full gap-4 pb-4 pr-4">
						<div
							v-for="(item, index) in PDF_CONTENTS.leftList" :key="index"
							class="flex items-start justify-start w-full"
						>
							<div class="w-[30%] flex justify-center flex-col text-center">
								{{ item.orgGene }}
							</div>
							<span
								class="w-[70%] flex flex-wrap justify-start items-center whitespace-pre-wrap break-all"
								v-html="item.resultVal.replace(/\n/g, '<br/>')"
							>
							</span>
						</div>
					</div>
				</div>

				<div class="h-full border-[0.5px] border-solid border-gray-350"></div>

				<div class="flex flex-col w-[50%]">
					<div class="flex items-center justify-start w-full pb-3 border-b border-solid border-gray-350 h-[40px]">
						<div class="w-[30%] flex justify-center">
							유전자
						</div>
						<div class="w-[70%] flex justify-center">
							검사결과
						</div>
					</div>

					<div class="flex flex-col w-full gap-4 pb-4 pr-4">
						<div
							v-for="(item, index) in PDF_CONTENTS.rightList" :key="index"
							class="flex items-start justify-start w-full"
						>
							<div class="w-[30%] flex justify-center flex-col text-center">
								{{ item.orgGene }}
							</div>
							<span
								class="w-[70%] flex flex-wrap justify-start items-center whitespace-pre-wrap break-all"
								v-html="item.resultVal.replace(/\n/g, '<br/>')"
							>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="py-6 text-xs font-semibold text-gray-700">
				※ 관련 치료법 안내
			</div>

			<div class="flex gap-2 text-[10px] font-normal text-gray-700">
				<div>
					* 
				</div>
				<div>
					각 기관 및 임상시험 등에서 확인된 근거가 가장 많은 치료법으로 안내 합니다
				</div>
			</div>
			<div class="flex gap-2 text-[10px] font-normal text-gray-700">
				<div>
					* 
				</div>
				<div>
					FDA: 미국-Food and Drug Administration(식품의약국), NCCN: 미국-National Comprehensive
					Cancer Network(국가종합암네트워크), EMA: European Medicine Agency(유럽의약국),
					ESMO: European Society for Medical Oncology(유럽종양학회)
				</div>
			</div>

			<div class="pt-6 text-[10px] font-semibold text-gray-700">
				※ 유전자 분석 결과에 따른 관련 치료법 상세는 다음 페이지에서 확인 가능합니다
			</div>

			<div class="flex flex-col items-end justify-end w-full h-full pb-4">
				<span class="text-gray-700 text-[8px] font-semibold pb-4 w-full flex justify-start border-t border-gray-350 border-solid">
					고지사항 : 환자의 치료 결정은 종양 전문의와의 상담을 통해 이루어져야 하며, 최신 가이드라인과 임상 연구 결과를 참고하는 것이 중요합니다
				</span>
				<div class="flex justify-end w-full text-xs text-black border-t-8 border-gray-800 border-solid">
					1/{{ PDF_CONTENTS.totalLength }}
				</div>
			</div>
		</div>
		<!-- // 1 page -->

		<!-- 2 page 반복 -->
		<div
			v-for="(item,index) in PDF_CONTENTS.pageList" :key="index"
			class="w-[610px] h-[818px] flex flex-col px-4"
		>
			<div class="w-full pb-2 text-xs font-bold border-b border-solid text-vimeal-blue-500 border-vimeal-blue-500">
				관련 치료법 요약
				<span v-if="(index + 2) !== PDF_CONTENTS.totalLength">(계속)</span>
			</div>

			<div class="flex items-center justify-start w-full gap-10 py-2">
				<div class="flex items-center justify-center gap-2">
					<div class="pt-2.5">
						<img 
							src="@/assets/images/type1.png"
							class="w-[10px] h-[10px]"
						>
					</div>
					<div class="text-[#777777] text-[10px] font-semibold">
						이 암 유형에서
					</div>
				</div>
				<div class="flex items-center justify-center gap-2">
					<div class="pt-2.5">
						<img 
							src="@/assets/images/type2.png"
							class="w-[10px] h-[10px]"
						>
					</div>
					<div class="text-[#777777] text-[10px] font-semibold">
						다른 암 유형에서
					</div>
				</div>
				<div class="flex items-center justify-center gap-2">
					<div class="pt-2.5">
						<img 
							src="@/assets/images/type3.png"
							class="w-[10px] h-[10px]"
						>
					</div>
					<div class="text-[#777777] text-[10px] font-semibold">
						이 암 유형과 다른 암 유형에서
					</div>
				</div>
				<div class="flex items-center justify-center gap-2">
					<div class="pt-2.5">
						<img
							src="@/assets/images/type4.png"
							class="w-[10px] h-[10px]"
						>
					</div>
					<div class="text-[#777777] text-[10px] font-semibold">
						근거 없음(권장되지 않음)
					</div>
				</div>
			</div>

			<!-- // 반복 -->
			<div
				v-for="(i,idx) in item" :key="idx"
				class="flex flex-col w-full pt-2"
			>
				<div class="px-2 pb-2.5 text-[10px] font-bold text-white bg-vimeal-blue-500">
					{{ i.gene }}
				</div>
				
				<div class="flex flex-col py-2">
					<div class="px-2 pt-1 pb-3 text-[8px] font-bold text-[#303030] bg-[#dfdfdf] flex justify-between items-center">
						<div class="w-[50%]">
							관련 치료법
						</div>
						<div class="flex justify-end w-full gap-2">
							<div class="w-[50px] flex justify-center items-center">
								FDA
							</div>
							<div class="w-[50px] flex justify-center items-center">
								NCCN
							</div>
							<div class="w-[50px] flex justify-center items-center">
								EMA
							</div>
							<div class="w-[50px] flex justify-center items-center">
								ESMO
							</div>
							<div class="w-[50px] flex justify-center items-center">
								임상실험
							</div>
						</div>
					</div>

					<div
						v-for="(c,c_index) in i.curePointList" :key="c_index"
						class="flex items-center justify-between px-2 pt-0.5 pb-2.5 text-[10px] font-bold text-black bg-white border-b-[1px] border-solid border-gray-350"
					>
						<div class="w-[50%]">
							{{ c.cure }}
						</div>
						<div class="flex justify-end w-full gap-2">
							<div class="w-[50px] flex justify-center items-center">
								<div class="pt-2.5">
									<img
										:src="getIconUrl(c.fda)"
										class="w-[10px] h-[10px]"
									>
								</div>
							</div>
							<div class="w-[50px] flex justify-center items-center">
								<div class="pt-2.5">
									<img
										:src="getIconUrl(c.nccn)"
										class="w-[10px] h-[10px]"
									>
								</div>
							</div>
							<div class="w-[50px] flex justify-center items-center">
								<div class="pt-2.5">
									<img
										:src="getIconUrl(c.ema)"
										class="w-[10px] h-[10px]"
									>
								</div>
							</div>
							<div class="w-[50px] flex justify-center items-center">
								<div class="pt-2.5">
									<img
										:src="getIconUrl(c.esmo)"
										class="w-[10px] h-[10px]"
									>
								</div>
							</div>
							<div class="w-[50px] flex justify-center items-center">
								<div class="pt-2.5">
									<img
										:src="getIconUrl(c.clinicalTrial)"
										class="w-[10px] h-[10px]"
									>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="flex w-full px-2 bg-[#F4F4F4] flex-col">
					<div class="text-gray-700 font-medium text-[8px]">
						* 유전자 분석 결과 및 치료법 설명
					</div>
					<div class="pl-4 text-gray-700 font-normal text-[8px] h-[64px]">
						{{ i.mutationDesc }}<br/>
						{{ i.cureDesc }}
					</div>
				</div>
			</div>

			<div class="flex flex-col items-end justify-end w-full h-full pb-4">
				<span class="text-gray-700 text-[8px] font-semibold pb-4 w-full flex justify-start border-t border-gray-350 border-solid">
					고지사항 : 환자의 치료 결정은 종양 전문의와의 상담을 통해 이루어져야 하며, 최신 가이드라인과 임상 연구 결과를 참고하는 것이 중요합니다
				</span>
				<div class="flex justify-end w-full text-xs text-black border-t-8 border-gray-800 border-solid">
					{{ index + 2 }}/{{ PDF_CONTENTS.totalLength }}
				</div>
			</div>
		</div>
		<!-- // 2 page -->
	</section>
</template>