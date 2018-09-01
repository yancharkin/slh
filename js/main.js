/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","dependencies"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bufferloader.js":
/*!********************************!*\
  !*** ./src/js/bufferloader.js ***!
  \********************************/
/*! exports provided: BufferLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BufferLoader\", function() { return BufferLoader; });\nfunction BufferLoader(context, urls, callback) {\n    this.context = context;\n    this.urls = urls;\n    this.onload = callback;\n    this.buffers = {};\n    this.loadCount = 0;\n}\n\nBufferLoader.prototype.loadBuffer = function(key, url) {\n    var request = new XMLHttpRequest();\n    request.open(\"GET\", url, true);\n    request.responseType = \"arraybuffer\";\n\n    var loader = this;\n\n    request.onload = function() {\n        loader.context.decodeAudioData(\n            request.response,\n            function(buffer) {\n                if (!buffer) {\n                    console.error(\"error decoding file data: \" + url);\n                    return;\n                }\n                loader.buffers[key] = buffer;\n                if (++loader.loadCount == Object.keys(loader.urls).length)\n                    loader.onload(loader.buffers);\n            },\n        function(error) {\n            console.error(\"decodeAudioData error\", error);\n        }\n        );\n    };\n\n    request.onerror = function() {\n    console.error(\"BufferLoader: XHR error\");\n    };\n\n    request.send();\n};\n\nBufferLoader.prototype.load = function() {\n    Object.keys(this.urls).forEach(key => {\n        this.loadBuffer(key, this.urls[key]);\n    });\n};\n\n\n\n//# sourceURL=webpack:///./src/js/bufferloader.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var tonal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tonal */ \"./node_modules/tonal/index.js\");\n/* harmony import */ var _populate_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./populate-selectors */ \"./src/js/populate-selectors.js\");\n/* harmony import */ var tonal_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tonal-key */ \"./node_modules/tonal-key/build/es6.js\");\n/* harmony import */ var _playback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playback */ \"./src/js/playback.js\");\n/* harmony import */ var _midiplayback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./midiplayback */ \"./src/js/midiplayback.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\n\n\n\n\n\nvar tonic = \"C\";\nvar accidental = \"\";\nvar baseOctave = \"3\";\nvar scaleName = \"major\";\nvar repeatTonicPlayback = true;\nvar repeatTonicRender = false;\n\nvar noteSelector = document.getElementById(\"noteselector\");\nvar accidentalSelector = document.getElementById(\"accidentalselector\");\nvar chordName = document.getElementById(\"chord-name\");\nvar chordNotes = document.getElementById(\"chord-notes\");\nvar scaleSelector = document.getElementById(\"scaleselector\");\nvar randomizeHmButton = document.getElementById(\"randomize-hm\");\nvar playScaleButton = document.getElementById(\"play-scale\");\nvar tempoSelector = document.getElementById(\"tempo\");\nvar rhythmSelector = document.getElementById(\"rhythm\");\nvar repeatsSelector = document.getElementById(\"repeats\");\nvar playRhythmButton = document.getElementById(\"play-rhythm\");\nvar randomizeTrButton = document.getElementById(\"randomize-tr\");\nvar randomizeAllButton = document.getElementById(\"randomize-all\");\nvar toggleHmButton = document.getElementById(\"toggle-hm\");\nvar bodyHm = document.getElementById(\"body-hm\");\nvar toggleTrButton = document.getElementById(\"toggle-tr\");\nvar bodyTr = document.getElementById(\"body-tr\");\n\nnoteSelector.addEventListener(\"change\", noteSelected);\naccidentalSelector.addEventListener(\"change\", accidentalSelected);\nscaleSelector.addEventListener(\"change\", scaleSelected);\nplayScaleButton.addEventListener(\"click\", playScaleClicked);\nplayRhythmButton.addEventListener(\"click\", playRhythmClicked);\nrandomizeHmButton.addEventListener(\"click\", randomizeHm);\nrandomizeTrButton.addEventListener(\"click\", randomizeTr);\nrandomizeAllButton.addEventListener(\"click\", randomizeAll);\ntoggleHmButton.addEventListener(\"click\", toggleSection);\ntoggleTrButton.addEventListener(\"click\", toggleSection);\n\ntonic = tonic + accidental + baseOctave;\nvar tonalScale = Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"scale\"])(scaleName).map(Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"transpose\"])(tonic));\n\nshowResult();\n\nfunction getPossibleChords(tonic, scaleName, bestChords) {\n    let validChords = [];\n    let scaleArray = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Scale\"].notes(tonic.slice(0, -1) + \" \" + scaleName);\n    scaleArray.forEach(noteInScale => {\n        tonal__WEBPACK_IMPORTED_MODULE_0__[\"Chord\"].names().forEach(chordName => {\n            let currentChord = noteInScale + chordName;\n            let notesInChord = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Chord\"].notes(currentChord);\n            if (notesInChord.length == 0) {\n                currentChord = noteInScale + \"M\" + chordName;\n                notesInChord = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Chord\"].notes(currentChord);\n            }\n            let isValidChord = true;\n            notesInChord.forEach(noteInChord => {\n                if (!(scaleArray.includes(noteInChord))) {\n                    isValidChord = false;\n                }\n            });\n            if (isValidChord && !(bestChords.includes(currentChord))) {\n                validChords.push(currentChord);\n            }\n        });\n    });\n    return validChords;\n}\n\nfunction randomizeSelction(selector) {\n    var allOptions = selector.childNodes;\n    var nOptions = allOptions.length;\n    var randomIndex = Math.floor(Math.random() * nOptions);\n\n    for (let i = 0; i < nOptions; i++) {\n        if (i == randomIndex) {\n            allOptions[i].selected = true;\n        }\n        else {\n            allOptions[i].selected = false;\n        }\n    }\n}\n\nfunction renderNoteNames(tonalScale) {\n    let namesDiv = document.getElementById(\"names\");\n    namesDiv.innerHTML = \"\";\n    tonalScale.forEach(note => {\n        let noteName = note;\n        if (note.length > 2) {\n            let accidentals = note.slice(1, -1);\n            noteName = note.replace(accidentals, _utils__WEBPACK_IMPORTED_MODULE_5__[\"accidentalsList\"][accidentals]);\n        }\n        let newButton = document.createElement(\"button\");\n        newButton.setAttribute(\"class\", \"note-button\");\n        newButton.setAttribute(\"value\", note);\n        newButton.addEventListener(\"click\", noteClicked);\n        newButton.innerHTML = noteName.slice(0, -1);\n        namesDiv.appendChild(newButton);\n    });\n}\n\nfunction renderChords() {\n    let bestChords = tonal_key__WEBPACK_IMPORTED_MODULE_2__[\"chords\"](tonic.slice(0, -1) + \" \" + scaleName);\n    let possibleChords = getPossibleChords(tonic, scaleName, bestChords);\n\n    let chordsDiv = document.getElementById(\"chords\");\n    chordsDiv.innerHTML = \"\";\n\n    bestChords.forEach(chord => {\n        let chordStr = _utils__WEBPACK_IMPORTED_MODULE_5__[\"accidentalsToUnicode\"](chord);\n        let newButton = document.createElement(\"button\");\n        newButton.setAttribute(\"class\", \"chord-button chord-button-0\");\n        newButton.setAttribute(\"value\", chord);\n        newButton.innerHTML = chordStr;\n        newButton.addEventListener(\"click\", chordClicked);\n        chordsDiv.appendChild(newButton);\n    });\n\n    let moreChordsDiv = document.getElementById(\"more-chords\");\n    moreChordsDiv.innerHTML = \"\";\n\n    let firstChord = possibleChords[0];\n    let startsWith = possibleChords[0].slice(0, 1);\n    if ([\"b\", \"#\"].includes(possibleChords[0].slice(1, 2))) {\n        startsWith = possibleChords[0].slice(0, 2);\n    }\n\n    let chordButtonN = 1;\n\n    possibleChords.forEach(chord => {\n        let currentStartsWith = chord.slice(0, 1);\n        if ([\"b\", \"#\"].includes(chord.slice(1, 2))) {\n            currentStartsWith = chord.slice(0, 2);\n        }\n        if (currentStartsWith != startsWith) {\n            chordButtonN +=1;\n            startsWith = currentStartsWith;\n        }\n\n        let chordStr = _utils__WEBPACK_IMPORTED_MODULE_5__[\"accidentalsToUnicode\"](chord);\n\n        let newButton = document.createElement(\"button\");\n        newButton.setAttribute(\"class\", \"chord-button \" + \"chord-button-\" + chordButtonN);\n        newButton.setAttribute(\"value\", chord);\n        newButton.innerHTML = chordStr;\n        newButton.addEventListener(\"click\", chordClicked);\n        moreChordsDiv.appendChild(newButton);\n    });\n}\n\nfunction showResult() {\n    if (repeatTonicPlayback) {\n        tonalScale.push(tonic.slice(0, -1) + (Number(tonic.slice(-1)) + 1));\n        if (repeatTonicRender === false) {\n            renderNoteNames(tonalScale.slice(0, -1));\n        }\n        else {\n            renderNoteNames(tonalScale);\n        }\n    }\n    else {\n        if (repeatTonicRender === false) {\n            renderNoteNames(tonalScale);\n        }\n        else {\n            let scale = tonalScale.slice();\n            scale.push(tonic.slice(0, -1) + (Number(tonic.slice(-1)) + 1));\n            renderNoteNames(scale);\n        }\n    }\n\n    renderChords();\n}\n\nfunction noteSelected(select) {\n    tonic = select.target.value + accidental + baseOctave;\n    tonalScale = Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"scale\"])(scaleName).map(Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"transpose\"])(tonic));\n    showResult();\n}\n\nfunction accidentalSelected(select) {\n    accidental = select.target.value;\n    tonic = tonic.slice(0, 1) + accidental + baseOctave;\n    tonalScale = Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"scale\"])(scaleName).map(Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"transpose\"])(tonic));\n    showResult();\n}\n\nfunction scaleSelected(select) {\n    scaleName = select.target.value;\n    tonalScale = Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"scale\"])(scaleName).map(Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"transpose\"])(tonic));\n    showResult();\n}\n\nfunction playScaleClicked() {\n    // midiPlayback sound better, but for some reason plays notes out of order first time\n    _midiplayback__WEBPACK_IMPORTED_MODULE_4__[\"playScale\"](tonalScale, 127);\n    // OR\n    //playback.playScale(tonalScale);\n}\n\nfunction noteClicked(button) {\n    let note = button.target.value;\n    _midiplayback__WEBPACK_IMPORTED_MODULE_4__[\"playNote\"](note, 127);\n    // OR\n    //playback.playSound(\"piano\", note, 0);\n}\n\nfunction chordClicked(button) {\n    let chord = button.target.value;\n    let notes = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Chord\"].notes(chord);\n\n    _midiplayback__WEBPACK_IMPORTED_MODULE_4__[\"playChord\"](notes, 100);\n    // OR\n    //playback.playChord(notes);\n\n    if (button.target.innerHTML == _utils__WEBPACK_IMPORTED_MODULE_5__[\"accidentalsToUnicode\"](chord)) {\n        let chordStr = _utils__WEBPACK_IMPORTED_MODULE_5__[\"accidentalsToUnicode\"](chord);\n        let notesStr = _utils__WEBPACK_IMPORTED_MODULE_5__[\"accidentalsToUnicode\"](_utils__WEBPACK_IMPORTED_MODULE_5__[\"notesArrayToStr\"](notes));\n        chordName.innerHTML = chordStr;\n        chordNotes.innerHTML = notesStr;\n    }\n}\n\nfunction playRhythmClicked() {\n    let rhythm = rhythmSelector.options[rhythmSelector.selectedIndex].value;\n    let tempo = tempoSelector.options[tempoSelector.selectedIndex].value;\n    let repeats = repeatsSelector.options[repeatsSelector.selectedIndex].value;\n    _playback__WEBPACK_IMPORTED_MODULE_3__[\"playRhythm\"](rhythm, tempo, repeats);\n}\n\nfunction toggleSection(button) {\n    let sectionBody = null;\n    if (button.target.id == \"toggle-hm\") {\n        sectionBody = bodyHm;\n    }\n    else {\n        sectionBody = bodyTr;\n    }\n\n    if ((sectionBody.style.display == \"block\") || (sectionBody.style.display == \"\")) {\n        sectionBody.style.display = \"none\";\n    }\n    else {\n        sectionBody.style.display = \"block\";\n    }\n}\n\nfunction randomizeHm() {\n    randomizeSelction(noteSelector);\n    randomizeSelction(accidentalSelector);\n    randomizeSelction(scaleSelector);\n\n    accidental = accidentalSelector.options[accidentalSelector.selectedIndex].value;\n    tonic = noteSelector.options[noteSelector.selectedIndex].value;\n    tonic = tonic + accidental + baseOctave;\n    scaleName = scaleSelector.options[scaleSelector.selectedIndex].value;\n    tonalScale = Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"scale\"])(scaleName).map(Object(tonal__WEBPACK_IMPORTED_MODULE_0__[\"transpose\"])(tonic));\n\n    showResult();\n    bodyHm.style.display = \"block\";\n}\n\nfunction randomizeTr() {\n    randomizeSelction(tempoSelector);\n    randomizeSelction(rhythmSelector);\n    bodyTr.style.display = \"block\";\n}\n\nfunction randomizeAll() {\n    randomizeHm();\n    randomizeTr();\n}\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/midiplayback.js":
/*!********************************!*\
  !*** ./src/js/midiplayback.js ***!
  \********************************/
