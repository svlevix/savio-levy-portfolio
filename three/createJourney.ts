import * as THREE from 'three';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {projects,videoUrl} from '../utils/content';
import {mountGalleryScreen} from './galleryFixtures';
import {createFracturedGlass} from './fracturedGlass';
const clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v));
const smooth=(v:number)=>{const t=clamp(v);return t*t*(3-2*t)};
// The same angular S silhouette as the supplied brand, extruded into dark metal.
function brandGeometry(){const points=[[416,386],[742,386],[887,500],[887,567],[729,567],[729,500],[569,500],[569,575],[887,720],[886,965],[556,965],[416,857],[416,785],[568,785],[568,854],[729,854],[729,784],[416,641]];const shape=new THREE.Shape();points.forEach(([x,y],i)=>{const a=(x-652)/290,b=(676-y)/290;if(i)shape.lineTo(a,b);else shape.moveTo(a,b)});shape.closePath();return new THREE.ExtrudeGeometry(shape,{depth:.32,bevelEnabled:true,bevelThickness:.055,bevelSize:.04,bevelSegments:3,steps:1})}
type Panel={mesh:THREE.Mesh<THREE.PlaneGeometry,THREE.MeshBasicMaterial>;group:THREE.Group;video:HTMLVideoElement|null;texture:THREE.VideoTexture|null;poster:THREE.Texture;slug:string;z:number;index:number};
export function createJourney(section:HTMLElement,host:HTMLElement,progress:HTMLElement,label:HTMLElement){
 gsap.registerPlugin(ScrollTrigger);const mobile=matchMedia('(max-width:800px)').matches;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#06070a');scene.fog=new THREE.FogExp2('#06070a',mobile?.018:.012);
 const camera=new THREE.PerspectiveCamera(mobile?58:53,1,.1,100);camera.position.set(0,1.5,8);
 const renderer=new THREE.WebGLRenderer({antialias:!mobile,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.65));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Túnel 3D com os projetos de Savio Levy');renderer.domElement.setAttribute('role','img');
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
 const ambient=new THREE.AmbientLight('#c6cedb',.38);scene.add(ambient);const key=new THREE.PointLight('#ccd9ff',42,25,2);scene.add(key);const blue=new THREE.PointLight('#0145f2',28,18,2);scene.add(blue);const displayLight=new THREE.SpotLight('#c7d6ed',mobile?0:22,32,.8,.8,2);displayLight.castShadow=!mobile;displayLight.shadow.mapSize.set(512,512);displayLight.shadow.bias=-.001;displayLight.shadow.normalBias=.03;scene.add(displayLight,displayLight.target);
 // Option 3: graphite gallery. Keep the existing corridor dimensions and module spacing.
 const metal=new THREE.MeshStandardMaterial({color:'#161b23',metalness:.88,roughness:.23,envMapIntensity:.5});
 const architecture=new THREE.Group();scene.add(architecture);
 const cobalt=new THREE.MeshStandardMaterial({color:'#12151c',metalness:.75,roughness:.44,envMapIntensity:.16,side:THREE.DoubleSide});
 const cobaltFloor=new THREE.MeshPhysicalMaterial({color:'#070a10',metalness:.12,roughness:.3,clearcoat:.12,specularIntensity:.06,envMapIntensity:.08,side:THREE.DoubleSide});
 const cobaltCeiling=new THREE.MeshPhysicalMaterial({color:'#11151c',metalness:.18,roughness:.5,specularIntensity:.08,envMapIntensity:.08,side:THREE.DoubleSide});
 const seamMat=new THREE.MeshBasicMaterial({color:'#303744'});
 const porcelain=new THREE.MeshStandardMaterial({color:'#343c49',metalness:.9,roughness:.38,envMapIntensity:.32,side:THREE.DoubleSide});
 const insetMat=new THREE.MeshPhysicalMaterial({color:'#080e18',metalness:.45,roughness:.23,clearcoat:.3,clearcoatRoughness:.25,specularIntensity:.1,envMapIntensity:.12,side:THREE.DoubleSide});
 const accent=new THREE.MeshBasicMaterial({color:'#0145f2',toneMapped:false,side:THREE.DoubleSide});
 const haloAccent=new THREE.RingGeometry(1.58,1.64,mobile?32:64);
 const wallGeometry=new THREE.PlaneGeometry(10,215);
 for(const side of [-1,1]){const wall=new THREE.Mesh(wallGeometry,cobalt);wall.rotation.set(0,side*Math.PI/2,Math.PI/2);wall.position.set(side*6,1,-89);wall.receiveShadow=true;architecture.add(wall);}
 for(const top of [false,true]){const plane=new THREE.Mesh(new THREE.PlaneGeometry(12,215),top?cobaltCeiling:cobaltFloor);plane.rotation.x=top?Math.PI/2:-Math.PI/2;plane.position.set(0,top?6:-4,-89);plane.receiveShadow=true;architecture.add(plane);}
 // Reuse geometries across modules, with half as many repeats on phones.
 const spacing=mobile?10:6.2;const modules=mobile?21:34;
 const haloShape=new THREE.Shape();haloShape.absarc(0,0,1.78,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(0,0,1.48,0,Math.PI*2,true);haloShape.holes.push(hole);
 const haloGeometry=new THREE.ExtrudeGeometry(haloShape,{depth:.13,bevelEnabled:true,bevelSize:.018,bevelThickness:.018,bevelSegments:1,curveSegments:mobile?16:40});
 const portalRing=new THREE.RingGeometry(1.05,1.47,mobile?28:48);
 const portalInner=new THREE.CircleGeometry(1.055,mobile?28:48);
 const portalBase=new THREE.PlaneGeometry(2.1,3.1);
 const dotGeo=new THREE.CircleGeometry(.16,16);
 for(let i=0;i<modules;i++){const z=10-i*spacing;const bay=new THREE.Group();bay.position.z=z;architecture.add(bay);
  for(const top of [false,true]){const ring=new THREE.Mesh(haloGeometry,porcelain);ring.rotation.x=top?Math.PI/2:-Math.PI/2;ring.position.set(0,top?5.94:-3.94,0);const variation=.93+(i%3)*.07;ring.scale.setScalar(variation);bay.add(ring);const illumination=new THREE.Mesh(haloAccent,accent);illumination.scale.copy(ring.scale);illumination.rotation.copy(ring.rotation);illumination.position.copy(ring.position);illumination.position.y+=top?-.14:.14;bay.add(illumination);const seam=new THREE.Mesh(new THREE.BoxGeometry(12,.025,.035),seamMat);seam.position.set(0,top?5.96:-3.96,-spacing/2);bay.add(seam);}
  for(const side of [-1,1]){const portal=new THREE.Group();portal.position.set(side*5.97,.8,0);portal.rotation.y=-side*Math.PI/2;bay.add(portal);
   const ring=new THREE.Mesh(portalRing,porcelain);ring.scale.y=1.5;portal.add(ring);
   const rim=new THREE.Mesh(new THREE.TorusGeometry(1.27,.055,6,mobile?28:48),metal);rim.scale.y=1.5;rim.position.z=.035;portal.add(rim);
   const rimLight=new THREE.Mesh(new THREE.TorusGeometry(1.12,.018,4,mobile?28:48),accent);rimLight.scale.y=1.5;rimLight.position.z=.048;portal.add(rimLight);
   // Curved metallic wall recess, with a narrow blue light integrated into its inner edge.
   const outline=new THREE.Shape();outline.moveTo(-1.8,-3.5);outline.lineTo(-1.8,3);outline.quadraticCurveTo(-1.8,3.7,-1.1,3.7);outline.lineTo(1.1,3.7);outline.quadraticCurveTo(1.8,3.7,1.8,3);outline.lineTo(1.8,-3.5);outline.quadraticCurveTo(1.8,-4.2,1.1,-4.2);outline.lineTo(-1.1,-4.2);outline.quadraticCurveTo(-1.8,-4.2,-1.8,-3.5);
   const curve=new THREE.CatmullRomCurve3(outline.getPoints(mobile?6:10).map(v=>new THREE.Vector3(v.x,v.y,.04)),true);
   portal.add(new THREE.Mesh(new THREE.TubeGeometry(curve,mobile?40:64,.14,6,true),porcelain));
   if(i%2===0){const trace=new THREE.Mesh(new THREE.TubeGeometry(curve,mobile?40:64,.015,3,true),accent);trace.position.z=.155;portal.add(trace);}
   const inner=new THREE.Mesh(portalInner,insetMat);inner.scale.y=1.5;inner.position.z=-.015;portal.add(inner);
   const lower=new THREE.Mesh(portalBase,insetMat);lower.position.set(0,-1.55,-.01);portal.add(lower);
   const dot=new THREE.Mesh(dotGeo,metal);dot.position.set(0,2.85,0);dot.scale.y=1.6;portal.add(dot);

   const seam=new THREE.Mesh(new THREE.BoxGeometry(.03,10,.03),seamMat);seam.position.set(side*5.94,1,-spacing/2);bay.add(seam);
  }
 }
 const s=new THREE.Mesh(brandGeometry(),new THREE.MeshPhysicalMaterial({color:'#252c38',metalness:.95,roughness:.28,envMapIntensity:.6,clearcoat:.35,clearcoatRoughness:.18,emissive:'#001844',emissiveIntensity:.22}));scene.add(s);const sEdge=new THREE.LineSegments(new THREE.EdgesGeometry(s.geometry,35),new THREE.LineBasicMaterial({color:'#0145f2',transparent:true,opacity:.32}));s.add(sEdge);
 const loader=new THREE.TextureLoader();const panels:Panel[]=[];
 // Only posters are initially uploaded to the GPU. Video sources are attached near the camera.
 projects.forEach((p,i)=>{const group=new THREE.Group();const h=mobile?(p.vertical?4.6:2.5):(p.vertical?4.5:3.5);const w=h*p.width/p.height;const z=-18-i*12.4;const x=mobile?0:(i%2===0?-1:1)*(p.vertical?3.5:3.6);group.position.set(x,.8+(mobile?0:Math.sin(i*1.7)*.22),z);if(!mobile)group.rotation.y=(i%2===0?1:-1)*.24;
 const frame=new THREE.Mesh(new THREE.BoxGeometry(w+.10,h+.10,.24),metal);frame.castShadow=!mobile;frame.receiveShadow=!mobile;frame.position.z=-.13;group.add(frame);
 const poster=loader.load(`/assets/posters/${p.slug}.jpg`);poster.colorSpace=THREE.SRGBColorSpace;poster.minFilter=THREE.LinearFilter;
 const mat=new THREE.MeshBasicMaterial({map:poster,color:'#707988',toneMapped:false});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);mesh.position.z=.01;group.add(mesh);
 // A single wall-mounted articulated arm replaces the floor stand.
 mountGalleryScreen(group,i,i%2===0?-1:1,z,mobile,w,h);
 if(!mobile){const sheen=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshPhysicalMaterial({color:'#d5e5f7',metalness:.1,roughness:.18,transparent:true,opacity:.045,clearcoat:.5,envMapIntensity:.3,depthWrite:false}));sheen.position.z=.025;group.add(sheen);}
 const backplate=new THREE.Mesh(new THREE.BoxGeometry(w*.88,h*.88,.075),porcelain);backplate.position.z=-.29;group.add(backplate);
 const statusLight=new THREE.Mesh(new THREE.BoxGeometry(.16,.016,.014),accent);statusLight.position.set(w/2-.18,-h/2-.025,.012);group.add(statusLight);
 const edge=new THREE.LineSegments(new THREE.EdgesGeometry(frame.geometry),new THREE.LineBasicMaterial({color:'#5d6a80',transparent:true,opacity:.3}));edge.position.copy(frame.position);group.add(edge);scene.add(group);panels.push({mesh,group,poster,video:null,texture:null,slug:p.slug,z,index:i});
 });
 // Typography sits inside the architecture, away from the central sightline.
 const finalZ=-180;const intro=document.createElement('video');intro.muted=true;intro.playsInline=true;intro.preload='none';intro.setAttribute('aria-hidden','true');const introTexture=new THREE.VideoTexture(intro);introTexture.colorSpace=THREE.SRGBColorSpace;const finalPoster=loader.load('/assets/posters/intro-2.jpg');finalPoster.colorSpace=THREE.SRGBColorSpace;
 const finalGroup=new THREE.Group();finalGroup.position.set(0,1,finalZ);const fw=mobile?Math.min(6,host.clientWidth/host.clientHeight*7.35*2*Math.tan(THREE.MathUtils.degToRad(58)/2)*.88):12,fh=fw*9/16;const finalScreen=new THREE.Mesh(new THREE.PlaneGeometry(fw,fh),new THREE.MeshBasicMaterial({map:finalPoster,toneMapped:false}));finalGroup.add(finalScreen);
 const glassMat=new THREE.MeshPhysicalMaterial({color:'#e6eff7',metalness:0,roughness:.07,transmission:mobile?0:.96,transparent:true,opacity:mobile?.07:.2,thickness:.18,ior:1.46,envMapIntensity:.4,side:THREE.DoubleSide});const glass=new THREE.Mesh(new THREE.BoxGeometry(fw+.16,fh+.16,.18),glassMat);glass.position.z=.12;finalGroup.add(glass);const glassEdges=new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry),new THREE.LineBasicMaterial({color:'#7b91b8',transparent:true,opacity:.6}));glassEdges.position.copy(glass.position);finalGroup.add(glassEdges);scene.add(finalGroup);
 const fracture=createFracturedGlass(fw+.16,fh+.16,mobile);fracture.group.position.copy(finalGroup.position);scene.add(fracture.group);finalGroup.add(fracture.cracks);
 let desired=0,drawn=0,visible=false,raf=0,dead=false,introStarted=false,introDone=false,introEndedAt=0,loadedIndex=-1,lastLabel='',lastFrame=0;const state={p:0};
 function release(panel:Panel){if(!panel.video)return;panel.video.pause();panel.video.removeAttribute('src');panel.video.load();panel.video=null;panel.mesh.material.map=panel.poster;panel.mesh.material.needsUpdate=true;panel.texture?.dispose();panel.texture=null;}
 function activate(index:number){if(index===loadedIndex)return;loadedIndex=index;panels.forEach((p,i)=>{if(i!==index)release(p)});if(index<0)return;const p=panels[index];const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';v.src=videoUrl(p.slug,mobile);p.video=v;p.texture=new THREE.VideoTexture(v);p.texture.colorSpace=THREE.SRGBColorSpace;v.addEventListener('loadeddata',()=>{if(p.video===v){p.mesh.material.map=p.texture;p.mesh.material.needsUpdate=true}});v.play().catch(()=>{});}
 intro.addEventListener('error',()=>{introDone=true;introEndedAt=performance.now()});
 intro.addEventListener('ended',()=>{introDone=true;introEndedAt=performance.now()});
 const introEl=section.querySelector('.motion-intro') as HTMLElement;const screenEl=section.querySelector('.entry-screen') as HTMLElement;const wordA=section.querySelector('.motion-word') as HTMLElement;const wordB=section.querySelector('.designer-word') as HTMLElement;const morph=section.querySelector('.morph-logo') as HTMLElement;const stage=section.querySelector('.journey-stage') as HTMLElement;
 const timeline=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:.8,invalidateOnRefresh:true},onUpdate:()=>{desired=state.p}});
 // Nonlinear travel: contemplative opening, quicker experimental section, final pause.
 timeline.to(state,{p:.13,duration:1.5,ease:'power1.inOut'}).to(state,{p:.53,duration:5,ease:'none'}).to(state,{p:.74,duration:1.7,ease:'none'}).to(state,{p:.84,duration:2,ease:'power1.out'}).to(state,{p:.875,duration:1.5,ease:'none'}).to(state,{p:.897,duration:.9,ease:'power2.inOut'}).to(state,{p:.945,duration:1.5,ease:'none'}).to(state,{p:.985,duration:2.1,ease:'none'}).to(state,{p:1,duration:1,ease:'power1.out'});
 function resize(){const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}resize();const ro=new ResizeObserver(resize);ro.observe(host);
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!raf)raf=requestAnimationFrame(render);if(!visible){panels.forEach(p=>p.video?.pause());intro.pause();}else{panels[loadedIndex]?.video?.play().catch(()=>{});if(introStarted&&!introDone)intro.play().catch(()=>{})}},{threshold:0});visibility.observe(stage);
 const target=new THREE.Vector3();const bgDark=new THREE.Color('#06070a'),bgLight=new THREE.Color('#edf1f5'),bgWhite=new THREE.Color('#ffffff');
 function render(now:number){raf=0;if(dead||!visible)return;const dt=Math.min((now-(lastFrame||now-16.7))/1000,.05);lastFrame=now;let p=desired;
 // Let the complete 3.11-second logo animation finish before the glass impact.
 if(p>=.79&&!introStarted){introStarted=true;intro.src=videoUrl('intro',mobile);intro.onloadeddata=()=>{finalScreen.material.map=introTexture;finalScreen.material.needsUpdate=true};intro.play().catch(()=>{introDone=true;introEndedAt=now});}
 if(p>.865&&(!introDone||now-introEndedAt<650))p=.865;
 const step=(p-drawn)*(1-Math.exp(-dt*7));drawn+=drawn>.865&&p>drawn?Math.min(step,dt*.022):step;p=drawn;
 section.dataset.phase=p<.14?'entry':p<.79?'gallery':p<.865?'film':p<.883?'windup':p<.897?'crack':p<.945?'shatter':p<.985?'morph':'light';progress.style.transform=`scaleX(${p})`;
 const entry=clamp(p/.13);introEl.style.opacity=String(1-clamp((entry-.68)/.32));introEl.style.visibility=p>.14?'hidden':'visible';screenEl.style.transform=`translate(-50%,-50%) perspective(1000px) rotateY(${-entry*12}deg) rotateX(${entry*5}deg) scale(${1+Math.pow(entry,3)*5})`;const drift=smooth(entry);wordA.style.transform=`translate3d(${-drift*18}%,${-drift*12}px,0) scale(${1+drift*.025})`;wordB.style.transform=`translate3d(${drift*14}%,${drift*9}px,0) scale(${1-drift*.02})`;wordA.style.opacity=String(1-drift*.2);wordB.style.opacity=String(1-drift*.15);
 const travel=clamp((p-.12)/.68);let z=8-travel*176;if(p>.8)z=-168-clamp((p-.8)/.075)*4;if(p>.883)z=-172-smooth((p-.883)/.014)*.65;if(p>.897)z=-172.65-smooth((p-.897)/.048)*18.35;
 const center=1-smooth((p-.78)/.065);camera.position.set(Math.sin(travel*Math.PI*3)*(mobile?.25:1.05)*center,1+(.05+Math.sin(travel*9)*.25)*center,z);target.set(Math.sin(travel*7)*.4*center,1,z-16);camera.lookAt(target);camera.rotateZ((mobile?.028:.09)*Math.sin(travel*5+1)*(1-clamp((p-.73)/.08)));
 const guideX=mobile?Math.sin(travel*8)*1.15:Math.sin(travel*9)*2.2;const guideY=mobile?-1.25:-.5+Math.sin(travel*6)*.45;s.position.set(guideX,guideY,z-7);const guideScale=THREE.MathUtils.lerp(mobile?.28:.38,mobile?.18:.3,smooth((p-.79)/.04));s.scale.setScalar(guideScale);s.rotation.set(Math.sin(p*8)*.12,p*17,Math.sin(p*12)*.12);
 if(p>.83){const centered=smooth((p-.83)/.035);const windup=smooth((p-.865)/.013);const strike=clamp((p-.878)/.005)**3;s.position.set(guideX*(1-centered),THREE.MathUtils.lerp(THREE.MathUtils.lerp(guideY,mobile?-.5:-.7,centered),1,windup),THREE.MathUtils.lerp(z-7,finalZ+3.5,centered)+windup*.9);s.position.z=THREE.MathUtils.lerp(s.position.z,finalZ+.42,strike);if(p>.897)s.position.z=finalZ+.42-smooth((p-.897)/.048)*17;s.rotation.y=THREE.MathUtils.lerp(p*17,Math.PI*4,centered);}
 architecture.children.forEach(child=>{if(child instanceof THREE.Group)child.visible=child.position.z<z+8&&child.position.z>z-(mobile?42:72)});
 key.position.set(camera.position.x+3,4,z-2);blue.position.set(-3,1,z-8);
 let nearest=-1,dist=Infinity;panels.forEach(panel=>{const d=camera.position.z-panel.z;if(d>1&&d<23&&Math.abs(d-10)<dist){dist=Math.abs(d-10);nearest=panel.index}});if(p<.14||p>.78)nearest=-1;activate(nearest);displayLight.visible=!mobile&&nearest>=0;displayLight.position.set(camera.position.x,3.8,z+1);if(nearest>=0)displayLight.target.position.copy(panels[nearest].group.position);
 panels.forEach(panel=>{const d=camera.position.z-panel.z;panel.group.visible=d>-2&&d<(mobile?23:45)&&p<.83;const main=panel.index===nearest;const luminance=main?.65+.35*smooth(1-Math.abs(d-10)/16):.12+.12*clamp(1-Math.abs(d-10)/30);panel.mesh.material.color.setRGB(luminance,luminance,luminance);});
 const project=projects[nearest];const chapter=p<.14?'UM UNIVERSO EM MOVIMENTO':p>.78?'LEVY ART / A ASSINATURA':project?`${String(nearest+1).padStart(2,'0')} / ${project.title.toUpperCase()}`:'PROJETOS';if(chapter!==lastLabel){label.textContent=chapter;lastLabel=chapter}
 if(mobile)panels.forEach(panel=>{panel.group.visible=panel.index===nearest;});
 const impact=clamp((p-.897)/.048);glass.visible=impact===0;glassEdges.visible=impact===0;
 // The video stays intact behind the physical plate, until the camera passes it.
 finalScreen.visible=true;fracture.update(impact,smooth((p-.883)/.005));fracture.group.visible=impact>0&&p<.967;
 const flatten=smooth((p-.945)/.034);const logoBlend=smooth((p-.979)/.006);
 if(p>.945){
  // Match the actual source-image coordinates, including the existing CSS crop.
  const logoImage=morph.querySelector('img')!;const imageRect=logoImage.getBoundingClientRect();const hostRect=host.getBoundingClientRect();
  const settle=smooth((p-.945)/.012);const depth=THREE.MathUtils.lerp(5.58,5,settle);const unitsPerPixel=2*depth*Math.tan(THREE.MathUtils.degToRad(camera.fov)/2)/host.clientHeight;
  const imageWidth=logoImage.naturalWidth||1280;const imageHeight=logoImage.naturalHeight||1280;
  const logoX=(imageRect.left+652/imageWidth*imageRect.width-hostRect.left-host.clientWidth/2)*unitsPerPixel;
  const logoY=1-(imageRect.top+676/imageHeight*imageRect.height-hostRect.top-host.clientHeight/2)*unitsPerPixel;
  const scale=imageRect.width/imageWidth*290*unitsPerPixel;
  s.position.set(logoX*settle,THREE.MathUtils.lerp(1,logoY,settle),z-depth);s.rotation.set(Math.sin(.945*8)*.12*(1-settle),(1-flatten)*Math.PI*2,Math.sin(.945*12)*.12*(1-settle));
  const planarScale=THREE.MathUtils.lerp(mobile?.18:.3,scale,settle);s.scale.set(planarScale,planarScale,planarScale*(1-flatten)+.001);
  s.material.color.set('#252c38').lerp(bgWhite,flatten);s.material.emissive.set('#001844').lerp(bgWhite,flatten);s.material.emissiveIntensity=.22+flatten*.78;s.material.metalness=.95*(1-flatten);s.material.roughness=.28+flatten*.6;sEdge.material.opacity=.32*(1-flatten);
 }else{s.material.color.set('#252c38');s.material.emissive.set('#001844');s.material.emissiveIntensity=.22;s.material.metalness=.95;s.material.roughness=.28;sEdge.material.opacity=.32;}
 s.visible=p>.1&&p<.985;
 const fade=smooth((p-.986)/.014);(scene.background as THREE.Color).copy(bgDark).lerp(bgLight,fade);scene.fog!.color.copy(scene.background as THREE.Color);architecture.visible=p<.921;
 const dusk=smooth((p-.74)/.1);cobalt.color.set('#12151c').lerp(bgDark,dusk);cobaltCeiling.color.set('#11151c').lerp(bgDark,dusk);cobaltFloor.color.set('#070a10').lerp(bgDark,dusk);porcelain.color.set('#343c49').lerp(bgDark,dusk);insetMat.color.set('#080e18').lerp(bgDark,dusk);accent.color.set('#0145f2').lerp(bgDark,dusk);
 finalGroup.visible=p<.95;morph.style.opacity=String(logoBlend);section.dataset.light=fade>.5?'true':'false';stage.style.backgroundColor=`rgb(${Math.round(6+fade*231)},${Math.round(7+fade*234)},${Math.round(10+fade*235)})`;host.style.opacity=String(1-smooth((p-.997)/.003));
 renderer.render(scene,camera);raf=requestAnimationFrame(render);
 }
 const onVisibility=()=>{if(document.hidden){visible=false;panels.forEach(p=>p.video?.pause());intro.pause()}else{const r=stage.getBoundingClientRect();visible=r.bottom>0&&r.top<innerHeight;if(visible&&!raf)raf=requestAnimationFrame(render)}};document.addEventListener('visibilitychange',onVisibility);
 return()=>{dead=true;cancelAnimationFrame(raf);timeline.scrollTrigger?.kill();timeline.kill();ro.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',onVisibility);panels.forEach(release);intro.pause();intro.removeAttribute('src');intro.load();introTexture.dispose();finalPoster.dispose();panels.forEach(p=>p.poster.dispose());const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();scene.traverse(obj=>{const m=obj as THREE.Mesh;if(m.geometry)geometries.add(m.geometry);if(m.material){(Array.isArray(m.material)?m.material:[m.material]).forEach(v=>materials.add(v))}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());displayLight.shadow.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();};
}
