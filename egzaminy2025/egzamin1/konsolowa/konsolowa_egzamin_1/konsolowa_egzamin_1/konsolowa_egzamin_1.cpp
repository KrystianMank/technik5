// konsolowa_egzamin_1.cpp : Ten plik zawiera funkcję „main”. W nim rozpoczyna się i kończy wykonywanie programu.
//

#include <iostream>
using namespace std;

class Tablica {
private:
    int* tab;
    int rozmiar;
public:
    Tablica(int rozmiar) {
        this->rozmiar = rozmiar;
        tab = new int[rozmiar];
        srand(time(NULL));
        for (int i = 0;i < rozmiar;i++) {
            tab[i] = 1 + rand() % 1001;
        }
    }
    void wyswietl() {
        for (int i = 0;i < rozmiar;i++) {
            cout << i << ": " << tab[i] << "\n";
        }
        cout << endl;
    }
    int szukaj(int szukana) {
        for (int i = 0;i < rozmiar;i++) {
            if (tab[i] == szukana) return i;
        }
        return -1;
    }
    int nieparzyste() {
        int ile_nieparzystych = 0;
        for (int i = 0;i < rozmiar;i++) {
            if (tab[i] % 2 != 0) ile_nieparzystych++;
        }
        return ile_nieparzystych;
    }
    double srednia() {
        double suma = 0;
        for (int i = 0;i < rozmiar;i++) {
            suma += tab[i];
        }
        return suma/(double)rozmiar;
    }
};

int main()
{
    int liczba;
    cout << "Podaj rozmiar tablicy: ";
    cin >> liczba;
    Tablica tablica(liczba);

    tablica.wyswietl();
    int szukana;
    cout << "Podaj liczbe do znalezienia: ";
    cin >> szukana;
    int indeks = tablica.szukaj(szukana);
    if (indeks != -1) cout << "Szukana na indeksie: " << indeks << endl;

    int ile_nieparzystych = tablica.nieparzyste();
    cout << "Ilość nieparzytych " << ile_nieparzystych << endl;

    double srednia = tablica.srednia();
    cout << "Srednia liczb w tablicy " << srednia << endl;

}
