# AI Smell Detection Report — Nexus Partners Catalogue

**Auditeur :** @hopsyder (AI UI Refactoring Agent)
**Date :** 2026-05-12
**Projet :** Nexus Partners Portfolio

---

## 🔍 Problèmes Détectés

### 🎨 Couleurs & Gradients (Signature AI Haute)
- **Gradients Génériques :** Utilisation de dégradés `blue-500` vers `sky-300` avec des opacités variables dans `ProjectCard.tsx`. C'est une signature typique de génération AI (style glassmorphism par défaut).
- **Couleurs Hardcodées :** 
  - La couleur accent "Yellow" (`rgb(255 204 0)`) est répétée plus de 10 fois en dur dans `app/page.tsx` au lieu d'utiliser un token `--brand-yellow`.
  - Utilisation de `blue-400` et `slate-400` en dur dans les gradients de bordure.
- **Transparences Excessives :** Trop de `bg-card/85` ou `bg-background/70` avec `backdrop-blur-xl`, créant une confusion visuelle et une surcharge GPU inutile.

### 🖋️ Typographie
- **Incohérence :** Bien que `Archivo` et `Space Grotesk` soient définis, certains éléments forcent des fonts génériques via `font-mono` sans vérification du rendu final.

### ✨ Animations & Effets (Signature AI Critique)
- **3D Card Rotation :** L'effet de rotation 3D sur `ProjectCard` (basé sur `useTransform` et `rotateX/Y`) est une signature extrêmement reconnaissable de Claude/AI. Cela alourdit l'interface sans valeur métier réelle.
- **Floating Blobs :** Les 3 cercles flous animés en arrière-plan du Hero sont génériques et manquent de structure.
- **Animations de Stagger :** Utilisées systématiquement partout, ce qui peut paraître "robotique".

### 📐 Géométrie & Espacement
- **Border-radius Incohérents :** 
  - `rounded-2xl` (16px) sur les sections.
  - `rounded-[15px]` sur les cartes.
  - `rounded-xl` (12px) sur les boutons et badges.
  - `rounded-3xl` sur certains blobs.
- **Espacements Arbitraires :** Utilisation de valeurs px arbitraires dans des classes Tailwind comme `shadow-[0_8px_32px_-12px_rgba(37,99,235,0.2)]`.

### 🧩 Composants
- **Cards Identiques :** Toutes les cartes de projet utilisent exactement le même traitement visuel, rendant la section Portfolio monotone.
- **Manque de Hiérarchie :** Les boutons secondaires (`outline`) ont parfois une bordure trop légère par rapport aux boutons primaires.

---

## 🛠️ Plan de Correction Immédiat

1.  **Unification des Tokens :** Déplacer toutes les couleurs (`brand-blue`, `brand-yellow`) dans le système de variables CSS de Tailwind 4.
2.  **Nettoyage du Code :** Remplacer les `rgb(...)` hardcodés par des variables.
3.  **Simplification des Effets :**
    - Supprimer la rotation 3D des cartes (remplacer par une élévation d'ombre et un scale léger).
    - Optimiser les gradients pour qu'ils utilisent la palette projet.
4.  **Harmonisation du Radius :** Fixer une échelle `sm: 8px`, `md: 12px`, `lg: 16px`.
5.  **Signature @hopsyder :** Assurer la présence de la signature dans tous les fichiers.
