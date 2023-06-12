export function fixCountryAliases(inputCountry : string, countryMap : any, timelineValue : any, inputProvince : string){
    if (inputProvince === null) {
            countryMap.set(inputCountry.toLowerCase(), timelineValue);

    } else {
        const allowedCountries = ["New Zealand", "Denmark", "United Kingdom of Great Britain and Northern Ireland", "France", "Netherlands"];
        const allowedProvinces = ["hong kong", "macau"];

        if (allowedCountries.includes(inputCountry) || allowedProvinces.includes(inputProvince.toLowerCase())) {
            countryMap.set(inputProvince.toLowerCase(), timelineValue);
        }
    }
}
