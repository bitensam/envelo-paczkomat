Moja wersja w plikach html i js.

Odniesienie do screena z zadania i wykonanych działań:

**Plik html:**

**7** : style w pliku html - lepiej trzymać w pliku

**13** : backgroundColor - powinno być background-color (camelCase jest wkorzystywany np w reakcie)

**14** : font family: Lato - powinno być Lato, sans-serif. Żeby przeglądarka w przypadku gdy nie może załadować podanej czcionki, załadowała z tej samej grupy sans-serif

**18 i 19** : style dla div: margint-bottom - literówka, można użyć shorthandu margin: 2rem 0 2rem,

**29** : h1 aria-main - usunięcie atrybutu

**30** : div className - powinno być class (ponownie nomenklatura reactowa)

**31** : h1 - jest tu wyrażenie dynamiczne, używane w jsx {heroCount}

**33** : linjka button onClick - również wyrażenie reactowe, powinine być span z id klub klasą która można by selectować w pliku js

**35** : brak podanej ścieżki do pliku js

**Plik JS:**

**7** : brak zdeklarowania variable, hash w nazwie, zdeklarowane poza constructorem
**14** : użycie this.#powercount, które nie było zdeklarowane w construktorze
**22** : deklarowanie globalnych zmiennych preferuję na górze dokumentu
**24** : podbnie jak z heroCount, preferuje deklarowanie stałych globalnych na górze dokumentu
**26 i 27** : brak konsekwencji w nazewnictwie, powinno być const hulk i const geralt.
**29 i 30** : heroes.push(hero) powinna znaleźć się wewnątrz funkcji getHero(name), heroes.push(geralt do usunięcia)
**34-37** : dodanie argumentu do funkcji getHero(name) do zmiany let hero na np. const newHero = new Hero(name), dodanie walidacji czy array heroes ma już takiego hero i czy nazawa bohatera nie jest pusta). Po spełnieniu warunku inkrementacja wartości heroCount, dodanie do array heroes tego nowego hero, wywołanie funkcji printHallofFame() w celu wyrenderowania w drzewie DOM. Dodanie nasłuchiwacza na przycik btnPowerUp który po naciśnieciu wywołuję metodę klasy Hero train.
**39-53** : Usunięcie let spiderman oraz heroes.push. Wyrzucenie wszystkich selectorów na górę dokumentu.
Metoda map jest źle napisana, zamiast niej proponuję wyrażenie warunkowe.

_if (heroes.length <= 1) {
heroesElement.innerHTML = `<p class="hero-element">${heroes[0].name}, ${heroes[0].powerCount}</p>`;
} else {
const lastIndex = heroes.length - 1;
heroesElement.innerHTML = `<p class="hero-element">${heroes[lastIndex].name}, ${heroes[lastIndex].powerCount}</p>`;
}_

Zmiana wstrzyknięcia HTML z informacją o heroCount przez innerHTML na innerText z uwzglednieniem zmiany liczby na string.
Zmiana append na appendChild.

Nie wiem, czy do końca zrozumiałem zamierzenie autora, ale napisalem program i html po swojemu. Wpisując w komendę wywołanie funkcji getHero(name) gdzie name jest stringiem z imieniem bohatera, program renderuje nam go w dom, dodatkowo, klikając w power Up działa inkrementacja powerCount. Wywołując innego bohatera, poprzedni znika z ekranu, zapisując jednak wartość heroCount. Czyli wywołanie kolejnych bohaterów nam tę wartość zwiększa.