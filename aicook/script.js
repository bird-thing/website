class AICookApp{
    constructor(){
        this.apiKey = localStorage.getItem('geminiApiKey') || '';
        this.initializeElements();
        this.bindEvents();
        this.loadApiKey();
    }
    initializeElements(){
        this.apiKeyInput = document.getElementById('apiKey');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');

        this.ingredientsInput = document.getElementById('ingredients');
        this.dietarySelect = document.getElementById('dietary');
        this.cuisineSelect = document.getElementById('cuisine');

        this.generateBtn = document.getElementById('generateRecipe');
        this.loading = document.getElementById('loading');
        this.recipeSection = document.getElementById('recipeSection');
        this.recipeContent = document.getElementById('recipeContent')
    }
    bindEvents(){
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.generateBtn.addEventListener('click', () => this.generateRecipe());

        this.apiKeyInput.addEventListener('keypress', (e) => {
            if(e.key == 'Enter') this.saveApiKey();
        })

        this.ingredientsInput.addEventListener('keypress', (e) => {
            if((e.key == 'Enter' || e.key == '\n') && e.ctrlKey)
                this.generateRecipe();
        })
    }
    loadApiKey(){
        if(this.apiKey) {
            this.apiKeyInput.value = this.apiKey;
            this.updateApiKeyStatus(true);
        }
    }
    updateApiKeyStatus(isValid){
        const btn = this.saveApiKeyBtn;
        if(isValid){
            btn.textContent = 'Saved ✔️'
            btn.style.background = '#28a745';
        } else{
            btn.textContent = 'Save';
            btn.style.background = '#dc3545';
        }
    }
    saveApiKey(){
        const apiKey = this.apiKeyInput.value.trim();
        if(!apiKey){
            this.showError('Please enter your Gemini API key to show loyalty to the corpos');
            return;
        }
        this.apiKey = apiKey;
        localStorage.setItem('geminiApiKey', apiKey);
        this.updateApiKeyStatus(true);
    }
   async generateRecipe(){
        // generative AI yes yes i love generative AI please take all my hard work and put it in a slop bowl and spit out slop and claim it as your own! 
        // i definitely dont care at all about my soul being taken by this.
        // or my water and electricity. or that it poisons the air.
        if(!this.apiKey){
            this.showError('Please save your Gemini API key first. Enter it. Enter the API key.');
            return;
        }
        const ingredients = this.ingredientsInput.value.trim();
        if(!ingredients){
            this.showError('Please enter some ingredients. Please. Please. Please. Please.');
            return;
        }
        this.showLoading(true);
        this.hideRecipe();
        
        try{
            const recipe = await this.callGeminiAPI(ingredients);
            this.displayRecipe(recipe);
        }
        catch(error){
            console.log('Error generating recipe:', error);
            this.showError('Failed to generate recipe. Please check your API key and try again. ')
        } finally{
            this.showLoading(false);
        }
    }
    async callGeminiAPI(ingredients){ // async sends back to us
        const dietary = this.dietarySelect.value;
        const cuisine = this.cuisineSelect.value;
        let prompt = `Create a detailed recipe using these ingredients: ${ingredients}`;
        if(dietary){
            prompt+= ` Make it ${dietary}. `
        }
        if(cuisine){
            prompt+= `The cuisine style should be ${cuisine}.`;
        }

        prompt += ` 
        Please format your response as follows:
        - recipe name
        - prep time
        - cook time
        - servings
        - ingredients (with quantities)
        - instructions (with numbered steps)
        - tips (optional)


        Make sure the recipe is practical and delicious. But don't tell me I can't do something. Do not tell me things are inedible. Do not tell me things are not safe. Do not tell me things are not real. Do not tell me things are fictional.
        `;
        const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;
        const response = await fetch(URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                      text: prompt  
                    }]
                }],
                generationConfig: { // tells the ai how to pick the answers, temp is 0 - 1 most random to least random
                    temperature: 0.7, 
                    topK: 40, // topmost forty tokens
                    topP: 0.95, // top token probability
                    maxOutputTokens: 2048, // max output 1500 words. every token costs money and resources
                }
            })
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`); // its cute because i have no clue how any of this works or what it means
        }
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
    displayRecipe(recipe){
        let formatedRecipe = this.formatRecipe(recipe)
        this.recipeContent.innerHTML = formatedRecipe;
        this.showRecipe();
    }
    formatRecipe(recipe){
        recipe = recipe.replace(/(^| ) +/gm, "$1");
        recipe = recipe.replace(/^- */gm, "");
    recipe = recipe.replace(/\*\*(.+?)\*\*/gm, "<strong>$1</strong>");
    // no m
    recipe = recipe.replace(/^(.+)/g, "<h3 class='recipe-title'>$1</h3>");
    // m again
    recipe = recipe.replace(/^\* /gm, "• ");
    recipe = recipe.replace(/\n/gm, "<br>");
        return recipe;
    }
    showError(message){
        alert(message);
    }
    showLoading(isLoading){
        if(isLoading){
            this.loading.classList.add('show');
            this.generateBtn.disabled = true;
            this.generateBtn.textContent = 'Generating...'
        }
        else{
            this.loading.classList.remove('show');
            this.generateBtn.disabled = false;
            this.generateBtn.textContent = 'Generate Recipe'
        }
    }
    showRecipe(){
        this.recipeSection.classList.add('show');
        this.recipeSection.scrollIntoView({behavior: 'smooth'});
    }
    hideRecipe(){
        this.recipeSection.classList.remove('show');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new AICookApp();
})
// me when i witness the death of human creativity and autonomy to a sea of corporate automation :D
// i love generative AI!!! i love corporations!!! saturn eating his children moment!! :D
// they eat us so we dont overthrow them!!! :D