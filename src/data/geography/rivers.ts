/* Trying to map rivers in india with its source, states flowing through, tributaires and countries flowin through */

export type AllowedStates = "Kerala" | "Karnataka" | "Tamil Nadu" | "Goa" |
    "Telangana" | "Andra Pradesh" | "Maharastra" | "Gujarat" | "Madhya Pradesh" |
    "Chattisgarh" | "Odisha" | "Jharkhand" | "West Bengal" | "Rajasthan" |
    "Punjab" | "Himachal Pradesh" | "Uttarkhand" | "Uttar Pradesh" |
    "Haryana" | "Bihar" | "Sikkim" | "Arunachal Pradesh" | "Nagaland" |
    "Manipur" | "Mizoram" | "Tripura" | "Assam" | "Meghalaya"

export type AllowedSeas = "Arabian Sea" | "Bay of Bengal" | "Indian Ocean"

export type AllowedUts = "Dadra and Nagar Haveli and Daman & Diu" | "Jammu & Kashmir" |
    "Ladakh" | "Puducherry" | "Lakshadweep" | "Andaman and Nicobar" | "NCR" | "Chandigarh"

export type AllowedCountries = "Pakistan" | "China" | "Nepal" | "Bhutan" | "Bangladesh" | "Myanmar" | "Afghanistan"

export type River = {
    source: string;
    states: AllowedStates[];
    countries?: AllowedCountries[];
    mouth?: string;
    mainstem?: string;
    tributaries?: string[];
    confluence?: string;
}

const rivers: Map<string, River> = new Map([
    ["Teesta", {
        source: "Pauhunri Mountain(Sikkim)",
        states: ["Sikkim", "West Bengal"],
        tributaries: ["Rangeet", "Rangpo"],
        countries: ["Bangladesh"]
    }],
    ["Rangeet", {
        source: "Mount Kabru glacier(Sikkim)",
        states: ["Sikkim", "West Bengal"],
        mainstem: "Teesta",
        confluence: "Tribeni"
    }],
    ["Rangpo", {
        source: "Menmecho Lake(Sikkim)",
        states: ["Sikkim", "West Bengal"],
        mainstem: "Teesta",
        confluence: "Indrakil Prayag"
    }],
    ["Brahmaputra", {
        source: "Angsi Glacier(Tibet)",
        states: ["Arunachal Pradesh", "Assam"],
        tributaries: ["Lohit", "Dibang", "Subansiri", "Dhansiri", "Manas", "Torsa", "Dihing", "Teesta", "Sankosh", "Kopili", "Raidak", "Kameng"],
        countries: ["China", "Bangladesh"]
    }],
    ["Subansiri", {
        source: "Mount Porom(Tibet)",
        states: ["Arunachal Pradesh", "Assam"],
        mainstem: "Brahmaputra",
        confluence: "Jamurighat"
    }],
    ["Kameng", {
        source: "Gori Chen mountain(Tibet-India border)",
        states: ["Arunachal Pradesh", "Assam"],
        mainstem: "Brahmaputra",
        confluence: "Tezpur"
    }],
    ["Beki", {
        source: "Himalayan Glacier(Bhutan)",
        states: ["Assam"],
        countries: ["Bhutan"],
        mainstem: "Brahmaputra"
    }],
    ["Manas", {
        source: "Lower Himalaya(Bhutan)",
        countries: ["Bhutan"],
        states: ["Assam"],
        confluence: "Jogighopa",
        mainstem: "Brahmaputra"
    }],
    ["Sankosh", {
        source: "Punakha(Bhutan)",
        countries: ["Bhutan"],
        states: ["Assam"],
        mainstem: "Brahmaputra"
    }],
    ["Dihing", {
        source: "Patkai Hills",
        confluence: "Dihingmukh",
        states: ["Arunachal Pradesh", "Assam"],
        mainstem: "Brahmaputra"
    }],
    ["Dibang", {
        source: "Mishmi Hills",
        mainstem: "Brahmaputra",
        confluence: "Sadiya",
        states: ["Arunachal Pradesh", "Assam"]
    }],
    ["Lohit", {
        source: "Kangri Karpo mountain range(China)",
        countries: ["China"],
        mainstem: "Brahmaputra",
        confluence: "Sadiya",
        states: ["Arunachal Pradesh", "Assam"]
    }],
    ["Dhansiri", {
        source: "Laisang Peak",
        confluence: "Dhansirimukh",
        mainstem: "Brahmaputra",
        states: ["Nagaland", "Assam"]
    }],
    ["Doyang", {
        source: "Japfü Hill",
        mainstem: "Dhansiri",
        states: ["Nagaland"]
    }],
    ["Dikhu", {
        source: "Nuroto Hills",
        confluence: "Naginimora",
        states: ["Nagaland", "Assam"],
        mainstem: "Brahmaputra"
    }]
])

export default rivers