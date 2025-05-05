
export const SIDEBAR_STORE_STATUS_CONSTANTS = {
    YOUR_CLOSEST_STORE: "YOUR_CLOSEST_STORE",
    SELECT_A_STORE: "SELECT_A_STORE"
}

export const STORE_HOURS = [
    { day: "Sun", status: "CLOSED" },
    { day: "Mon", status: "11:00 AM to 06:00 PM" },
    { day: "Tue", status: "11:00 AM to 06:00 PM" },
    { day: "Wed", status: "11:00 AM to 06:00 PM" },
    { day: "Thur", status: "11:00 AM to 06:00 PM" },
    { day: "Fri", status: "11:00 AM to 06:00 PM" },
    { day: "Sat", status: "11:00 AM to 06:00 PM" },
]
export const YOUR_CLOSEST_STORE_CONSTANTS = {
    HEADING: 'Your Closest Store',
    STORE_DEFAULT_ADDRESS: {
        name: "Mishwaka",
        timing: "Opens at 8:30 AM",
        distance: "3.5 miles",
        address: "5415 N Main St Mishawaka, IN 46545",
        full_address: {
            "street": "5415 N Main St",
            "city": "Mishawaka",
            "state": "IN",
            "zipcode": "46545",
            "geo": {
                "lat": "",
                "lng": ""
            }
        },
        telephone: "(574) 230-4522"
    },
}

export const SELECT_A_STORE_CONSTANTS = {
    HEADING: 'Select a store',
    All_STORE_ADDRESSES: [
        {
            name: "Mishwaka",
            timing: "Opens at 8:30 AM",
            labName: "My EyeLab",
            distance: "3.5 miles",
            address: "5415 N Main St Mishawaka, IN 46545",
            full_address: {
                "street": "5415 N Main St",
                "city": "Mishawaka",
                "state": "IN",
                "zipcode": "46545",
                "geo": {
                    "lat": "",
                    "lng": ""
                }
            },
            telephone: "(574) 230-4522"
        },
        {
            name: "Fort Wayne",
            timing: "Opens at 8:30 AM",
            labName: "Stanton Optical",
            distance: "3.5 miles",
            address: "409 E Coliseum BlvdFort Wayne, IN 46805",
            full_address: {
                "street": "409 E",
                "city": "Coliseum BlvdFort Wayne",
                "state": "IN",
                "zipcode": "46805",
                "geo": {
                    "lat": "",
                    "lng": ""
                }
            },
            telephone: "(260) 200-3541"
        },
        {
            name: "Kenosha",
            timing: "Opens at 8:30 AM",
            labName: "Stanton Optical",
            distance: "3.5 miles",
            address: "9160 76th St, Suite CPleasant Prairie,WI 53158",
            full_address: {
                "street": "9160 76th St",
                "city": "Suite CPleasant Prairie",
                "state": "WI",
                "zipcode": "53158",
                "geo": {
                    "lat": "",
                    "lng": ""
                }
            },
            telephone: "(262) 724-2398"
        },
    ]

}