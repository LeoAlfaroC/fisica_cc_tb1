// Constante
var g = 9.81; // Gravedad obvis


$('#calcular').click(function(e){
    e.preventDefault();

    var coeficiente     = parseInt($('#coeficiente').val());
    var densidad_aire   = parseInt($('#densidad_aire').val());
    var masa            = parseInt($('#masa').val());
    var area            = parseInt($('#area').val());
    var rapidez_inicial = parseInt($('#rapidez_inicial').val());
    var tiempo_apertura_paracaidas = parseInt($('#tiempo_apertura_paracaidas').val());
    var altura_inicial  = parseInt($('#altura_inicial').val());

    var t = 0.0;

    // Calculamos!
    console.log(g, coeficiente, densidad_aire, masa, area, densidad_aire, tiempo_apertura_paracaidas, altura_inicial);


});