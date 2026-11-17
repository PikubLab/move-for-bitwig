/**
 * Simulateur minimal de l'hôte Bitwig pour tester AbletonMove.control.js sans Bitwig.
 * Usage :  node tests/simulateur.js AbletonMove.control.js
 * Il vérifie seulement que le script se charge et que les gestes ne provoquent
 * pas d'erreur JavaScript (il ne reproduit pas le comportement réel de Bitwig).
 */
const fs = require('fs');
function P() {
  const f = function () { return P(); };
  return new Proxy(f, {
    get: (t, k) => {
      if (k === 'get') return () => 0;
      if (k === 'getRaw') return () => 120;
      if (k === 'length') return 0;
      if (k === Symbol.toPrimitive) return () => 0;
      if (k === 'scheduleTask') return (fn) => { if (['keepAlive','drumModeWatch','browserPoll','clockTick','waitClip'].indexOf(fn.name) < 0) fn(); };
      return P();
    },
    apply: () => P()
  });
}
global.host = P(); global.loadAPI = () => {}; global.println = () => {};
const mainPath = process.argv[2] || 'AbletonMove.control.js';
const path = require('path');
// load("x.js") de Bitwig : fichier voisin, même espace global -> on l'insère à la place de l'appel
const script = fs.readFileSync(mainPath, 'utf8').replace(/load\("([^"]+)"\);/, (m, f) => {
   const fp = path.join(path.dirname(mainPath), f);
   return fs.existsSync(fp) ? fs.readFileSync(fp, 'utf8') : `throw "fichier absent : ${f}";`;
});
eval(script + `
init();
popup = function (m) { console.log('POPUP:', m); };
function m(a, b, c) { onMidi(a, b, c); flush(); }
// Mode Note : pas, pas maintenu + édition, copie, Mute, Delete
m(144,20,127); m(176,63,127); m(176,55,127); m(176,79,1); m(176,14,127); m(128,20,0);
m(176,60,127); m(144,16,127); m(144,19,127); m(176,60,0); m(144,24,127); m(128,24,0);
m(176,60,127); m(176,60,0); m(176,88,127); m(176,88,0); m(176,119,127); m(176,119,0);
// Vue Loop, Workflow, devices
m(176,58,127); m(176,58,0); m(144,17,127); m(144,19,127); m(128,19,0); m(128,17,0); m(176,58,127); m(176,58,0);
m(176,49,127); m(144,18,127); m(176,49,0); m(176,14,1); m(176,3,127); m(176,51,127);
// Pads + Capture + Undo
m(144,70,100); m(128,70,0); m(176,52,127); m(176,56,127);
// Session
m(176,50,127); m(176,50,0); m(144,90,100); m(176,60,127); m(144,91,100); m(176,60,0); m(176,86,127);
exit(); console.log('OK : aucun plantage');
`);
