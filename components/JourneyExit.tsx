import {Logo} from '../sections/Hero';

export default function JourneyExit(){
 return <div className="journey-exit" aria-hidden="true" data-active="false">
  <div className="exit-haze"/>
  <div className="exit-smoke">
   {[1,2,3].map(n=><picture key={n}><source media="(max-width:800px)" srcSet={'/assets/smoke/layer-'+Math.min(n,2)+'-mobile.webp'}/><img className={'smoke-layer smoke-layer-'+n} src={'/assets/smoke/layer-'+n+'.webp'} alt="" width={1280} height={720} loading="lazy" decoding="async" draggable={false}/></picture>)}
  </div>
  <div className="exit-logo"><Logo/></div>
 </div>
}
