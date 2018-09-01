import { Scale, scale, transpose, Chord } from "tonal";
import "./populate-selectors";
import * as Key from "tonal-key";
import * as playback from "./playback";
import * as midiPlayback from "./midiplayback";
import * as utils from "./utils";

var tonic = "C";
var accidental = "";
var baseOctave = "3";
var scaleName = "major";
var repeatTonicPlayback = true;
var repeatTonicRender = false;

var noteSelector = document.getElementById("noteselector");
var accidentalSelector = document.getElementById("accidentalselector");
var chordName = document.getElementById("chord-name");
var chordNotes = document.getElementById("chord-notes");
var scaleSelector = document.getElementById("scaleselector");
var randomizeHmButton = document.getElementById("randomize-hm");
var playScaleButton = document.getElementById("play-scale");
var tempoSelector = document.getElementById("tempo");
var rhythmSelector = document.getElementById("rhythm");
var repeatsSelector = document.getElementById("repeats");
var playRhythmButton = document.getElementById("play-rhythm");
var randomizeTrButton = document.getElementById("randomize-tr");
var randomizeAllButton = document.getElementById("randomize-all");
var toggleHmButton = document.getElementById("toggle-hm");
var bodyHm = document.getElementById("body-hm");
var toggleTrButton = document.getElementById("toggle-tr");
var bodyTr = document.getElementById("body-tr");

noteSelector.addEventListener("change", noteSelected);
accidentalSelector.addEventListener("change", accidentalSelected);
scaleSelector.addEventListener("change", scaleSelected);
playScaleButton.addEventListener("click", playScaleClicked);
playRhythmButton.addEventListener("click", playRhythmClicked);
randomizeHmButton.addEventListener("click", randomizeHm);
randomizeTrButton.addEventListener("click", randomizeTr);
randomizeAllButton.addEventListener("click", randomizeAll);
toggleHmButton.addEventListener("click", toggleSection);
toggleTrButton.addEventListener("click", toggleSection);

tonic = tonic + accidental + baseOctave;
var tonalScale = scale(scaleName).map(transpose(tonic));

showResult();

function getPossibleChords(tonic, scaleName, bestChords) {
    let validChords = [];
    let scaleArray = Scale.notes(tonic.slice(0, -1) + " " + scaleName);
    scaleArray.forEach(noteInScale => {
        Chord.names().forEach(chordName => {
            let currentChord = noteInScale + chordName;
            let notesInChord = Chord.notes(currentChord);
            if (notesInChord.length == 0) {
                currentChord = noteInScale + "M" + chordName;
                notesInChord = Chord.notes(currentChord);
            }
            let isValidChord = true;
            notesInChord.forEach(noteInChord => {
                if (!(scaleArray.includes(noteInChord))) {
                    isValidChord = false;
                }
            });
            if (isValidChord && !(bestChords.includes(currentChord))) {
                validChords.push(currentChord);
            }
        });
    });
    return validChords;
}

function randomizeSelction(selector) {
    var allOptions = selector.childNodes;
    var nOptions = allOptions.length;
    var randomIndex = Math.floor(Math.random() * nOptions);

    for (let i = 0; i < nOptions; i++) {
        if (i == randomIndex) {
            allOptions[i].selected = true;
        }
        else {
            allOptions[i].selected = false;
        }
    }
}

function renderNoteNames(tonalScale) {
    let namesDiv = document.getElementById("names");
    namesDiv.innerHTML = "";
    tonalScale.forEach(note => {
        let noteName = note;
        if (note.length > 2) {
            let accidentals = note.slice(1, -1);
            noteName = note.replace(accidentals, utils.accidentalsList[accidentals]);
        }
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "note-button");
        newButton.setAttribute("value", note);
        newButton.addEventListener("click", noteClicked);
        newButton.innerHTML = noteName.slice(0, -1);
        namesDiv.appendChild(newButton);
    });
}

