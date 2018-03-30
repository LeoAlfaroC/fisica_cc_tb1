// Constante
var g = 9.81; // Gravedad obvis


$('#calcular').click(function(e){
    e.preventDefault();

    var resultados = $('#resultados');
    resultados.html('');

    var coeficiente     = parseInt($('#coeficiente').val());
    var densidad_aire   = parseInt($('#densidad_aire').val());
    var masa            = parseInt($('#masa').val());
    var area            = parseInt($('#area').val());
    var rapidez_inicial = parseInt($('#rapidez_inicial').val());
    var tiempo_apertura_paracaidas = parseInt($('#tiempo_apertura_paracaidas').val());
    var altura_inicial  = parseInt($('#altura_inicial').val());

    var t = 0.0;
    var v = rapidez_inicial; // Velocidad en cada instante t
    var p = altura_inicial; // Posicion en cada instante t
    var a = g; // Aceleración en cada instante t
    var f = 0; // Fuerza de resistencia / arrastre en cada instante t

    var k = (coeficiente * densidad_aire * area) / 2;
    var v_terminal = Math.sqrt((masa * g) / k) * -1;

    console.log('Vterminal: ', v_terminal.toFixed(2));

    // Calculamos!

    while(t < tiempo_apertura_paracaidas) {
        v = rapidez_inicial - (g * t);
        //a = (v - rapidez_inicial) / 0.01;
        //console.log(t.toFixed(2), 'velocidad', v.toFixed(4))

        p = altura_inicial - (g * Math.pow(t, 2) / 2);

        resultados.append('<tr><td>' + t.toFixed(2) + '</td><td>' + v.toFixed(2) + '</td><td>' + a.toFixed(2) + '</td><td>' + p.toFixed(2) + '</td><td>' + f.toFixed(2) + '</td></tr>');

        t += 0.01;
    }
    //console.log(v.toFixed(2), a.toFixed(2), p.toFixed(2));

    // v = -, a = +, p = +
    while(v <= v_terminal && p >= 0) {
        v = v + a * 0.01;
        f = k * Math.pow(v, 2);
        a = -1 * g + ((k * Math.pow(v, 2)) / masa);
        p = p + v * 0.01;

        resultados.append('<tr><td>' + t.toFixed(2) + '</td><td>' + v.toFixed(2) + '</td><td>' + a.toFixed(2) + '</td><td>' + p.toFixed(2) + '</td><td>' + f.toFixed(2) + '</td></tr>');
        //console.log(t.toFixed(2), v.toFixed(2), a.toFixed(2), p.toFixed(2), f.toFixed(2));

        t += 0.01;
    }
});