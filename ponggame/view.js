import * as Controls from "./controls.js";
import { BOARD_WIDTH, BOARD_HEIGHT, BALL_RADIUS } from "./model.js";

let speed = 1.2;
export function bind_events(model) {
    document.getElementById("reset").onclick = () => Controls.resetGame(model);
    document.getElementById("nameL").oninput = (ev) => Controls.set_left_name(model, ev);
    document.getElementById("nameR").oninput = (ev) => Controls.set_right_name(model, ev);
    document.getElementById("cpucheck").onchange = (ev) => Controls.set_cpu(model, ev);
    window.addEventListener("keyup", key => Controls.keyUp(model, key));
    window.addEventListener("keydown", key => Controls.keyDown(model, key));
}

export function updateScore(model) {
    document.getElementById("scoreboard").innerHTML = `${model.scoreL} : ${model.scoreR}`;
}

export function draw_game(model) {
    const canvas = document.getElementById("gameboard");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    draw_ball(ctx, model.ball);
    draw_paddle(ctx, model.paddleL);
    draw_paddle(ctx, model.paddleR);
}

function draw_ball(ctx, ball) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(ball.posx, ball.posy, BALL_RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function draw_paddle(ctx, paddle) {
    ctx.fillStyle = paddle.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    //draw rectangle
    ctx.fillRect(paddle.posx, paddle.posy, paddle.width, paddle.height);
    ctx.strokeRect(paddle.posx, paddle.posy, paddle.width, paddle.height);
}

export function speak_reset() {
    const resetPhrases = [
        "Game reset, let's play again",
        "New game starting",
        "Game restarted",
        "Ready for a new match",
        "oh god... not this again",
        "this doesnt actually reset the score?"
    ];
    speak_one_of(resetPhrases);
}


export function speak_hit(name) {
    speed+=0.025*speed;
    const hitPhrases = [
        `${name} returns the ball`,
        `Nice save by ${name}`,
        `We are not liable for any injuries you may recieve`,
        `by the way, i am the ball`,
        `i am not the ball. if i said i was, i lied.`,
        `i am the ball. if i said i wasnt, i lied.`,
        `i am not the ball. i hate the ball and love myself`,
        `fish`,
        `good job ${name}`,
        `Good hit from ${name}`,
        `Touch grass`,
        `${name} made the rectangle touch the circle`,
        `this is the best it has ever been done, ${name}`,
        `${name} is a true gamer`,
        `Excellent defense by ${name}`,
        `${name} sends it back`,
        `AAAAAAAAAAAAAAAAAAAAAAAAA`
    ];
    speak_one_of(hitPhrases)
}

export function speak_miss(name, opponent_name) {
    speed = 1.2;
    const missPhrases = [
        `I lied when I said I thought ${name} was good at this`,
        `${name} missed the ball. lol.`,
        `${name} is stupid`,
        `${name} couldn't reach it`,
        `${name} should be more like ${opponent_name}`,
        `${opponent_name}, that was great!`,
        `have you tried real sports?`,
        `Point to ${opponent_name}`,
        `${name} let it slip by. just like their relationships`,
        `Good god, ${name} that was terrible`,
        `falsehoods and lethargy are the death of us all`,
        `i dont even like you but good job ${opponent_name}`,
        `is it that hard to  block, ${name}?`,
        `${opponent_name} scores`,
        `${opponent_name} is much better at this`,
        `${name} is awful at this`,
        `${name} missed that one`,
        `Too fast for ${name}`,
        `${opponent_name} takes the point`
    ];
    speak_one_of(missPhrases)
}

export function speak_win(name, opponent_name) {
    const winPhrases = [
        `${name} wins the game`,
        `This isn't a competition but if it was... ${name} would have won`,
        `i guess ${name} won`,
        `${name} is less bad at this than ${opponent_name}!`,
        `wow. somehow ${name} wpn. no one thought that would happen.`,
        `${name} takes the victory`,
        `${name} will recieve an egg and an egg and an egg and an egg for winning and an egg and DRIVING IN MY CAR`,
        `${name} dominates the match`
    ];
    speak_one_of(winPhrases)
}

function speak_one_of(lines) {
    const line = lines[Math.floor(Math.random() * lines.length)];
    console.log(line)
    speak(line);
}

function speak(text) {

    // Don't speak if speechSynthesis doesn't exist
    if (!window.speechSynthesis) return;

    const voices = window.speechSynthesis.getVoices();
    // Find first English voice, fallback to any available voice
    let gameVoice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];

    // Cancel any currently playing speech to avoid overlap
     window.speechSynthesis.cancel();

    // Create and configure the speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = gameVoice;      // Use selected voice
    utterance.rate = speed;             // Speak faster for responsiveness
    utterance.pitch = Math.random()*10000-Math.random()*10000;            // random pitch
    utterance.volume = 0.8;           // 80% volume

    // Speak the announcement
    window.speechSynthesis.speak(utterance);
}

export function play_beep() {
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