/*! exports provided: playNote, playScale, playChord, playRhythm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playNote\", function() { return playNote; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playScale\", function() { return playScale; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playChord\", function() { return playChord; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playRhythm\", function() { return playRhythm; });\n/* harmony import */ var tonal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tonal */ \"./node_modules/tonal/index.js\");\n\n\nvar midiNotes = document.getElementById(\"midi-notes\");\n\nif (navigator.requestMIDIAccess) {\n    navigator.requestMIDIAccess({\n        sysex: false\n    }).then(onMIDISuccess, onMIDIFailure);\n} else {\n    //alert(\"No MIDI support in your browser.\");\n    midiNotes.innerHTML = \"Not supported\";\n}\n\nMIDI.loadPlugin({\n    soundfontUrl: \"assets/soundfonts/\",\n    instrument: \"acoustic_grand_piano\",\n    onprogress: function(state, progress) {\n        console.log(state, progress);\n    },\n    onsuccess: function() {\n        MIDI.setVolume(0, 127);\n    }\n});\n\nfunction onMIDISuccess(midiAccess) {\n    let midi = midiAccess;\n    var inputs = midi.inputs.values();\n    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {\n        input.value.onmidimessage = onMIDIMessage;\n    }\n}\n\nfunction onMIDIFailure(e) {\n    console.log(\"No access to MIDI devices or your browser doesn't support WebMIDI API.\");\n}\n\nfunction onMIDIMessage(event) {\n    let data = event.data,\n    cmd = data[0] >> 4,\n    channel = data[0] & 0xf,\n    type = data[0] & 0xf0,\n    note = data[1],\n    velocity = data[2];\n\n    switch (type) {\n        case 144:\n            MIDI.noteOn(0, note, velocity, 0);\n            showNote(note);\n             break;\n        case 128:\n            MIDI.noteOff(0, note, 0);\n            hideNote(note);\n            break;\n    }\n}\n\nfunction showNote(note) {\n    if (midiNotes.innerHTML.length > 0) {\n        midiNotes.innerHTML += \" - \" + tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].fromMidi(note);\n    }\n    else {\n        midiNotes.innerHTML += tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].fromMidi(note);\n    }\n}\n\nfunction hideNote(note) {\n    var newStr = \"\";\n    var notesArray = midiNotes.innerHTML.split(\" - \");\n    for (var i = 0; i < notesArray.length; i++) {\n        if (notesArray[i] != \"\") {\n            if (notesArray[i] != tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].fromMidi(note)) {\n                if (i != notesArray.length - 1) {\n                    newStr += notesArray[i] + \" - \";\n                }\n                else {\n                    newStr += notesArray[i];\n                }\n            }\n        }\n    }\n    midiNotes.innerHTML = newStr;\n}\n\nfunction playNote(note, volume) {\n    var midiNote = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].midi(note);\n    var noteLength = 1;\n    MIDI.noteOn(0, midiNote, volume, 0);\n    MIDI.noteOff(0, midiNote,  noteLength);\n}\n\nfunction playScale(scale, volume) {\n    var noteStart = 0.5;\n    var noteLength = 0.5;\n    for (let i = 0; i < scale.length; i++) {\n        let midiNote = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].midi(scale[i]);\n        MIDI.noteOn(0, midiNote, volume, noteStart * i);\n        MIDI.noteOff(0, midiNote,  (noteStart * i) + noteLength);\n    }\n}\n\nfunction playChord(notes, volume) {\n    var baseOctave = 3;\n    var noteLength = 2;\n    var midiNote = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].midi(notes[0] + baseOctave);\n    MIDI.noteOn(0, midiNote, volume, 0);\n    MIDI.noteOff(0, midiNote,  noteLength);\n    for (let i = 1; i < notes.length; i++) {\n        if (tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].chroma(notes[i]) < tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].chroma(notes[i-1])) {\n            baseOctave += 1;\n        }\n        midiNote = tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].midi(notes[i] + baseOctave);\n        MIDI.noteOn(0, midiNote, volume, 0);\n        MIDI.noteOff(0, midiNote, noteLength);\n    }\n}\n\nfunction playRhythm(rhythm, tempo, repeats) {\n    var startTime = 0;\n    var beatsN = rhythm.split(\"/\")[0];\n    var beatValue = rhythm.split(\"/\")[1];\n    var noteLength = (60 / tempo) / (beatValue / 4);\n\n    for (let bar = 0; bar < repeats; bar++) {\n        let time = startTime + bar * beatsN * noteLength;\n        for (let n = 0; n < beatsN; n++) {\n            if (n == 0) {\n                MIDI.noteOn(0, 36, 127, time + n * noteLength);\n            }\n            else {\n                MIDI.noteOn(0, 38, 127, time + n * noteLength);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js/midiplayback.js?");

