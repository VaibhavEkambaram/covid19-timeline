export function flagCode(content : any, country : any){
    let countryCode;
    if (country !== null && country !== undefined && country.length > 0) {
        countryCode = "fi fi-" + (country).toLowerCase();
    } else if (content === "Worldwide") {
        countryCode = "fi fi-un";
    } else {
        countryCode = "fi fi-xx";
    }
    return countryCode;
}
