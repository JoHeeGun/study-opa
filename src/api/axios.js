import axios from 'axios'

const useAxios = axios.create({
	withCredentials: true,
	timeout: 6000 * 5, // 요청응답 타임아웃 설정
})

// api baseurl 설정
useAxios.defaults.baseURL = import.meta.env.VITE_API_URL;

// headers req 설정
useAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
useAxios.defaults.headers.post['Content-Type'] = 'application/json';
useAxios.defaults.headers.get['Content-Type'] = 'application/json';
useAxios.defaults.headers.put['Content-Type'] = 'application/json';
useAxios.defaults.headers.delete['Content-Type'] = 'application/json';


// 요청 인터셉터 추가
useAxios.interceptors.request.use( 
	(config) => {
		// 요청 인터셉터 설정
		return config;
	}
)

let startLogOut = false;

// 응답 인터셉터 추가
useAxios.interceptors.response.use(
	function (response) {
		// 응답 인터셉터 설정
		return response;
	},
	function (err) {
		// 응담 타임아웃 설정
		if(err.message.includes('timeout')){
			alert('응답 요청에 실패하였습니다.\n다시 시도해 주세요')
		}
		return Promise.reject(err);
	}
);

export default useAxios;