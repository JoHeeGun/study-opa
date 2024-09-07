import{u as p,j as x,r as f,m as _,o as m,c as v,a as e,n as c,B as d,b as n,C as u}from"./index-Z6vk1y8J.js";import{u as g}from"./axios-tuXuNP6i.js";const w="/assets/opa_login_background-rXWO8YLQ.png",b={class:"flex items-center justify-center"},y=e("div",{class:"w-full h-screen"},[e("img",{src:w,class:"object-cover w-full h-full"})],-1),h={class:"flex flex-col h-screen w-[1000px]"},k={class:"h-full overflow-hidden overflow-y-auto"},F={class:"flex flex-col items-center justify-center w-auto px-2 pt-40 pb-20"},j=e("div",{class:"w-full text-center"},[e("div",{class:"text-[40px] font-extrabold text-vimeal-blue-500 leading-[80px]"}," OPA 유전체 데이터 기반 "),e("div",{class:"text-[40px] font-bold text-black leading-[80px]"}," 최적 치료 가이드라인 플랫폼 "),e("div",{class:"text-base font-normal text-gray-600"}," AI 기반 진단 및 치료제 분석 시스템 ")],-1),I={class:"flex flex-col items-center justify-center w-[500px] gap-6 pt-14"},A={class:"flex flex-col gap-2 text-gray-600"},B=e("div",null," 아이디 ",-1),O={class:"flex flex-col w-full gap-2 text-gray-600"},L=e("div",null," 비밀번호 ",-1),P={class:"flex justify-center w-full pt-20 pb-10"},$={__name:"Login",setup(U){const i=p(),a=x();let l=f({userId:"",userPw:""});const r=async()=>{a.push("/");try{const{data:s}=await g.post("/opa/common/login",l.value);s.success?(i.setLogin(s.data),a.push("/")):alert(s.message)}catch(s){console.log(s)}};return _(()=>{Object.keys(i.getUserInfo).length!==0&&a.replace("/")}),(s,t)=>(m(),v("div",b,[y,e("div",h,[e("div",k,[e("div",F,[j,e("div",I,[e("div",A,[B,c(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>n(l).userId=o),onKeyup:t[1]||(t[1]=u(o=>r(),["enter"])),type:"text",class:"w-[500px] p-4 rounded-5 bg-[#F0FAFF] font-medium text-base text-black placeholder:text-gray-500",placeholder:"아이디를 입력해 주세요"},null,544),[[d,n(l).userId]])]),e("div",O,[L,c(e("input",{"onUpdate:modelValue":t[2]||(t[2]=o=>n(l).userPw=o),onKeyup:t[3]||(t[3]=u(o=>r(),["enter"])),type:"password",class:"w-[500px] p-4 rounded-5 bg-[#F0FAFF] font-medium text-base text-black placeholder:text-gray-500",placeholder:"비밀번호를 입력해 주세요"},null,544),[[d,n(l).userPw]])])]),e("div",P,[e("button",{onClick:t[4]||(t[4]=o=>r()),class:"w-[500px] vimeal-button-primary-large"}," 로그인 ")])])])])]))}};export{$ as default};