/***/ }),

/***/ "./src/js/note2midi.js":
/*!*****************************!*\
  !*** ./src/js/note2midi.js ***!
  \*****************************/
/*! exports provided: noteToMidi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noteToMidi\", function() { return noteToMidi; });\nvar noteToMidi = {\n    \"A0\": 21,\n    \"A#0\": 22,\n    \"Bb0\": 22,\n    \"B0\": 23,\n\n    \"C1\": 24,\n    \"C#1\": 25,\n    \"Db1\": 25,\n    \"D1\": 26,\n    \"D#1\": 27,\n    \"Eb1\": 27,\n    \"E1\": 28,\n    \"F1\": 29,\n    \"F#1\": 30,\n    \"Gb1\": 30,\n    \"G1\": 31,\n    \"G#1\": 32,\n    \"Ab1\": 32,\n    \"A1\": 33,\n    \"A#1\": 34,\n    \"Bb1\": 34,\n    \"B1\": 35,\n\n    \"C2\": 36,\n    \"C#2\": 37,\n    \"Db2\": 37,\n    \"D2\": 38,\n    \"D#2\": 39,\n    \"Eb2\": 39,\n    \"E2\": 40,\n    \"F2\": 41,\n    \"F#2\": 42,\n    \"Gb2\": 42,\n    \"G2\": 43,\n    \"G#2\": 44,\n    \"Ab2\": 44,\n    \"A2\": 45,\n    \"A#2\": 46,\n    \"Bb2\": 46,\n    \"B2\": 47,\n\n    \"C3\": 48,\n    \"C#3\": 49,\n    \"Db3\": 49,\n    \"D3\": 50,\n    \"D#3\": 51,\n    \"Eb3\": 51,\n    \"E3\": 52,\n    \"F3\": 53,\n    \"F#3\": 54,\n    \"Gb3\": 54,\n    \"G3\": 55,\n    \"G#3\": 56,\n    \"Ab3\": 56,\n    \"A3\": 57,\n    \"A#3\": 58,\n    \"Bb3\": 58,\n    \"B3\": 59,\n\n    \"C4\": 60,\n    \"C#4\": 61,\n    \"Db4\": 61,\n    \"D4\": 62,\n    \"D#4\": 63,\n    \"Eb4\": 63,\n    \"E4\": 64,\n    \"F4\": 65,\n    \"F#4\": 66,\n    \"Gb4\": 66,\n    \"G4\": 67,\n    \"G#4\": 68,\n    \"Ab4\": 68,\n    \"A4\": 69,\n    \"A#4\": 70,\n    \"Bb4\": 70,\n    \"B4\": 71,\n\n    \"C5\": 72,\n    \"C#5\": 73,\n    \"Db5\": 73,\n    \"D5\": 74,\n    \"D#5\": 75,\n    \"Eb5\": 75,\n    \"E5\": 76,\n    \"F5\": 77,\n    \"F#5\": 78,\n    \"Gb5\": 78,\n    \"G5\": 79,\n    \"G#5\": 80,\n    \"Ab5\": 80,\n    \"A5\": 81,\n    \"A#5\": 82,\n    \"Bb5\": 82,\n    \"B5\": 83,\n\n    \"C6\": 84,\n    \"C#6\": 85,\n    \"Db6\": 85,\n    \"D6\": 86,\n    \"D#6\": 87,\n    \"Eb6\": 87,\n    \"E6\": 88,\n    \"F6\": 89,\n    \"F#6\": 90,\n    \"Gb6\": 90,\n    \"G6\": 91,\n    \"G#6\": 92,\n    \"Ab6\": 92,\n    \"A6\": 93,\n    \"A#6\": 94,\n    \"Bb6\": 94,\n    \"B6\": 95,\n\n    \"C7\": 96,\n    \"C#7\": 97,\n    \"Db7\": 97,\n    \"D7\": 98,\n    \"D#7\": 99,\n    \"Eb7\": 99,\n    \"E7\": 100,\n    \"F7\": 101,\n    \"F#7\": 102,\n    \"Gb7\": 102,\n    \"G7\": 103,\n    \"G#7\": 104,\n    \"Ab7\": 104,\n    \"A7\": 105,\n    \"A#7\": 106,\n    \"Bb7\": 106,\n    \"B7\": 107,\n\n    \"C8\": 108,\n    \"C#9\": 109,\n    \"Db8\": 109\n};\n\n\n\n//# sourceURL=webpack:///./src/js/note2midi.js?");

/***/ }),

