import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Savio Levy — Design & Motion',description:'Design, identidade e movimento. Portfólio de Savio Levy, Designer Gráfico & Motion Designer.',icons:{icon:'/assets/levy-art-atualizada.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
