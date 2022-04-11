
// Takes the name of a league and returns the search ID
export const findLeagueId = leagueName => {

    switch (leagueName.toLowerCase()) {
        case "premier league":
        case "premiership":
            return "PL";
        case "bundesliga":
            return "BL1";
        case "ligue 1":
        case "ligue1":
            return "FL1";
        case "serie a":
            return "SA";
        case "la liga":
        case "primera division":
            return "PD";
        case "the championship":
        case "championship":
        case "efl championship":
            return "ELC";
        default:
            alert("League not found");
            return "PL";
    };
};

// Object to display the leagues in Leagues List page
export const mapLeagues = [
    {'name': 'Premier League', 'logo': 'pl-l-logo.jpg'},
    {'name': 'Bundesliga', 'logo': 'bundesliga-logo.jpg'},
    {'name': 'Ligue 1', 'logo': 'ligue-1-logo.jpg'},
    {'name': 'Serie A', 'logo': 'serie-a-logo.jpg'},
    {'name': 'Primera Division', 'logo': 'la-liga-logo.jpg'},
    {'name': 'EFL Championship', 'logo': 'english-championship-logo.jpg'},
];

// Takes the name of a club and returns the search ID
export const findClubId = clubName => {

    switch (clubName.toLowerCase()) {
        // Prem Teams
        case "manchester city":
        case "man city":
            return "66";
        case "liverpool":
            return "64";
        case "chelsea":
            return "61";
        case "tottenham hotspur":
        case "tottenham":
        case "spurs":
            return "73";
        case "arsenal":
            return "57";
        case "west ham":
            return "563";
        case "manchester united":
        case "manchester utd":
        case "man utd":
            return "66";
        case "wolves":
        case "wolverhampton wanderers":
            return "76";
        case "crystal palace":
        case "palace":
            return "354";
        case "leicester city":
        case "leicester":
            return "338";
        case "aston villa":
        case "villa":
            return "58";
        case "southampton":
            return "340";
        case "brighton":
            return "397";
        case "brentford":
            return "402";
        case "newcastle":
            return "67";
        case "leeds":
        case "leedsUtd":
        case "leedsUnited":
            return "341";
        case "everton":
            return "62";
        case "burnley":
            return "328";
        case "watford":
            return "346";
        case "norwich city":
        case "norwich":
            return "68";
        default:
            alert("Club not found");
            return "66";
    };
};