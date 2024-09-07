import * as XLSX from 'xlsx';

const xlsxPlugin = {
	workSheetCols: (arr) => {
		let vLenArry = [];
		let iValues = arr.map(item => {
			return Object.values(item)
		})
		iValues.forEach((item, i) => {
			item.forEach((sItem, sI) => {
				if(i === 0){
					vLenArry.push([])
				}
				let checkHan = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(sItem)
				let itemLen = checkHan ? String(sItem).length + 15 : String(sItem).length + 12
				vLenArry[sI].push(itemLen)
			})
		})
		let workSheetCols = vLenArry.map(item => {
			let reItem = {
				wch: Math.max(...item)
			}
			return reItem;
		})
		return workSheetCols;
	},

	excelDownload: ({data, fileName, sheetName })=> {

		const workBook = XLSX.utils.book_new();
		if(!sheetName) {
			sheetName = ['exemple']
		}

		data.forEach((el, index) => {
			const workSheet = XLSX.utils.json_to_sheet(el);
			workSheet["!cols"] = xlsxPlugin.workSheetCols(el);
			XLSX.utils.book_append_sheet(workBook, workSheet, String(sheetName[index]), true);
		});
		XLSX.writeFile(workBook, fileName);
	},
};

export default xlsxPlugin;