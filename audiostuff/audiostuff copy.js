let notes = "notes: ";
let audioContext = new window.AudioContext();
let audioContext2 = new window.AudioContext();
let x ="-1";
// let y;
let keyIsDown = false;
function keyDown(event) {
    keyIsDown = true
    console.log("key down")
    // Create oscillator (tone generator) and gain node (volume control)
    const oscillator = audioContext.createOscillator();
    // const oscillator2 = audioContext2.createOscillator();
    const gainNode = audioContext.createGain();
    // const gainNode2 = audioContext2.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    // oscillator2.connect(gainNode2);
    // gainNode2.connect(audioContext2.destination);
  
    console.log(x)
    let key = event.key;
//    if(x == -1){
    console.log(x+ " before switch");
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


    }//}
    
    // console.log(y+" y")
    // document.getElementById("notes").innerHTML = notes;
    // oscillator.type = 'square';
    // oscillator.frequency.value = x;
    // console.log(x+ " after switch");
    // gainNode.gain.value = 0.25;
    // oscillator.start(audioContext.currentTime);
    // if(x>0){
    //     switch (key) {
    //         case "a":
    //             y = 130.81; // C natural
    //             notes = notes+"+c ";
    //             break;
    //         case "s":
    //             y = 146.83;
    //             notes = notes+"+d ";
    //             break;
    //         case "d":
    //             y = 164.81;
    //             notes = notes+"+e ";
    //             break;
    //         case "f":
    //             y = 174.61;
    //             notes = notes+"+f ";
    //             break;
    //         case "g":
    //             y = 196;
    //             notes = notes+"+g ";
    //             break;
    //         case "h":
    //             y = 220;
    //             notes = notes+"+a ";
    //             break;
    //         case "j":
    //             y = 246.94;
    //             notes = notes+"+b ";
    //             break;
    //         case "k":
    //             y = 261.63; //  | same note as C but different octave
    //             notes = notes+"+C ";
    //             break;
    //         case "l":
    //             y = 293.66;
    //             notes = notes+"+D ";
    //             break;
    //         case ";":
    //             y = 329.63;
    //             notes = notes+"+E ";
    //             break;
    //         case "'":
    //             y = 349.23;
    //             notes = notes+"+F ";
    //             break;
    //         // okay now to make the sharps and stuff
    //         case "w":
    //             y = 138.59; 
    //             notes = notes+"+c# "; // C sharp
    //             break;
    //         case "e":
    //             y = 155.56;
    //             notes = notes+"+d# ";
    //             break;
    //         case "t":
    //             y = 185;
    //             notes = notes+"+f# ";
    //             break;
    //         case "y":
    //             y = 207.65;
    //             notes = notes+"+g# ";
    //             break;
    //         case "u":
    //             y = 233.08;
    //             notes = notes+"+a# ";
    //             break;
    //         case "o":
    //             y = 277.18;
    //             notes = notes+"+C# ";
    //             break;
    //         case "p":
    //             y = 311.13;
    //             notes = notes+"+D# ";
    //             break;
    
    
    //     }
    //     oscillator2.type = 'square';
    // oscillator2.frequency.value = y; // figure out how to make working chords
    // gainNode2.gain.value = 0.25;
    // oscillator2.start(audioContext2.currentTime);
    //     console.log("y played")
    // }else{
    //     y = 0;
    // }
    x = -1;
    
    oscillator.stop(audioContext.currentTime + .125);
    // oscillator2.stop(audioContext2.currentTime + .125);
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