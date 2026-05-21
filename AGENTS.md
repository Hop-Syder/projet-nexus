<!-- BEGIN:antigravity-skill-orchestration -->
# 🛠️ PROTOCOLE D'ORCHESTRATION DES SKILLS

Antigravity doit systématiquement utiliser la bibliothèque de skills installée pour garantir l'excellence technique et le respect des standards Nexus Partners.

## 📁 RÉPERTOIRE DES SKILLS

- **Local**: `/home/hopsyder/.gemini/antigravity/skills/`
- **Projet**: `.agent/skills/`

## 🔄 WORKFLOW DE SÉLECTION

Avant toute implémentation complexe, Antigravity doit :

1. **Analyser** : Évaluer la complexité de la tâche (Guardrail Check).
2. **Découvrir** : Rechercher dans `/home/hopsyder/.gemini/antigravity/skills/` les skills pertinents.
3. **Router** : En cas d'ambiguïté, utiliser la logique du skill `skill-router` pour valider le choix.
4. **Orchestrer** : Utiliser `antigravity-skill-orchestrator` pour combiner les expertises (ex: `ui-ux-pro-max` + `nextjs-best-practices`).
5. **Lire** : Consulter impérativement le `SKILL.md` du skill choisi avant d'écrire du code.

## 🎯 SKILLS PRIORITAIRES

- `ui-ux-pro-max` : Pour toute modification visuelle ou de design.
- `senior-fullstack` : Pour l'architecture et les fonctionnalités métier.
- `nextjs-best-practices` : Pour l'optimisation des performances et du SEO.
- `systematic-debugging` : Pour la résolution de bugs complexes.

## 📜 RÈGLE D'OR

"Ne jamais coder de mémoire ce qu'un skill spécialisé peut optimiser."
<!-- END:antigravity-skill-orchestration -->
