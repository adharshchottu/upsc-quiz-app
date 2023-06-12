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


export type StateObject = {
    states?: AllowedStates[];
    countries?: AllowedCountries[];
    ut?: AllowedUts[];
    sea?: AllowedSeas[];
}

const statesMap: Map<AllowedStates, StateObject> = new Map([
    ["Kerala",
        {
            states: ["Karnataka", "Tamil Nadu"],
            sea: ["Arabian Sea"],
            ut: ["Puducherry"]
        }
    ],
    ["Tamil Nadu",
        {
            states: ["Kerala", "Karnataka", "Andra Pradesh"],
            sea: ["Bay of Bengal", "Arabian Sea", "Indian Ocean"],
            ut: ["Puducherry"]
        }
    ],
    ["Karnataka",
        {
            states: ["Kerala", "Tamil Nadu", "Goa", "Telangana", "Andra Pradesh", "Maharastra"],
            sea: ["Arabian Sea"]
        }
    ],
    ["Goa",

        {
            states: ["Maharastra", "Karnataka"],
            sea: ["Arabian Sea"]
        }
    ],
    ["Andra Pradesh",

        {
            states: ["Tamil Nadu", "Karnataka", "Telangana", "Chattisgarh", "Odisha"],
            sea: ["Bay of Bengal"],
            ut: ["Puducherry"]
        }
    ],
    ["Telangana",

        {
            states: ["Karnataka", "Maharastra", "Chattisgarh", "Andra Pradesh"],
        }
    ],
    ["Maharastra",

        {
            states: ["Goa", "Karnataka", "Telangana", "Chattisgarh", "Madhya Pradesh", "Gujarat"],
            sea: ["Arabian Sea"],
            ut: ["Dadra and Nagar Haveli and Daman & Diu"]
        }
    ],
    ["Chattisgarh",

        {
            states: ["Telangana", "Maharastra", "Madhya Pradesh", "Uttar Pradesh", "Jharkhand", "Odisha", "Andra Pradesh"],
        }
    ],
    ["Odisha",

        {
            states: ["Chattisgarh", "Jharkhand", "West Bengal", "Andra Pradesh"],
            sea: ["Bay of Bengal"]
        }
    ],
    ["Gujarat",

        {
            states: ["Maharastra", "Madhya Pradesh", "Rajasthan"],
            sea: ["Arabian Sea"],
            countries: ["Pakistan"],
            ut: ["Dadra and Nagar Haveli and Daman & Diu"]
        }
    ],
    ["Madhya Pradesh",

        {
            states: ["Maharastra", "Gujarat", "Rajasthan", "Uttar Pradesh", "Chattisgarh"],
        }
    ],
    ["West Bengal",

        {
            states: ["Odisha", "Jharkhand", "Bihar", "Sikkim", "Assam"],
            sea: ["Bay of Bengal"],
            countries: ["Nepal", "Bhutan", "Bangladesh"]
        }
    ],
    ["Jharkhand",

        {
            states: ["Odisha", "Bihar", "West Bengal", "Uttar Pradesh", "Chattisgarh"],
        }
    ],
    ["Mizoram",

        {
            states: ["Assam", "Tripura", "Manipur"],
            countries: ["Bangladesh", "Myanmar"]
        }
    ],
    ["Tripura",

        {
            states: ["Assam", "Mizoram"],
            countries: ["Bangladesh"]
        }
    ],
    ["Rajasthan",

        {
            states: ["Gujarat", "Madhya Pradesh", "Uttar Pradesh", "Haryana", "Punjab"],
            countries: ["Pakistan"]
        }
    ],
    ["Manipur",

        {
            states: ["Mizoram", "Assam", "Nagaland"],
            countries: ["Myanmar"]
        }
    ],
    ["Uttar Pradesh",

        {
            states: ["Bihar", "Jharkhand", "Chattisgarh", "Madhya Pradesh", "Rajasthan", "Haryana", "Uttarkhand", "Himachal Pradesh"],
            countries: ["Nepal"],
            ut: ["NCR"]
        }
    ],
    ["Assam",

        {
            states: ["West Bengal", "Meghalaya", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura"],
            countries: ["Bangladesh", "Bhutan"]
        }
    ],
    ["Bihar",

        {
            states: ["West Bengal", "Jharkhand", "Uttar Pradesh"],
            countries: ["Nepal"]
        }
    ],
    ["Meghalaya",

        {
            states: ["Assam"],
            countries: ["Bangladesh"]
        }
    ],
    ["Nagaland",

        {
            states: ["Arunachal Pradesh", "Assam", "Manipur"],
            countries: ["Myanmar"]
        }
    ],
    ["Arunachal Pradesh",

        {
            states: ["Assam", "Nagaland"],
            countries: ["Myanmar", "China", "Bhutan"]
        }
    ],
    ["Sikkim",

        {
            states: ["West Bengal"],
            countries: ["Nepal", "China", "Bhutan"]
        }
    ],
    ["Haryana",

        {
            states: ["Uttar Pradesh", "Uttarkhand", "Himachal Pradesh", "Punjab", "Rajasthan"],
            ut: ["Chandigarh", "NCR"]
        }
    ],
    ["Punjab",

        {
            states: ["Haryana", "Rajasthan", "Himachal Pradesh"],
            ut: ["Chandigarh", "Jammu & Kashmir"],
            countries: ["Pakistan"]
        }
    ],
    ["Uttarkhand",

        {
            states: ["Haryana", "Himachal Pradesh", "Uttar Pradesh"],
            countries: ["China", "Nepal"]
        }
    ],
    ["Himachal Pradesh",

        {
            states: ["Haryana", "Uttarkhand", "Uttar Pradesh", "Punjab"],
            ut: ["Ladakh"],
            countries: ["China"]
        }
    ]
])

const utsMap: Map<AllowedUts, StateObject> = new Map([
    ["Andaman and Nicobar", {
        sea: ["Bay of Bengal"]
    }],
    ["Dadra and Nagar Haveli and Daman & Diu", {
        sea: ["Arabian Sea"],
        states: ["Gujarat", "Maharastra"]
    }],
    ["Jammu & Kashmir", {
        countries: ["Pakistan"],
        states: ["Punjab", "Himachal Pradesh"]
    }],
    ["Ladakh", {
        countries: ["Pakistan", "Afghanistan", "China"],
        states: ["Himachal Pradesh"]
    }],
    ["Puducherry", {
        states: ["Kerala", "Tamil Nadu", "Andra Pradesh"],
        sea: ["Arabian Sea", "Bay of Bengal"]
    }],
    ["Lakshadweep", {
        sea: ["Arabian Sea"]
    }],
    ["NCR", {
        states: ["Uttar Pradesh", "Haryana"]
    }],
    ["Chandigarh", {
        states: ["Punjab", "Haryana"]
    }]
])

const countriesMap: Map<AllowedCountries, StateObject> = new Map([
    ["Pakistan", {
        sea: ["Arabian Sea"],
        states: ["Gujarat", "Rajasthan", "Punjab"],
        ut: ["Jammu & Kashmir", "Ladakh"]
    }],
    ["China", {
        states: ["Himachal Pradesh", "Uttarkhand", "Sikkim", "Arunachal Pradesh"],
        ut: ["Ladakh"]
    }],
    ["Nepal", {
        states: ["Uttarkhand", "Sikkim", "Uttar Pradesh", "Bihar", "West Bengal"]
    }],
    ["Bhutan", {
        states: ["Sikkim", "West Bengal", "Assam", "Arunachal Pradesh"]
    }],
    ["Bangladesh", {
        states: ["West Bengal", "Assam", "Meghalaya", "Tripura", "Mizoram"],
        sea: ["Bay of Bengal"]
    }],
    ["Myanmar", {
        states: ["Mizoram", "Manipur", "Nagaland", "Arunachal Pradesh"],
        sea: ["Bay of Bengal"]
    }]
])

const combinedMap: Map<AllowedCountries | AllowedStates | AllowedUts, StateObject> = new Map([...statesMap, ...countriesMap, ...utsMap])

export default combinedMap