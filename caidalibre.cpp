#include <bits/stdc++.h>

using namespace std;

int main(){
    double t = 0.00;
    double rapidez_ini = 0.00;
    double altura_ini = 3000;
    double coef_resi = 1.17;
    double dens_aire = 1.20;
    double masa_paracai = 80.00;
    double area_trans_paracai = 6.00;
    double tiempo_apertura = 15.0;
    double g = 9.81;
    double v = rapidez_ini;
    double p = altura_ini;
    
    while (t <= tiempo_apertura){
        v = rapidez_ini + (g*t);
        p = altura_ini - (g * pow(t,2)/2);
       
        
        cout << "En tiempo: " << t << ", velocidad:  " << v << " y en altura: " << p << endl;
        t += 0.01;
    }
    return 0;
}