import { createPinia } from 'pinia';
import { useUserStore } from './modules/users';
import { useClinicalStore } from './modules/clinical';

export const pinia = createPinia();

export const setupStores = () => {
	pinia.use(useUserStore);
	pinia.use(useCounterStore);
};

export { 
	useUserStore,
	useClinicalStore
};