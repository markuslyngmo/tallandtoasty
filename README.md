# tall and toasty

Kildekoden til nettsiden, bygget med [Jekyll](https://jekyllrb.com/) og hostet på GitHub Pages.

## Skrive et nytt blogginnlegg

1. Lag en ny fil i `_posts/` med navnet `YYYY-MM-DD-tittel-pa-innlegget.md`
2. Lim inn dette øverst i filen (front matter), og skriv innlegget under som vanlig markdown:

   ```markdown
   ---
   layout: post
   title: "Tittelen på innlegget"
   date: 2026-08-20 07:00 +0200
   slug: tittel-pa-innlegget
   ---
   Her skriver du innlegget ditt i vanlig markdown.

   ![Alt-tekst](/assets/images/blog/mitt-bilde.jpg)
   ```
3. Legg bildene dine i `assets/images/blog/`
4. Commit og push til `main` — GitHub Actions bygger og publiserer siden automatisk i løpet av 1-2 minutter.

## Redigere sider

Sidene `now.md`, `training-plan.md`, `my-gear-list.md`, `my-oslo-guide.md` og `index.md` ligger i rotmappen og redigeres direkte som markdown.

## Kjøre siden lokalt

```bash
bundle install
bundle exec jekyll serve
```

Siden er da tilgjengelig på http://127.0.0.1:4000

## Struktur

- `_posts/` — blogginnlegg
- `_layouts/` — HTML-maler (default, home, page, post)
- `_includes/` — gjenbrukbare deler (nav, footer, head)
- `assets/css/main.css` — safari/sjiraff-temaet
- `assets/js/` — effekter og easter eggs
- `.github/workflows/jekyll.yml` — automatisk bygg + deploy til GitHub Pages

## Easter eggs 🦒

Noen skjulte overraskelser er gjemt i koden. Ikke les videre hvis du vil finne dem selv...
