export function fixCountryAliases(inputCountry : string, countryMap : any, timelineValue : any, inputProvince : string){
    if (inputProvince === null) {
        if (inputCountry !== "Winter Olympics 2022" && inputCountry !== "MS Zaandam" && inputCountry !== "Summer Olympics 2020" && inputCountry !== "Diamond Princess") {
            switch (inputCountry) {
                case "DRC":
                    inputCountry = "Democratic Republic of the Congo";
                    break;
                case "N. Korea":
                    inputCountry = "North Korea";
                    break;
                case "S. Korea":
                    inputCountry = "South Korea";
                    break;
                case "Lao People's Democratic Republic":
                    inputCountry = "Laos";
                    break;
                case "Macedonia":
                    inputCountry = "North Macedonia";
                    break;
                case "Syrian Arab Republic":
                    inputCountry = "Syria";
                    break;
                case "UK":
                    inputCountry = "United Kingdom of Great Britain and Northern Ireland";
                    break;
                case "West Bank and Gaza":
                    inputCountry = "Palestine";
                    break;
                case "Libyan Arab Jamahiriya":
                    inputCountry = "Libya";
                    break;
                case "USA":
                    inputCountry = "United States of America";
                    break;
                case "UAE":
                    inputCountry = "United Arab Emirates";
                    break;
                case "Bosnia":
                    inputCountry = "Bosnia and Herzegovina"
                    break;
                case "Turkey":
                    inputCountry = "Türkiye"
                    break;
                case "Burma":
                    inputCountry = "Myanmar"
                    break;
                case "Congo":
                    inputCountry = "Republic of the Congo"
                    break;
                case "Swaziland":
                    inputCountry = "Eswatini";
                    break;
                case "Sao Tome and Principe":
                    inputCountry = "São Tomé and Príncipe";
                    break;
            }
            countryMap.set(inputCountry.toLowerCase(), timelineValue);
        }
    } else {
        if (inputCountry === "New Zealand" || inputCountry === "Denmark" || inputCountry === "UK" || inputCountry === "France" || inputCountry === "Netherlands") {

            if(inputProvince==="curacao"){
                countryMap.set("Curaçao".toLowerCase(), timelineValue);

            } else {
                countryMap.set(inputProvince.toLowerCase(), timelineValue);
            }
        }
        if (inputProvince === "hong kong" || inputProvince === "macau") {
            countryMap.set(inputProvince.toLowerCase(), timelineValue);
        }
    }
}
