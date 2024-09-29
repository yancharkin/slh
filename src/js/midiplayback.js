import { Note } from "tonal";
import { noteToMidi } from "./note2midi";

var playScaleButton = document.getElementById("play-scale");
var midiNotes = document.getElementById("midi-notes");
var notesInScale = document.getElementById("names");
var noteN = 1;
var timer;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    //alert("No MIDI support in your browser.");
    midiNotes.innerHTML = "MIDI not supported";
}

MIDI.loadPlugin({
    soundfontUrl: "assets/soundfonts/",
    instrument: "acoustic_grand_piano",
    onprogress: function(state, progress) {
        console.log(state, progress);
    },
    onsuccess: function() {
        MIDI.setVolume(0, 127);
    }
});

function onMIDISuccess(midiAccess) {
    let midi = midiAccess;
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(e) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API.");
}

function onMIDIMessage(event) {
    let data = event.data,
    cmd = data[0] >> 4,
    channel = data[0] & 0xf,
    type = data[0] & 0xf0,
    note = data[1],
    velocity = data[2];

    switch (type) {
        case 144:
            MIDI.noteOn(0, note, velocity, 0);
            showNote(note);
            break;
        case 128:
            MIDI.noteOff(0, note, 0);
            hideNote(note);
            break;
    }
}

export function showNote(note) {
    if (midiNotes.innerHTML.length > 0) {
        midiNotes.innerHTML += " - " + Note.fromMidi(note);
    }
    else {
        midiNotes.innerHTML += Note.fromMidi(note);
    }
}

function hideNote(note) {
    var newStr = "";
    var notesArray = midiNotes.innerHTML.split(" - ");
    for (var i = 0; i < notesArray.length; i++) {
        if (notesArray[i] != "") {
            if (notesArray[i] != Note.fromMidi(note)) {
                if (i != notesArray.length - 1) {
                    newStr += notesArray[i] + " - ";
                }
                else {
                    newStr += notesArray[i];
                }
            }
        }
    }
    midiNotes.innerHTML = newStr;
}

function animateScale() {
    return new Promise((resolve) => {
        timer = setInterval(() => {
            if (noteN < notesInScale.children.length) {
                notesInScale.children[noteN].focus();
            };
            noteN+=1;
            if (noteN > notesInScale.children.length) {
                clearInterval(timer);
                document.activeElement.blur();
                noteN = 1;
                playScaleButton.disabled = false;
            };
        }, 500);
    });
}

export function playNote(note, volume) {
    var midiNote = Note.midi(note);
    var noteLength = 1;
    MIDI.noteOn(0, midiNote, volume, 0);
    MIDI.noteOff(0, midiNote,  noteLength);
}

export async function playScale(scale, volume) {
    playScaleButton.disabled = true;
    var noteStart = 0.5;
    var noteLength = 0.5;
    notesInScale.children[0].focus();
    for (let i = 0; i < scale.length - 1; i++) {
        let midiNote = Note.midi(scale[i]);
        MIDI.noteOn(0, midiNote, volume, noteStart * i);
        MIDI.noteOff(0, midiNote,  (noteStart * i) + noteLength);
    }
    await animateScale();
}

export function playChord(notes, volume) {
    var baseOctave = 3;
    var noteLength = 2;
    var midiNote = Note.midi(notes[0] + baseOctave);
    MIDI.noteOn(0, midiNote, volume, 0);
    MIDI.noteOff(0, midiNote,  noteLength);
    for (let i = 1; i < notes.length; i++) {
        if (Note.chroma(notes[i]) < Note.chroma(notes[i-1])) {
            baseOctave += 1;
        }
        midiNote = Note.midi(notes[i] + baseOctave);
        MIDI.noteOn(0, midiNote, volume, 0);
        MIDI.noteOff(0, midiNote, noteLength);
    }
}

export function playRhythm(rhythm, tempo, repeats) {
    var startTime = 0;
    var beatsN = rhythm.split("/")[0];
    var beatValue = rhythm.split("/")[1];
    var noteLength = (60 / tempo) / (beatValue / 4);

    for (let bar = 0; bar < repeats; bar++) {
        let time = startTime + bar * beatsN * noteLength;
        for (let n = 0; n < beatsN; n++) {
            if (n == 0) {
                MIDI.noteOn(0, 36, 127, time + n * noteLength);
            }
            else {
                MIDI.noteOn(0, 38, 127, time + n * noteLength);
            }
        }
    }
}

function keyboardInput(e){
    if (e.repeat) return;
    let midiNote;
    switch (e.code) {
        case 'KeyZ': midiNote = Note.midi(noteToMidi['C3']); break;
        case 'KeyS': midiNote = Note.midi(noteToMidi['C#3']); break;
        case 'KeyX': midiNote = Note.midi(noteToMidi['D3']); break;
        case 'KeyD': midiNote = Note.midi(noteToMidi['D#3']); break;
        case 'KeyC': midiNote = Note.midi(noteToMidi['E3']); break;
        case 'KeyV': midiNote = Note.midi(noteToMidi['F3']); break;
        case 'KeyG': midiNote = Note.midi(noteToMidi['F#3']); break;
        case 'KeyB': midiNote = Note.midi(noteToMidi['G3']); break;
        case 'KeyH': midiNote = Note.midi(noteToMidi['G#3']); break;
        case 'KeyN': midiNote = Note.midi(noteToMidi['A3']); break;
        case 'KeyJ': midiNote = Note.midi(noteToMidi['A#3']); break;
        case 'KeyM': midiNote = Note.midi(noteToMidi['B3']); break;
        case 'KeyQ': midiNote = Note.midi(noteToMidi['C4']); break;
        case 'Digit2': midiNote = Note.midi(noteToMidi['C#4']); break;
        case 'KeyW': midiNote = Note.midi(noteToMidi['D4']); break;
        case 'Digit3': midiNote = Note.midi(noteToMidi['D#4']); break;
        case 'KeyE': midiNote = Note.midi(noteToMidi['E4']); break;
        case 'KeyR': midiNote = Note.midi(noteToMidi['F4']); break;
        case 'Digit5': midiNote = Note.midi(noteToMidi['F#4']); break;
        case 'KeyT': midiNote = Note.midi(noteToMidi['G4']); break;
        case 'Digit6': midiNote = Note.midi(noteToMidi['G#4']); break;
        case 'KeyY': midiNote = Note.midi(noteToMidi['A4']); break;
        case 'Digit7': midiNote = Note.midi(noteToMidi['A#4']); break;
        case 'KeyU': midiNote = Note.midi(noteToMidi['B4']); break;
        case 'KeyI': midiNote = Note.midi(noteToMidi['C5']); break;
        case 'Digit9': midiNote = Note.midi(noteToMidi['C#5']); break;
        case 'KeyO': midiNote = Note.midi(noteToMidi['D5']); break;
        case 'Digit0': midiNote = Note.midi(noteToMidi['D#5']); break;
        case 'KeyP': midiNote = Note.midi(noteToMidi['E5']); break;
    }
    if (midiNote) {
        if (e.type == 'keydown') {
            MIDI.noteOn(0, midiNote, 127, 0);
            showNote(midiNote);
        } else if (e.type == 'keyup') {
            MIDI.noteOff(0, midiNote, 0);
            hideNote(midiNote);
        }
    }
}
document.addEventListener("keydown", (e) => {keyboardInput(e)});
document.addEventListener("keyup", (e) => {keyboardInput(e)});
