import * as THREE from 'three';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {projects,videoUrl} from '../utils/content';
import {mountGalleryScreen} from './galleryFixtures';
const clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v));
type Panel={mesh:THREE.Mesh<THREE.PlaneGeometry,THREE.MeshBasicMaterial>;group:THREE.Group;video:HTMLVideoElement|null;texture:THREE.VideoTexture|null;poster:THREE.Texture;slug:string;z:number;index:number};
export function createJourney(section:HTMLElement,host:HTMLElement,progress:HTMLElement){
 gsap.registerPlugin(ScrollTrigger);const mobile=matchMedia('(max-width:800px)').matches;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#06070a');scene.fog=new THREE.FogExp2('#06070a',mobile?.018:.012);
 const camera=new THREE.PerspectiveCamera(mobile?58:53,1,.1,100);camera.position.set(0,1.5,8);
 const renderer=new THREE.WebGLRenderer({antialias:!mobile,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.65));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Túnel 3D com os projetos de Savio Levy');renderer.domElement.setAttribute('role','img');
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
 const ambient=new THREE.AmbientLight('#b6c8ff',.6);scene.add(ambient);const key=new THREE.PointLight('#ccd9ff',42,25,2);scene.add(key);const blue=new THREE.PointLight('#0145f2',50,22,2);scene.add(blue);
 // Option 3: graphite gallery. Keep the existing corridor dimensions and module spacing.
 const metal=new THREE.MeshStandardMaterial({color:'#161b23',metalness:.88,roughness:.23,envMapIntensity:.5});
 const architecture=new THREE.Group();scene.add(architecture);
 const cobalt=new THREE.MeshStandardMaterial({color:'#12151c',metalness:.75,roughness:.37,envMapIntensity:.3,side:THREE.DoubleSide});
 const cobaltFloor=new THREE.MeshPhysicalMaterial({color:'#070a10',metalness:.12,roughness:.3,clearcoat:.12,specularIntensity:.06,envMapIntensity:.08,side:THREE.DoubleSide});
 const cobaltCeiling=new THREE.MeshPhysicalMaterial({color:'#11151c',metalness:.18,roughness:.5,specularIntensity:.08,envMapIntensity:.08,side:THREE.DoubleSide});
 const seamMat=new THREE.MeshBasicMaterial({color:'#303744'});
 const porcelain=new THREE.MeshStandardMaterial({color:'#343c49',metalness:.9,roughness:.24,envMapIntensity:.6,side:THREE.DoubleSide});
 const insetMat=new THREE.MeshPhysicalMaterial({color:'#080e18',metalness:.45,roughness:.23,clearcoat:.3,clearcoatRoughness:.25,specularIntensity:.1,envMapIntensity:.12,side:THREE.DoubleSide});
 const accent=new THREE.MeshBasicMaterial({color:'#0145f2',toneMapped:false,side:THREE.DoubleSide});
 const haloAccent=new THREE.RingGeometry(1.58,1.64,mobile?32:64);
 const wallGeometry=new THREE.PlaneGeometry(10,215);
 for(const side of [-1,1]){const wall=new THREE.Mesh(wallGeometry,cobalt);wall.rotation.set(0,side*Math.PI/2,Math.PI/2);wall.position.set(side*6,1,-89);architecture.add(wall);}
 for(const top of [false,true]){const plane=new THREE.Mesh(new THREE.PlaneGeometry(12,215),top?cobaltCeiling:cobaltFloor);plane.rotation.x=top?Math.PI/2:-Math.PI/2;plane.position.set(0,top?6:-4,-89);architecture.add(plane);}
 // Reuse geometries across modules, with half as many repeats on phones.
 const spacing=mobile?10:6.2;const modules=mobile?21:34;
 const haloGeometry=new THREE.RingGeometry(1.48,1.78,mobile?32:64);
 const portalRing=new THREE.RingGeometry(1.05,1.47,mobile?28:48);
 const portalInner=new THREE.CircleGeometry(1.055,mobile?28:48);
 const portalBase=new THREE.PlaneGeometry(2.1,3.1);
 const dotGeo=new THREE.CircleGeometry(.16,16);
 for(let i=0;i<modules;i++){const z=10-i*spacing;const module=new THREE.Group();module.position.z=z;architecture.add(module);
  for(const top of [false,true]){const ring=new THREE.Mesh(haloGeometry,porcelain);ring.rotation.x=top?Math.PI/2:-Math.PI/2;ring.position.set(0,top?5.98:-3.98,0);module.add(ring);const illumination=new THREE.Mesh(haloAccent,accent);illumination.rotation.copy(ring.rotation);illumination.position.copy(ring.position);illumination.position.y+=top?-.015:.015;module.add(illumination);const seam=new THREE.Mesh(new THREE.BoxGeometry(12,.025,.035),seamMat);seam.position.set(0,top?5.96:-3.96,-spacing/2);module.add(seam);}
  for(const side of [-1,1]){const portal=new THREE.Group();portal.position.set(side*5.97,.8,0);portal.rotation.y=-side*Math.PI/2;module.add(portal);
   const ring=new THREE.Mesh(portalRing,porcelain);ring.scale.y=1.5;portal.add(ring);
   const rim=new THREE.Mesh(new THREE.TorusGeometry(1.27,.055,6,mobile?28:48),metal);rim.scale.y=1.5;rim.position.z=.035;portal.add(rim);
   const rimLight=new THREE.Mesh(new THREE.TorusGeometry(1.12,.018,4,mobile?28:48),accent);rimLight.scale.y=1.5;rimLight.position.z=.048;portal.add(rimLight);
   // Curved metallic wall recess, with a narrow blue light integrated into its inner edge.
   const outline=new THREE.Shape();outline.moveTo(-1.8,-3.5);outline.lineTo(-1.8,3);outline.quadraticCurveTo(-1.8,3.7,-1.1,3.7);outline.lineTo(1.1,3.7);outline.quadraticCurveTo(1.8,3.7,1.8,3);outline.lineTo(1.8,-3.5);outline.quadraticCurveTo(1.8,-4.2,1.1,-4.2);outline.lineTo(-1.1,-4.2);outline.quadraticCurveTo(-1.8,-4.2,-1.8,-3.5);
   const curve=new THREE.CatmullRomCurve3(outline.getPoints(mobile?6:10).map(v=>new THREE.Vector3(v.x,v.y,.04)),true);
   portal.add(new THREE.Mesh(new THREE.TubeGeometry(curve,mobile?40:64,.085,6,true),porcelain));
   if(i%2===0){const trace=new THREE.Mesh(new THREE.TubeGeometry(curve,mobile?40:64,.015,3,true),accent);trace.position.z=.09;portal.add(trace);}
   const inner=new THREE.Mesh(portalInner,insetMat);inner.scale.y=1.5;inner.position.z=-.015;portal.add(inner);
   const lower=new THREE.Mesh(portalBase,insetMat);lower.position.set(0,-1.55,-.01);portal.add(lower);
   const dot=new THREE.Mesh(dotGeo,metal);dot.position.set(0,2.85,0);dot.scale.y=1.6;portal.add(dot);

   const seam=new THREE.Mesh(new THREE.BoxGeometry(.03,10,.03),seamMat);seam.position.set(side*5.94,1,-spacing/2);module.add(seam);
  }
 }
 const loader=new THREE.TextureLoader();
 const panels:Panel[]=[];
 // Only posters are initially uploaded to the GPU. Video sources are attached near the camera.
 projects.forEach((p,i)=>{const group=new THREE.Group();const h=mobile?(p.vertical?4.6:2.5):(p.vertical?4.5:3.5);const w=h*p.width/p.height;const z=-18-i*12.4;const x=mobile?0:(i%2===0?-1:1)*(p.vertical?3.5:3.6);group.position.set(x,.8,z);if(!mobile)group.rotation.y=(i%2===0?1:-1)*.24;
 const frame=new THREE.Mesh(new THREE.BoxGeometry(w+.10,h+.10,.24),metal);frame.position.z=-.13;group.add(frame);
 const poster=loader.load(`/assets/posters/${p.slug}.jpg`);poster.colorSpace=THREE.SRGBColorSpace;poster.minFilter=THREE.LinearFilter;
 const mat=new THREE.MeshBasicMaterial({map:poster,color:'#707988',toneMapped:false});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);mesh.position.z=.01;group.add(mesh);
 // A single wall-mounted articulated arm replaces the floor stand.
 mountGalleryScreen(group,i,i%2===0?-1:1,z,mobile,w,h);
 const backplate=new THREE.Mesh(new THREE.BoxGeometry(w*.88,h*.88,.075),porcelain);backplate.position.z=-.29;group.add(backplate);
 const statusLight=new THREE.Mesh(new THREE.BoxGeometry(.16,.016,.014),accent);statusLight.position.set(w/2-.18,-h/2-.025,.012);group.add(statusLight);
 const edge=new THREE.LineSegments(new THREE.EdgesGeometry(frame.geometry),new THREE.LineBasicMaterial({color:'#5d6a80',transparent:true,opacity:.3}));edge.position.copy(frame.position);group.add(edge);scene.add(group);panels.push({mesh,group,poster,video:null,texture:null,slug:p.slug,z,index:i});
 });
 let desired=0,drawn=0,visible=false,raf=0,dead=false,loadedIndex=-1,smokePrepared=false;const state={p:0};
 function release(panel:Panel){if(!panel.video)return;panel.video.pause();panel.video.removeAttribute('src');panel.video.load();panel.video=null;panel.mesh.material.map=panel.poster;panel.mesh.material.needsUpdate=true;panel.texture?.dispose();panel.texture=null;}
 function activate(index:number){if(index===loadedIndex)return;loadedIndex=index;panels.forEach((p,i)=>{if(i!==index)release(p)});if(index<0)return;const p=panels[index];const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';v.src=videoUrl(p.slug,mobile);p.video=v;p.texture=new THREE.VideoTexture(v);p.texture.colorSpace=THREE.SRGBColorSpace;v.addEventListener('loadeddata',()=>{if(p.video===v){p.mesh.material.map=p.texture;p.mesh.material.needsUpdate=true}});v.play().catch(()=>{});}
 const introEl=section.querySelector('.motion-intro') as HTMLElement;const screenEl=section.querySelector('.entry-screen') as HTMLElement;const morph=section.querySelector('.morph-logo') as HTMLElement;const exit=section.querySelector('.journey-exit') as HTMLElement;const stage=section.querySelector('.journey-stage') as HTMLElement;
 // Scroll progress alone can leave the sticky stage before its eased animation ends.
 // On a natural fast scroll, keep only the finale visible for a bounded interval;
 // the document continues scrolling and explicit navigation always bypasses it.
 let finishingAt=0,finishingFrom=.82,finished=false,finaleComplete=false,logoVisibleMs=0,lastFrame=0;
 let previousY=window.scrollY,lastInputAt=-Infinity,bypassUntil=window.location.hash?performance.now()+2500:0;
 const setSmokeActive=(active:boolean)=>{const value=active?'true':'false';if(exit.dataset.active!==value)exit.dataset.active=value};
 const releaseFinale=()=>{finishingAt=0;stage.classList.remove('is-finishing')};
 const noteInput=(event:Event)=>{if(event instanceof KeyboardEvent){if(event.key==='Escape'){releaseFinale();finished=true;return}if(!['ArrowDown','PageDown','End',' '].includes(event.key))return}lastInputAt=performance.now()};
 const bypassNavigation=(event:Event)=>{const link=(event.target as Element).closest?.('a');if(link?.getAttribute('href')?.includes('#')){bypassUntil=performance.now()+2000;releaseFinale()}};
 const onScroll=()=>{
  const y=window.scrollY,now=performance.now(),rect=section.getBoundingClientRect();
  const end=y+rect.bottom-innerHeight,threshold=end-innerHeight*.2;
  if(rect.top>innerHeight){finished=false;finaleComplete=false;logoVisibleMs=0;}
  if(!finished&&!finishingAt&&y>previousY&&previousY<threshold&&y>=threshold&&now-lastInputAt<1800&&now>bypassUntil){
   finished=true;
   if(logoVisibleMs<1400){finishingAt=now;finishingFrom=Math.max(.82,drawn);stage.classList.add('is-finishing');visible=true;if(!raf)raf=requestAnimationFrame(render)}
  }
  if(finishingAt&&y<end-innerHeight)releaseFinale();
  previousY=y;
 };
 window.addEventListener('wheel',noteInput,{passive:true});window.addEventListener('touchmove',noteInput,{passive:true});window.addEventListener('keydown',noteInput);
 window.addEventListener('scroll',onScroll,{passive:true});document.addEventListener('click',bypassNavigation,true);
 const timeline=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:.45,invalidateOnRefresh:true},onUpdate:()=>{desired=state.p}});
 // Nonlinear travel: contemplative opening, quicker experimental section, final pause.
 timeline.to(state,{p:.13,duration:1.5,ease:'power1.inOut'}).to(state,{p:.53,duration:5,ease:'none'}).to(state,{p:.74,duration:1.7,ease:'none'}).to(state,{p:.84,duration:1,ease:'power1.out'}).to(state,{p:.91,duration:.8,ease:'none'}).to(state,{p:1,duration:1.3,ease:'power1.out'});
 function resize(){const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}resize();const ro=new ResizeObserver(resize);ro.observe(host);
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting||!!finishingAt;if(visible&&!raf)raf=requestAnimationFrame(render);if(!visible){panels.forEach(p=>p.video?.pause());setSmokeActive(false)}else{panels[loadedIndex]?.video?.play().catch(()=>{})}},{threshold:0});visibility.observe(stage);
 const target=new THREE.Vector3();const bgDark=new THREE.Color('#06070a'),bgLight=new THREE.Color('#edf1f5');
 function render(now:number){raf=0;if(dead||!visible)return;let p=desired;
 const elapsed=lastFrame?Math.min(now-lastFrame,100):0;lastFrame=now;
 if(finishingAt){
  const t=clamp((now-finishingAt-250)/900);p=THREE.MathUtils.lerp(finishingFrom,1,1-Math.pow(1-t,2));drawn=p;
  if(now-finishingAt>=2400){finaleComplete=true;releaseFinale();const rect=stage.getBoundingClientRect();visible=rect.bottom>0&&rect.top<innerHeight;if(!visible)return}
 }
 if(finaleComplete&&desired>.86)p=1;
 if(desired<.82)finaleComplete=false;
 drawn+=(p-drawn)*.1;p=drawn;progress.style.transform=`scaleX(${p})`;
 if(p>.986)logoVisibleMs+=elapsed;
 const entry=clamp(p/.13);introEl.style.opacity=String(1-clamp((entry-.68)/.32));introEl.style.visibility=p>.14?'hidden':'visible';screenEl.style.transform=`translate(-50%,-50%) perspective(1000px) rotateY(${-entry*12}deg) rotateX(${entry*5}deg) scale(${1+Math.pow(entry,3)*5})`;
 const travel=clamp((p-.12)/.68);let z=8-travel*176;if(p>.8)z=-168-clamp((p-.8)/.12)*7;
 camera.position.set(Math.sin(travel*Math.PI*3)*(mobile?.25:1.05),1.05+Math.sin(travel*9)*.25,z);target.set(Math.sin(travel*7)*.4,1,z-16);camera.lookAt(target);camera.rotateZ((mobile?.028:.09)*Math.sin(travel*5+1)*(1-clamp((p-.73)/.08)));
 key.position.set(camera.position.x+3,4,z-2);blue.position.set(-3,1,z-8);
 let nearest=-1,dist=Infinity;panels.forEach(panel=>{const d=camera.position.z-panel.z;const visiblePanel=d>-3&&d<(mobile?23:65)&&p<.83;panel.group.visible=visiblePanel;const l=clamp(1-(Math.abs(d-9)/28),.18,1);panel.mesh.material.color.setRGB(l,l,l);if(d>1&&d<20&&Math.abs(d-9)<dist){dist=Math.abs(d-9);nearest=panel.index}});if(p<.14||p>.78)nearest=-1;activate(nearest);
 if(mobile)panels.forEach(panel=>{panel.group.visible=panel.index===nearest;});
 if(p>.58&&!smokePrepared){smokePrepared=true;exit.querySelectorAll<HTMLImageElement>('.smoke-layer').forEach(image=>{image.loading='eager'})}
 // Keep both wordmarks fixed in the same position; only their opacity changes.
 const reveal=clamp((p-.72)/.1),fade=clamp((p-.91)/.065);
 exit.style.opacity=String(reveal*(1-fade));exit.style.visibility=p>.71&&p<.98?'visible':'hidden';setSmokeActive(p>.71&&p<.98&&visible&&!document.hidden);
 morph.style.opacity=String(fade);
 (scene.background as THREE.Color).copy(bgDark).lerp(bgLight,fade);scene.fog!.color.copy(scene.background as THREE.Color);
 architecture.visible=p<.985;section.dataset.light=fade>.5?'true':'false';stage.style.backgroundColor='#edf1f5';host.style.opacity=String(1-fade);
 renderer.render(scene,camera);raf=requestAnimationFrame(render);
 }
 const onVisibility=()=>{if(document.hidden){visible=false;panels.forEach(p=>p.video?.pause());setSmokeActive(false)}else{const r=stage.getBoundingClientRect();visible=r.bottom>0&&r.top<innerHeight;if(visible&&!raf)raf=requestAnimationFrame(render)}};document.addEventListener('visibilitychange',onVisibility);
 return()=>{dead=true;releaseFinale();cancelAnimationFrame(raf);window.removeEventListener('wheel',noteInput);window.removeEventListener('touchmove',noteInput);window.removeEventListener('keydown',noteInput);window.removeEventListener('scroll',onScroll);document.removeEventListener('click',bypassNavigation,true);timeline.scrollTrigger?.kill();timeline.kill();ro.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',onVisibility);panels.forEach(release);setSmokeActive(false);panels.forEach(p=>p.poster.dispose());const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();scene.traverse(obj=>{const m=obj as THREE.Mesh;if(m.geometry)geometries.add(m.geometry);if(m.material){(Array.isArray(m.material)?m.material:[m.material]).forEach(v=>materials.add(v))}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());env.dispose();renderer.dispose();renderer.domElement.remove();};
}
