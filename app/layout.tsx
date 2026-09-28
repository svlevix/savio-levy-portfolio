import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Savio Levy — Design & Motion',description:'Portfólio de Savio Levy, Designer Gráfico & Motion Designer.',icons:{icon:'/assets/logo.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
