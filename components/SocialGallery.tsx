'use client';
import {useRef,useState} from 'react';
import {socialImage} from '../utils/content';

export default function SocialGallery({images,alt,title}:{images:string[];alt:string[];title:string}){
 const [active,setActive]=useState(0);const rail=useRef<HTMLDivElement>(null);
 const go=(index:number)=>{const el=rail.current;if(!el)return;el.scrollTo({left:index*el.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
 return <div className={'social-gallery '+(images.length===1?'single':'')}>
  <div className="social-rail" ref={rail} role="region" aria-label={title} tabIndex={0}
   onScroll={e=>{const el=e.currentTarget;setActive(Math.round(el.scrollLeft/el.clientWidth))}}
   onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();go(Math.min(images.length-1,active+1))}if(e.key==='ArrowLeft'){e.preventDefault();go(Math.max(0,active-1))}}}>
   {images.map((file,i)=><figure className="social-slide" key={file}><img src={socialImage(file)} alt={alt[i]} loading={i===0?'eager':'lazy'} draggable={false}/></figure>)}
  </div>
  {images.length>1&&<><div className="gallery-controls"><button onClick={()=>go(active-1)} disabled={active===0} aria-label="Card anterior">←</button><span aria-live="polite">{String(active+1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}</span><button onClick={()=>go(active+1)} disabled={active===images.length-1} aria-label="Próximo card">→</button></div><div className="gallery-thumbnails" aria-label="Escolher card">{images.map((file,i)=><button key={file} onClick={()=>go(i)} aria-label={`Ver card ${i+1}`} aria-current={active===i?'true':undefined}><img src={socialImage(file)} alt="" loading="lazy"/><span>{i+1}</span></button>)}</div></>}
 </div>
}
