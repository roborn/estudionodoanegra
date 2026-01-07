# Internationalization (i18n) Implementation Guide

## Overview

Your website now supports multiple languages (Portuguese and English) with a language switcher for seamless 1:1 switching. All metadata, content, and navigation have been translated.

## Structure

### File Organization

```
src/
├── i18n/
│   ├── pt.json          # Portuguese translations
│   ├── en.json          # English translations
│   └── utils.ts         # i18n utility functions
├── components/
│   ├── languageswitcher.astro  # Language switcher component
│   ├── navbar/
│   │   └── navbar.astro        # Updated with i18n
│   ├── hero.astro              # Updated with i18n
│   ├── features.astro          # Updated with i18n
│   ├── espaco.astro            # Updated with i18n
│   ├── footer.astro            # Updated with i18n
│   ├── sectionpricing.astro    # Updated with i18n
│   ├── inscricaoform.astro     # Updated with i18n
│   └── contactform.astro       # Updated with i18n
├── pages/
│   ├── pt/                      # Portuguese pages
│   │   ├── index.astro
│   │   ├── treino-grupo.astro
│   │   ├── treino-individual.astro
│   │   ├── contacto.astro
│   │   └── 404.astro
│   ├── en/                      # English pages
│   │   ├── index.astro
│   │   ├── treino-grupo.astro
│   │   ├── treino-individual.astro
│   │   ├── contacto.astro
│   │   └── 404.astro
│   ├── index.astro              # Root redirect to /pt/
│   ├── treino-grupo.astro       # Root redirect to /pt/treino-grupo/
│   ├── treino-individual.astro  # Root redirect to /pt/treino-individual/
│   ├── contacto.astro           # Root redirect to /pt/contacto/
│   └── 404.astro                # Root redirect to /pt/404/
└── layouts/
    └── Layout.astro             # Updated with language support
```

### URL Structure

- **Portuguese (default)**: 
  - `/` → redirects to `/pt/`
  - `/pt/`
  - `/pt/treino-grupo/`
  - `/pt/treino-individual/`
  - `/pt/contacto/`

- **English**: 
  - `/en/`
  - `/en/treino-grupo/`
  - `/en/treino-individual/`
  - `/en/contacto/`

## Key Files

### 1. Translation Files

#### `src/i18n/pt.json` (Portuguese)
Contains all Portuguese translations organized by sections:
- `common` - Brand name, copyright, location, email, etc.
- `nav` - Navigation menu items
- `hero` - Hero section text
- `features` - Features section
- `space` - Space/gallery section
- `training` - Training overview section
- `pricing` - Pricing card labels
- `training_group` - Group training page
- `training_individual` - Individual training page
- `contact` - Contact page
- `forms` - Form labels and validation messages
- `404` - 404 page

#### `src/i18n/en.json` (English)
Complete English translations with the same structure as Portuguese.

### 2. Utility Functions

#### `src/i18n/utils.ts`

**Key exports:**

```typescript
// Get language from URL
getLangFromUrl(url: URL): Language

// Use translations in a component
useTranslations(lang: Language): (key: string, defaultValue?: string) => string

// Generate localized paths
getLocalizedPath(path: string, lang: Language): string

// Default language (Portuguese)
defaultLanguage: Language = 'pt'

// Available languages
languages_list: Language[] = ['pt', 'en']
```

**Example usage:**

```astro
---
import { useTranslations, getLangFromUrl, getLocalizedPath } from "@i18n/utils";

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

const heroTitle = t('hero.title');
const groupTrainingLink = getLocalizedPath("/treino-grupo", lang);
---
```

### 3. Language Switcher Component

#### `src/components/languageswitcher.astro`

- Located in navbar (automatically included in all pages)
- Shows current language highlighted
- Provides links to switch between PT and EN
- Maintains current page path when switching languages

### 4. Updated Components

All components now accept a `lang` prop:

```astro
interface Props {
  lang?: Language;
}
```

Components updated:
- `hero.astro` - Hero section with localized content
- `features.astro` - Features section
- `espaco.astro` - Space/gallery section
- `footer.astro` - Footer with localized copyright
- `navbar.astro` - Navigation with language switcher
- `sectionpricing.astro` - Pricing overview with localized text
- `inscricaoform.astro` - Registration form with localized placeholders
- `contactform.astro` - Contact form with localized labels

### 5. Layout

#### `src/layouts/Layout.astro`

- Detects current language from URL
- Sets `<html lang="pt">` or `<html lang="en">` attribute
- Updates page titles, descriptions, and metadata based on language
- Passes language to components

## Adding New Translations

To add new content or translate existing content:

1. **Add to JSON files** (`src/i18n/pt.json` and `src/i18n/en.json`):
   ```json
   {
     "section_name": {
       "key": "Portuguese text",
       "nested": {
         "key": "More text"
       }
     }
   }
   ```

2. **Use in components**:
   ```astro
   ---
   const t = useTranslations(lang);
   ---
   <p>{t('section_name.key')}</p>
   ```

3. **For HTML content**, use `set:html`:
   ```astro
   <p set:html={t('section_name.with_html')} />
   ```

## Brand Names

As requested, brand names (Estúdio Nódoa Negra, Funchal, Madeira) are kept the same in both languages - only the content is translated.

## Metadata & SEO

All metadata is properly translated:
- Page titles
- Meta descriptions
- Open Graph data
- Twitter card data
- Canonical URLs (maintained per language version)

## Configuration Files

### `tsconfig.json`
Added path alias for i18n:
```json
"@i18n/*": ["i18n/*"]
```

### `astro.config.mjs`
Updated sitemap configuration for i18n:
```javascript
sitemap({
  i18n: {
    defaultLocale: "pt",
    locales: {
      pt: "pt-PT",
      en: "en-US",
    },
  },
})
```

## Form Handling

Forms maintain the same Web3Forms integration but now submit with localized labels:
- All form labels and placeholders are translated
- Error messages are localized
- Form data is submitted in the selected language

## Development

### Running the development server:
```bash
npm run dev
```

Server runs on `http://localhost:3001/`

### Building for production:
```bash
npm run build
```

### Pages generated:
- `/index.html` (redirects to `/pt/`)
- `/pt/index.html` (Portuguese homepage)
- `/en/index.html` (English homepage)
- `/pt/treino-grupo/index.html`
- `/en/treino-grupo/index.html`
- `/pt/treino-individual/index.html`
- `/en/treino-individual/index.html`
- `/pt/contacto/index.html`
- `/en/contacto/index.html`
- `/pt/404.html`
- `/en/404.html`
- `/sitemap-index.xml` (includes both languages)

## Testing the Implementation

1. **Home page**: 
   - Visit `/` (should redirect to `/pt/`)
   - Visit `/pt/` (Portuguese)
   - Visit `/en/` (English)

2. **Language switcher**:
   - Click PT/EN buttons in navbar
   - Verify page language changes while staying on same page

3. **Links**:
   - All internal links should use `getLocalizedPath()` to maintain language
   - Navbar links should be in current language

4. **Forms**:
   - Submit forms in both languages
   - Verify form labels and placeholders are translated

5. **Metadata**:
   - Check HTML `lang` attribute
   - Verify page titles and descriptions are translated
   - Check browser DevTools Network tab for proper page responses

## Future Enhancements

Potential improvements:
- Add more languages
- Implement language preference detection based on browser locale
- Add language selection cookie to remember user preference
- Translate image alt texts and captions
- Add language-specific content blocks
