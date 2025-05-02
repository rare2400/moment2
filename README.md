# CV API
Enkel RESTful webbtjänst som hanterar arbetserfarenheter för att skapa ett CV. Skapat med hjälp av Node.js, Express och MySQL. 
Webbtjänsten stödjer CRUD-operationer i form av Create, Read, Update och Delete via olika endpoints.

## Länk
API länk: [http://localhost:3000/api](http://localhost:3000/api) 

## API endpoints

| Metod    | Endpoint                 | Beskrivning
| -------- | ------------------------ | ----------------------------------- |
| GET      | /api/workexperience      | Hämta alla arbetserfarenheter       |
| GET      | /api/workexperience/:id  | Hämta arbetserfarenhet med ID       |
| POST     | /api/workexperience      | Lägga till ny arbetserfarenhet      |
| PUT      | /api/workexperience/:id  | Uppdatera befintligarbetserfarenhet |
| DELETE   | /api/workexperience/:id  | Radera arbetserfarenhet med ID      |

**Objekt returneras/skickas som JSON**    
Exempel: GET `/api/workexperience/:id`
ID = 2:
```json
{
  "result": {
    "id": 2,
    "companyName": "Kjell & company",
    "jobTitle": "Säljare",
    "location": "Kalmar",
    "startDate": "2024-09-10",
    "endDate": "2024-03-10",
    "description": "Kassa, plocka varor i butik och lagerhantering"
  }
}
```

## Verktyg
- Node.js
- Express
- MySQL
- dotenv
- cors


## Databasen & tabell
Det är en MySQL-databas som används i detta API och för att skapa databastabellen installerar man npm-paketen som finns i 
projektet (se nedan hur installation görs). Sedan kör skriptet install.js såhär:

```bash
npm run install
```
   
Då skapas databasen cv och tabellen workexperiences:
```sql
CREATE TABLE IF NOT EXISTS workexperience (
   id INT AUTO_INCREMENT PRIMARY KEY,
   companyName VARCHAR(50) NOT NULL,
   jobTitle VARCHAR(30) NOT NULL,
   location VARCHAR(20) NOT NULL,
   startDate DATE NOT NULL,
   endDate DATE NOT NULL,
   description TEXT NOT NULL
       );
```

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/moment2.git
cd moment2
```

2. **Installera paket:**
```bash
npm install
```

3. **Installera nodemon för utveckling:**
```bash
npm install nodemon --save-dev
```

4. **Skapa `.env`-fil och fyll i databasuppgifter:**
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=cv
```

5. **Starta server:**

```bash
npm run start
```

6. API länk: [http://localhost:3000/api](http://localhost:3000/api) 

### Validering
- Alla fält ifyllda vid skapande och uppdatering
- Webbtjänsten returnerar tydliga felmeddelanden och statuskoder vid saknade fält eller andra fel så som:
```json
{
  "errors": {
    "message": "Not all fields are filled",
    "detail": "Fill in all fields",
    "https_response": {
      "message": "Bad request",
      "status": 400
    }
  }
}
```

## Testning
API:t kan testas med program som:
- Thunder Client (vsc extension)
- Postman
- Advanced REST Client

## Användning i frontend
API:t kan kopplas till ett simpelt formulär i en frontendapplikation som visar, lägger till, redigerar och tar bort arbetserfarenheter.    
Repo till frontend-applikation: 
```bash
git clone https://github.com/rare2400/moment22.git
```

## Skapad av
Skapad som en del av en skolupppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz   
2025-05-02
