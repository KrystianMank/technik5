import random
class Tablica:
    __slots__ = ['__tablica',' __rozmiar']
   
    def __init__(self, rozmiar):
      if rozmiar <= 20:
          raise ValueError("Rozmiar tablicy miał być większy niż 20")
      self. __rozmiar = rozmiar
      self.__tablica = [random.randint(1,1000) for _ in range(rozmiar)]
      
    def wyswietl_elementy(self):
        for index, element in enumerate(self.__tablica):
            print(f"{index}: {element}")
    
    def szukaj(self, szukana):
        for index, element in enumerate(self.__tablica):
            if szukana == element:
                return index
        return -1

    def nieparzyste(self):
        ile_nieparzystych = 0
        for element in self.__tablica:
            if element % 2 != 0:
                print(f"{element}")
                ile_nieparzystych += 1
        return ile_nieparzystych
    
    def srednia_arytmetyczna(self):
        suma = 0
        for element in self.__tablica:
            suma += element
        return suma/self.__rozmiar
    
def main():
    # przykladowy rozmiar tablicy
    rozmiar = 22
    
    # tworzenie instancji klasy
    tablica = Tablica(rozmiar)
    
    #wyswietlanie elementow
    tablica.wyswietl_elementy()
    
    #wyszukiwanie wartosci
    szukana = int(input("Wprowadź szukaną liczbę"))
    indeks = tablica.szukaj(szukana)
    if indeks != -1:
        print(f"Szukana jest na indeksie {indeks}")
    
     # liczby nieparzyste
    ile_nieparzystych = tablica.nieparzyste()
    print(f"Liczb nieparzystych: {ile_nieparzystych}")
    
    #wypisywanie średniej arytmetycznej elenementow
    srednia = tablica.srednia_arytmetyczna()
    print(f"Srednia {srednia:2f}")
    
if __name__ == '__main__':
    main()
      
    