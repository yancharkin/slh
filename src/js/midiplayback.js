import { Note } from "tonal";

var midiNotes = document.getElementById("midi-notes");

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    //alert("No MIDI support in your browser.");
    midiNotes.innerHTML = "Not supported";
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

function showNote(note) {
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

export function playNote(note, volume) {
    var midiNote = Note.midi(note);
    var noteLength = 1;
    MIDI.noteOn(0, midiNote, volume, 0);
    MIDI.noteOff(0, midiNote,  noteLength);
}

export function playScale(scale, volume) {
    var noteStart = 0.5;
    var noteLength = 0.5;
    for (let i = 0; i < scale.length; i++) {
        let midiNote = Note.midi(scale[i]);
        MIDI.noteOn(0, midiNote, volume, noteStart * i);
        MIDI.noteOff(0, midiNote,  (noteStart * i) + noteLength);
    }
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
