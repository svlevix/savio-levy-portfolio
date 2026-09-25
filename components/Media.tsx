'use client';
import {useEffect,useRef,useState} from 'react';
import {videoUrl} from '../utils/content';
// Only attach a video source when it is near the viewport. Stop offscreen decoding.
export default function Media({slug,title,auto=false,className=''}:{slug:string,title:string,auto?:boolean,className?:string}){
 const ref=useRef<HTMLVideoElement>(null);const [failed,setFailed]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const mobile=matchMedia('(max-width: 800px)').matches;const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){if(!el.getAttribute('src'))el.src=videoUrl(slug,mobile);if(auto&&!reduced)el.play().catch(()=>{});}else el.pause();}},{rootMargin:'100px',threshold:.05});observer.observe(el);return()=>{observer.disconnect();el.pause();el.removeAttribute('src');el.load();};},[slug,auto]);
 return <div className={'media '+className}><video ref={ref} poster={`/assets/posters/${slug}.jpg`} aria-label={title} muted={auto} playsInline loop={auto} controls={!auto} preload="none" onError={()=>setFailed(true)}/>{failed&&<p className="media-error">Não foi possível reproduzir. <a href={videoUrl(slug)}>Abrir vídeo</a></p>}</div>
}
