import { defineStore } from 'pinia';

export const useClinicalStore = defineStore('useClinicalStore', {
	state : () => (
		{ 
			clinicalCount: null
		}
	),

	actions: {
		setClinicalCount(count) {
			this.clinicalCount = count;
		},

		clearClinicalCount() {
			this.clinicalCount = null;
		}
	},

	getters: {
		getClinicalCount(state) {
			return state.clinicalCount;
		},
	},

	
});