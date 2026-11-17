# Move for Bitwig — by Pikub (bêta)

**FR** · [English below](#english)

Script gratuit et open source qui transforme l'**Ableton Move** en contrôleur complet pour **Bitwig Studio** : jeu aux pads, séquenceur 16 pas, Capture, lanceur de clips, devices, mémoires de réglages avec morph, automation, navigateur.
Le workflow de la Move, dans Bitwig, sans Live.

> Projet communautaire, **non affilié à Ableton ni à Bitwig**. « Ableton » et « Move » sont des marques d'Ableton AG ; « Bitwig » est une marque de Bitwig GmbH.

**Version : 5.11 — bêta.** Ça marche au quotidien, mais des bugs restent possibles : merci de les signaler (voir « Signaler un problème »).

---

## Prérequis

- **Bitwig Studio 6** (testé). Les versions 5.x ne sont pas testées.
- Une **Ableton Move** branchée en USB-C à l'ordinateur.
- **Ableton Live fermé** : Live occupe les ports de la Move.

Aucun utilitaire externe : le script passe lui-même la Move en mode contrôleur au démarrage.

## Installation

1. Télécharger `AbletonMove.control.js` (page *Releases* de ce dépôt).
2. Le copier dans :
   - macOS / Windows : `Documents/Bitwig Studio/Controller Scripts/Ableton Move/`
   - Linux : `~/Bitwig Studio/Controller Scripts/Ableton Move/`
3. Dans Bitwig : **Réglages › Contrôleurs › Ajouter un contrôleur › Ableton › Move for Bitwig**.
4. Choisir les ports **Ableton Move Live Port** en entrée et en sortie.
5. La notification « Ableton Move connectée » s'affiche et les LED s'allument.

**Important : un seul fichier `.control.js`.** Ne gardez aucune copie de sauvegarde finissant par `.control.js` dans le dossier Controller Scripts (même dans un sous-dossier) : Bitwig les charge toutes et risque de prendre la mauvaise.

Si rien ne se passe : désactiver puis réactiver le contrôleur dans les réglages, ou redémarrer Bitwig.

## Pour que la gamme de Bitwig suive la Move (mode chords / scale)

L'API de Bitwig ne donne pas accès directement à la tonalité du projet. Le script passe par deux **contrôles du projet**, à créer **une fois par projet** (ou dans votre modèle de projet) :

1. Afficher le panneau des devices (touche **D**), puis cliquer sur l'onglet **PROJECT** à gauche.
2. Cliquer sur l'icône des télécommandes en bas de l'onglet, puis sur **+** : une page « Perform » apparaît.
3. Cliquer sur l'icône du **2e** emplacement (il s'allume), puis sur la **tonique** de la barre de transport (le « C » de « C Major »).
4. Le **3e** emplacement s'allume tout seul : cliquer sur la **gamme** (« Major »).
5. Échap. Vous devez voir « Root Key » et « Scale » dans les emplacements 2 et 3.