function renderChords() {
    let bestChords = Key.chords(tonic.slice(0, -1) + " " + scaleName);
    let possibleChords = getPossibleChords(tonic, scaleName, bestChords);

    let chordsDiv = document.getElementById("chords");
    chordsDiv.innerHTML = "";

    bestChords.forEach(chord => {
        let chordStr = utils.accidentalsToUnicode(chord);
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "chord-button chord-button-0");
        newButton.setAttribute("value", chord);
        newButton.innerHTML = chordStr;
        newButton.addEventListener("click", chordClicked);
        chordsDiv.appendChild(newButton);
    });

    let moreChordsDiv = document.getElementById("more-chords");
    moreChordsDiv.innerHTML = "";

    let firstChord = possibleChords[0];
    let startsWith = possibleChords[0].slice(0, 1);
    if (["b", "#"].includes(possibleChords[0].slice(1, 2))) {
        startsWith = possibleChords[0].slice(0, 2);
    }

    let chordButtonN = 1;

    possibleChords.forEach(chord => {
        let currentStartsWith = chord.slice(0, 1);
        if (["b", "#"].includes(chord.slice(1, 2))) {
            currentStartsWith = chord.slice(0, 2);
        }
        if (currentStartsWith != startsWith) {
            chordButtonN +=1;
            startsWith = currentStartsWith;
        }

        let chordStr = utils.accidentalsToUnicode(chord);

        let newButton = document.createElement("button");
        newButton.setAttribute("class", "chord-button " + "chord-button-" + chordButtonN);
        newButton.setAttribute("value", chord);
        newButton.innerHTML = chordStr;
        newButton.addEventListener("click", chordClicked);
        moreChordsDiv.appendChild(newButton);
    });
}

function showResult() {
    if (repeatTonicPlayback) {
        tonalScale.push(tonic.slice(0, -1) + (Number(tonic.slice(-1)) + 1));
        if (repeatTonicRender === false) {
            renderNoteNames(tonalScale.slice(0, -1));
        }
        else {
            renderNoteNames(tonalScale);
        }
    }
    else {
        if (repeatTonicRender === false) {
            renderNoteNames(tonalScale);
        }
        else {
            let scale = tonalScale.slice();
            scale.push(tonic.slice(0, -1) + (Number(tonic.slice(-1)) + 1));
            renderNoteNames(scale);
        }
    }

    renderChords();
}

function noteSelected(select) {
    tonic = select.target.value + accidental + baseOctave;
    tonalScale = scale(scaleName).map(transpose(tonic));
    showResult();
}

function accidentalSelected(select) {
    accidental = select.target.value;
    tonic = tonic.slice(0, 1) + accidental + baseOctave;
    tonalScale = scale(scaleName).map(transpose(tonic));
    showResult();
}

function scaleSelected(select) {
    scaleName = select.target.value;
    tonalScale = scale(scaleName).map(transpose(tonic));
    showResult();
}

function playScaleClicked() {
    // midiPlayback sound better, but for some reason plays notes out of order first time
    midiPlayback.playScale(tonalScale, 127);
    // OR
    //playback.playScale(tonalScale);
}

function noteClicked(button) {
    let note = button.target.value;
    midiPlayback.playNote(note, 127);
    // OR
    //playback.playSound("piano", note, 0);
}

function chordClicked(button) {
    let chord = button.target.value;
    let notes = Chord.notes(chord);

    midiPlayback.playChord(notes, 100);
    // OR
    //playback.playChord(notes);

    if (button.target.innerHTML == utils.accidentalsToUnicode(chord)) {
        let chordStr = utils.accidentalsToUnicode(chord);
        let notesStr = utils.accidentalsToUnicode(utils.notesArrayToStr(notes));
        chordName.innerHTML = chordStr;
        chordNotes.innerHTML = notesStr;
    }
}

function playRhythmClicked() {
    let rhythm = rhythmSelector.options[rhythmSelector.selectedIndex].value;
    let tempo = tempoSelector.options[tempoSelector.selectedIndex].value;
    let repeats = repeatsSelector.options[repeatsSelector.selectedIndex].value;
    playback.playRhythm(rhythm, tempo, repeats);
}

function toggleSection(button) {
    let sectionBody = null;
    if (button.target.id == "toggle-hm") {
        sectionBody = bodyHm;
    }
    else {
        sectionBody = bodyTr;
    }

    if ((sectionBody.style.display == "block") || (sectionBody.style.display == "")) {
        sectionBody.style.display = "none";
    }
    else {
        sectionBody.style.display = "block";
    }
}

function randomizeHm() {
    randomizeSelction(noteSelector);
    randomizeSelction(accidentalSelector);
    randomizeSelction(scaleSelector);

    accidental = accidentalSelector.options[accidentalSelector.selectedIndex].value;
    tonic = noteSelector.options[noteSelector.selectedIndex].value;
    tonic = tonic + accidental + baseOctave;
    scaleName = scaleSelector.options[scaleSelector.selectedIndex].value;
    tonalScale = scale(scaleName).map(transpose(tonic));

    showResult();
    bodyHm.style.display = "block";
}

function randomizeTr() {
    randomizeSelction(tempoSelector);
    randomizeSelction(rhythmSelector);
    bodyTr.style.display = "block";
}

function randomizeAll() {
    randomizeHm();
    randomizeTr();
}
