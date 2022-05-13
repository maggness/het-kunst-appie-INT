# Real Time Web @cmda-minor-web · 2021/22

Voor mijn minor web maak ik met de API van het Rijksmuseam een applicatie waar je kan zoeken naar verschillende objecten uit deze API. Ook kan je door middel van sockets met elkaar interacteren.

Link naar de home pagina: https://het-kunst-appie-int.herokuapp.com

Link naar directe interactive room: https://het-kunst-appie-int.herokuapp.com/interactiveRoom/BK-AM-33-E

Om bij een interactive room te komen moet je op een artwork drukken en dan op de naam drukken van dit artwork.

![Front-end frontpage image](https://user-images.githubusercontent.com/30145681/157264964-a8900826-9802-4eb3-a5a7-f0be3a5e7089.png)

## How to use

Met deze app kan je zoeken naar objecten uit de database van het Rijksmuseum. Je kan op de kunstwerken drukken en zo kom je op een detail pagina met wat langere informatie over dat kunstwerk. Ook kan je inzoomen op het kunstwerk. Als je op mobiel kijkt en je het scherm naar landscape modus brengt gaat de UI weg en zie je het kunstwerk nog beter, ook hier kun je inzoomen.

Als je op pc/laptop zit kan je drukken op de artwork naam & dan kom je in de Interactive Room. Hier kan je samen met andere mensen rond lopen en chatten. Lopen doe je met de pijltjestoetsen en de chat staat rechts onder.

## Install the project

Om dit te runnen moet je node & npm hebben geinstalleerd.

Om dit project local te laten draaien kun je dit project clone met: `gh repo clone maggness/Het-Kunst-Appie-INT`. Draai de code op een local server, anders werken de modules niet.

Vergeet niet `npm install` te gebruiken om de node modules te installeren.

Ook moet je de API key veranderen naar je eigen key. Die staat in de URL na `key=`

Run de applicatie op je localhost:333, dit kan je doen met `npm start`.

## 3 Concepten

![ruigeschetsen](https://user-images.githubusercontent.com/30145681/168043550-402543fe-82f2-4392-a64f-76bf8a36aedb.png)

Hierboven staan hele ruige schetsen van mijn eerste 3 concepten. Hieronder zijn ze iets minder ruig.

![schetsen](https://user-images.githubusercontent.com/30145681/168043625-c69d9586-0576-4d6a-96ae-c278505c8103.PNG)

### Concept 1: Raid boss
Per schilderij kom je in een “Raid room” met maximaal 8 andere mensen. Het schilderij komt tot leven en het is jullie taak om dit schilderij samen te verslaan. Je speelt omstebeurt een Attack, Defense of Heal kaart. Hierdoor val je het schilderij aan of help je je team. Jullie winnen als het schilderij is verslagen en verliezen als jij en je team verslagen is.

### Concept 2: Interactive art room
Je kunt virtueel in het rijksmuseum rondlopen en chatten met de andere mensen die aan het kijken zijn bij het schilderij. 

### Concept 3: Virtueel touwtje trekken
Je krijg samen met andere mensen een touw vast en 4 opties voor schilderijen aan elke kant van het scherm. Als het middelste puntje van het touw 3 seconden aan een kant is van het scherm gaat iedereen naar dit schilderij toe.

### Gekozen Concept:
Ik heb voor de Interactive art room gekozen. Het lijkt me leuk en uitdagend om zoiets te maken. Ook omdat het misschien een leuk concept is voor het rijksmuseum.

## App features

### Features
- Kunststukken van het Rijksmuseum bekijken
- Zoeken naar kunststukken
- Users opslaan in een array
- Socket rooms maken per kunststuk
- Secret interactie voor karakters
- Bekijken & Inzoomen bij kunststukken
- Desktop/Laptop: Interactive Room joinen bij kunststukken, hierin rond kunnen lopen en chatten met andere mensen
- Mobile: In landscape modus kunstwerken bekijken

### Future features
- Improved Interactive Room UX/UI
- Users opslaan in een array optimaliseren
- Meer interacties voor de karakters
- Mobile versie van Interactive Room
- Karakter customization 
- Service worker aan zetten & optimaliseren


## API 

De Rijks Data API is vrij te gebruiken en op https://data.rijksmuseum.nl/object-metadata/api/ te vinden. Meer informatie over deze API is te vinden op: https://data.rijksmuseum.nl/

### API Response 

``` json
"artObjects": [
  {
    "links": {}               // links naar het schilderij in the api of website
    "id":                     // ID van het schilderij
    "objectNumber":           // object number van het schilderij
    "title":                  // schilderij titel
    "longTitle":              // schilderij lange titel
    "principleOrFirstMaker":  // schilderij artiest
    "hasImage":               // kijkt of het schilderij een image heeft
    "showImage":              // vertelt of het schilderij getoond word
    "permitDownload":         // vertelt of het schilderij gedownload mag worden
    "webImage": {}            // de web image
    "headerImage": {}         // de header image
    "productionPlaces": []    // plek waar het schilderij gemaakt is
  }
] 
```
Ik haal hier via de URL het id van het schilderij op. En daar vraag ik dan de title, image en ID weer op. 

## Data Model API
<img width="377" alt="Artboard 2@2x" src="https://user-images.githubusercontent.com/30145681/165931371-a08e5ffa-251d-4213-bc7f-270409ebb7f6.png">

## Data Lifecycle Diagram
![image](https://user-images.githubusercontent.com/30145681/168076271-abb410e1-15b1-4605-be36-dd8d5cd2eda2.png)

## Real time events

### Connection
Als een user connect wordt dit serverside gelogd 

Je komt in een socket room van het ID van het schilderij

### User Created
Als er een username ingestuurd is wordt hier een karakter voor gemaakt die bestuurd kan worden. Ook update dit de online lijst.

### Keydown event (movement)
Als er een keydown event is wordt de top of left verandert van de div met het socket.id van de cliënt die dit event activeert. Zo beweegt het karakter van dit persoon.

### Message 
Als er een bericht verstuurd wordt zie je dit bericht boven het persoon die dit verstuurd heeft.

### Disconnect
Als er een gebruiker disconnect wordt de naam & div verwijdert van deze gebruiker.

## Reflectie

Ik vond het echt leuk om te werken met sockets. Het is super leuk om te zien dat je live met elkaar iets kan doen op je pagina. Ik heb voor deze opdracht nog nooit met sockets gewerkt dus het was wel echt een uitdaging. De eerste week was het vooral proberen de chat aan de praat te krijgen met namen, het was echt heel nice toen dit gelukt was. In de 2e week zat ik een hele dag vast op het werkend krijgen van het bewegen van de karakters, hier zat ik er toen wel echt doorheen. Maar met hulp van Justus was dit opgelost de volgende week. De werking van de sockets begon ik steeds beter te begrijpen en ik denk dat ik veel vette dingen kan maken de volgende keer als ik hier weer mee zou gaan werken.

## Licence

Dit project is voorzien van een MIT licence. Zie de pagina LICENCE voor meer informatie.

## Resources

Rijks Data API: https://data.rijksmuseum.nl/object-metadata/api/

Lessen & leraren

W3 Schools

Socket.io


