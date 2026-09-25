# Savio Levy — portfólio

Portfólio local em React, Three.js e GSAP/ScrollTrigger, com os vídeos reais fornecidos por Savio Levy.

## Abrir

Requer Node.js 22.13 ou superior. Na pasta deste projeto:

```powershell
npm install
npm run dev
```

Abra o endereço mostrado no terminal (desenvolvimento: http://127.0.0.1:5173).

```powershell
npm run build
npm start
```

O desenvolvimento local usa Vinext/Vite. A publicação usa Next.js com exportação estática: `npm run build` gera `out/`, incluindo a home, os 12 cases e todos os assets. `npm start` serve esse build em http://127.0.0.1:4173. A configuração `vercel.json` seleciona Next.js e o diretório `out`. Importe o repositório na Vercel sem variáveis de ambiente.

## Organização

- `sections/Hero.tsx`: retrato, navegação, título e entrada animada.
- `sections/Journey.tsx`: montagem progressiva do 3D e versão para movimento reduzido.
- `three/createJourney.ts`: arquitetura, símbolo S, câmera, telas, vídeo final, vidro e timeline.
- `sections/Editorial.tsx`: seleção de trabalhos, sobre, contato e rodapé.
- `components/Media.tsx`: player com carregamento por proximidade e pausa fora da tela.
- `utils/content.ts`: textos, categorias, ordem dos projetos e contatos.
- `utils/projects.json`: dimensões e duração medidas dos arquivos fornecidos.
- `app/projetos/[slug]/page.tsx`: páginas individuais dos 12 projetos.
- `app/globals.css`: identidade visual e composições desktop/mobile.
- `public/assets/videos`: versões desktop e mobile dos 13 vídeos, incluindo INTRO LEVY.
- `public/assets/posters`: frames extraídos dos vídeos reais.
- `public/assets/hero-cutout.png`: nova foto do hero com canal alfa.
- `public/assets/portrait.png`: retrato original da seção Sobre.
- `public/assets/logo.png`: logo fornecida.

## Direção visual aprovada durante a construção

Hero preto, retrato sentado sem fundo, SAVIO centralizado com letras espaçadas e azul a 43% de opacidade. A frase “DESIGN QUE CONECTA. MOVIMENTO QUE MARCA.” foi removida. Entrada horizontal do nome, reveal do título e parallax discreto do retrato.

O túnel segue a Opção 3 (Galeria Futurista): base preta/grafite, metal e vidro escuro, luzes #0145F2 nos anéis e recessos, molduras finas e um único braço articulado de parede por tela. Não há suportes no piso. A estrutura, profundidade, percurso, ordem e proporções dos vídeos foram preservados.

## Mobile e acessibilidade

A composição mobile é empilhada, com menu recolhível, telas verticais maiores, uma tela de vídeo ativa por vez, menos módulos, menos fragmentos e densidade de pixels limitada. Os arquivos mobile têm dimensão máxima de 640 px; desktop, 1280 px. As proporções e as durações foram preservadas. As 26 versões de vídeo somam aproximadamente 36 MB; não são carregadas todas juntas.

`prefers-reduced-motion` remove a viagem intensa e mantém o vídeo LEVY ART com controles e o acesso aos projetos. Há navegação por teclado, foco visível e link para pular aos trabalhos. A viagem pode ser pulada sem bloquear a rolagem.

## Reprodução final

O vídeo INTRO LEVY tem aproximadamente 3,11 segundos. A sequência aguarda sua conclusão e uma pausa antes de liberar o impacto. Se a pessoa pular a jornada, o site não prende a rolagem. As animações da câmera e dos fragmentos seguem o scroll.

## Verificações

- TypeScript sem erros e build de produção concluído.
- Hero e túnel conferidos no navegador; nova assinatura centralizada verificada.
- Tela LEVY ART, fragmentos de vidro e transição para a logo 2D conferidos visualmente.
- Layout mobile de 390 px conferido sem overflow horizontal; abertura do menu conferida.
- Rotas individuais e assets verificados por HTTP.
- Vídeo ENERGÉTICO DRINK reproduzido até o final no player (10,005 s).
- Não foram feitos testes em um celular físico; fluidez em dispositivos reais ainda deve ser validada antes de publicação.

## Observações de manutenção

`local-preview.mjs` evita somente a consulta opcional do Vite a unidades de rede no Windows (`net use`), incompatível com o ambiente de execução utilizado. Não altera segurança, permissões ou configurações do computador.

A tentativa de leitura pelo conector Higgsfield/After Effects não respondeu. Nenhum projeto de After Effects foi alterado. O site e o 3D foram construídos localmente.
