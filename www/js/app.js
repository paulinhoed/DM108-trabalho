// Inicializacao
var myApp = new Framework7({
    material: true, //quando material:true nao suporta back link com navegacao dinamica
    template7Pages: true
});

// Exportando os seletores
var $$ = Dom7;

// Adicionando uma view principal
var mainView = myApp.addView('.view-main', {
    // Configurado para o modo de navegação dinâmico
    dynamicNavbar: true
});

//evento especifico do cordova
$$(document).on('deviceready', function() {
    PlayerController.init();
});