/***/ "./src/js/playback.js":
/*!****************************!*\
  !*** ./src/js/playback.js ***!
  \****************************/
/*! exports provided: playSound, playScale, playChord, playRhythm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playSound\", function() { return playSound; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playScale\", function() { return playScale; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playChord\", function() { return playChord; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playRhythm\", function() { return playRhythm; });\n/* harmony import */ var tonal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tonal */ \"./node_modules/tonal/index.js\");\n/* harmony import */ var _bufferloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bufferloader */ \"./src/js/bufferloader.js\");\n/* harmony import */ var _note2midi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./note2midi */ \"./src/js/note2midi.js\");\n/* harmony import */ var _samples__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./samples */ \"./src/js/samples.js\");\n\n\n\n\n\nwindow.AudioContext = window.AudioContext || window.webkitAudioContext;\nvar audioContext = new AudioContext();\n\nvar drums;\nvar drumSamplesLoader = new _bufferloader__WEBPACK_IMPORTED_MODULE_1__[\"BufferLoader\"](\n    audioContext,\n    _samples__WEBPACK_IMPORTED_MODULE_3__[\"drumSamples\"],\n    drumSamplesLoaded\n);\ndrumSamplesLoader.load();\nfunction drumSamplesLoaded(buffers) {\n    drums = buffers;\n}\n\nvar piano;\nvar pianoSamplesLoader = new _bufferloader__WEBPACK_IMPORTED_MODULE_1__[\"BufferLoader\"](\n    audioContext,\n    _samples__WEBPACK_IMPORTED_MODULE_3__[\"pianoSamples\"],\n    pianoSamplesLoaded\n);\npianoSamplesLoader.load();\nfunction pianoSamplesLoaded(buffers) {\n    piano = buffers;\n}\n\nfunction playSound(type, inputValue, startTime) {\n    let source = audioContext.createBufferSource();\n    if (type == \"drums\") {\n        source.buffer = drums[inputValue];\n    }\n    else if (type == \"piano\") {\n        source.buffer = piano[_note2midi__WEBPACK_IMPORTED_MODULE_2__[\"noteToMidi\"][inputValue]];\n    }\n    source.connect(audioContext.destination);\n    if (!source.start)\n        source.start = source.noteOn;\n    source.start(startTime);\n}\n\nfunction playScale(scale) {\n    let time = audioContext.currentTime;\n    scale.forEach(note => {\n        playSound(\"piano\", note, time);\n        time += 0.5;\n    });\n}\n\nfunction playChord(notes) {\n    var baseOctave = 3;\n    for (let i = 0; i < notes.length; i++) {\n        if (tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].chroma(notes[i]) < tonal__WEBPACK_IMPORTED_MODULE_0__[\"Note\"].chroma(notes[i-1])) {\n            baseOctave += 1;\n        }\n        let note = notes[i] + baseOctave;\n        playSound(\"piano\", note, 0);\n    }\n}\n\nfunction playRhythm(rhythm, tempo, repeats) {\n    var startTime = audioContext.currentTime + 0.100;\n    var beatsN = rhythm.split(\"/\")[0];\n    var beatValue = rhythm.split(\"/\")[1];\n    var noteLength = (60 / tempo) / (beatValue / 4);\n\n    for (let bar = 0; bar < repeats; bar++) {\n        let time = startTime + bar * beatsN * noteLength;\n        for (let n = 0; n < beatsN; n++) {\n            if (n == 0) {\n                playSound(\"drums\", \"ride\", time + n * noteLength);\n            }\n            else {\n                playSound(\"drums\", \"hat-c\", time + n * noteLength);\n            }\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/js/playback.js?");

