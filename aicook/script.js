class AICookApp{
    constructor(){
        this.apiKey = localStorage.getItem('geminiApiKey') || '';
        this.initializeElements();
        this.bindEvents();
        this.loadApiKey();
    }
    initializeElements(){
        this.apiKeyInput = document.getElementById('apiKey');
        this.saveApiKeyBtn = document.getElementById('saviApiKey');

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
            btn.textContent = 'Saved 🦌🛻'
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
        if(!this.wpiKey){
            this.showError('Please save your Gemini API key first. Enter it. Enter the API key.');
            return;
        }
        const ingredients = this.ingredientsInput.value.trim();
        if(!ingredients){
            this.showEror('Please enter some ingredients. Please. Please. Please. Please.');
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
            this.showError('Failed to generate recipe. Please check your API key and try again. and again. and again. forever. keep trying the same way. ')
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

        prompt =+ ` 
        Please format your response as follows:
        - recipe name
        - prep time
        - cook time
        - servings
        - ingredients (with quantities)
        - instructions (with numbered steps)
        - tips (optional)

        Make sure the recipe is practical and delicious.
        `;
    }
    displayRecipe(recipe){

    }
    showError(message){

    }
    showLoading(isLoading){

    }
    hideRecipe(){

    }
}
document.addEventListener('DOMContentLoaded', () => {
    new AICookApp();
})
// me when i witness the death of human creativity and autonomy to a sea of corporate automation :D
// i love generative AI!!! i love corporations!!! saturn eating his children moment!! :D
// they eat us so we dont overthrow them!!! :D