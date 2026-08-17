<div align="center">
<br>

  # avion 
  cloudflare worker to scrape flightaware's flight data and aggregate data from adsb.lol and airportdb.


</div>

## Demo

The worker is currently deployed @ [avion.notri1.fr](https://avion.notri1.fr)

## Setup

### Prerequisites

- [Bun](https://bun.sh/) installed locally

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Paylicier/avion.git
   cd avion
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set your airportdb api key in src/services/airportdb.ts

4. Start the development server:
   ```bash
   bun run dev
   ```

The app will be accessible at ``http://localhost:8787``

### Deploy

1. Clone the repository:
   ```bash
   git clone https://github.com/Paylicier/avion.git
   cd avion
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set your airportdb api key in src/services/airportdb.ts

4. run `bunx wrangler deploy`

5. follow the instructions

## Usage

### Get Current Health

**Request**: 

```http
GET /
```

**Response**:

```json
{ "status": "success" }
```

### Get flight info

**Request**:

```http
GET /flight/:flightId    (e.g. /flight/DAL67 or /flight/DAL67-1786766834)
```

**Response**:

```json
{
  "id": "DAL67",
  "internalId": "DAL67-1786766834",
  "status": "airborne",
  "cancelled": false,
  "diverted": false,
  "airline": {
    "name": "Delta Air Lines, Inc.",
    "icao": "DAL",
    "iata": "DL"
  },
  "origin": {
    "name": "Leonardo da Vinci Int'l (Fiumicino Int'l)",
    "icao": "LIRF",
    "iata": "FCO",
    "lat": 41.8045,
    "lon": 12.2508,
    "location": "Rome, Italy",
    "terminal": "3",
    "gate": "E13"
  },
  "destination": {
    "name": "Hartsfield-Jackson Intl",
    "icao": "KATL",
    "iata": "ATL",
    "lat": 33.6367,
    "lon": -84.4279,
    "location": "Atlanta, GA",
    "terminal": "I",
    "gate": "F8"
  },
  "aircraft": {
    "type": "A339",
    "lifeguard": false,
    "heavy": false,
    "tail": null,
    "owner": null,
    "ownerLocation": null,
    "owner_type": null,
    "canMessage": false,
    "friendlyType": "Airbus A330-900 (twin-jet)",
    "typeDetails": {
      "manufacturer": "Airbus",
      "model": "A330-900",
      "type": "twin-jet",
      "engCount": "2",
      "engType": "jet"
    }
  },
  "times": {
    "gateDeparture": {
      "scheduled": 1786965000,
      "estimated": 1786965000,
      "actual": 1786966140
    },
    "takeoff": {
      "scheduled": 1786965600,
      "estimated": 1786968120,
      "actual": 1786968120
    },
    "landing": {
      "scheduled": 1787001780,
      "estimated": 1787004120,
      "actual": null
    },
    "gateArrival": {
      "scheduled": 1787004960,
      "estimated": 1787004720,
      "actual": null
    }
  }
}
```

### Get flight history

**Request**: 

```http
GET /history/:flightId
```

**Response**:

```json
[
  {
    "id": "DAL67",
    "internalId": "DAL67-1786939631",
    "status": "",
    "cancelled": false,
    "diverted": false,
    "airline": {
      "name": "Delta Air Lines, Inc.",
      "icao": "DAL",
      "iata": "DL"
    },
    "origin": {
      "name": "Leonardo da Vinci Int'l (Fiumicino Int'l)",
      "icao": "LIRF",
      "iata": "FCO",
      "lat": 41.8045,
      "lon": 12.2508,
      "location": "Rome, Italy",
      "terminal": "3",
      "gate": null
    },
    "destination": {
      "name": "Hartsfield-Jackson Intl",
      "icao": "KATL",
      "iata": "ATL",
      "lat": 33.6367,
      "lon": -84.4279,
      "location": "Atlanta, GA",
      "terminal": "I",
      "gate": null
    },
    "aircraft": {
      "type": "A339",
      "lifeguard": false,
      "heavy": false,
      "tail": null,
      "owner": null,
      "ownerLocation": null,
      "owner_type": null,
      "canMessage": false,
      "friendlyType": "Airbus A330-900 (twin-jet)",
      "typeDetails": {
        "manufacturer": "Airbus",
        "model": "A330-900",
        "type": "twin-jet",
        "engCount": "2",
        "engType": "jet"
      }
    },
    "times": {
      "gateDeparture": {
        "scheduled": 1787137800,
        "estimated": 1787137800,
        "actual": null
      },
      "takeoff": {
        "scheduled": 1787138400,
        "estimated": 1787138400,
        "actual": null
      },
      "landing": {
        "scheduled": 1787177160,
        "estimated": 1787177160,
        "actual": null
      },
      "gateArrival": {
        "scheduled": 1787177760,
        "estimated": 1787177760,
        "actual": null
      }
    }
  },
  {
    "id": "DAL67",
    "internalId": "DAL67-1786853230",
    "status": "",
    "cancelled": false,
    "diverted": false,
    "airline": {
      "name": "Delta Air Lines, Inc.",
      "icao": "DAL",
      "iata": "DL"
    },
    "origin": {
      "name": "Leonardo da Vinci Int'l (Fiumicino Int'l)",
      "icao": "LIRF",
      "iata": "FCO",
      "lat": 41.8045,
      "lon": 12.2508,
      "location": "Rome, Italy",
      "terminal": "3",
      "gate": "E13"
    },
    "destination": {
      "name": "Hartsfield-Jackson Intl",
      "icao": "KATL",
      "iata": "ATL",
      "lat": 33.6367,
      "lon": -84.4279,
      "location": "Atlanta, GA",
      "terminal": "I",
      "gate": "E16"
    },
    "aircraft": {
      "type": "A339",
      "lifeguard": false,
      "heavy": false,
      "tail": null,
      "owner": null,
      "ownerLocation": null,
      "owner_type": null,
      "canMessage": false,
      "friendlyType": "Airbus A330-900 (twin-jet)",
      "typeDetails": {
        "manufacturer": "Airbus",
        "model": "A330-900",
        "type": "twin-jet",
        "engCount": "2",
        "engType": "jet"
      }
    },
    "times": {
      "gateDeparture": {
        "scheduled": 1787051400,
        "estimated": 1787051400,
        "actual": null
      },
      "takeoff": {
        "scheduled": 1787052000,
        "estimated": 1787052000,
        "actual": null
      },
      "landing": {
        "scheduled": 1787089620,
        "estimated": 1787089620,
        "actual": null
      },
      "gateArrival": {
        "scheduled": 1787091360,
        "estimated": 1787090220,
        "actual": null
      }
    }
  }
]
```

### Get plane location

**Request**: 

```http
GET /flight/:flightId/location
```

**Response**:

```json
{
  "status": "airborne",
  "speed": 452,
  "altitude": 35975,
  "route": "PATSS7 PATSS NELIE BIZEX Q75 GSO BURGG Q22 TWOUP Q22 CATLN Q56 SJI MNSTR2",
  "origin": "KBOS",
  "destination": "KMSY",
  "hex": "a358bd",
  "lat": 41.134369,
  "lon": -73.827271
}
```

## Contributing 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 

This project is available under **GNU Affero General Public License v3**

Please read the license carefully before using this software. If you have any questions about licensing, please open an issue.


Airport data is from ourairport.

Plane location data is from adsb.lol.

Flight data is from flightaware.

---

<div align="center">
  Built with ❤️ and 🪵 by Paul
</div>
