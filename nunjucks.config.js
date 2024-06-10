const nunjucks = require('nunjucks');

// Configuration de l'environnement Nunjucks
const env = nunjucks.configure({
    autoescape: true, // Activer l'échappement automatique des caractères spéciaux
    trimBlocks: true, // Supprimer les espaces vides autour des blocs
    lstripBlocks: true, // Supprimer les espaces vides à gauche des blocs
    noCache: true // Désactiver le cache pour faciliter le développement
});

// Filtre personnalisé
env.addFilter('uppercase', function(value) {
    return value.toUpperCase();
});

env.addFilter('lowercase', function(value) {
    return value.toLowerCase();
});

// Ajouter des fonctions personnalisées
env.addGlobal('getCurrentYear', function() {
    return new Date().getFullYear();
});

// Exporter l'environnement configuré
module.exports = env;

// Data to add for each page
// nunjucks.render('index.html', { foo: 'bar' });