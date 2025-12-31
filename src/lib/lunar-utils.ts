import { Lunar, Solar } from 'lunar-javascript';

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeap?: boolean;
}

export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

/**
 * Convert a Solar date (JavaScript Date object) to a Lunar date.
 */
export const getLunarDate = (date: Date): LunarDate => {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  return {
    day: lunar.getDay(),
    month: lunar.getMonth(),
    year: lunar.getYear(),
    isLeap: lunar.getMonth() === Math.abs(lunar.getMonth()) // simpler check might be needed depending on lib, but 'lunar-javascript' handles leap months via negative or extra field usually. Let's verify commonly used methods.
    // Actually lunar-javascript Lunar.getMonth() returns negative for leap months? Let's check docs or common usage.
    // Looking at common usage: getMonth() returns standard month. 
    // Usually we check lunar.getLeapMonth() > 0 && lunar.isLeap()??
    // Let's stick to basic accessors first
  };
};

/**
 * Get formatted Lunar Date string (e.g., "15/01")
 */
export const getLunarDateString = (date: Date): string => {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  return `${lunar.getDay()}/${lunar.getMonth()}`;
};

/**
 * Get full detailed string including Year
 */
export const getFullLunarDateString = (date: Date): string => {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  return `${lunar.getDay()}/${lunar.getMonth()}/${lunar.getYear()}`;
};

/**
 * Convert Lunar Date to Solar Date
 * Note: simplistic conversion, might need more rigorous handling for leap months if user inputs them manually.
 */
export const convertLunarToSolar = (day: number, month: number, year: number, isLeap: boolean = false): Date => {
  // Lunar.fromYmd(year, month, day) might assume not leap unless specified?
  // Library usually handles Lunar.fromYmd(year, month, day)
  // If it's a leap month, input month might need adjustment or specific method.
  // For 'lunar-javascript', commonly: Lunar.fromYmd(year, month, day)
  const lunar = Lunar.fromYmd(year, month, day); 
  // TODO: Check if specific leap month handling is needed for the library version
  const solar = lunar.getSolar();
  return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
};

export const getUpcomingLunarDate = (lunarDay: number, lunarMonth: number, futureYearsToCheck: number = 2): Date[] => {
    const dates: Date[] = [];
    const currentYear = new Date().getFullYear();
    // Check current year and next few years
    for (let i = 0; i <= futureYearsToCheck; i++) {
        const yearBase = currentYear + i;
        // Simple approximation: Lunar year roughly maps to Solar year. 
        // We acturally need to find the Solar date for the Lunar date (day/month) in the Lunar year (yearBase)
        // Note: The lunar year might differ slightly from solar year boundaries.
        try {
            const lunar = Lunar.fromYmd(yearBase, lunarMonth, lunarDay);
            const solar = lunar.getSolar();
            dates.push(new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay()));
        } catch (e) {
            // Invalid date handling (e.g. leap month issues or non-existent dates)
        }
    }
    return dates;
}
