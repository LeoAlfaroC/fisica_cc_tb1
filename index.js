// Constante
var g = 9.81; // Gravedad obvis


$('#calcular_caida').click(function (e) {
    e.preventDefault();

    var resultados = $('#resultados');
    resultados.html('');

    var coeficiente = parseInt($('#coeficiente').val());
    var densidad_aire = parseInt($('#densidad_aire').val());
    var masa = parseInt($('#masa').val());
    var area = parseInt($('#area').val());
    var rapidez_inicial = parseInt($('#rapidez_inicial').val());
    var tiempo_apertura_paracaidas = parseInt($('#tiempo_apertura_paracaidas').val());
    var altura_inicial = parseInt($('#altura_inicial').val());

    var t = 0.0;
    var v = rapidez_inicial; // Velocidad en cada instante t
    var p = altura_inicial; // Posicion en cada instante t
    var a = g; // Aceleración en cada instante t
    var f = 0; // Fuerza de resistencia / arrastre en cada instante t

    var k = (coeficiente * densidad_aire * area) / 2;
    var v_terminal = Math.sqrt((masa * g) / k) * -1;

    console.log('Vterminal: ', v_terminal.toFixed(2));

    // Calculamos!

    while (t < tiempo_apertura_paracaidas) {
        v = rapidez_inicial - (g * t);
        //a = (v - rapidez_inicial) / 0.01;
        //console.log(t.toFixed(2), 'velocidad', v.toFixed(4))

        p = altura_inicial - (g * Math.pow(t, 2) / 2);

        resultados.append('<tr><td>' + t.toFixed(2) + '</td><td>' + v.toFixed(2) + '</td><td>' + a.toFixed(2) + '</td><td>' + p.toFixed(2) + '</td><td>' + f.toFixed(2) + '</td></tr>');

        t += 0.01;
    }
    //console.log(v.toFixed(2), a.toFixed(2), p.toFixed(2));

    // v = -, a = +, p = +
    while (v <= v_terminal && p >= 0) {
        v = v + a * 0.01;
        f = k * Math.pow(v, 2);
        a = -1 * g + ((k * Math.pow(v, 2)) / masa);
        p = p + v * 0.01;

        resultados.append('<tr><td>' + t.toFixed(2) + '</td><td>' + v.toFixed(2) + '</td><td>' + a.toFixed(2) + '</td><td>' + p.toFixed(2) + '</td><td>' + f.toFixed(2) + '</td></tr>');
        //console.log(t.toFixed(2), v.toFixed(2), a.toFixed(2), p.toFixed(2), f.toFixed(2));

        t += 0.01;
    }
});

$('#calcular_proyectil').click(function (e) {
    e.preventDefault();

    var resultados = $('#resultados2');
    resultados.html('');

    var posicion_inicial = parseFloat($('#posicion_inicial').val());
    var rapidez_inicial = parseFloat($('#rapidez_inicial_pro').val());
    var radio = parseFloat($('#radio').val());
    var coeficiente = parseFloat($('#coeficiente_pro').val());
    var masa = parseFloat($('#masa_pro').val());
    var angulo = parseFloat($('#angulo').val());
    var densidad_aire = parseFloat($('#densidad_aire_pro').val());
    var modo = $('input[name=rozamiento]:checked').val() === 'true';

    var t = 0.0;
    var v = rapidez_inicial;
    var vX_inicial = 0;
    var vY_inicial = 0;
    var vX = 0;
    var vY = 0;

    var posX = 0.0;
    var posY = 0.0;

    vX_inicial = parseInt((Math.cos(angulo * (Math.PI / 180)) * rapidez_inicial).toFixed(2));
    vY_inicial = parseInt((Math.sin(angulo * (Math.PI / 180)) * rapidez_inicial).toFixed(2));

    vX = vX_inicial;
    vY = vY_inicial;

    var radio_m = radio / 100;
    var k = (coeficiente * densidad_aire * (Math.PI * radio_m * radio_m)) / 2;

    if (!modo) {
        // Calculo sin rozamiento
        do {
            // x = MRU
            posX = vX * t;
            // y = MRUV
            posY = vY * t - g * (t * t) / 2;

            t += 0.01;

            /*console.log('Tiempo ', t, ' Rapidez ', rapidez_inicial, 'vX ', vX, 'vY ', vY, 'V ', rapidez_inicial, 'Angulo', angulo);
            console.log('Pos X', posX);
            console.log('Pos Y', posY);*/
            resultados.append('<tr><td>' + t.toFixed(2) + '</td><td>' + posX.toFixed(2) + '</td><td>' + posY.toFixed(2) + '</td></tr>');
        } while (posY >= 0);
    } else {
        // Calculo con rozamiento
        do {
            var fuerza = (k * -1) * v;
            var fuerza_x = fuerza * vX;
            var ax = fuerza_x / masa;

            var fuerza_y =  fuerza * vY - masa * g;
            var ay = fuerza_y / masa;

            v = Math.sqrt((vX * vX) + (vY * vY));

            vX = vX_inicial + ax * t;
            vY = vY_inicial + ay * t;

            posX = rapidez_inicial - (ax / 2) * (t * 2 - 0.1);
            posY = rapidez_inicial - (ay / 2) * (t * 2 - 0.1);

            t += 0.1;

            console.log(ax, ay, posX, posY);
        } while (posY >= 0);
    }
});