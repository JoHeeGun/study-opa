import { defineStore } from 'pinia';

export const useUserStore = defineStore('useUserStore', {
	state : () => (
		{ user: {} }
	),

	actions: {
		setLogin(obj) {
			this.user = obj;
		},

		setLogOut() {
			this.user = {};
		}
	},

	getters: {
		getUserInfo(state) {
			return state.user;
		},
	},

	persist: {
		enabled: true,
		strategies: [{ storage: localStorage }],
	},

});