/***/ }),

/***/ "./src/js/populate-selectors.js":
/*!**************************************!*\
  !*** ./src/js/populate-selectors.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var tonal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tonal */ \"./node_modules/tonal/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\n\nvar noteSelector = document.getElementById(\"noteselector\");\nvar accidentalSelector = document.getElementById(\"accidentalselector\");\nvar scaleSelector = document.getElementById(\"scaleselector\");\nvar tempoSelector = document.getElementById(\"tempo\");\nvar rhythmSelector = document.getElementById(\"rhythm\");\nvar repeatsSelector = document.getElementById(\"repeats\");\n\n_utils__WEBPACK_IMPORTED_MODULE_1__[\"notesList\"].forEach(note => {\n    let option = document.createElement(\"option\");\n    option.setAttribute(\"value\", note);\n    option.innerHTML = note;\n    noteSelector.appendChild(option);\n});\n\n[\"\", \"#\", \"b\"].forEach(accidental => {\n    let option = document.createElement(\"option\");\n    option.setAttribute(\"value\", accidental);\n    option.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__[\"accidentalsToUnicode\"](accidental);\n    accidentalSelector.appendChild(option);\n});\n\ntonal__WEBPACK_IMPORTED_MODULE_0__[\"Scale\"].names().forEach(scaleName => {\n    let option = document.createElement(\"option\");\n    option.setAttribute(\"value\", scaleName);\n    option.innerHTML = scaleName;\n    if (scaleName == \"major\") {\n        option.selected = true;\n    }\n    scaleSelector.appendChild(option);\n});\n\n_utils__WEBPACK_IMPORTED_MODULE_1__[\"timeSignatureList\"].forEach(ts => {\n    let option = document.createElement(\"option\");\n    option.setAttribute(\"value\", ts);\n    option.innerHTML = ts;\n    rhythmSelector.appendChild(option);\n});\n\nfor (let tempo = 20; tempo < 401; tempo++) {\n    let option = document.createElement(\"option\");\n    option.setAttribute(\"value\", tempo);\n    option.innerHTML = tempo;\n    if (tempo == 120) {\n        option.selected = true;\n    }\n    tempoSelector.appendChild(option);\n}\n\nlet option = document.createElement(\"option\");\noption.setAttribute(\"value\", 1);\noption.innerHTML = \"1 repeat\";\noption.selected = true;\nrepeatsSelector.appendChild(option);\nfor (let repeats = 2; repeats < 512; repeats += repeats) {\n    let option = document.createElement(\"option\");\n    option.setAttribute(\"value\", repeats);\n    option.innerHTML = repeats + \" repeats\";\n    repeatsSelector.appendChild(option);\n}\n\n\n\n//# sourceURL=webpack:///./src/js/populate-selectors.js?");

