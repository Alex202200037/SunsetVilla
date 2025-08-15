# Sunset Villa — Website

Site estático profissional para a Sunset Villa (Comporta). Inclui design de luxo, galeria, ligações para Airbnb/Booking e formulário de contacto.

## Estrutura
- `index.html`: página única com hero, sobre, comodidades, galeria, localização e contacto
- `styles.css`: estilos responsivos (tipografia, grelhas, animações suaves)
- `script.js`: interações (menu mobile, lazy‑load, lightbox, formulário)
- `favicon.svg`: marca simples "SV"
- `assets/`: coloque aqui as suas fotos (crie a pasta se necessário)

## Personalização
1. Substitua os links de reserva no `index.html`:
   - `https://www.airbnb.com/rooms/SEU_ID`
   - `https://www.booking.com/hotel/SEU_ID.html`
2. Atualize as imagens:
   - Troque as URLs de exemplo (Unsplash) por ficheiros locais em `assets/`.
   - Ex.: `src="/assets/foto-1.jpg"` e `href="/assets/foto-1@xl.jpg"` para a lightbox.
3. SEO
   - `<title>`, `<meta name="description">`, `og:image`, `og:url` no `<head>`.
   - Atualize o JSON‑LD (`LodgingBusiness`) com o seu domínio e imagens.
4. Marca
   - Altere cores no `:root` de `styles.css`.
   - Substitua `favicon.svg` pelo seu logótipo.

## Formulário de contacto
- Por omissão envia para o Formspree. Crie um endpoint e substitua `action="https://formspree.io/f/SEU_ID"`.
- Alternativa Netlify: mantendo `data-netlify="true"` e o input oculto `form-name`, a Netlify regista submissões automaticamente.
- Fallback: há um link `mailto:` no botão secundário.

## Como visualizar localmente
Abra o `index.html` no browser ou sirva a pasta com um servidor simples.

### macOS (Python)
```bash
cd "SunsetVilla"
python3 -m http.server 5173
```
Depois aceda a `http://localhost:5173`.

## Deploy
- Netlify: arraste a pasta para o painel ou ligue ao repositório.
- Vercel: importe o projeto como Static Site.
- GitHub Pages: ative Pages e aponte para a branch principal.

## Dicas
- Otimize as fotos (lados até 1920px, qualidade ~80). Use variações para thumbnails/XL.
- Preencha o `alt` das imagens com descrições reais para acessibilidade/SEO.
- Teste em mobile (≤ 390px) e desktop (≥ 1440px). 

## Imagens
Coloque os ficheiros na pasta `assets/` com estes nomes para que apareçam automaticamente:

- `hero.jpg` — imagem do herói (recomendo a da piscina de dia)
- `gallery-01.jpg` — piscina à noite
- `gallery-02.jpg` — cozinha/sala madeira clara
- `gallery-03.jpg` — pôr do sol no cais palafítico
- `gallery-04.jpg` — quarto/escritório com vista
- `gallery-05.jpg` — piscina e deck de dia
- `gallery-06.jpg` — campo dourado ao pôr do sol
- `gallery-07.jpg` — varanda com mesa exterior
- `gallery-08.jpg` — sala ampla e luminosa
- `gallery-09.jpg` — cozinha com ilha
- `gallery-10.jpg` — suite cabeceira mostarda
- `gallery-11.jpg` — quarto principal tons rubi
- `gallery-12.jpg` — casa de banho

Sugestão: 1920px de largura para `hero.jpg`; 1200px para as `gallery-*.jpg`. 