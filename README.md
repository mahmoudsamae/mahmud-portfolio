# Portfolio: Mahmud Al Hussen

Next.js 16 site in German and English (`/de`, `/en`). All content is edited through [Keystatic](https://keystatic.com), a git-based CMS: the content lives as YAML files in this repository, with no database.

## Run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:3000/de
- CMS: http://localhost:3000/keystatic

## Editing content

Every save in the CMS writes files in the working tree; commit and push them like code.

| What | CMS section | Files |
|---|---|---|
| Title, hero text, stats, availability, contact, links | Hero, Verfügbarkeit & Kontakt | `content/site.yaml` |
| "Was ich mache" | Leistungen | `content/services.yaml` |
| Experience, education, languages | Erfahrung, Ausbildung & Sprachen | `content/resume.yaml` |
| Projects (one file each) | Projekte | `content/projects/*.yaml` |
| Buttons, headings, form texts | Oberflächen-Texte | `content/labels.yaml` |

Uploaded images go to `public/images/`. Videos are YouTube links only; they load after a click.

Project rules:

- Category is one of Automation, Im Einsatz, Web.
- At most 3 projects marked "Auf der Startseite zeigen"; with more, the homepage shows the first 3 by order and the build prints a warning.
- A text field that starts with `TODO` is treated as empty and not shown on the site.
- Results: only real, verifiable numbers.

The schema is in `keystatic.config.ts`; the site reads the content in `src/lib/content.ts`.

## Production

The CMS runs in local mode only. In a production build `/keystatic` and `/api/keystatic` answer 404 (`src/lib/keystatic-enabled.ts`) until GitHub mode is set up.