/***/ }),

/***/ "./src/js/samples.js":
/*!***************************!*\
  !*** ./src/js/samples.js ***!
  \***************************/
/*! exports provided: drumSamples, pianoSamples */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drumSamples\", function() { return drumSamples; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pianoSamples\", function() { return pianoSamples; });\nvar drumSamples = {\n    \"ride\": \"assets/samples/drums/ride.wav\",\n    \"hat-c\": \"assets/samples/drums/hat-c.wav\"\n};\n\nvar pianoSamples = {\n    21: \"assets/soundfonts/acoustic_grand_piano-mp3/A0.mp3\",\n    22: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb0.mp3\",\n    23: \"assets/soundfonts/acoustic_grand_piano-mp3/B0.mp3\",\n    24: \"assets/soundfonts/acoustic_grand_piano-mp3/C1.mp3\",\n    25: \"assets/soundfonts/acoustic_grand_piano-mp3/Db1.mp3\",\n    26: \"assets/soundfonts/acoustic_grand_piano-mp3/D1.mp3\",\n    27: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb1.mp3\",\n    28: \"assets/soundfonts/acoustic_grand_piano-mp3/E1.mp3\",\n    29: \"assets/soundfonts/acoustic_grand_piano-mp3/F1.mp3\",\n    30: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb1.mp3\",\n    31: \"assets/soundfonts/acoustic_grand_piano-mp3/G1.mp3\",\n    32: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab1.mp3\",\n    33: \"assets/soundfonts/acoustic_grand_piano-mp3/A1.mp3\",\n    34: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb1.mp3\",\n    35: \"assets/soundfonts/acoustic_grand_piano-mp3/B1.mp3\",\n    36: \"assets/soundfonts/acoustic_grand_piano-mp3/C2.mp3\",\n    37: \"assets/soundfonts/acoustic_grand_piano-mp3/Db2.mp3\",\n    38: \"assets/soundfonts/acoustic_grand_piano-mp3/D2.mp3\",\n    39: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb2.mp3\",\n    40: \"assets/soundfonts/acoustic_grand_piano-mp3/E2.mp3\",\n    41: \"assets/soundfonts/acoustic_grand_piano-mp3/F2.mp3\",\n    42: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb2.mp3\",\n    43: \"assets/soundfonts/acoustic_grand_piano-mp3/G2.mp3\",\n    44: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab2.mp3\",\n    45: \"assets/soundfonts/acoustic_grand_piano-mp3/A2.mp3\",\n    46: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb2.mp3\",\n    47: \"assets/soundfonts/acoustic_grand_piano-mp3/B2.mp3\",\n    48: \"assets/soundfonts/acoustic_grand_piano-mp3/C3.mp3\",\n    49: \"assets/soundfonts/acoustic_grand_piano-mp3/Db3.mp3\",\n    50: \"assets/soundfonts/acoustic_grand_piano-mp3/D3.mp3\",\n    51: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb3.mp3\",\n    52: \"assets/soundfonts/acoustic_grand_piano-mp3/E3.mp3\",\n    53: \"assets/soundfonts/acoustic_grand_piano-mp3/F3.mp3\",\n    54: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb3.mp3\",\n    55: \"assets/soundfonts/acoustic_grand_piano-mp3/G3.mp3\",\n    56: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab3.mp3\",\n    57: \"assets/soundfonts/acoustic_grand_piano-mp3/A3.mp3\",\n    58: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb3.mp3\",\n    59: \"assets/soundfonts/acoustic_grand_piano-mp3/B3.mp3\",\n    60: \"assets/soundfonts/acoustic_grand_piano-mp3/C4.mp3\",\n    61: \"assets/soundfonts/acoustic_grand_piano-mp3/Db4.mp3\",\n    62: \"assets/soundfonts/acoustic_grand_piano-mp3/D4.mp3\",\n    63: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb4.mp3\",\n    64: \"assets/soundfonts/acoustic_grand_piano-mp3/E4.mp3\",\n    65: \"assets/soundfonts/acoustic_grand_piano-mp3/F4.mp3\",\n    66: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb4.mp3\",\n    67: \"assets/soundfonts/acoustic_grand_piano-mp3/G4.mp3\",\n    68: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab4.mp3\",\n    69: \"assets/soundfonts/acoustic_grand_piano-mp3/A4.mp3\",\n    70: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb4.mp3\",\n    71: \"assets/soundfonts/acoustic_grand_piano-mp3/B4.mp3\",\n    72: \"assets/soundfonts/acoustic_grand_piano-mp3/C5.mp3\",\n    73: \"assets/soundfonts/acoustic_grand_piano-mp3/Db5.mp3\",\n    74: \"assets/soundfonts/acoustic_grand_piano-mp3/D5.mp3\",\n    75: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb5.mp3\",\n    76: \"assets/soundfonts/acoustic_grand_piano-mp3/E5.mp3\",\n    77: \"assets/soundfonts/acoustic_grand_piano-mp3/F5.mp3\",\n    78: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb5.mp3\",\n    79: \"assets/soundfonts/acoustic_grand_piano-mp3/G5.mp3\",\n    80: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab5.mp3\",\n    81: \"assets/soundfonts/acoustic_grand_piano-mp3/A5.mp3\",\n    82: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb5.mp3\",\n    83: \"assets/soundfonts/acoustic_grand_piano-mp3/B5.mp3\",\n    84: \"assets/soundfonts/acoustic_grand_piano-mp3/C6.mp3\",\n    85: \"assets/soundfonts/acoustic_grand_piano-mp3/Db6.mp3\",\n    86: \"assets/soundfonts/acoustic_grand_piano-mp3/D6.mp3\",\n    87: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb6.mp3\",\n    88: \"assets/soundfonts/acoustic_grand_piano-mp3/E6.mp3\",\n    89: \"assets/soundfonts/acoustic_grand_piano-mp3/F6.mp3\",\n    90: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb6.mp3\",\n    91: \"assets/soundfonts/acoustic_grand_piano-mp3/G6.mp3\",\n    92: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab6.mp3\",\n    93: \"assets/soundfonts/acoustic_grand_piano-mp3/A6.mp3\",\n    94: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb6.mp3\",\n    95: \"assets/soundfonts/acoustic_grand_piano-mp3/B6.mp3\",\n    96: \"assets/soundfonts/acoustic_grand_piano-mp3/C7.mp3\",\n    97: \"assets/soundfonts/acoustic_grand_piano-mp3/Db7.mp3\",\n    98: \"assets/soundfonts/acoustic_grand_piano-mp3/D7.mp3\",\n    99: \"assets/soundfonts/acoustic_grand_piano-mp3/Eb7.mp3\",\n    100: \"assets/soundfonts/acoustic_grand_piano-mp3/E7.mp3\",\n    101: \"assets/soundfonts/acoustic_grand_piano-mp3/F7.mp3\",\n    102: \"assets/soundfonts/acoustic_grand_piano-mp3/Gb7.mp3\",\n    103: \"assets/soundfonts/acoustic_grand_piano-mp3/G7.mp3\",\n    104: \"assets/soundfonts/acoustic_grand_piano-mp3/Ab7.mp3\",\n    105: \"assets/soundfonts/acoustic_grand_piano-mp3/A7.mp3\",\n    106: \"assets/soundfonts/acoustic_grand_piano-mp3/Bb7.mp3\",\n    107: \"assets/soundfonts/acoustic_grand_piano-mp3/B7.mp3\",\n    108: \"assets/soundfonts/acoustic_grand_piano-mp3/C8.mp3\",\n    109: \"assets/soundfonts/acoustic_grand_piano-mp3/Db8.mp3\"\n};\n\n\n//# sourceURL=webpack:///./src/js/samples.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: accidentalsList, notesList, timeSignatureList, accidentalsToUnicode, notesArrayToStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"accidentalsList\", function() { return accidentalsList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notesList\", function() { return notesList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timeSignatureList\", function() { return timeSignatureList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"accidentalsToUnicode\", function() { return accidentalsToUnicode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notesArrayToStr\", function() { return notesArrayToStr; });\nvar accidentalsList = {\n    \"bb\": \"𝄫\",\n    \"b\": \"♭\",\n    \"#\": \"♯\",\n    \"##\": \"𝄪\"\n};\n\nvar notesList = [\"C\", \"D\", \"E\", \"F\", \"G\", \"A\", \"B\"];\n\nvar timeSignatureList = [\n    \"4/4\",\n    \"2/2\",\n    \"2/4\",\n    \"3/4\",\n    \"5/4\",\n    \"6/4\",\n    \"7/4\",\n    \"9/4\",\n    \"11/4\",\n    \"2/8\",\n    \"3/8\",\n    \"5/8\",\n    \"6/8\",\n    \"7/8\",\n    \"9/8\",\n    \"11/8\",\n    \"12/8\"\n];\n\nfunction accidentalsToUnicode(chord) {\n    while (chord.includes(\"bb\")) {\n        chord = chord.replace(\"bb\", accidentalsList[\"bb\"]);\n    }\n    while (chord.includes(\"##\")) {\n        chord = chord.replace(\"##\", accidentalsList[\"##\"]);\n    }\n    while (chord.includes(\"b\")) {\n        chord = chord.replace(\"b\", accidentalsList[\"b\"]);\n    }\n    while (chord.includes(\"#\")) {\n        chord = chord.replace(\"#\", accidentalsList[\"#\"]);\n    }\n    return chord;\n}\n\nfunction notesArrayToStr(notes) {\n    let notesStr = \"\";\n    for (var i=0; i < notes.length; i++) {\n        if (i == notes.length - 1) {\n            notesStr += notes[i];\n        }\n        else {\n            notesStr += notes[i] + \" \";\n        }\n    }\n    return notesStr;\n}\n\n\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ })

/******/ });