import {projects,socialProjects,socialImage,contacts, type SocialProject} from '../utils/content';
import {Logo} from './Hero';
import Media from '../components/Media';
import {Mail,ArrowUpRight,MessageCircle} from 'lucide-react';
function Instagram({size=20}:{size?:number}){return <img src="/assets/instagram.png" width={size} height={size} alt="" aria-hidden="true"/>}
function Facebook({size=20}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-3H14V8c0-1 .3-2 2-2h2V3c-.7-.1-1.8-.2-3-.2-3 0-5 1.8-5 5.2v2H7v3h3v9z"/></svg>}
function SocialCard({project:p,index}:{project:SocialProject;index:number}){
 return <a className={"project-card social-card "+(p.format==='Carrossel'?'carousel-card':'')} href={'/projetos/'+p.slug}>
  <div className="project-image"><img src={socialImage(p.format==='Carrossel'?p.slug+'-overview-thumb.webp':p.slug+'-thumb.webp')} loading="lazy" alt={p.format==='Carrossel'?`${p.title} — composição completa dos ${p.images.length} cards.`:p.alt[0]}/><span className="social-format">{p.format==='Carrossel'?`${p.images.length} CARDS`:'CARD'}</span><span className="project-open" aria-hidden="true">↗</span></div>
  <div className="project-caption"><span className="project-number">{String(index).padStart(2,'0')}</span><div><h4>{p.title}</h4><p>{p.client} · {p.format}</p></div><span aria-hidden="true">↗</span></div>
  <p className="project-description">{p.description}</p>
 </a>
}
export function Selected(){
 const featured=projects.find(p=>p.slug==='comeco')!;
 return <section className="selected light section-pad" id="trabalhos">
  <div className="section-top"><span className="section-number">03 / TRABALHOS</span><span>CONCEITO → IMAGEM → MOVIMENTO</span></div>
  <div className="section-heading"><h2>Projetos<br/><em>selecionados.</em></h2><p>Uma seleção de trabalhos que representam meu processo criativo, minha linguagem visual e minha forma de transformar conceito em resultado.</p></div>
  <div className="work-categories" aria-label="Categorias de trabalhos"><a href="#motion-design">01 / Motion Design <span>↓</span></a><a href="#design-social-media">02 / Design Social Media <span>↓</span></a></div>
  <section className="work-category" id="motion-design" aria-labelledby="motion-heading">
   <div className="category-heading"><div><span className="eyebrow">01 / IMAGENS EM MOVIMENTO</span><h3 id="motion-heading">Motion Design<span>.</span></h3></div></div>
   <article className="featured featured-horizontal"><div className="featured-info"><span className="eyebrow">EM DESTAQUE / 01</span><h4>MOTION<br/>POLÍTICO</h4><p>{featured.description}</p><div className="tags"><span>Motion Design</span><span>Comunicação política</span></div><a className="button" href="/projetos/comeco">Ver projeto <ArrowUpRight size={20}/></a></div><div className="featured-film"><span className="vertical-label">MENSAGEM EM MOVIMENTO</span><Media slug="comeco" title="Motion Político — vídeo completo"/><span className="film-index">1920 × 1080<br/>{featured.duration.toFixed(2)}s / MOTION</span></div></article>
   <div className="project-grid">{projects.filter(p=>p.slug!==featured.slug).map((p,i)=><a className={'project-card '+(p.vertical?'vertical':'horizontal')} href={'/projetos/'+p.slug} key={p.slug}><div className="project-image"><img src={'/assets/posters/'+p.slug+'.jpg'} loading="lazy" alt={'Frame de '+p.title}/><span className="project-open" aria-hidden="true">↗</span></div><div className="project-caption"><span className="project-number">{String(i+2).padStart(2,'0')}</span><div><h4>{p.title}</h4><p>{p.category}</p></div><span aria-hidden="true">↗</span></div></a>)}</div>
  </section>
  <section className="work-category social-section" id="design-social-media" aria-labelledby="social-heading">
   <div className="category-heading"><div><span className="eyebrow">02 / CONTEÚDO QUE CONECTA</span><h3 id="social-heading">Design<br/>Social Media<span>.</span></h3></div><p>Composição, hierarquia e identidade visual para marcas nas redes sociais.</p></div>
   <div className="social-group-heading"><h4>Cards</h4><span>UMA IMAGEM, UMA MENSAGEM.</span></div>
   <div className="project-grid social-grid">{socialProjects.filter(p=>p.format==='Card').map((p,i)=><SocialCard key={p.slug} project={p} index={i+1}/>)}</div>
   <div className="social-group-heading"><h4>Carrosséis</h4><span>IDEIAS QUE SE CONECTAM EM SEQUÊNCIA.</span></div>
   <div className="project-grid social-grid carousel-grid">{socialProjects.filter(p=>p.format==='Carrossel').map((p,i)=><SocialCard key={p.slug} project={p} index={i+5}/>)}</div>
  </section>
 </section>
}
export function About(){return <section className="about light section-pad" id="sobre"><div className="section-top"><span className="section-number">02 / SOBRE</span><span>POR TRÁS DO MOVIMENTO</span></div><div className="about-grid"><div className="about-photo"><img src="/assets/portrait.png" alt="Savio Levy" loading="lazy"/><span>SAVIO LEVY<br/>DESIGNER & MOTION DESIGNER</span></div><div className="about-copy"><p className="eyebrow">IDEIAS GANHAM FORMA.</p><h2>Sobre<span>.</span></h2><h3>Sou Savio Levy,<br/>designer gráfico<br/>e motion designer.</h3><p>Desenvolvo projetos visuais com foco em identidade, comunicação e impacto. Meu trabalho envolve a criação de marcas, peças digitais, conteúdos visuais e motion design, sempre buscando unir estética, clareza e presença.</p><div className="expertise"><span>Design gráfico</span><span>Identidade visual</span><span>Motion design</span><span>Conteúdo digital</span></div></div></div></section>}
export function Contact(){return <section className="contact light section-pad" id="contato"><div className="section-top"><span className="section-number">04 / CONTATO</span><span>SUA PRÓXIMA IDEIA COMEÇA AQUI.</span></div><h2>Vamos<br/><em>conversar?</em><span className="contact-arrow" aria-hidden="true">↗</span></h2><div className="contact-bottom"><p>Se você tem um projeto, uma ideia ou quer desenvolver algo visualmente forte para sua marca, será um prazer falar com você.</p><a className="button" href={contacts.whatsapp} target="_blank" rel="noreferrer">Fale comigo <ArrowUpRight size={22}/></a></div></section>}
export function Footer(){return <footer className="footer"><a className="footer-brand" href="/#inicio"><Logo/></a><div className="socials">{[[Instagram,'Instagram',contacts.instagram],[Facebook,'Facebook',contacts.facebook],[Mail,'E-mail',contacts.email],[MessageCircle,'WhatsApp',contacts.whatsapp]].map(([Icon,label,url])=>{const I=Icon as typeof Instagram;return <a key={String(label)} href={String(url)} target="_blank" rel="noreferrer" aria-label={String(label)}><I size={20}/></a>})}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Savio Levy</span><a href={contacts.email}>SAVIOLEVY12@GMAIL.COM</a><a href="/#inicio">VOLTAR AO TOPO ↑</a></div></footer>}
