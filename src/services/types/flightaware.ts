// nb: these types are ai generated (i ain't reading all this)

export interface BaseTimes {
  scheduled: number | null;
  estimated: number | null;
  actual: number | null;
}

export interface PredictedTimes {
  out: number | null;
  off: number | null;
  on: number | null;
  in: number | null;
}

export interface Airport {
  TZ: string;
  isValidAirportCode: boolean;
  isCustomGlobalAirport: boolean;
  altIdent: string;
  iata: string;
  friendlyName: string;
  friendlyLocation: string;
  coord: [number, number];
  isLatLon: boolean;
  icao: string;
  gate: string | null;
  terminal: string | null;
  delays: unknown | null;
}

export interface Airline {
  fullName: string;
  shortName: string;
  icao: string;
  iata: string;
  callsign: string;
  url: string;
}

export interface AircraftTypeDetails {
  manufacturer: string;
  model: string;
  type: string;
  engCount: string;
  engType: string;
}

export interface Aircraft {
  type: string;
  lifeguard: boolean;
  heavy: boolean;
  tail: string | null;
  owner: string | null;
  ownerLocation: string | null;
  owner_type: string | null;
  canMessage: boolean;
  friendlyType: string;
  typeDetails: AircraftTypeDetails;
}

export interface FuelBurn {
  gallons: number;
  pounds: number;
}

export interface FlightPlan {
  speed: number;
  altitude: number | null;
  route: string;
  directDistance: number;
  plannedDistance: number | null;
  departure: number;
  ete: number;
  fuelBurn: FuelBurn;
}

export interface FlightLinks {
  operated: string;
  registration: string;
  permanent: string;
  trackLog: string;
  flightHistory: string;
  buyFlightHistory: string;
  reportInaccuracies: string;
  facebook: string;
  twitter: string;
}

export interface Thumbnail {
  imageUrl: string;
  linkUrl: string;
}

export interface PhotoTarget {
  thumbnail: string;
  target: string;
}

export interface CodeShare {
  ident: string;
  displayIdent: string;
  iataIdent: string;
  airline: Airline;
  friendlyIdent: string;
  thumbnail: Thumbnail;
  links: FlightLinks;
}

export interface AverageDelays {
  departure: number;
  arrival: number;
}

export interface LoggedFlight {
  origin: Airport;
  destination: Airport;
  aircraftType: string;
  aircraftTypeFriendly: string;
  flightId: string;
  takeoffTimes: BaseTimes;
  landingTimes: BaseTimes;
  gateDepartureTimes: BaseTimes;
  gateArrivalTimes: BaseTimes;
  ga: boolean;
  flightStatus: string;
  fpasAvailable: boolean;
  canEdit: boolean;
  cancelled: boolean;
  resultUnknown: boolean;
  diverted: boolean;
  adhoc: boolean;
  fruOverride: boolean;
  timestamp: number | null;
  roundedTimestamp: number | null;
  permaLink: string;
  taxiIn: unknown | null;
  taxiOut: unknown | null;
  globalIdent: boolean;
  globalFlightFeatures: boolean;
  globalVisualizer: boolean;
  flightPlan: FlightPlan;
  links: FlightLinks;
  aircraft: Aircraft;
  displayIdent: string;
  encryptedFlightId: string;
  predictedAvailable: boolean;
  predictedTimes: PredictedTimes;
}

export interface ActivityLog {
  flights: LoggedFlight[];
  additionalLogRowsAvailable: boolean;
}

export interface FlightData extends LoggedFlight {
  activityLog: ActivityLog;
  adhocAvailable: boolean;
  aireonCandidate: boolean;
  airline: Airline;
  altitude: number | null;
  altitudeChange: number | null;
  atcIdent: string | null;
  averageDelays: AverageDelays;
  blocked: boolean;
  blockedForUser: boolean;
  blockMessage: string | null;
  cabinInfo: { text: string | null; links: string | null };
  cockpitInformation: unknown | null;
  codeShare: CodeShare;
  coord: [number, number] | null;
  distance: { elapsed: number | null; remaining: number | null; actual: number | null };
  friendlyIdent: string;
  globalCandidate: boolean;
  globalLegSharing: boolean;
  globalServices: Record<string, unknown>;
  groundspeed: number | null;
  heading: number | null;
  hexid: string | null;
  historical: boolean;
  iataIdent: string;
  icon: string;
  ident: string;
  inboundFlight: unknown | null;
  internal: unknown | null;
  interregional: boolean;
  myAlerts: { editAlert: string; advancedAlert: string };
  myFlightAware: unknown | null;
  poweredOff: boolean | null;
  poweredOn: boolean | null;
  redactedBlockedTail: string | null;
  redactedCallsign: boolean;
  redactedTail: string | null;
  relatedThumbnails: PhotoTarget[];
  remarks: string | null;
  runways: { origin: string | null; destination: string | null };
  speedInformation: unknown | null;
  showSurfaceTimes: boolean;
  surfaceTrackAvailable: boolean | null;
  thumbnail: Thumbnail;
  track: unknown | null;
  updateType: string;
  usingShareUrl: boolean;
  waypoints: unknown[];
  weather: unknown | null;
}

export interface FlightAwareResponse {
  version: string;
  summary: boolean;
  flights: Record<string, FlightData>;
}
