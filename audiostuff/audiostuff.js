let notes = "notes: ";
let audioContext = new window.AudioContext();
let audioContext2 = new window.AudioContext();
let x;


function keyDown(event) {

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    let key = event.key;

    switch (key) {
        case "a":
            x = 130.81; // C natural
            notes = notes+" c";
            break;
        case "s":
            x = 146.83;
            notes = notes+" d";
            break;
        case "d":
            x = 164.81;
            notes = notes+" e";
            break;
        case "f":
            x = 174.61;
            notes = notes+" f";
            break;
        case "g":
            x = 196;
            notes = notes+" g";
            break;
        case "h":
            x = 220;
            notes = notes+" a";
            break;
        case "j":
            x = 246.94;
            notes = notes+" b";
            break;
        case "k":
            x = 261.63; //  | same note as C but different octave
            notes = notes+" C";
            break;
        case "l":
            x = 293.66;
            notes = notes+" D";
            break;
        case ";":
            x = 329.63;
            notes = notes+" E";
            break;
        case "'":
            x = 349.23;
            notes = notes+" F";
            break;
        // okay now to make the sharps and stuff
        case "w":
            x = 138.59; 
            notes = notes+" c#"; // C sharp
            break;
        case "e":
            x = 155.56;
            notes = notes+" d#";
            break;
        case "t":
            x = 185;
            notes = notes+" f#";
            break;
        case "y":
            x = 207.65;
            notes = notes+" g#";
            break;
        case "u":
            x = 233.08;
            notes = notes+" a#";
            break;
        case "o":
            x = 277.18;
            notes = notes+" C#";
            break;
        case "p":
            x = 311.13;
            notes = notes+" D#";
            break;
        case "Enter":
            x = 0;
            notes = notes+" | ";
            break;


    }
    document.getElementById("notes").innerHTML = notes;
    oscillator.type = 'square';
    oscillator.frequency.value = x;
    gainNode.gain.value = 0.25;
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + .125);
}





function beep() {
    let audioContext = new window.AudioContext();

    // Create oscillator (tone generator) and gain node (volume control)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect audio nodes: oscillator -> gain -> speakers
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    // Configure the oscillator
    oscillator.frequency.value = 300;
    oscillator.type = 'sine';

    gainNode.gain.value = .5
    // Start and schedule stop of the oscillator
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + .1);
}