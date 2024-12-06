export function gestionRecettes() {
    return {
        recipes: [],
        filtreDifficulte: 'toutes',
        selectedRecette: {},
        currentStep: 0,
        modalOpen: false,

        // Charger recettes du JSON
        chargerRecettes() {
            fetch('/src/data/recipes.json') 
                .then(response => response.json())
                .then(data => {
                    this.recipes = data.recipes; 
                })
                .catch(error => {
                    console.error('Recette douteuse, erreur lors du chargement des recettes :', error);
                });
        },

        // Filtrer recettes en fonction de la difficulté soit toutes les recettes sinon en fonction du filtre sélectionné
        get recettesFiltrees() {
            if (this.filtreDifficulte === 'toutes') {
                return this.recipes;
            }
            return this.recipes.filter(
                recette => recette.difficulty === this.filtreDifficulte
            );
        },

        // Fenêtre modale/pop up avec les détails d'une recette
        openRecette(recette) {
            this.selectedRecette = recette;
            this.currentStep = 0;
            this.modalOpen = true;
        },

        // Initialisation, étapes suivantes et étapes précédentes
        nextStep() {
            if (this.currentStep < this.selectedRecette.instructions.length - 1) {
                this.currentStep++;
            }
        },
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },
        init() {
            this.chargerRecettes();
        }
    };
}
