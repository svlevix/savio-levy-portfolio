# Savio Levy — Design & Motion

Portfólio em React, Next.js, Three.js e GSAP/ScrollTrigger, publicado na Vercel.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```powershell
npm install
npm run dev
```

O desenvolvimento usa Vinext/Vite na porta 5173. Para conferir o build Next.js usado pela Vercel:

```powershell
npm run build
npx next start
```

O build Next.js gera `.next/`, com a home e 18 páginas de projetos pré-renderizadas. A configuração `vercel.json` seleciona Next.js. Não são necessárias variáveis de ambiente para exibir o portfólio.

## Conteúdo

A página segue a ordem: início, jornada animada, Sobre, projetos selecionados e contato. Os trabalhos têm duas categorias com âncoras próprias: `#motion-design` e `#design-social-media`.

Motion Design reúne 11 trabalhos, com Motion Político em destaque. O Energético Drink foi removido, incluindo sua página e seus arquivos de mídia.

Design Social Media reúne quatro cards e três carrosséis. Cada trabalho tem descrição e página própria. Os dois arquivos da Alfa formam um único carrossel de seis cards, na ordem Alfa 1 seguida de Alfa 2. Prosetec e Silvia têm três cards cada.

## Arquivos principais

- `sections/Hero.tsx`: header, menu de categorias, marca e hero.
- `sections/Journey.tsx` e `three/createJourney.ts`: jornada 3D e encerramento com a assinatura.
- `sections/Editorial.tsx`: Sobre, categorias de trabalhos, contato e footer.
- `components/SocialGallery.tsx`: artes completas, com as faixas dos carrosséis em sequência vertical e sem navegação lateral.
- `components/Media.tsx`: player com carregamento próximo à viewport e pausa fora da tela.
- `utils/content.ts`: projetos, descrições, ordem, categorias e contatos.
- `utils/projects.json`: metadados dos vídeos.
- `app/projetos/[slug]/page.tsx`: páginas de Motion e Social Media.
- `app/globals.css`: composições desktop e mobile.
- `public/assets/levy-art.png`: wordmark transparente fornecido, na proporção original 1011 × 141.
- `public/assets/instagram.png`: ícone fornecido para o footer.
- `public/assets/social/`: imagens WebP e miniaturas das artes, sem modificar os arquivos originais.

## Navegação e movimento

O menu Trabalhos mostra as duas categorias com transição de opacidade e deslocamento. No celular, as opções são abertas por toque; os controles também permitem navegação por teclado.

Na rolagem natural rápida, o encerramento da jornada permanece visível por um intervalo limitado para apresentar a assinatura. O documento continua rolando, atalhos com âncoras pulam a apresentação e Escape encerra essa etapa. A restauração de posição ao recarregar não conta como uma nova passagem pela jornada.

`prefers-reduced-motion` oferece uma versão sem a viagem intensa. Os vídeos preservam suas proporções e são carregados por proximidade.

## Publicação

A branch de revisão e o pull request permitem conferir a prévia da Vercel antes do merge em `main`. A conexão GitHub–Vercel existente publica a branch de produção.
