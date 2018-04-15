// Constante
var g = 9.81; // Gravedad obvis

var pvt = $('#pvt');
var vvt = $('#vvt');
var avt = $('#avt');
var fvt = $('#fvt');

var xvy_sin = $('#xvy_sin');
var xvy_con = $('#xvy_con');
var fvt_proy = $('#fvt_proy');


$('#calcular_caida').click(function (e) {
    e.preventDefault();

    pvt.html('');
    vvt.html('');
    avt.html('');
    fvt.html('');

    var coeficiente = parseFloat($('#coeficiente').val());
    var densidad_aire = parseFloat($('#densidad_aire').val());
    var masa = parseFloat($('#masa').val());
    var area = parseFloat($('#area').val());
    var rapidez_inicial = parseFloat($('#rapidez_inicial').val());
    var tiempo_apertura_paracaidas = parseFloat($('#tiempo_apertura_paracaidas').val());
    var altura_inicial = parseFloat($('#altura_inicial').val());

    var t = 0.0;
    var intervalo_t = 0.01;
    var v = rapidez_inicial; // Velocidad en cada instante t
    var p = altura_inicial; // Posicion en cada instante t
    var a = g; // Aceleración en cada instante t
    var f = 0; // Fuerza de resistencia / arrastre en cada instante t

    var k = (coeficiente * densidad_aire * area) / 2;
    var v_terminal = Math.sqrt((masa * g) / k) * -1;

    // Calculamos!
    while (t < tiempo_apertura_paracaidas) {
        v = rapidez_inicial - (g * t);

        p = altura_inicial - (g * Math.pow(t, 2) / 2);

        pvt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + p.toFixed(2));
        vvt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + v.toFixed(2));
        avt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + a.toFixed(2));
        fvt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + f.toFixed(2));

        t += intervalo_t;
    }

    // v = -, a = +, p = +
    while (v <= v_terminal && p >= 0) {
        v = v + a * intervalo_t;
        f = k * Math.pow(v, 2);
        a = -1 * g + ((k * Math.pow(v, 2)) / masa);
        p = p + v * intervalo_t;

        pvt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + p.toFixed(2));
        vvt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + v.toFixed(2));
        avt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + a.toFixed(2));
        fvt.append('<tr><td>' + t.toFixed(2) + '</td><td>' + f.toFixed(2));

        t += intervalo_t;
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
    var intervalo_t= 0.01;
    var v = rapidez_inicial;

    var vX_anterior = 0;
    var vY_anterior = 0;
    var vX = 0;
    var vY = 0;
    var aX = 0;
    var aY = 0;
    var fX = 0;
    var fY = 0;
    var f = 0;

    var posX = 0.0;
    var posY = 0.0;

    var radio_m = radio / 100;
    var k = (coeficiente * densidad_aire * (Math.PI * radio_m * radio_m)) / 2;

    vX = parseInt((Math.cos(angulo * (Math.PI / 180)) * v).toFixed(2));
    vY = parseInt((Math.sin(angulo * (Math.PI / 180)) * v).toFixed(2));

    fX = (k * -1) * v * vX;
    fY = masa * (g * -1) - k * v * vY;
    f = Math.sqrt(fX * fX + fY * fY);

    aX = fX / masa;
    aY = fY / masa;


    if (!modo) {
        // Calculo sin rozamiento
        xvy_sin.html('');

        do {
            // x = MRU
            posX = vX * t;
            // y = MRUV
            posY = vY * t - g * (t * t) / 2;

            t += intervalo_t;
            xvy_sin.append('<tr><td>' + t.toFixed(2) + '</td><td>' + posX.toFixed(2) + '</td><td>' + posY.toFixed(2) + '</td></tr>');
        } while (posY >= 0);
    } else {
        // Calculo con rozamiento
        xvy_con.html('');
        fvt_proy.html('');

        do {
            t += intervalo_t;

            vX = vX + aX * intervalo_t;
            vY = vY + aY * intervalo_t;

            v = Math.sqrt(vX * vX + vY * vY);

            posX += (vX_anterior + vX) * intervalo_t / 2;
            posY += (vY_anterior + vY) * intervalo_t / 2;

            fX = (k * -1) * v * vX;
            fY = masa * (g * -1) - k * v * vY;
            f = Math.sqrt(fX * fX + fY * fY);

            aX = fX / masa;
            aY = fY / masa;

            vX_anterior = vX;
            vY_anterior = vY;

            xvy_con.append('<tr><td>' + t.toFixed(2) + '</td><td>' + posX.toFixed(2) + '</td><td>' + posY.toFixed(2) + '</td></tr>');
            fvt_proy.append('<tr><td>' + t.toFixed(2) + '</td><td>' + f.toFixed(2) + '</td><td>' + fX.toFixed(2) + '</td><td>' + fY.toFixed(2) + '</td></tr>');
        } while (posY >= 0);
    }
});