
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

// Object to display the leagues in Leagues page
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
        // Serie A Teams
        case "ac milan":
        case "milan":
            return "98";
        case "fc internazionale milano":
        case "internazionale":
        case "inter":
            return "108";
        case "ssc napoli":
        case "napoli":
            return "113";
        case "juventus fc":
        case "juventus":
        case "juve":
            return "109";
        case "as roma":
        case "roma":
            return "100";
        case "ss lazio":
        case "lazio":
            return "110";
        case "acf fiorentina":
        case "fiorentina":
            return "99";
        case "atalanta bc":
        case "atalanta":
            return "102";
        case "us sassuolo calcio":
        case "sassuolo":
            return "471";
        case "hellas verona fc":
        case "hellas verona":
        case "hellas":
            return "450";
        case "torino fc":
        case "torino":
            return "586";
        case "bologna fc 1909":
        case "bologna fc":
        case "bologna":
            return "103";
        case "udinese calcio":
        case "udinese":
        case "udine":
            return "115";
        case "empoli fc":
        case "empoli":
            return "445";
        case "spezia calcio":
        case "spezia":
            return "488";
        case "uc sampdoria":
        case "sampdoria":
            return "584";
        case "cagliari calcio":
        case "cagliari":
            return "104";
        case "venezia fc":
        case "venezia":
            return "454";
        case "genoa fc":
        case "genoa":
            return "107";
        case "us salernitana 1919":
        case "salernitana":
            return "455";
        // Bundesliga Teams
        case "fc bayern münchen":
        case "bayern":
        case "bayern munich":
        case "fc bayern munich":
            return "5";
        case "borussia dortmund":
        case "dortmund":
            return "4";
        case "bayer 04 leverkusen":
        case "leverkusen":
        case "bayer leverkusen":
            return "3";
        case "rb leipzig":
        case "leipzig":
        case "red bull leipzig":
        case "red bull":
        case "rasenballsport leipzig ":
            return "721";
        case "cs freiburg":
        case "freiburg":
            return "17";
        case "tsg 1899 hoffenheim":
        case "hoffenheim":
            return "2";
        case "1. fc union berlin":
        case "fc union berlin":
        case "union berlin":
            return "28";
        case "1. fc köln":
        case "1. fc koln":
        case "koln":
        case "köln":
            return "1";
        case "eintracht frankfurt":
        case "eintracht":
            return "19";
        case "1. fsv mainz 05":
        case "mainz":
            return "15";
        case "borussia mönchengladbach":
        case "borussia monchengladbach":
        case "mönchengladbach":
        case "monchengladbach":
            return "18";
        case "vfL bochum 1848":
        case "bochum":
            return "36";
        case "vfL wolfsburg":
        case "wolfsburg":
            return "11";
        case "fc augsburg":
        case "augsburg":
            return "16";
        case "vfB stuttgart":
        case "stuttgart":
            return "10";
        case "arminia bielefeld":
            return "38";
        case "hertha berlin":
        case "hertha bsc":
            return "9";
        case "spvgg greuther fürth 1903":
        case "greuther fürth":
            return "21";
        // La Liga Teams
        case "real madrid cf":
        case "real madrid":
        case "real":
            return "86";
        case "fc barcelona":
        case "barcelona":
        case "barca":
            return "81";
        case "sevilla fc":
        case "sevilla":
            return "559";
        case "club atlético de madrid":
        case "club atletico de madrid":
        case "atlético de madrid":
        case "atletico de madrid":
            return "78";
        case "real betis balompié":
        case "real betis":
            return "90";
        case "real sociedad de futbol":
        case "real sociedad de fútbol":
        case "real sociedad":
            return "92";
        case "villareal cf":
        case "villareal":
            return "99";
        case "athletic club":
        case "athletic bilbao":
        case "bilbao":
            return "77";
        case "valencia cf":
        case "valencia":
            return "95";
        case "ca osasuna":
        case "osasuna":
            return "79";
        case "rcd espanyol de barcelona":
        case "espanyol":
            return "80";
        case "rc celta de vigo":
        case "celta":
        case "celta de vigo":
            return "558";
        case "rayo vallecano de madrid":
        case "rayo":
            return "87";
        case "getafe cf":
        case "getafe":
            return "82";
        case "elche cf":
        case "elche":
            return "285";
        case "granada cf":
        case "granada":
            return "83";
        case "rcd mallorca":
        case "mallorca":
            return "89";
        case "cádiz cf":
        case "cádiz":
        case "cadiz":
        case "cadiz cf":
            return "264";
        case "levante ud":
        case "levante":
            return "88";
        case "deportivo alavés":
        case "alavés":
        case "deportivo alaves":
        case "alaves":
            return "263";
        // Championship Teams
        case "fulham fc":
        case "fulham":
            return "63";
        case "afc bournemouth":
        case "bournemouth":
            return "1044";
        case "huddersfield town afc":
        case "huddersfield":
            return "394";
        case "nottingham forest fc":
        case "nottingham forest":
        case "forest":
            return "351";
        case "luton town fc":
        case "luton town":
        case "luton":
            return "389";
        case "sheffield united fc":
        case "sheffield united":
            return "356";
        case "blackburn rovers fc":
        case "blackburn rovers":
        case "blackburn":
            return "59";
        case "middlesbrough fc":
        case "middlesbrough":
            return "343";
        case "millwall fc":
        case "millwall":
            return "384";
        case "coventry city fc":
        case "coventry city":
        case "coventry":
            return "1076";
        case "queens park rangers fc":
        case "queens park rangers":
        case "qpr":
            return "69";
        case "west bromwich albion fc":
        case "west bromwich albion":
        case "west brom":
            return "74";
        case "preston north end fc":
        case "preston north end":
        case "preston":
            return "1081";
        case "swansea city afc":
        case "swansea city":
        case "swansea":
            return "72";
        case "stoke city fc":
        case "stoke city":
        case "stoke":
            return "70";
        case "blackpool fc":
        case "blackpool":
            return "336";
        case "cardiff city fc":
        case "cardiff city":
        case "cardiff":
            return "715";
        case "birmingham city fc":
        case "birmingham city":
        case "birmingham":
            return "332";
        case "bristol city fc":
        case "bristol city":
        case "bristol":
            return "387";
        case "hull city afc":
        case "hull city":
        case "hull":
            return "322";
        case "reading fc":
        case "reading":
            return "355";
        case "barnsley fc":
        case "barnsley":
            return "357";
        case "derby county fc":
        case "derby county":
        case "derby":
            return "342";
        case "peterborough united fc":
        case "peterborough united":
        case "peterborough":
            return "1077";
        // Ligue 1 Teams
        case "paris saint-germain fc":
        case "psg":
            return "524";
        case "olympique de marseille":
        case "marseille":
            return "516";
        case "stade rennais fc 1901":
        case "stade rennais":
        case "rennes":
            return "529";
        case "rc strasbourg alsace":
        case "strasbourg":
        case "strasbourg alsace":
            return "576";
        case "ogc nice":
        case "nice":
            return "522";
        case "as monaco fc":
        case "as monaco":
        case "monaco":
            return "548";
        case "lille ocs":
        case "lille":
            return "521";
        case "racing club de lens":
        case "rc lens":
        case "lens":
            return "546";
        case "fc nantes":
        case "nantes":
            return "543";
        case "olympique lyonnais":
        case "lyon fc":
        case "lyon":
            return "523";
        case "montpellier hsc":
        case "montpellier":
            return "518";
        case "stade brestois 29":
        case "stade brestois":
        case "brest":
            return "512";
        case "stade de reims":
        case "reims fc":
        case "reims":
            return "547";
        case "angers sco":
        case "angers":
            return "532";
        case "es troyes ac":
        case "troyes":
        case "es troyes":
            return "531";
        case "fc lorient":
        case "lorient":
            return "336";
        case "clermont foot 63":
        case "clermont foot":
        case "clermont":
            return "541";
        case "as saint-étienne":
        case "as saint étienne":
        case "as saint-etienne":
        case "as saint etienne":
        case "saint-étienne":
        case "saint étienne":
        case "saint-etienne":
        case "saint etienne":
            return "527";
        case "fc girondins de bordeaux":
        case "bordeaux":
        case "girondins de bordeaux":
            return "526";
        case "fc metz":
        case "metz":
            return "545";
    };
};