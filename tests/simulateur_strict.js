/**
 * Simulateur STRICT : comme Bitwig, il refuse la lecture d'une valeur qui n'a pas été déclarée
 * (markInterested / add…Observer), et il essaie tous les boutons, pads et pas dans plusieurs états.
 * Usage :  node tests/simulateur_strict.js AbletonMove.control.js
 * Il ne reproduit pas le comportement réel de Bitwig : il cherche les plantages et les lectures
 * non déclarées. Deux « mondes » : tout vaut 0 / faux, puis tout existe / vrai.
 */
const fs = require('fs');
const mainPath = process.argv[2] || 'AbletonMove.control.js';
const script = fs.readFileSync(mainPath, 'utf8');

const READS = ['get', 'getRaw', 'getAsDouble', 'getAsInt', 'getLimited', 'getFormatted', 'red', 'green', 'blue', 'isEmpty', 'currentCount'];
const LOOPS = ['keepAlive', 'drumModeWatch', 'browserPoll', 'clockTick', 'waitClip', 'pulseTick'];

function runWorld(world) {
  const marked = new Set(), violations = new Map(), crashes = new Map(), paths = new WeakMap();
  let queue = [];
  function site() {
    const st = new Error().stack.split('\n');
    for (const l of st) { const m = /<anonymous>:(\d+):\d+\)?$/.exec(l); if (m && /eval/.test(l)) return +m[1]; }
    return 0;
  }
  function argStr(a) {
    if (a === null || a === undefined) return String(a);
    if (typeof a === 'function' || typeof a === 'object') { const p = paths.get(a); return p !== undefined ? '<' + p + '>' : (Array.isArray(a) ? '[' + a.map(argStr).join(',') + ']' : typeof a); }
    return JSON.stringify(a);
  }
  function lastIdent(path) { const m = /\.([A-Za-z_]\w*)(\([^()]*\))?$/.exec(path); return m ? m[1] : ''; }
  function value(path) {
    const n = lastIdent(path);
    if (world === 0) return /Setting$/.test(n) && /String/.test(n) ? '{}' : 0;
    if (/^getStringSetting$/.test(n)) return '{}';
    if (/^(exists|is[A-Z]|has[A-Z]|can[A-Z])/.test(n) || /createEqualsValue/.test(n)) return true;
    if (/name|Name|displayedValue|text|Text|get.*Setting/.test(n)) return 'Nom';
    return 1;
  }
  function mk(path) {
    const f = function () {};
    const p = new Proxy(f, {
      get(t, k) {
        if (typeof k === 'symbol') return k === Symbol.toPrimitive ? () => 0 : undefined;
        if (k === 'length') return 0;
        if (k === 'then') return undefined;
        if (k === 'markInterested') return () => { marked.add(path); };
        if (/^add\w*Observer$/.test(k)) return () => { marked.add(path); };
        if (READS.indexOf(k) >= 0) return () => {
          if (!marked.has(path)) { const key = path + '.' + k + '()'; if (!violations.has(key)) violations.set(key, site()); }
          if (k === 'red' || k === 'green' || k === 'blue') return world ? 0.5 : 0;
          if (k === 'isEmpty') return !world;
          return value(path);
        };
        if (k === 'scheduleTask') return (fn) => { queue.push(fn); };
        return mk(path + '.' + k);
      },
      apply(t, self, args) { return mk(path + '(' + args.map(argStr).join(',') + ')'); }
    });
    paths.set(p, path);
    return p;
  }
  function drain() {
    let n = 0;
    while (queue.length && n++ < 400) {
      const fn = queue.shift();
      if (LOOPS.indexOf(fn.name) >= 0) continue;
      try { fn(); } catch (e) { note(e, 'tâche différée'); }
    }
    queue = [];
  }
  function note(e, what) {
    const st = String(e && e.stack || e).split('\n');
    let line = 0; for (const l of st) { const m = /<anonymous>:(\d+):\d+\)?$/.exec(l); if (m) { line = +m[1]; break; } }
    const key = 'ligne ' + line + ' : ' + String(e && e.message || e);
    if (!crashes.has(key)) crashes.set(key, what);
  }
  global.host = mk('host'); global.loadAPI = () => {}; global.println = () => {};
  const harness = `
;(function () {
  try { init(); } catch (e) { __note(e, 'init'); }
  __drain();
  popup = function () {};
  function g(a, b, c, what) { try { onMidi(a, b, c); flush(); } catch (e) { __note(e, what); } __drain(); }
  function sweep(tag) {
    for (var cc = 0; cc < 128; cc++) { g(176, cc, 127, tag + ' CC ' + cc + ' appui'); g(176, cc, 0, tag + ' CC ' + cc + ' relâché'); }
    for (var cw = 0; cw < 128; cw++) { g(176, cw, 1, tag + ' CC ' + cw + ' +1'); g(176, cw, 127, tag + ' CC ' + cw + ' -1'); g(176, cw, 0, tag + ' CC ' + cw + ' 0'); }
    for (var n = 0; n < 128; n++) { g(144, n, 100, tag + ' note ' + n + ' appui'); g(160, n, 80, tag + ' note ' + n + ' pression'); g(128, n, 0, tag + ' note ' + n + ' relâché'); }
  }
  function hold(cc, tag) {
    g(176, cc, 127, tag + ' tenu');
    for (var n = 0; n < 128; n++) { g(144, n, 100, tag + ' + note ' + n); g(128, n, 0, tag + ' + note ' + n + ' relâché'); }
    for (var c2 = 0; c2 < 128; c2++) { if (c2 === cc) continue; g(176, c2, 127, tag + ' + CC ' + c2); g(176, c2, 0, tag + ' + CC ' + c2 + ' relâché'); }
    g(176, HW.CC_WHEEL, 1, tag + ' + molette'); g(176, HW.CC_WHEEL, 127, tag + ' + molette -');
    g(176, cc, 0, tag + ' relâché');
  }
  var mods = [];
  ['CC_SHIFT', 'CC_DELETE', 'CC_COPY', 'CC_MUTE', 'CC_LOOP', 'CC_CAPTURE', 'CC_UNDO'].forEach(function (k) { if (typeof HW[k] === 'number') mods.push([HW[k], k]); });
  // --- scénario : Capture des mouvements de potards (rejeu) ---
  S.isPlaying = true; lastPos = { beats: 0, t: new Date().getTime() };
  clipPlay = { step: 0, t: new Date().getTime() };
  for (var q = 0; q < 6; q++) { try { onEncoder(q % 3, 1); } catch (e) { __note(e, 'encodeur (rejeu)'); } }
  __log('mouvements gardés : ' + autoMoves.length + ' / à graver : ' + pendingAutoMoves().length);
  captureNotes = [];
  try { doCapture(); } catch (e) { __note(e, 'Capture automation'); }
  __drain();
  __log('après gravure : autoRep = ' + (autoRep ? 'en cours' : 'fini') + ', mouvements restants = ' + autoMoves.length);
  S.isPlaying = false;
  sweep('Note');
  mods.forEach(function (m) { hold(m[0], 'Note ' + m[1]); });
  // pas maintenu + tout
  for (var s = 0; s < 16; s += 5) { g(144, HW.STEP_FIRST_NOTE + s, 127, 'pas tenu'); sweep('pas ' + (s + 1) + ' tenu'); g(128, HW.STEP_FIRST_NOTE + s, 0, 'pas relâché'); }
  // chaque fonction Shift + pas, puis un balayage dans l'état obtenu
  for (var x = 0; x < 16; x++) {
    g(176, HW.CC_SHIFT, 127, 'Shift'); g(144, HW.STEP_FIRST_NOTE + x, 127, 'Shift + Pas ' + (x + 1)); g(128, HW.STEP_FIRST_NOTE + x, 0, 'Shift + Pas relâché'); g(176, HW.CC_SHIFT, 0, 'Shift relâché');
    sweep('après Shift + Pas ' + (x + 1));
    mods.slice(0, 2).forEach(function (m) { hold(m[0], 'après Shift + Pas ' + (x + 1) + ' ' + m[1]); });
  }
  // double Shift (verrouillages)
  g(176, HW.CC_SHIFT, 127, 'Shift 1'); g(176, HW.CC_SHIFT, 0, 'Shift 1'); g(176, HW.CC_SHIFT, 127, 'Shift 2'); g(176, HW.CC_SHIFT, 0, 'Shift 2');
  sweep('double Shift');
  try { exit(); } catch (e) { __note(e, 'exit'); }
})();`;
  global.__note = note; global.__drain = drain; global.__log = function (m) { if (world) console.log('  [rejeu] ' + m); };
  try { (0, eval)(script + harness); } catch (e) { note(e, 'chargement'); }
  return { violations, crashes };
}

let bad = 0;
[0, 1].forEach(function (w) {
  const r = runWorld(w);
  console.log('\n=== Monde ' + (w ? '« tout existe / vrai »' : '« tout vaut 0 / faux »') + ' ===');
  console.log('Plantages : ' + r.crashes.size);
  r.crashes.forEach((what, key) => console.log('  ' + key + '   [' + what + ']'));
  console.log('Lectures non déclarées : ' + r.violations.size);
  r.violations.forEach((line, key) => console.log('  ligne ' + line + ' : ' + key));
  bad += r.crashes.size + r.violations.size;
});
console.log(bad ? '\n' + bad + ' point(s) à examiner' : '\nOK : aucun plantage, aucune lecture non déclarée');
