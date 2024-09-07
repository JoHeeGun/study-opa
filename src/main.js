import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js'; 
import piniaPersist from 'pinia-plugin-persist';
import './styles/main.css';
import "./styles/index.scss";

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
	.use(router)
	.use(pinia)
	.mount('#app');
