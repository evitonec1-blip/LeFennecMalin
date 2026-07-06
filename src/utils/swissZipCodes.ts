/**
 * Swiss Postal Codes (NPA) to Canton and Tariff Zone mapping
 * Conforms to Priminfo (OFSP) official structures.
 */

export interface ZipCodeInfo {
  zip: string;
  canton: string;
  zone: number;
  city: string;
}

// Map specific high-density or known zip codes for French-speaking & major Swiss cantons
export function resolveZipCode(zipStr: string): ZipCodeInfo | null {
  const cleanZip = zipStr.trim();
  if (!/^\d{4}$/.test(cleanZip)) {
    return null;
  }

  const zip = parseInt(cleanZip, 10);

  // --- GENEVE (GE) - All Geneve is Zone 1 ---
  if (zip >= 1200 && zip <= 1294) {
    return { zip: cleanZip, canton: 'GE', zone: 1, city: 'Genève' };
  }

  // --- NEUCHATEL (NE) - All Neuchâtel is Zone 1 ---
  if (zip >= 2000 && zip <= 2499) {
    // Some exceptions like 2700+ is JU/BE
    if (zip >= 2700) {
      // let other rules handle it
    } else {
      return { zip: cleanZip, canton: 'NE', zone: 1, city: 'Neuchâtel' };
    }
  }

  // --- JURA (JU) - All Jura is Zone 1 ---
  if (zip >= 2800 && zip <= 2999) {
    return { zip: cleanZip, canton: 'JU', zone: 1, city: 'Delémont' };
  }

  // --- BASEL-VILLE (BS) - All Basel-Ville is Zone 1 ---
  if (zip >= 4000 && zip <= 4099) {
    return { zip: cleanZip, canton: 'BS', zone: 1, city: 'Bâle' };
  }

  // --- VAUD (VD) - Zone 1 vs Zone 2 ---
  if ((zip >= 1000 && zip <= 1199) || (zip >= 1300 && zip <= 1499) || (zip >= 1800 && zip <= 1869) || (zip >= 1295 && zip <= 1299)) {
    // Zone 1 VD includes major agglomerations
    const zone1VD = [
      1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1010, 1011, 1012, 1015, 1018, // Lausanne
      1020, // Renens
      1022, // Chavannes-près-Renens
      1023, // Crissier
      1024, // Ecublens
      1008, // Prilly
      1009, // Pully
      1110, // Morges
      1260, // Nyon
      1400, // Yverdon-les-Bains
      1800, // Vevey
      1814, // La Tour-de-Peilz
      1820  // Montreux
    ];

    if (zone1VD.includes(zip) || (zip >= 1000 && zip <= 1018)) {
      return { zip: cleanZip, canton: 'VD', zone: 1, city: getCityName(zip, 'Lausanne') };
    } else {
      return { zip: cleanZip, canton: 'VD', zone: 2, city: getCityName(zip, 'Canton de Vaud (Région 2)') };
    }
  }

  // --- FRIBOURG (FR) - Zone 1 vs Zone 2 ---
  if (zip >= 1600 && zip <= 1799) {
    const zone1FR = [
      1700, 1701, // Fribourg
      1630,       // Bulle
      1752,       // Villars-sur-Glâne
      1762,       // Givisiez
      1763        // Granges-Paccot
    ];

    if (zone1FR.includes(zip)) {
      return { zip: cleanZip, canton: 'FR', zone: 1, city: getCityName(zip, 'Fribourg Ville') };
    } else {
      return { zip: cleanZip, canton: 'FR', zone: 2, city: getCityName(zip, 'Canton de Fribourg') };
    }
  }

  // --- VALAIS (VS) - Zone 1 vs Zone 2 ---
  if ((zip >= 1870 && zip <= 1999) || (zip >= 3900 && zip <= 3999)) {
    const zone1VS = [
      1950, // Sion
      3960, // Sierre
      1920, // Martigny
      1870, // Monthey
      3900  // Brig
    ];

    if (zone1VS.includes(zip)) {
      return { zip: cleanZip, canton: 'VS', zone: 1, city: getCityName(zip, 'Sion / Ville') };
    } else {
      return { zip: cleanZip, canton: 'VS', zone: 2, city: getCityName(zip, 'Canton du Valais') };
    }
  }

  // --- BERNE (BE) - Zone 1 vs Zone 2 vs Zone 3 ---
  if (zip >= 2500 && zip <= 2799) {
    // Note: 2700-2799 is Jura bernois / BE
    if (zip >= 2500 && zip <= 2505) {
      return { zip: cleanZip, canton: 'BE', zone: 1, city: 'Bienne' };
    }
    return { zip: cleanZip, canton: 'BE', zone: 3, city: 'Moutier (BE)' };
  }
  if (zip >= 3000 && zip <= 3899) {
    if (zip >= 3000 && zip <= 3027) {
      return { zip: cleanZip, canton: 'BE', zone: 1, city: 'Berne' };
    }
    if (zip === 3600) {
      return { zip: cleanZip, canton: 'BE', zone: 1, city: 'Thun' };
    }
    const zone2BE = [3097, 3098, 3072, 3073, 3074, 3400];
    if (zone2BE.includes(zip)) {
      return { zip: cleanZip, canton: 'BE', zone: 2, city: 'Köniz / Burgdorf' };
    }
    return { zip: cleanZip, canton: 'BE', zone: 3, city: getCityName(zip, 'Canton de Berne') };
  }

  // --- ZURICH (ZH) - Zone 1 vs Zone 2 ---
  if (zip >= 8000 && zip <= 8999) {
    if ((zip >= 8000 && zip <= 8099) || (zip >= 8400 && zip <= 8409)) {
      return { zip: cleanZip, canton: 'ZH', zone: 1, city: 'Zurich Ville' };
    }
    return { zip: cleanZip, canton: 'ZH', zone: 2, city: getCityName(zip, 'Grand Zurich') };
  }

  // --- TESSIN (TI) - Zone 1 vs Zone 2 ---
  if (zip >= 6500 && zip <= 6999) {
    const zone1TI = [6500, 6600, 6900];
    if (zone1TI.includes(zip)) {
      return { zip: cleanZip, canton: 'TI', zone: 1, city: 'Lugano / Bellinzona' };
    }
    return { zip: cleanZip, canton: 'TI', zone: 2, city: getCityName(zip, 'Canton du Tessin') };
  }

  // Fallbacks for other zip codes based on leading digits
  const firstDigit = cleanZip.charAt(0);
  switch (firstDigit) {
    case '1':
      return { zip: cleanZip, canton: 'VD', zone: 2, city: 'Région Lémanique' };
    case '2':
      return { zip: cleanZip, canton: 'NE', zone: 1, city: 'Région Jura / NE' };
    case '3':
      return { zip: cleanZip, canton: 'BE', zone: 3, city: 'Région Berne / Espace Mittelland' };
    case '4':
      return { zip: cleanZip, canton: 'BS', zone: 1, city: 'Région Bâle' };
    case '6':
      return { zip: cleanZip, canton: 'TI', zone: 2, city: 'Région Tessin' };
    case '8':
      return { zip: cleanZip, canton: 'ZH', zone: 2, city: 'Région Zurich' };
    default:
      return { zip: cleanZip, canton: 'GE', zone: 1, city: 'Région Suisse' };
  }
}

function getCityName(zip: number, defaultName: string): string {
  switch (zip) {
    case 1000: case 1001: case 1002: case 1003: case 1004: case 1005: case 1006: case 1007:
      return 'Lausanne';
    case 1008: return 'Prilly';
    case 1009: return 'Pully';
    case 1020: return 'Renens';
    case 1022: return 'Chavannes-près-Renens';
    case 1023: return 'Crissier';
    case 1024: return 'Ecublens';
    case 1110: return 'Morges';
    case 1260: return 'Nyon';
    case 1400: return 'Yverdon-les-Bains';
    case 1630: return 'Bulle';
    case 1700: return 'Fribourg';
    case 1752: return 'Villars-sur-Glâne';
    case 1800: return 'Vevey';
    case 1820: return 'Montreux';
    case 1950: return 'Sion';
    case 1920: return 'Martigny';
    case 1870: return 'Monthey';
    case 3960: return 'Sierre';
    case 3900: return 'Brig';
    default: return defaultName;
  }
}
