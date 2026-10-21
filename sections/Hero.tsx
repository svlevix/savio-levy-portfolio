'use client';
import {useState,useRef,useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export function Logo(){return <span className="logo"><img src="/assets/levy-art.png" alt="LEVY ART — Savio Levy" width="1011" height="141"/></span>}
export function Header(){
 const [open,setOpen]=useState(false),[workOpen,setWorkOpen]=useState(false);
 const close=()=>{setOpen(false);setWorkOpen(false)};
 return <header className="header" onKeyDown={e=>{if(e.key==='Escape')close()}}>
  <a href="/#inicio" aria-label="Savio Levy, início"><Logo/></a>
  <a className="wordmark" href="/#inicio">SAVIO LEVY<span>DESIGN & MOTION</span></a>
  <button className="menu-toggle" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'FECHAR −':'MENU +'}</button>
  <nav id="navigation" className={open?'open':''} aria-label="Navegação principal">
   <a href="/#inicio" onClick={close}>Início</a><a href="/#sobre" onClick={close}>Sobre</a>
   <div className={'work-menu '+(workOpen?'expanded':'')} onMouseLeave={e=>{if(!e.currentTarget.contains(document.activeElement))setWorkOpen(false)}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setWorkOpen(false)}}>
    <button className="work-trigger" aria-expanded={workOpen} aria-controls="work-options" onClick={e=>setWorkOpen(value=>e.detail&&matchMedia('(hover: hover)').matches?true:!value)} onMouseEnter={()=>setWorkOpen(true)}>Trabalhos <span aria-hidden="true">⌄</span></button>
    <div id="work-options" className="work-options">
     <a href="/#motion-design" onClick={close}>Motion Design <span aria-hidden="true">↗</span></a>
     <a href="/#design-social-media" onClick={close}>Design Social Media <span aria-hidden="true">↗</span></a>
    </div>
   </div>
   <a href="/#contato" onClick={close}>Contato</a>
  </nav>
 </header>
}
export default function Hero(){const root=useRef<HTMLElement>(null);useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.timeline({defaults:{ease:'power3.out'}}).fromTo('.hero-type',{x:-60,opacity:0},{x:0,opacity:1,duration:1.5}).from('.portrait',{y:28,opacity:0,duration:1.6},.18).from('.title-line>span',{yPercent:110,duration:1.1,stagger:.12},.4);gsap.to('.portrait',{y:40,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:1}});},root);return()=>ctx.revert()});return()=>mm.revert()},[]);return <><Header/><section ref={root} className="hero" id="inicio"><div className="hero-type" aria-hidden="true">SAVIO</div><div className="portrait-wrap"><img className="portrait" src="/assets/hero-cutout.png" alt="Retrato de Savio Levy" fetchPriority="high"/><svg className="portrait-overlay" viewBox="0 0 400 380" aria-hidden="true"><path d="M38 225 A166 166 0 0 1 312 78 M355 122 A166 166 0 0 1 295 329 M76 54h40 M96 34v40 M306 297h42 M327 276v43"/><ellipse cx="198" cy="178" rx="176" ry="94" transform="rotate(-28 198 178)"/><circle cx="345" cy="100" r="3"/><circle cx="50" cy="286" r="3"/></svg></div><div className="hero-copy"><h1><span className="title-line"><span>Designer Gráfico</span></span><span className="title-line"><span>& Motion Designer<b>.</b></span></span></h1><p>Atuo com design gráfico e motion design, desenvolvendo identidades, campanhas e conteúdos visuais pensados para gerar conexão, valor e presença digital.</p><a className="button" href="https://wa.me/5592992430216" target="_blank" rel="noreferrer">Fale comigo <span>↗</span></a></div><div className="hero-bottom"><a href="#motion">ROLE PARA EXPLORAR <span>↓</span></a><span>DESIGN, IDENTIDADE E MOVIMENTO.</span><span>01 / PORTFÓLIO</span></div></section></>}
