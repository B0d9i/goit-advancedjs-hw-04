/* empty css                      */import{a as w,S,i as a}from"./assets/vendor-DvfmeZXB.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const q="54194588-981d51d18056996cd683f89a3",v="https://pixabay.com/api/";async function p(e,o){const t={key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};return(await w.get(v,{params:t})).data}const d=document.querySelector(".gallery");let n=null;function E(){n||(n=new S(".gallery a",{captionsData:"alt",captionDelay:250}))}function y(e){if(!d){console.error("Gallery container not found");return}const o=e.map(t=>`
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
  `).join("");d.insertAdjacentHTML("beforeend",o),E(),n&&n.refresh()}function P(){d&&(d.innerHTML="",n&&(n.destroy(),n=null))}function L(){const e=document.querySelector(".loader");e&&e.classList.remove("is-hidden")}function u(){const e=document.querySelector(".loader");e&&e.classList.add("is-hidden")}function m(){const e=document.querySelector(".load-more");e&&e.classList.remove("is-hidden")}function g(){const e=document.querySelector(".load-more");e&&e.classList.add("is-hidden")}const B=document.querySelector(".form"),R=document.querySelector(".load-more");let h="",c=1,l=0;const b=15;B.addEventListener("submit",async e=>{e.preventDefault();const o=e.target.elements.searchQuery.value.trim();if(!o){a.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}h=o,c=1,l=0,P(),g(),L();try{const t=await p(h,c);if(u(),t.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}l=t.totalHits,y(t.hits),l>b&&m(),e.target.reset()}catch(t){u(),console.error("Error fetching images:",t),a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}});R.addEventListener("click",async()=>{c+=1,g(),L();try{const e=await p(h,c);u(),y(e.hits);const o=document.querySelector(".gallery-item");if(o){const s=o.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}c*b>=l?(g(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):m()}catch(e){u(),console.error("Error fetching more images:",e),a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),m()}});
//# sourceMappingURL=index.js.map
