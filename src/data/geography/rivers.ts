/* Trying to map rivers in india with its source, states flowing through, tributaires and countries flowin through */

export type AllowedStates = "Kerala" | "Karnataka" | "Tamil Nadu" | "Goa" |
    "Telangana" | "Andra Pradesh" | "Maharastra" | "Gujarat" | "Madhya Pradesh" |
    "Chattisgarh" | "Odisha" | "Jharkhand" | "West Bengal" | "Rajasthan" |
    "Punjab" | "Himachal Pradesh" | "Uttarkhand" | "Uttar Pradesh" |
    "Haryana" | "Bihar" | "Sikkim" | "Arunachal Pradesh" | "Nagaland" |
    "Manipur" | "Mizoram" | "Tripura" | "Assam" | "Meghalaya" | "Dadra and Nagar Haveli and Daman & Diu" | "Jammu & Kashmir" |
    "Ladakh" | "Puducherry" | "Lakshadweep" | "Andaman and Nicobar" | "NCR" | "Chandigarh"

export type AllowedSeas = "Arabian Sea" | "Bay of Bengal" | "Indian Ocean"

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
        tributaries: ["Lohit", "Dibang", "Subansiri", "Dhansiri", "Manas", "Torsa", "Dihing", "Teesta", "Sankosh", "Kopili", "Raidak", "Kameng", "Barak"],
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
    }],
    ["Barak", {
        source: "Laikot Hills",
        states: ["Manipur", "Nagaland", "Assam"],
        countries: ["Bangladesh"],
        tributaries: ["Tuivai", "Tlawng", "Tuirial"],
        mainstem: "Brahmaputra"
    }],
    ["Imphal", {
        source: "Kangpokpi Northern Hills",
        states: ["Manipur"],
        mainstem: "Manipur",
        tributaries: ["Iril"],
        confluence: "Nongmaikhong"
    }],
    ["Manipur", {
        source: "Kangpokpi Northern Hills",
        states: ["Manipur"],
        countries: ["Myanmar"],
        tributaries: ["Imphal"],
        mainstem: "Irrawaddy"
    }],
    ["Iril", {
        source: "Ngamju village",
        states: ["Manipur"],
        mainstem: "Imphal",
        confluence: "Lilong bridge"
    }],
    ["Nambul", {
        source: "Kangchup hill range",
        states: ["Manipur"],
        confluence: "Yangoi Karong"
    }],
    ["Tuivai", {
        source: "Chin Hills",
        states: ["Manipur", "Mizoram", "Assam"],
        mainstem: "Barak",
        countries: ["Myanmar"],
        confluence: "Tipaimukh"
    }],
    ["Tlawng", {
        source: "Zopui Hill",
        states: ["Mizoram", "Assam"],
        mainstem: "Barak",
        tributaries: ["Tut"],
        confluence: "Katakhal"
    }],
    ["Tiau", {
        source: "Mizo Hills",
        states: ["Mizoram"],
        mainstem: "Kaladan",
        confluence: "Pangkhua"
    }],
    ["Kaladan", {
        source: "Chin State(Myanmar)",
        states: ["Mizoram"],
        countries: ["Myanmar"],
        tributaries: ["Tiau"]
    }],
    ["Khawthlangtuipui", {
        source: "Saitah village",
        states: ["Mizoram"],
        countries: ["Bangladesh"],
        tributaries: ["Tuichawng"]
    }],
    ["Tuirial", {
        source: "Chawilung hills",
        states: ["Mizoram", "Assam"],
        confluence: "Dungripar"
    }],
    ["Gumti", {
        source: "Kanti Charan Para",
        states: ["Tripura"],
        countries: ["Bangladesh"],
        mainstem: "Meghna",
        confluence: "Daudkandi"
    }],
    ["Sumli", {
        source: "Damra Hills",
        states: ["Tripura"],
        countries: ["Bangladesh"],
        mainstem: "Meghna"
    }],
    ["Khowai", {
        source: "Atharamura Hills",
        states: ["Tripura"],
        countries: ["Bangladesh"],
        mainstem: "Kushiyara",
        confluence: "Adampur"
    }],
    ["Manu", {
        source: "Kahosi Chura",
        states: ["Tripura"],
        countries: ["Bangladesh"],
        mainstem: "Kushiyara"
    }],
    ["Juri", {
        source: "Jampui Hills",
        states: ["Tripura"],
        countries: ["Bangladesh"],
        mainstem: "Kushiyara"
    }],
    ["Feni", {
        source: "South Tripura",
        states: ["Tripura"],
        countries: ["Bangladesh"]
    }],
    ["Digaru", {
        source: "Garo-Khasi hills",
        states: ["Meghalaya", "Assam"],
        mainstem: "Kopili"
    }],
    ["Kopili", {
        source: "Shillong Peak",
        states: ["Meghalaya", "Assam"],
        mainstem: "Brahmaputra"
    }],
    ["Myntdu", {
        source: "Mihmyntdu",
        states: ["Meghalaya"],
        countries: ["Bangladesh"],
        mainstem: "Meghna"
    }],
    ["Simsang", {
        source: "Nokrek Peak",
        states: ["Meghalaya"],
        countries: ["Bangladesh"],
        mainstem: "Meghna"
    }],
    ["Narmada", {
        source: "Amarkantak Plateau",
        states: ["Madhya Pradesh", "Maharastra", "Gujarat"],
        tributaries: ["Hiran", "Barna", "Kolar", "Man", "Uri", "Hatni", "Orsang", "Sher", "Shakkar", "Dudhi", "Tawa", "Ganjal", "Chotta Tawa", "Kundi", "Goi", "Karjan"],
        mouth: "Bharuch"
    }],
    ["Tapi", {
        source: "Multai",
        states: ["Madhya Pradesh", "Maharastra", "Gujarat"],
        mouth: "Hazira Mangrove(Surat)",
        tributaries: ["Vaki", "Gomai", "Arunavati", "Aner", "Nesu", "Amravati", "Buray", "Panjhra", "Bori", "Girna", "Waghur", "Purna", "Mona", "Sipna"]
    }],
    ["Mahi", {
        source: "western Vindhya Range",
        states: ["Madhya Pradesh", "Rajasthan", "Gujarat"],
        mouth: "Gulf of Khambat",
        tributaries: ["Som", "Anas", "Panam", "Bhadar", "Kun", "Goma"]
    }],
    ["Sabarmathi", {
        source: "Tepur",
        states: ["Rajasthan", "Gujarat"],
        mouth: "Gulf of Khambat",
        tributaries: ["Wakal", "Harnva", "Hathmati", "Khari", "Watrak", "Sei", "Siri", "Dhamni"]
    }],
    ["Mahanadi", {
        source: "Sihawa",
        states: ["Chattisgarh", "Odisha"],
        mouth: "Mahanadi Delta",
        tributaries: ["Seonath", "Hasdeo", "Mand", "Ib", "Ong", "Tel", "Jonk"]
    }],
    ["Godavari", {
        source: "Trimbakeshwar",
        states: ["Maharastra", "Telangana", "Chattisgarh", "Andra Pradesh"],
        mouth: "Godavari Delta",
        tributaries: ["Pranhita", "Indravati", "Purna", "Sabari", "Pravara", "Manjira", "Manair"]
    }],
    ["Krishna", {
        source: "Mahabaleshwar",
        states: ["Maharastra", "Karnataka", "Telangana", "Andra Pradesh"],
        mouth: "Diviseema",
        tributaries: ["Ghataprabha", "Malaprabha", "Venna", "Dhudhganga", "Panchganga", "Bhima", "Musi", "Muneru", "Maner", "Peddavagu", "Halia"]
    }],
    ["Cauvery", {
        source: "Talakaveri",
        states: ["Karnataka", "Tamil Nadu"],
        mouth: "Poompuhar",
        tributaries: ["Harangi", "Hemavati", "Shimsha", "Arkavati", "Lakshmana", "Kabini", "Suvarnavati", "Bhavani", "Noyil", "Amaravati"]
    }],
    ["Periyar", {
        source: "Sivagiri Hills",
        states: ["Kerala"],
        mouth: "Kochi",
        tributaries: ["Muthirapuzha", "Mullayar", "Cheruthoni", "Perinjankutti", "Edamalayar"]
    }],
    ["Bharathapuzha", {
        source: "Anamalai Hills",
        states: ["Tamil Nadu", "Kerala"],
        mouth: "Ponnani",
        tributaries: ["Gayathripuzha", "Chitturpuzha", "Kalpathipuzha", "Thoothapuzha"]
    }],
    ["Pamba", {
        source: "Pulachimalai Hills",
        states: ["Kerala"],
        mouth: "Alappuzha",
        tributaries: ["Manimala", "Achankovil", "Azhuthayar", "Kakkiar"]
    }],
    ["Indus", {
        source: "Lake Manasarovar(Tibet)",
        mouth: "Indus Delta(Karachi)",
        countries: ["China", "Pakistan"],
        states: ["Jammu & Kashmir"],
        tributaries: ["Shyok", "Gilgit", "Hunza", "Swat", "Kurram", "Gomal", "Kabul", "Zaskar", "Suru", "Soan", "Jhelum", "Chenab", "Ravi", "Beas", "Sutlej", "Panjnad"]
    }],
    ["Jhelum", {
        source: "Verinag",
        states: ["Jammu & Kashmir"],
        mainstem: "Indus",
        confluence: "Trimmu",
        countries: ["Pakistan"]
    }],
    ["Chenab", {
        source: "Tandi",
        states: ["Himachal Pradesh", "Jammu & Kashmir"],
        countries: ["Pakistan"],
        confluence: "Mithankot",
        mainstem: "Indus",
        tributaries: ["Bhaga", "Chandra"]
    }],
    ["Ravi", {
        source: "Bara Banghal",
        states: ["Himachal Pradesh", "Punjab"],
        countries: ["Pakistan"],
        confluence: "Ahmadpur Sial",
        mainstem: "Indus",
    }],
    ["Beas", {
        source: "Solang valley",
        states: ["Himachal Pradesh", "Punjab"],
        countries: ["Pakistan"],
        confluence: "Kapurthala",
        mainstem: "Indus"
    }],
    ["Sutlej", {
        source: "Lake Rakshastal",
        states: ["Himachal Pradesh", "Punjab"],
        countries: ["China", "Pakistan"],
        confluence: "Mithankot",
        mainstem: "Indus"
    }]
])

export default rivers