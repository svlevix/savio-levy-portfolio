import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/** One serial, articulated arm per screen. All attachment points are in world space.
 * The finished fixture becomes a child of its screen, sharing visibility and cleanup.
 */
export function mountGalleryScreen(screen:THREE.Group,index:number,side:number,z:number,mobile:boolean,width:number,height:number){
 const arm=new THREE.Group();arm.name=`wall-arm-${index+1}`;
 const graphite=new THREE.MeshStandardMaterial({color:'#242a33',metalness:.88,roughness:.28,envMapIntensity:.7});
 const machined=new THREE.MeshStandardMaterial({color:'#59616d',metalness:.95,roughness:.2,envMapIntensity:.65});
 const light=new THREE.MeshBasicMaterial({color:'#0145f2',toneMapped:false});
 const radial=mobile?10:20;
 const shoulder=new THREE.Vector3(side*5.78,.8+height/2+.15+(index%3)*.22,z+.8+(index%2)*.35);
 screen.updateMatrixWorld(true);
 const wrist=screen.localToWorld(new THREE.Vector3(0,.15,-.37));
 const elbow=screen.localToWorld(new THREE.Vector3(side*Math.min(width*(.25+(index%3)*.07),1.4),height/2+.18+(index%3)*.16,-.65-(index%3)*.22));
 function cylinder(radius:number,depth:number,point:THREE.Vector3,material:THREE.Material,axis=new THREE.Vector3(1,0,0)){
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,depth,radial),material);
  mesh.position.copy(point);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),axis.clone().normalize());arm.add(mesh);return mesh;
 }
 // Bolted wall flange, a single shoulder, elbow and compact display wrist.
 cylinder(.43,.12,new THREE.Vector3(side*5.91,shoulder.y,shoulder.z),graphite);
 cylinder(.34,.018,new THREE.Vector3(side*5.825,shoulder.y,shoulder.z),machined);
 if(!mobile)for(let bolt=0;bolt<4;bolt++){const a=bolt*Math.PI/2+Math.PI/4;cylinder(.035,.035,new THREE.Vector3(side*5.825,shoulder.y+Math.cos(a)*.29,shoulder.z+Math.sin(a)*.29),machined);}
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.37,.015,4,radial),light);ring.rotation.y=Math.PI/2;ring.position.set(side*5.81,shoulder.y,shoulder.z);arm.add(ring);
 function link(a:THREE.Vector3,b:THREE.Vector3,width:number){
  const direction=b.clone().sub(a),length=direction.length();
  const mesh=new THREE.Mesh(new RoundedBoxGeometry(width,length,.24,mobile?1:2,.045),graphite);
  mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());arm.add(mesh);
  if(mobile)return;
  const trim=new THREE.Mesh(new THREE.BoxGeometry(width*.48,length*.72,.012),machined);trim.position.z=.126;mesh.add(trim);
 }
 link(shoulder,elbow,.26);link(elbow,wrist,.21);
 for(const [i,point] of [shoulder,elbow,wrist].entries()){
  const axis=i===0?new THREE.Vector3(side,0,0):new THREE.Vector3(0,0,1);
  cylinder(i===2?.19:.25,.3,point,graphite,axis);
  cylinder(i===2?.10:.15,.025,point.clone().addScaledVector(axis,.163),machined,axis);
  if(!mobile)cylinder(.047,.029,point.clone().addScaledVector(axis,.18),graphite,axis);
 }
 const bracket=new THREE.Mesh(new THREE.BoxGeometry(.62,.75,.1),graphite);bracket.position.copy(wrist);bracket.rotation.copy(screen.rotation);arm.add(bracket);
 // Attach without moving the arm away from the wall when the screen is angled.
 arm.traverse(object=>{if(object instanceof THREE.Mesh){object.castShadow=!mobile;object.receiveShadow=!mobile;}});arm.updateMatrixWorld(true);screen.attach(arm);
}
