/* empty css                      */import{a as S,S as q,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const v="54194588-981d51d18056996cd683f89a3",E="https://pixabay.com/api/";async function y(e,o){const t={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};return(await S.get(E,{params:t})).data}const u=document.querySelector(".gallery");let a=null;function R(){a||(a=new q(".gallery a",{captionsData:"alt",captionDelay:250}))}function p(e){if(!u){console.error("Gallery container not found");return}const o=e.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img
          src="${t.webformatURL}"
          alt="${t.tags}"
          loading="lazy"
          width="360"
          height="200"
        />
        <div class="image-info">
          <p class="info-item">
            <b>Likes</b>
            ${t.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${t.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${t.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${t.downloads}
          </p>
        </div>
      </a>
    </li>
  `).join("");u.insertAdjacentHTML("beforeend",o),R(),a&&a.refresh()}function P(){u&&(u.innerHTML="",a&&(a.destroy(),a=null))}function L(){const e=document.querySelector(".loader");e&&e.classList.remove("is-hidden")}function c(){const e=document.querySelector(".loader");e&&e.classList.add("is-hidden")}function b(){const e=document.querySelector(".load-more");e&&e.classList.remove("is-hidden")}function w(){const e=document.querySelector(".load-more");e&&e.classList.add("is-hidden")}const g=document.querySelector("#search-form"),B=document.querySelector(".load-more"),$=document.querySelector(".gallery");let h="",f=1,l=0,d=0;g.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(g).get("searchQuery").trim();if(!t){n.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}h=t,f=1,d=0,l=0,w(),P(),L();try{const i=await y(h,f);if(i.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c();return}l=i.totalHits,d=i.hits.length,p(i.hits),c(),d<l?b():n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n.success({title:"Success",message:`Hooray! We found ${l} images.`,position:"topRight"})}catch(i){console.error("Error fetching images:",i),n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),c()}});B.addEventListener("click",async()=>{f+=1,L();try{const e=await y(h,f);d+=e.hits.length,p(e.hits),c(),d>=l?(w(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b();const o=$.querySelector(".gallery-item");if(o){const t=o.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}catch(e){console.error("Error fetching more images:",e),n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),c()}});
//# sourceMappingURL=index.js.map
