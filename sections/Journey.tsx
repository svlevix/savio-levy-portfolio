'use client';
import {useEffect,useRef,useState} from 'react';
import {Logo} from './Hero';
import EntryVideo from '../components/EntryVideo';
import JourneyExit from '../components/JourneyExit';
export default function Journey(){const wrap=useRef<HTMLElement>(null),canvas=useRef<HTMLDivElement>(null),progress=useRef<HTMLDivElement>(null);const [reduced,setReduced]=useState(false),[failed,setFailed]=useState(false),[mobile,setMobile]=useState(false);
 useEffect(()=>{const m=matchMedia('(max-width:800px)');const update=()=>setMobile(m.matches);update();m.addEventListener('change',update);return()=>m.removeEventListener('change',update)},[]);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{if(reduced||!wrap.current||!canvas.current)return;let disposed=false,cleanup:(()=>void)|undefined;const el=wrap.current;const observer=new IntersectionObserver(async entries=>{if(!entries[0].isIntersecting)return;observer.disconnect();try{const {createJourney}=await import('../three/createJourney');if(disposed)return;cleanup=createJourney(el,canvas.current!,progress.current!)}catch(e){console.error(e);setFailed(true)}},{rootMargin:'700px'});observer.observe(el);return()=>{disposed=true;observer.disconnect();cleanup?.()}},[reduced,mobile]);
 if(reduced||failed)return <section className="calm-journey" id="motion" aria-label="Assinatura LEVY ART"><JourneyExit/><a className="button" href="#sobre">Pular para Sobre mim ↓</a></section>;
 return <section ref={wrap} className="journey" id="motion" aria-label="Jornada cinematográfica pelos projetos"><div className="journey-stage"><div className="journey-canvas" ref={canvas}/><div className="motion-intro"><div className="entry-screen"><EntryVideo mobile={mobile}/></div></div><div className="journey-hud"><a href="#sobre">PULAR PARA SOBRE MIM ↗</a><div className="journey-track"><div ref={progress}/></div></div><JourneyExit/><div className="morph-logo"><Logo/></div></div></section>
}
