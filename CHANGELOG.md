# Historique des versions

## 5.11 — 17 novembre 2026 — bêta
- Double appui sur un bouton de piste : uniquement déplier / replier un groupe.

## 5.10 — 17 novembre 2026
- Le contrôleur s'appelle désormais « Move for Bitwig » (auteur : Pikub) dans les réglages de Bitwig.

## 5.09 — 17 novembre 2026
- Première bêta publique : diagnostics coupés, code inutilisé retiré, README et licence.

## 5.08 — 17 novembre 2026
- Suppression de device ou de couche dans un groupe : ne supprime plus jamais le conteneur ; message si Bitwig refuse.
- Après une suppression ou un Undo, les contrôles du device réapparaissent.

## 5.07 — 17 novembre 2026
- Chargement : toutes les LED sont renvoyées plusieurs fois pendant les premières secondes (plus de LED manquantes).
- Capture des mouvements de potards mise de côté (désactivée) pour la bêta.

## 5.06 — 17 novembre 2026
- Expérimental : Capture sans pad joué grave les mouvements de potards du device dans le clip qui joue (rejeu d'un tour de boucle avec l'écriture d'automation du lanceur). Piste gardée armée pendant la gravure.

## 5.05 — 17 novembre 2026
- Synchro de gamme : les messages d'erreur ne sont plus recouverts ; lecture des gammes débloquée si elle reste coincée ; confirmation au premier succès.

## 5.04 — 17 novembre 2026
- Commentaire du code corrigé (piste tenue : encodeurs 1 à 7 = sends, 8 = pan). Aucun changement de fonctionnement.

## 4.93 – 5.03 — 6 au 14 novembre 2026
- Mode chords / scale sur Shift + Pas 9 (fondamentale et modes sur les pas, presets d'accords à la couleur de leur mode, gamme de Bitwig synchronisée) ; ancien mode accords retiré.
- Icônes sous les pas allumées quand la fonction est active ; Shift + Pas 5 = tempo en bascule.
- Session : clip joué en vert pulsé, aucun armement automatique, + / − s'arrête à la dernière piste.
- Corrections : pad de piste FX en Session (mode Send), Delete + toucher Volume / Pan.
- Tests : simulateur strict (tous les boutons, lectures non déclarées).
- 5.03 : en Session, l'armement à la souris ou depuis un autre contrôleur est gardé ; seul l'armement automatique de Bitwig est annulé.

## 4.84 – 4.92 — 5 novembre 2026
- Couches (Layer, FX Layer, Selector) repérées par leur position : Shift + molette fonctionne aussi après un Undo et avec des couches de même nom.
- Suppression de couche et de device dans une couche : repérage par position, vérification et repli sur la commande Supprimer de Bitwig.
- Navigateur : pas = colonnes, pas 16 = favoris (toujours jaune, 2 niveaux).
- Shift + clic molette = bypass ; Delete + clic = supprimer device ; Delete + Shift + clic = supprimer couche.

## 3.25 – 3.37 — 1er novembre 2026 (matin)
- Battement de cœur léger et rapide (1 message toutes les 0,25 s) : corrige les ratés réguliers de la Move sans avoir à activer la synchro MIDI.
- Shift + Pas 1 : nouvelle piste MIDI + navigateur ; double appui : piste audio.
- Shift + Pas 2 : nouveau device après le device sélectionné ; double appui : dans le conteneur (pad, couche).
- Navigateur par colonnes Type › Catégorie › Résultats (le changement de Type ne marche pas encore, voir NEXT_SESSION.md).
- Shift + M : solo ; double appui M : retire tous les mutes ; Shift + double appui : tous les solos.
- Shift + Loop : éditeur de notes ; Shift + Back : panneau Devices ; Back depuis l'éditeur de notes : retour aux Devices.
- Back ne fait plus d'aller-retour entre le parent et le sous-device.
- Les encodeurs restent sur les contrôles du device, même navigateur ouvert.

## 3.24 — 1er novembre 2026
- Molette : retour à la navigation de la v3.21 ; un device replié est déplié à l'affichage.
- Protection : une erreur dans un geste s'affiche au lieu d'arrêter le script.
- Correction du plantage « Parameter index (=-1) » de la v3.22.

## 3.22 – 3.23
- Back annule les affichages en attente (plus de re-sélection du sous-FX).
- Entrée dans un pad ou un FX : on déplie d'abord, puis on sélectionne.

## 3.19 – 3.21
- Le panneau du bas ne s'ouvre et ne se ferme qu'avec Shift + Back.
- Dépliage / repliage automatique des devices (`AUTO_FOLD`, en test).

## 3.8 – 3.18
- Navigation dans les sous-devices : clic molette (entrer), Shift + clic (couche suivante), Back (remonter).
- Clic molette sur un plugin : ouvre / ferme sa fenêtre.
- Le mode Drum suit le premier instrument de la piste (on garde les pads en naviguant dans un pad).
- Choisir un son de drum : les encodeurs suivent ce son.
- La piste choisie depuis la Move devient la seule armée.
- Vue Loop : éditeur de notes dans le panneau du bas.

## 3.0 – 3.7
- Gestes alignés sur le manuel de la Move : Loop (vue mesures), Copy / collage de pas, Delete, Mute, pas maintenu (vélocité, longueur, nudge, transposition), Workflow (Shift + Pas 3).
- Shift + Pas 15 / 16 : doubler la boucle / Quantize.
- Capture intégré : nouveau clip ou overdub dans le clip qui boucle, Undo en une fois.
- Duplication dans un slot vide, copie de clip en Session.
- Record : enregistre dans le slot vide sélectionné.
- Shift + bouton de piste : stop.

## 2.0 – 2.8
- Reprise des fonctions du mode Control Live : modes Note / Session, devices, Shift + pas, modificateurs.
- Réveil intégré de la Move par SysEx (protocole movewire), sans Live.
- Fenêtre de 4 pistes qui suit + / –, couleurs Bitwig (palette movewire), notes jouées visibles.
- Mode Session horizontal (rangée = piste, colonne = scène).

## 1.0 — 31 octobre 2026
- Séquenceur 32 pas sur les pads, transport, LEDs par `addStepDataObserver`.
