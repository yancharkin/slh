export var accidentalsList = {
    "bb": "𝄫",
    "b": "♭",
    "#": "♯",
    "##": "𝄪"
};

export var notesList = ["C", "D", "E", "F", "G", "A", "B"];

export var timeSignatureList = [
    "4/4",
    "2/2",
    "2/4",
    "3/4",
    "5/4",
    "6/4",
    "7/4",
    "9/4",
    "11/4",
    "2/8",
    "3/8",
    "5/8",
    "6/8",
    "7/8",
    "9/8",
    "11/8",
    "12/8"
];

export function accidentalsToUnicode(chord) {
    while (chord.includes("bb")) {
        chord = chord.replace("bb", accidentalsList["bb"]);
    }
    while (chord.includes("##")) {
        chord = chord.replace("##", accidentalsList["##"]);
    }
    while (chord.includes("b")) {
        chord = chord.replace("b", accidentalsList["b"]);
    }
    while (chord.includes("#")) {
        chord = chord.replace("#", accidentalsList["#"]);
    }
    return chord;
}

export function notesArrayToStr(notes) {
    let notesStr = "";
    for (var i=0; i < notes.length; i++) {
        if (i == notes.length - 1) {
            notesStr += notes[i];
        }
        else {
            notesStr += notes[i] + " ";
        }
    }
    return notesStr;
}

export function isElectron() {
    return navigator.userAgent.toLowerCase().indexOf("electron") > -1;
}
