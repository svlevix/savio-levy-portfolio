# Revisão ajustes-tunel

Base: main 96ea223. Escopo: refinar a experiência existente, sem reconstrução.
Direção: galeria futurista premium, grafite e metal com iluminação #0145F2.
Preservar: percurso e profundidade, ordem dos 12 projetos, textos, fotos, 26 vídeos e rotas.
Método: Three.js existente + GSAP/ScrollTrigger; sem geração externa, sem áudio adicional.
Entrega: branch ajustes-tunel, commits e preview; nenhum merge ou deploy de produção.

Sequência: vídeo LEVY ART completo → sustentação → recuo → impacto → rachaduras radiais → pausa → fragmentação volumétrica → travessia → S perde profundidade → logo original → fundo claro.
Fragmentos: células radiais de uma placa, espessura, gravidade e rotação determinísticas reversíveis pelo scroll. Animação física dirigida, sem motor de colisões.
Mobile: 24 fragmentos contra 36 no desktop, sem transmissão/refração de tela nem sombras dinâmicas, menos módulos, uma tela ativa e braços simplificados.
Desktop: uma luz com mapa de sombras de 512 px acompanha o trabalho em foco; módulos fora da câmera são ocultados.
Hero: overlay SVG nas coordenadas da foto, clip até pescoço, parallax compartilhado. PNG existente não editado.
Nomes atualizados a pedido: Comp 1_5 → Evento; Começo → Motion Político. Slugs e arquivos de vídeo preservados.
Validação: build Next.js e TypeScript aprovados; lint dos arquivos Three.js aprovado; teste geométrico da placa e reversão dos fragmentos aprovado. Os 26 vídeos decodificados sem erros; 81 rotas/assets responderam 200 e projeto inexistente respondeu 404. Experiência revisada no navegador em desktop e viewport mobile 390 × 844, incluindo LEVY ART, rachadura, fragmentação e logo final; mobile sem overflow horizontal e menu funcional.
Limitações: dispositivo físico não disponível; desempenho em celulares reais requer revisão. O lint global ainda acusa os links HTML preexistentes da Hero; navegação original preservada.
