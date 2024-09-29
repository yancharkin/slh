import { Note } from "tonal";
import { BufferLoader } from "./bufferloader";
import { noteToMidi } from "./note2midi";
import { drumSamples, pianoSamples } from "./samples";

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var drums;
var drumSamplesLoader = new BufferLoader(
    audioContext,
    drumSamples,
    drumSamplesLoaded
);
drumSamplesLoader.load();
function drumSamplesLoaded(buffers) {
    drums = buffers;
}

var piano;
var pianoSamplesLoader = new BufferLoader(
    audioContext,
    pianoSamples,
    pianoSamplesLoaded
);
pianoSamplesLoader.load();
function pianoSamplesLoaded(buffers) {
    piano = buffers;
}

export function playSound(type, inputValue, startTime) {
    let source = audioContext.createBufferSource();
    if (type == "drums") {
        source.buffer = drums[inputValue];
    }
    else if (type == "piano") {
        source.buffer = piano[noteToMidi[inputValue]];
    }
    source.connect(audioContext.destination);
    if (!source.start)
        source.start = source.noteOn;
    source.start(startTime);
}

export function playScale(scale) {
    let time = audioContext.currentTime;
    scale.forEach(note => {
        playSound("piano", note, time);
        time += 0.5;
    });
}

export function playChord(notes) {
    var baseOctave = 3;
    for (let i = 0; i < notes.length; i++) {
        if (Note.chroma(notes[i]) < Note.chroma(notes[i-1])) {
            baseOctave += 1;
        }
        let note = notes[i] + baseOctave;
        playSound("piano", note, 0);
    }
}

export function playRhythm(rhythm, tempo, repeats, button) {
    var startTime = audioContext.currentTime + 0.100;
    var beatsN = rhythm.split("/")[0];
    var beatValue = rhythm.split("/")[1];
    var noteLength = (60 / tempo) / (beatValue / 4);
    button.disabled = true;
    setTimeout(() => {button.disabled = false}, noteLength * beatsN * repeats * 1000);
    for (let bar = 0; bar < repeats; bar++) {
        let time = startTime + bar * beatsN * noteLength;
        for (let n = 0; n < beatsN; n++) {
            if (n == 0) {
                playSound("drums", "ride", time + n * noteLength);
            }
            else {
                playSound("drums", "hat-c", time + n * noteLength);
            }
        }
    }
}
