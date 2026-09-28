import * as THREE from 'three';

/** A deterministic tessellation of the whole plate, with radial fracture rings.
 * Shared vertices prevent holes before separation. Motion is reversible with scroll.
 */
export function createFracturedGlass(width:number,height:number,mobile:boolean) {
 const group=new THREE.Group();
 const material=new THREE.MeshPhysicalMaterial({color:'#d4e2ed',metalness:0,roughness:.09,
  transmission:mobile?0:.92,transparent:true,opacity:mobile?.2:.24,thickness:.16,ior:1.46,
  envMapIntensity:mobile?.25:.35,side:THREE.DoubleSide,depthWrite:false});
 const edgeMaterial=new THREE.LineBasicMaterial({color:'#adc6e6',transparent:true,opacity:.18});
 const sectors=mobile?8:14;
 // Include rectangle corner angles so the outer cells exactly fill the plate.
 const corner=Math.atan2(height,width);
 const angles=[...Array.from({length:sectors},(_,i)=>i/sectors*Math.PI*2+.035*Math.sin(i*4.7)),corner,Math.PI-corner,Math.PI+corner,2*Math.PI-corner].sort((a,b)=>a-b);
 const boundary=angles.map(a=>{const r=Math.min(width/2/Math.max(.0001,Math.abs(Math.cos(a))),height/2/Math.max(.0001,Math.abs(Math.sin(a))));return new THREE.Vector2(Math.cos(a)*r,Math.sin(a)*r)});
 const middle=boundary.map((p,i)=>p.clone().multiplyScalar(.32+.12*Math.sin(i*2.3)**2));
 const crackPoints:THREE.Vector3[]=[];
 const pieces:{mesh:THREE.Mesh;origin:THREE.Vector3;velocity:THREE.Vector3;spin:THREE.Vector3;delay:number}[]=[];
 function piece(points:THREE.Vector2[],i:number,outer:boolean){
  const shape=new THREE.Shape(points);shape.closePath();
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:!mobile,bevelSize:.009,bevelThickness:.008,bevelSegments:1,steps:1});
  const center=points.reduce((sum,p)=>sum.add(p),new THREE.Vector2()).multiplyScalar(1/points.length);
  geometry.translate(-center.x,-center.y,-.08);
  const mesh=new THREE.Mesh(geometry,material);mesh.position.set(center.x,center.y,.3);group.add(mesh);
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry,25),edgeMaterial));
  const nearLens=i%5===1;
  pieces.push({mesh,origin:mesh.position.clone(),velocity:new THREE.Vector3(center.x*(nearLens?.08:.5),center.y*(nearLens?.06:.45),nearLens?5.4:1.2+(i%4)*.65),spin:new THREE.Vector3(Math.sin(i*3)*1.8,Math.cos(i*2)*2,(i%2?1:-1)*.7),delay:outer?.055:0});
  points.forEach((p,k)=>{const q=points[(k+1)%points.length];crackPoints.push(new THREE.Vector3(p.x,p.y,.4),new THREE.Vector3(q.x,q.y,.4))});
 }
 boundary.forEach((p,i)=>{const j=(i+1)%boundary.length;piece([new THREE.Vector2(),middle[i],middle[j]],i,false);piece([middle[i],p,boundary[j],middle[j]],i,true)});
 const cracks=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(crackPoints),new THREE.LineBasicMaterial({color:'#b9d1ed',transparent:true,opacity:0,depthWrite:false}));
 function update(amount:number,crack:number){
  group.visible=amount>0;cracks.visible=crack>0&&amount===0;cracks.material.opacity=crack*.72;
  for(const {mesh,origin,velocity,spin,delay} of pieces){const t=Math.max(0,amount-delay)*1.75;mesh.position.copy(origin).addScaledVector(velocity,t);mesh.position.y-=.72*t*t;mesh.rotation.set(spin.x*t,spin.y*t,spin.z*t)}
 }
 group.visible=false;cracks.visible=false;
 return {group,cracks,update};
}
