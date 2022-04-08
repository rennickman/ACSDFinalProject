
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
            return "PD";
        case "the championship":
        case "championship":
            return "ELC";
        default:
            alert("League not found");
            return "PL";
    };
};


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
    };
};