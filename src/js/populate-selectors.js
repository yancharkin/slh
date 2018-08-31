import { Scale } from "tonal";
import * as utils from "./utils";

var noteSelector = document.getElementById("noteselector");
var accidentalSelector = document.getElementById("accidentalselector");
var scaleSelector = document.getElementById("scaleselector");
var tempoSelector = document.getElementById("tempo");
var rhythmSelector = document.getElementById("rhythm");
var repeatsSelector = document.getElementById("repeats");

utils.notesList.forEach(note => {
    let option = document.createElement("option");
    option.setAttribute("value", note);
    option.innerHTML = note;
    noteSelector.appendChild(option);
});

["", "#", "b"].forEach(accidental => {
    let option = document.createElement("option");
    option.setAttribute("value", accidental);
    option.innerHTML = utils.accidentalsToUnicode(accidental);
    accidentalSelector.appendChild(option);
});

Scale.names().forEach(scaleName => {
    let option = document.createElement("option");
    option.setAttribute("value", scaleName);
    option.innerHTML = scaleName;
    if (scaleName == "major") {
        option.selected = true;
    }
    scaleSelector.appendChild(option);
});

utils.timeSignatureList.forEach(ts => {
    let option = document.createElement("option");
    option.setAttribute("value", ts);
    option.innerHTML = ts;
    rhythmSelector.appendChild(option);
});

for (let tempo = 20; tempo < 401; tempo++) {
    let option = document.createElement("option");
    option.setAttribute("value", tempo);
    option.innerHTML = tempo;
    if (tempo == 120) {
        option.selected = true;
    }
    tempoSelector.appendChild(option);
}

let option = document.createElement("option");
option.setAttribute("value", 1);
option.innerHTML = "1 repeat";
option.selected = true;
repeatsSelector.appendChild(option);
for (let repeats = 2; repeats < 512; repeats += repeats) {
    let option = document.createElement("option");
    option.setAttribute("value", repeats);
    option.innerHTML = repeats + " repeats";
    repeatsSelector.appendChild(option);
}

