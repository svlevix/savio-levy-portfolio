import {socialImage} from '../utils/content';

export default function SocialGallery({images,alt,title,panoramic=false}:{images:string[];alt:string[];title:string;panoramic?:boolean}){
 return <div className={'social-gallery '+(panoramic?'panoramic':'single')} role="region" aria-label={title}>
  {images.map((file,i)=><figure className="social-artwork" key={file}><img src={socialImage(file)} alt={alt[i]} loading={i===0?'eager':'lazy'}/></figure>)}
 </div>
}
