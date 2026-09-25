'use client';
import {useEffect,useRef} from 'react';
import {videoUrl} from '../utils/content';

export default function EntryVideo({mobile}:{mobile:boolean}) {
 const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const video=ref.current;
  const intro=video?.closest<HTMLElement>('.motion-intro');
  if(!video||!intro)return;
  let inView=false;
  // The intro remains in the sticky stage, so visibility also controls decoding.
  const sync=()=>{
   const visible=inView&&intro.style.visibility!=='hidden'&&!document.hidden;
   if(visible){
    if(!video.getAttribute('src'))video.src=videoUrl('galaxia',mobile);
    if(video.paused)void video.play().catch(()=>{});
   }else if(!video.paused)video.pause();
  };
  const viewport=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync()},{threshold:.05});
  const visibility=new MutationObserver(sync);
  viewport.observe(video);
  visibility.observe(intro,{attributes:true,attributeFilter:['style']});
  document.addEventListener('visibilitychange',sync);
  return()=>{viewport.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',sync);video.pause();video.removeAttribute('src');video.load()};
 },[mobile]);
 return <video ref={ref} muted playsInline loop preload="none" poster="/assets/posters/galaxia-1.jpg" aria-label="PARALLAX GALÁXIA — entrada na jornada"/>;
}