Astuce : enregistrez ce projet comme **modèle**, tous vos nouveaux projets auront ces contrôles.
Sans eux, tout le reste marche ; seule la synchronisation de la gamme avec Bitwig est absente (un message l'indique).

## Les gestes

L'**antisèche imprimable** (recto / verso A4) résume tous les gestes : voir `Antiseche-Move-Bitwig.pdf` dans les *Releases*.
La référence complète est l'en-tête du script `AbletonMove.control.js`.

En bref :
- **Note / Session** bascule entre jeu + séquenceur et lanceur de clips (4 pistes × 8 scènes).
- **Shift + pas** : réglages (nouvelle piste, nouveau device, grille, presets, tempo, métronome, groove, 32 pas, chords / scale, vélocité, effet de note, nouveau clip, doubler la boucle, Quantize). Les icônes sous les pas montrent les fonctions avec Shift, et restent allumées quand une fonction est active.
- **Capture** : crée le clip de ce que vous venez de jouer, calé sur la mesure ; machine arrêtée, le tempo est détecté.
- **Mode Preset** (Shift ×2) : 16 mémoires par device sur les pads de droite, morph à la pression entre deux presets.
- **Encodeurs** : macros du device ; LED rouge = automation ; Delete + toucher = l'efface.

## Limites connues (bêta)

- L'écran de la Move n'est pas utilisé : les infos s'affichent en notifications dans Bitwig.
- Capture enregistre les **notes** seulement (pas les mouvements de potards).
- Groupe vide (Instrument / FX Layer, Selector) : impossible d'y créer la 1re couche depuis la Move (limite de l'API). Partir d'un preset qui contient déjà une couche.
- Navigateur : les colonnes Type de composant, Type de fichier et Interface ne sont pas pilotables (limite de l'API).
- Mode chords / scale et presets sur les pas : **expérimentaux**, ils peuvent changer.
- Couleurs des clips de groupe en mode Session parfois fausses.

## Signaler un problème

Ouvrez une *issue* sur ce dépôt avec : la version du script (ligne 3 du fichier), votre version de Bitwig, ce que vous avez fait, ce qui s'est passé, et le texte de la notification affichée s'il y en a une.

## Soutenir

Le script est gratuit. Lien « offre-moi un café » ☕ : bientôt, annoncé sur Instagram.
Suivre le projet : Instagram **[@pikublab](https://www.instagram.com/pikublab/)** · Ma musique : **[linktr.ee/pikub](https://linktr.ee/pikub)**

## Crédits

- **[movewire](https://github.com/auridevil/movewire)**, par Aureliano Bergese (licence MIT) : protocole de réveil SysEx et palette de couleurs de la Move. La palette `MOVE_PALETTE` et les messages `HANDSHAKE` en sont issus.
- **[move-anything](https://github.com/bobbydigitales/move-anything)** : documentation communautaire du mapping MIDI.
- **[DrivenByMoss](https://github.com/git-moss/DrivenByMoss)** : référence pour l'usage de l'API Bitwig.
- Gestes basés sur le [manuel officiel de la Move](https://www.ableton.com/en/move/manual/).

## Licence

MIT — voir `LICENSE`.

---

<a name="english"></a>
# English

Free, open-source script that turns the **Ableton Move** into a full controller for **Bitwig Studio**: pads, 16-step sequencer, Capture, clip launcher, devices, per-device memories with pressure morphing, automation, browser.
The Move workflow, inside Bitwig, without Live.

> Community project, **not affiliated with Ableton or Bitwig**.

**Version 5.11 — beta.** Messages on screen are in French for now.

**Requirements:** Bitwig Studio 6 (tested; 5.x untested), Ableton Move over USB-C, Ableton Live closed.

**Install:**
1. Download `AbletonMove.control.js` from *Releases*.
2. Copy it to `Documents/Bitwig Studio/Controller Scripts/Ableton Move/` (Linux: `~/Bitwig Studio/...`).
3. Bitwig: **Settings › Controllers › Add Controller › Ableton › Move for Bitwig**, ports **Ableton Move Live Port** in and out.
4. Keep **only one** `.control.js` file in the Controller Scripts folder (no backup copies ending in `.control.js`).

**Scale sync with Bitwig (chords / scale mode):** the Bitwig API has no direct access to the project key, so the script uses two **project remote controls**, to create once per project (or in your template): device panel (**D**) › **PROJECT** tab › remote controls icon › **+** › click slot 2's mapping icon then the root note in the transport (the "C"), slot 3 arms itself: click the scale ("Major") › Esc.

**Gestures:** see the printable cheat sheet (`Move-for-Bitwig-Cheatsheet-EN.pdf`, front / back A4) and the header of the script.

**Known limitations:** Move screen unused (Bitwig notifications instead); Capture records notes only; first layer of an empty container can't be created from the Move; three browser columns aren't controllable (API limits); chords / scale mode and step presets are experimental.

**Bugs:** open an issue with the script version (line 3), your Bitwig version, what you did and any notification text.

**Support:** free to use — coffee link coming soon ☕ · Instagram **[@pikublab](https://www.instagram.com/pikublab/)** · Music: **[linktr.ee/pikub](https://linktr.ee/pikub)**

**Credits:** movewire (Aureliano Bergese, MIT — SysEx wake-up and color palette), move-anything, DrivenByMoss, Ableton's Move manual.

**License:** MIT — see `LICENSE`.
