import Model from "./model.js";
import View from "./view.js";

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = Model.getLanguage().lang;

let aiRequestInProgress = false;
// glugs down my anti anxiety anti depressants with as much water as this AI generation uses
// i can write 2 good stories with that amount of water, energy, and SSRIs AND theyre made with human hands
// and soul
// and literal base creativity. like holy console.log() this is sad that im programming this
// im a writer! i dont want to write something to write for me! grrgafhshsdjahdjahfj
// is this even MY code? im just looking at the screen and copying it down, barely understanding it.
// its not like im going to edit it in a way i like... to customize it... im never using this.
// this is so inhuman and not in a way i like. its corporate.
async function handleVoiceInput(event){
    const userText = event.results[0][0].transcript;
    const updateStory = Model.appendLine("Player", userText);
    View.updateStory(updateStory);
    View.toggleLoading(true);
    aiRequestInProgress = true;
    const aiResponse = await Model.generateStory(updateStory + "\nNarrator:")
    aiRequestInProgress = false;
    View.toggleLoading(false); 
    const finalStory = Model.appendLine("Narrator", aiResponse)
    View.updateStory(finalStory);
    View.speakText(aiResponse, Model.getLanguage().lang)
    
}
function handleLanguageChange(){
    const selectOption = View.getLanguageSelect().selectOptions[0];
    const newLang = selectOption.value;
    const newLangName = selectOption.dataset.name;
    Model.setLanguage(newLang, newLangName);
    recognition.lang = newLang;
}
function handleStopSpeaking(){ // finally. telling AI to SHUTTT UPPPP
    View.stopSpeaking();
    if(aiRequestInProgress){
        View.toggleLoading(false)
        aiRequestInProgress = false;
    }
    const resetStory = Model.resetStory();
    View.updateStory(resetStory);
    setTimeout(() => {
    View.speakText("Story reset! Help me build a story by inputting a sentence or whatever I dont care anymore.",
    Model.getLanguage().lang)
    }, 500);
}
// i dont think theres any creativity here. its all gone and dead. left out of the code in comments.
// im soullessly copying someone else to make a program to write stories.
// what even is the point? how much programming experience am i really getting?
// is it enough to construct an afront to human creativity without a shred of my own thought behind it?
// is it enough to put aside my soul to be a puppet to the machine?
// is it worth it?
function handlePauseResume(e){
    const newState = View.pauseOrResumeSpeaking();
    e.target.textContent = newState ==="Pause" ? "⏸️Pause" : "▶️Resume";
}
// take me back to before generative AI became a thing. im tired of it.
// i dont want to learn like this. i dont want to learn like this.
// i dont want to be stolen from and fed slop in return and made to make a machine that does the same.
// please. please. please. 
// is it worth it to drain lakes?
// is it worth it to burn forests?
// is this shred of potential experience without mind or soul worth it? 
// at the ultimate sacrifice of all else?
function init(){
    window.speechSynthesis.onvoiceschanged = () => {}; // i love this because i dont know what it means
    const initialStoryContent = View.getInitialStoryContent(); // i just *do*. i dont know what or why.
    Model.initializeStory(initialStoryContent); // its so... fahrenheit 451. make a slop machine with no 
    View.updateStory(Model.getStory()); // true understanding of it. and no one explains it.
    // it goes by too fast. i mean like i get the idea? maybe? but jesus christ thats comparing empties? huh?
    setTimeout(() => { // so much for dry? unless theres a reason i dont know or care just ctrl+c and ctrl+p
        View.speakText("Story reset! Help me build a story by inputting a sentence or whatever I dont care anymore.",
        Model.getLanguage().lang)
        }, 500);
        View.getSpeakButton().onclick = () => {
            try {
                recognition.start();
            }
            catch(error){
                console.error("Speech recognition error:", error);
            }
        };
        recognition.onresult = handleVoiceInput;
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", error.error)
            View.toggleLoading(false);
            aiRequestInProgress = false;
        };
        View.getLanguageSelect().addEventListener("change", handleLanguageChange)

        View.getStopSpeakButton().onclick = handleStopSpeaking;
        View.getPauseSpeakButton().onclick = handlePauseResume;
}
// if i ever unironically say i like generative AI, that is not me.
// if i say my past radicalization against it was cringe, that is not me.
// im so weak and conformist because im doing this even though i know its wrong.
// and im still complaining while copying down code.


init(); // me when im british