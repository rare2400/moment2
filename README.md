# CV API
Enkel RESTful webbtjänst som hanterar arbetserfarenheter för att skapa ett CV. Skapat med hjälp av Node.js, Express och MySQL. 
Webbtjänsten stödjer CRUD-operationer i form av Create, Read, Update och Delete via olika endpoints.

## Funktioner
- Hämta alla arbetserfarenheter
- Hämta en erfarenhet med hjälp av ID
- Lägga till ny arbetserfarenhet
- Uppdatera befintlig erfarenthet
- Ta bort erfarenget
- Validering
- CORS-stöd

## Verktyg
- Node.js
- Express
- MySQL
- dotenv
- cors

## Installation
1. Klona repot:
```bash
git clone https://github.com/rare2400/moment2.git
cd moment2
```

2. Installera paket:
```bash
npm install
```

3. Installera nodemon för utveckling:
```bash
npm install nodemon --save-dev
```

4. Skapa eventuell databas och tabell:
```bash
npm run install
```

5. Skapa `.env`-fil och fyll i databasuppgifter:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=cv
```

6. starta server:

```bash
npm run start
```

7. Använd [http://localhost:3000/api](http://localhost:3000/api) 

## Databasen
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

## API endpoints
### Hämta alla arbetserfarenheter
GET `/api/workexperience`

```json
{
  "message": "All work experiences",
  "results": [
    {
      "id": 1,
      "companyName": "Coop",
      "jobTitle": "Säljare",
      "location": "Uppsala",
      "startDate": "2022-12-04",
      "endDate": "2024-06-26",
      "description": "Sitta i kassan, plocka varor i butik och onlineordrar"
    }
  ]
}
```

### Hämta arbetserfarenhet med ID
GET `/api/workexperience/:id`

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

### Lägga till ny arbetserfarenhet
POST `/api/workexperience`
Body (JSON):
```json
{
  "companyName": "Google",
  "jobTitle": "Utvecklare",
  "location": "Stockholm",
  "startDate": "2023-03-01",
  "endDate": "2024-01-23",
  "description": "Ledde ett utvecklingsteam"
}
```


### Uppdatera befintlig arbetserfarenhet
PUT `/api/workexperience/:id`
Body (JSON):
```json
{
  "companyName": "Google",
  "jobTitle": "Projektledare",
  "location": "Stockholm",
  "startDate": "2023-03-01",
  "endDate": "2024-01-23",
  "description": "Skapade tidsplan för att genomföra ett projekt och definierade aktiviteter för varje teammedlem som leder till att målet"
}
```

### Radera arbetserfarenhet
DELETE `/api/workexperience/:id`
svar:
```json
{
  "message": "data deleted"
}
```

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
Repo till fronend-applikation: 
```bash
git clone https://github.com/rare2400/moment22.git
```

## Skapad av
Skapad som en del av en skolupppgift
Ramona Reinholdz
2025-05-02
