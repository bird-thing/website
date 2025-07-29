// Get all elements from DOM
// To affect html and css, all webapp requests

const storyDiv = document.getElementById('story'); // Camel Case: combine wordds, using upper and lower case letters
const speakBtn = document.getElementById('speakBtn')
const stopSpeakBtn = document.getElementById('stopSpeakBtn')
const pauseSpeakBtn = document.getElementById('pauseSpeakBtn')
const languageSelect = document.getElementById('languageSelect')
const loadingDiv = document.getElementById('loading')

function updateStory(text) {
    if (storyDiv) {
        storyDiv.textContent = text;
    }
}

function toggleLoading (show) {
    if(loadingDiv) {
        loadingDiv.style.display = show ? "block" : "none";
    }
}

function getStopSpeakBtn () {
    return stopSpeakBtn
}

function getPauseSpeakButton () {
return pauseSpeakBtn
}

function getSpeakButton () {
    return speakBtn
}

function getLanguageSelect () {
    return languageSelect
}

function getInitialStoryContent() {
    return storyDiv ? storyDiv.textContent.trim() :
    "Narrator: Help me buld a story! Sttart with a sentence and I will continue it."
}

function speakText (text, language) {
    try {
    const utterance = new SpeechSynthesis;
    utterance.lang = lang;
    const voices = speechSynthesis.getVoices();

    if(voice.length == 0) {
    setTimeout (() => speakText(text, lang ,100)); // 100 milliseconds
    return;
    }
    const voice = voices.find(v => v.lang.Start);
    window.speechSynthesis.speak(utterance);
    }
    catch (error) {
        console.error("Speech synthesis error:", error)
    }
}

function stopSpeaking() {
    window.speechSynthesis.cancel()
}

function pauseOrResumeSpeaking (){
    if (window.speechSynthesis.speaking) {
        if(window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            return "Pause"
        }
        else {
            window.speechSynthesis.pause();
            return "Resume"
        }
       
    }
    return "Pause"
}

export default {
    updateStory,
    toggleLoading,
    getSpeakButton,
    getStopSpeakBtn,
    getPauseSpeakButton,
    speakText,
    stopSpeaking,
    pauseOrResumeSpeaking,
    getLanguageSelect,
    getInitialStoryContent


}