export interface HadithSectionMeta {
  sectionNumber: number;
  name: string;
  firstHadith: number;
  lastHadith: number;
  totalHadiths: number;
}

export interface HadithCollectionMeta {
  id: 'bukhari' | 'muslim';
  name: string;
  titleEn: string;
  titleAr: string;
  totalHadiths: number;
  sections: HadithSectionMeta[];
}

export const HADITH_COLLECTIONS: Record<'bukhari' | 'muslim', HadithCollectionMeta> = {
  "bukhari": {
    "id": "bukhari",
    "name": "Sahih al Bukhari",
    "titleEn": "Sahih al-Bukhari",
    "titleAr": "صحيح البخاري",
    "totalHadiths": 7563,
    "sections": [
      {
        "sectionNumber": 1,
        "name": "Revelation",
        "firstHadith": 1,
        "lastHadith": 7,
        "totalHadiths": 7
      },
      {
        "sectionNumber": 2,
        "name": "Belief",
        "firstHadith": 8,
        "lastHadith": 58,
        "totalHadiths": 51
      },
      {
        "sectionNumber": 3,
        "name": "Knowledge",
        "firstHadith": 59,
        "lastHadith": 134,
        "totalHadiths": 76
      },
      {
        "sectionNumber": 4,
        "name": "Ablutions (Wudu')",
        "firstHadith": 135,
        "lastHadith": 247,
        "totalHadiths": 113
      },
      {
        "sectionNumber": 5,
        "name": "Bathing (Ghusl)",
        "firstHadith": 248,
        "lastHadith": 293,
        "totalHadiths": 46
      },
      {
        "sectionNumber": 6,
        "name": "Menstrual Periods",
        "firstHadith": 294,
        "lastHadith": 333,
        "totalHadiths": 40
      },
      {
        "sectionNumber": 7,
        "name": "Rubbing hands and feet with dust (Tayammum)",
        "firstHadith": 334,
        "lastHadith": 348,
        "totalHadiths": 15
      },
      {
        "sectionNumber": 8,
        "name": "Prayers (Salat)",
        "firstHadith": 349,
        "lastHadith": 520,
        "totalHadiths": 172
      },
      {
        "sectionNumber": 9,
        "name": "Times of the Prayers",
        "firstHadith": 522,
        "lastHadith": 602,
        "totalHadiths": 81
      },
      {
        "sectionNumber": 10,
        "name": "Call to Prayers (Adhaan)",
        "firstHadith": 603,
        "lastHadith": 875,
        "totalHadiths": 273
      },
      {
        "sectionNumber": 11,
        "name": "Friday Prayer",
        "firstHadith": 876,
        "lastHadith": 941,
        "totalHadiths": 66
      },
      {
        "sectionNumber": 12,
        "name": "Fear Prayer",
        "firstHadith": 942,
        "lastHadith": 947,
        "totalHadiths": 6
      },
      {
        "sectionNumber": 13,
        "name": "The Two Festivals (Eids)",
        "firstHadith": 948,
        "lastHadith": 989,
        "totalHadiths": 42
      },
      {
        "sectionNumber": 14,
        "name": "Witr Prayer",
        "firstHadith": 990,
        "lastHadith": 1004,
        "totalHadiths": 15
      },
      {
        "sectionNumber": 15,
        "name": "Invoking Allah for Rain (Istisqaa)",
        "firstHadith": 1005,
        "lastHadith": 1039,
        "totalHadiths": 35
      },
      {
        "sectionNumber": 16,
        "name": "Eclipses",
        "firstHadith": 1040,
        "lastHadith": 1066,
        "totalHadiths": 27
      },
      {
        "sectionNumber": 17,
        "name": "Prostration During Recital of Qur'an",
        "firstHadith": 1067,
        "lastHadith": 1079,
        "totalHadiths": 13
      },
      {
        "sectionNumber": 18,
        "name": "Shortening the Prayers (At-Taqseer)",
        "firstHadith": 1080,
        "lastHadith": 1119,
        "totalHadiths": 40
      },
      {
        "sectionNumber": 19,
        "name": "Prayer at Night (Tahajjud)",
        "firstHadith": 1120,
        "lastHadith": 1187,
        "totalHadiths": 68
      },
      {
        "sectionNumber": 20,
        "name": "Virtues of Prayer at Masjid Makkah and Madinah",
        "firstHadith": 1188,
        "lastHadith": 1197,
        "totalHadiths": 10
      },
      {
        "sectionNumber": 21,
        "name": "Actions while Praying",
        "firstHadith": 1198,
        "lastHadith": 1223,
        "totalHadiths": 26
      },
      {
        "sectionNumber": 22,
        "name": "Forgetfulness in Prayer",
        "firstHadith": 1224,
        "lastHadith": 1236,
        "totalHadiths": 13
      },
      {
        "sectionNumber": 23,
        "name": "Funerals (Al-Janaa'iz)",
        "firstHadith": 1237,
        "lastHadith": 1394,
        "totalHadiths": 158
      },
      {
        "sectionNumber": 24,
        "name": "Obligatory Charity Tax (Zakat)",
        "firstHadith": 1395,
        "lastHadith": 1512,
        "totalHadiths": 118
      },
      {
        "sectionNumber": 25,
        "name": "Hajj (Pilgrimage)",
        "firstHadith": 1513,
        "lastHadith": 1772,
        "totalHadiths": 260
      },
      {
        "sectionNumber": 26,
        "name": "`Umrah (Minor pilgrimage)",
        "firstHadith": 1773,
        "lastHadith": 1805,
        "totalHadiths": 33
      },
      {
        "sectionNumber": 27,
        "name": "Pilgrims Prevented from Completing the Pilgrimage",
        "firstHadith": 1806,
        "lastHadith": 1820,
        "totalHadiths": 15
      },
      {
        "sectionNumber": 28,
        "name": "Penalty of Hunting while on Pilgrimage",
        "firstHadith": 1821,
        "lastHadith": 1866,
        "totalHadiths": 46
      },
      {
        "sectionNumber": 29,
        "name": "Virtues of Madinah",
        "firstHadith": 1867,
        "lastHadith": 1890,
        "totalHadiths": 24
      },
      {
        "sectionNumber": 30,
        "name": "Fasting",
        "firstHadith": 1891,
        "lastHadith": 2007,
        "totalHadiths": 117
      },
      {
        "sectionNumber": 31,
        "name": "Praying at Night in Ramadaan (Taraweeh)",
        "firstHadith": 2008,
        "lastHadith": 2013,
        "totalHadiths": 6
      },
      {
        "sectionNumber": 32,
        "name": "Virtues of the Night of Qadr",
        "firstHadith": 2014,
        "lastHadith": 2024,
        "totalHadiths": 11
      },
      {
        "sectionNumber": 33,
        "name": "Retiring to a Mosque for Remembrance of Allah (I'tikaf)",
        "firstHadith": 2025,
        "lastHadith": 2046,
        "totalHadiths": 22
      },
      {
        "sectionNumber": 34,
        "name": "Sales and Trade",
        "firstHadith": 2047,
        "lastHadith": 2238,
        "totalHadiths": 192
      },
      {
        "sectionNumber": 35,
        "name": "Sales in which a Price is paid for Goods to be Delivered Later (As-Salam)",
        "firstHadith": 2239,
        "lastHadith": 2256,
        "totalHadiths": 18
      },
      {
        "sectionNumber": 36,
        "name": "Shuf'a",
        "firstHadith": 2257,
        "lastHadith": 2259,
        "totalHadiths": 3
      },
      {
        "sectionNumber": 37,
        "name": "Hiring",
        "firstHadith": 2260,
        "lastHadith": 2286,
        "totalHadiths": 27
      },
      {
        "sectionNumber": 38,
        "name": "Transferance of a Debt from One Person to Another (Al-Hawaala)",
        "firstHadith": 2287,
        "lastHadith": 2289,
        "totalHadiths": 3
      },
      {
        "sectionNumber": 39,
        "name": "Kafalah",
        "firstHadith": 2290,
        "lastHadith": 2298,
        "totalHadiths": 9
      },
      {
        "sectionNumber": 40,
        "name": "Representation, Authorization, Business by Proxy",
        "firstHadith": 2299,
        "lastHadith": 2319,
        "totalHadiths": 21
      },
      {
        "sectionNumber": 41,
        "name": "Agriculture",
        "firstHadith": 2320,
        "lastHadith": 2350,
        "totalHadiths": 31
      },
      {
        "sectionNumber": 42,
        "name": "Distribution of Water",
        "firstHadith": 2351,
        "lastHadith": 2383,
        "totalHadiths": 33
      },
      {
        "sectionNumber": 43,
        "name": "Loans, Payment of Loans, Freezing of Property, Bankruptcy",
        "firstHadith": 2385,
        "lastHadith": 2409,
        "totalHadiths": 25
      },
      {
        "sectionNumber": 44,
        "name": "Khusoomaat",
        "firstHadith": 2410,
        "lastHadith": 2425,
        "totalHadiths": 16
      },
      {
        "sectionNumber": 45,
        "name": "Lost Things Picked up by Someone (Luqatah)",
        "firstHadith": 2426,
        "lastHadith": 2439,
        "totalHadiths": 14
      },
      {
        "sectionNumber": 46,
        "name": "Oppressions",
        "firstHadith": 2440,
        "lastHadith": 2482,
        "totalHadiths": 43
      },
      {
        "sectionNumber": 47,
        "name": "Partnership",
        "firstHadith": 2483,
        "lastHadith": 2507,
        "totalHadiths": 25
      },
      {
        "sectionNumber": 48,
        "name": "Mortgaging",
        "firstHadith": 2508,
        "lastHadith": 2515,
        "totalHadiths": 8
      },
      {
        "sectionNumber": 49,
        "name": "Manumission of Slaves",
        "firstHadith": 2517,
        "lastHadith": 2559,
        "totalHadiths": 43
      },
      {
        "sectionNumber": 50,
        "name": "Makaatib",
        "firstHadith": 2560,
        "lastHadith": 2565,
        "totalHadiths": 6
      },
      {
        "sectionNumber": 51,
        "name": "Gifts",
        "firstHadith": 2566,
        "lastHadith": 2636,
        "totalHadiths": 71
      },
      {
        "sectionNumber": 52,
        "name": "Witnesses",
        "firstHadith": 2637,
        "lastHadith": 2689,
        "totalHadiths": 53
      },
      {
        "sectionNumber": 53,
        "name": "Peacemaking",
        "firstHadith": 2690,
        "lastHadith": 2710,
        "totalHadiths": 21
      },
      {
        "sectionNumber": 54,
        "name": "Conditions",
        "firstHadith": 2712,
        "lastHadith": 2737,
        "totalHadiths": 26
      },
      {
        "sectionNumber": 55,
        "name": "Wills and Testaments (Wasaayaa)",
        "firstHadith": 2738,
        "lastHadith": 2781,
        "totalHadiths": 44
      },
      {
        "sectionNumber": 56,
        "name": "Fighting for the Cause of Allah (Jihaad)",
        "firstHadith": 2782,
        "lastHadith": 3090,
        "totalHadiths": 309
      },
      {
        "sectionNumber": 57,
        "name": "One-fifth of Booty to the Cause of Allah (Khumus)",
        "firstHadith": 3091,
        "lastHadith": 3155,
        "totalHadiths": 65
      },
      {
        "sectionNumber": 58,
        "name": "Jizyah and Mawaada'ah",
        "firstHadith": 3157,
        "lastHadith": 3189,
        "totalHadiths": 33
      },
      {
        "sectionNumber": 59,
        "name": "Beginning of Creation",
        "firstHadith": 3190,
        "lastHadith": 3325,
        "totalHadiths": 136
      },
      {
        "sectionNumber": 60,
        "name": "Prophets",
        "firstHadith": 3326,
        "lastHadith": 3488,
        "totalHadiths": 163
      },
      {
        "sectionNumber": 61,
        "name": "Virtues and Merits of the Prophet (pbuh) and his Companions",
        "firstHadith": 3489,
        "lastHadith": 3648,
        "totalHadiths": 160
      },
      {
        "sectionNumber": 62,
        "name": "Companions of the Prophet",
        "firstHadith": 3649,
        "lastHadith": 3775,
        "totalHadiths": 127
      },
      {
        "sectionNumber": 63,
        "name": "Merits of the Helpers in Madinah (Ansaar)",
        "firstHadith": 3776,
        "lastHadith": 3948,
        "totalHadiths": 173
      },
      {
        "sectionNumber": 64,
        "name": "Military Expeditions led by the Prophet (pbuh) (Al-Maghaazi)",
        "firstHadith": 3949,
        "lastHadith": 4473,
        "totalHadiths": 525
      },
      {
        "sectionNumber": 65,
        "name": "Prophetic Commentary on the Qur'an (Tafseer of the Prophet (pbuh))",
        "firstHadith": 4474,
        "lastHadith": 4977,
        "totalHadiths": 504
      },
      {
        "sectionNumber": 66,
        "name": "Virtues of the Qur'an",
        "firstHadith": 4979,
        "lastHadith": 5062,
        "totalHadiths": 84
      },
      {
        "sectionNumber": 67,
        "name": "Wedlock, Marriage (Nikaah)",
        "firstHadith": 5063,
        "lastHadith": 5250,
        "totalHadiths": 188
      },
      {
        "sectionNumber": 68,
        "name": "Divorce",
        "firstHadith": 5251,
        "lastHadith": 5350,
        "totalHadiths": 100
      },
      {
        "sectionNumber": 69,
        "name": "Supporting the Family",
        "firstHadith": 5351,
        "lastHadith": 5372,
        "totalHadiths": 22
      },
      {
        "sectionNumber": 70,
        "name": "Food, Meals",
        "firstHadith": 5373,
        "lastHadith": 5466,
        "totalHadiths": 94
      },
      {
        "sectionNumber": 71,
        "name": "Sacrifice on Occasion of Birth (`Aqiqa)",
        "firstHadith": 5467,
        "lastHadith": 5474,
        "totalHadiths": 8
      },
      {
        "sectionNumber": 72,
        "name": "Hunting, Slaughtering",
        "firstHadith": 5475,
        "lastHadith": 5544,
        "totalHadiths": 70
      },
      {
        "sectionNumber": 73,
        "name": "Al-Adha Festival Sacrifice (Adaahi)",
        "firstHadith": 5545,
        "lastHadith": 5574,
        "totalHadiths": 30
      },
      {
        "sectionNumber": 74,
        "name": "Drinks",
        "firstHadith": 5575,
        "lastHadith": 5639,
        "totalHadiths": 65
      },
      {
        "sectionNumber": 75,
        "name": "Patients",
        "firstHadith": 5640,
        "lastHadith": 5677,
        "totalHadiths": 38
      },
      {
        "sectionNumber": 76,
        "name": "Medicine",
        "firstHadith": 5678,
        "lastHadith": 5782,
        "totalHadiths": 105
      },
      {
        "sectionNumber": 77,
        "name": "Dress",
        "firstHadith": 5783,
        "lastHadith": 5969,
        "totalHadiths": 187
      },
      {
        "sectionNumber": 78,
        "name": "Good Manners and Form (Al-Adab)",
        "firstHadith": 5970,
        "lastHadith": 6226,
        "totalHadiths": 257
      },
      {
        "sectionNumber": 79,
        "name": "Asking Permission",
        "firstHadith": 6227,
        "lastHadith": 6303,
        "totalHadiths": 77
      },
      {
        "sectionNumber": 80,
        "name": "Invocations",
        "firstHadith": 6304,
        "lastHadith": 6411,
        "totalHadiths": 108
      },
      {
        "sectionNumber": 81,
        "name": "To make the Heart Tender (Ar-Riqaq)",
        "firstHadith": 6412,
        "lastHadith": 6593,
        "totalHadiths": 182
      },
      {
        "sectionNumber": 82,
        "name": "Divine Will (Al-Qadar)",
        "firstHadith": 6594,
        "lastHadith": 6620,
        "totalHadiths": 27
      },
      {
        "sectionNumber": 83,
        "name": "Oaths and Vows",
        "firstHadith": 6621,
        "lastHadith": 6707,
        "totalHadiths": 87
      },
      {
        "sectionNumber": 84,
        "name": "Expiation for Unfulfilled Oaths",
        "firstHadith": 6708,
        "lastHadith": 6722,
        "totalHadiths": 15
      },
      {
        "sectionNumber": 85,
        "name": "Laws of Inheritance (Al-Faraa'id)",
        "firstHadith": 6723,
        "lastHadith": 6771,
        "totalHadiths": 49
      },
      {
        "sectionNumber": 86,
        "name": "Limits and Punishments set by Allah (Hudood)",
        "firstHadith": 6772,
        "lastHadith": 6860,
        "totalHadiths": 89
      },
      {
        "sectionNumber": 87,
        "name": "Blood Money (Ad-Diyat)",
        "firstHadith": 6861,
        "lastHadith": 6917,
        "totalHadiths": 57
      },
      {
        "sectionNumber": 88,
        "name": "Apostates",
        "firstHadith": 6918,
        "lastHadith": 6939,
        "totalHadiths": 22
      },
      {
        "sectionNumber": 89,
        "name": "(Statements made under) Coercion",
        "firstHadith": 6940,
        "lastHadith": 6952,
        "totalHadiths": 13
      },
      {
        "sectionNumber": 90,
        "name": "Tricks",
        "firstHadith": 6953,
        "lastHadith": 6981,
        "totalHadiths": 29
      },
      {
        "sectionNumber": 91,
        "name": "Interpretation of Dreams",
        "firstHadith": 6982,
        "lastHadith": 7047,
        "totalHadiths": 66
      },
      {
        "sectionNumber": 92,
        "name": "Afflictions and the End of the World",
        "firstHadith": 7048,
        "lastHadith": 7136,
        "totalHadiths": 89
      },
      {
        "sectionNumber": 93,
        "name": "Judgments (Ahkaam)",
        "firstHadith": 7137,
        "lastHadith": 7225,
        "totalHadiths": 89
      },
      {
        "sectionNumber": 94,
        "name": "Wishes",
        "firstHadith": 7226,
        "lastHadith": 7245,
        "totalHadiths": 20
      },
      {
        "sectionNumber": 95,
        "name": "Accepting Information Given by a Truthful Person",
        "firstHadith": 7246,
        "lastHadith": 7267,
        "totalHadiths": 22
      },
      {
        "sectionNumber": 96,
        "name": "Holding Fast to the Qur'an and Sunnah",
        "firstHadith": 7268,
        "lastHadith": 7370,
        "totalHadiths": 103
      },
      {
        "sectionNumber": 97,
        "name": "Oneness, Uniqueness of Allah (Tawheed)",
        "firstHadith": 7371,
        "lastHadith": 7563,
        "totalHadiths": 193
      }
    ]
  },
  "muslim": {
    "id": "muslim",
    "name": "Sahih Muslim",
    "titleEn": "Sahih Muslim",
    "titleAr": "صحيح مسلم",
    "totalHadiths": 7563,
    "sections": [
      {
        "sectionNumber": 0,
        "name": "Introduction",
        "firstHadith": 1,
        "lastHadith": 92,
        "totalHadiths": 92
      },
      {
        "sectionNumber": 1,
        "name": "The Book of Faith",
        "firstHadith": 93,
        "lastHadith": 533,
        "totalHadiths": 441
      },
      {
        "sectionNumber": 2,
        "name": "The Book of Purification",
        "firstHadith": 534,
        "lastHadith": 678,
        "totalHadiths": 145
      },
      {
        "sectionNumber": 3,
        "name": "The Book of Menstruation",
        "firstHadith": 679,
        "lastHadith": 836,
        "totalHadiths": 158
      },
      {
        "sectionNumber": 4,
        "name": "The Book of Prayers",
        "firstHadith": 837,
        "lastHadith": 1160,
        "totalHadiths": 324
      },
      {
        "sectionNumber": 5,
        "name": "The Book of Mosques and Places of Prayer",
        "firstHadith": 1161,
        "lastHadith": 1569,
        "totalHadiths": 409
      },
      {
        "sectionNumber": 6,
        "name": "The Book of Prayer - Travellers",
        "firstHadith": 1570,
        "lastHadith": 1950,
        "totalHadiths": 381
      },
      {
        "sectionNumber": 7,
        "name": "The Book of Prayer - Friday",
        "firstHadith": 1951,
        "lastHadith": 2043,
        "totalHadiths": 93
      },
      {
        "sectionNumber": 8,
        "name": "The Book of Prayer - Two Eids",
        "firstHadith": 2044,
        "lastHadith": 2069,
        "totalHadiths": 26
      },
      {
        "sectionNumber": 9,
        "name": "The Book of Prayer - Rain",
        "firstHadith": 2070,
        "lastHadith": 2088,
        "totalHadiths": 19
      },
      {
        "sectionNumber": 10,
        "name": "The Book of Prayer - Eclipses",
        "firstHadith": 2089,
        "lastHadith": 2122,
        "totalHadiths": 34
      },
      {
        "sectionNumber": 11,
        "name": "The Book of Prayer - Funerals",
        "firstHadith": 2123,
        "lastHadith": 2262,
        "totalHadiths": 140
      },
      {
        "sectionNumber": 12,
        "name": "The Book of Zakat",
        "firstHadith": 2263,
        "lastHadith": 2494,
        "totalHadiths": 232
      },
      {
        "sectionNumber": 13,
        "name": "The Book of Fasting",
        "firstHadith": 2495,
        "lastHadith": 2779,
        "totalHadiths": 285
      },
      {
        "sectionNumber": 14,
        "name": "The Book of I'tikaf",
        "firstHadith": 2780,
        "lastHadith": 2790,
        "totalHadiths": 11
      },
      {
        "sectionNumber": 15,
        "name": "The Book of Pilgrimage",
        "firstHadith": 2791,
        "lastHadith": 3397,
        "totalHadiths": 607
      },
      {
        "sectionNumber": 16,
        "name": "The Book of Marriage",
        "firstHadith": 388,
        "lastHadith": 3567,
        "totalHadiths": 3180
      },
      {
        "sectionNumber": 17,
        "name": "The Book of Suckling",
        "firstHadith": 3568,
        "lastHadith": 3651,
        "totalHadiths": 84
      },
      {
        "sectionNumber": 18,
        "name": "The Book of Divorce",
        "firstHadith": 3652,
        "lastHadith": 3742,
        "totalHadiths": 91
      },
      {
        "sectionNumber": 19,
        "name": "The Book of Invoking Curses",
        "firstHadith": 3743,
        "lastHadith": 3769,
        "totalHadiths": 27
      },
      {
        "sectionNumber": 20,
        "name": "The Book of Emancipating Slaves",
        "firstHadith": 3770,
        "lastHadith": 3800,
        "totalHadiths": 31
      },
      {
        "sectionNumber": 21,
        "name": "The Book of Transactions",
        "firstHadith": 3801,
        "lastHadith": 3961,
        "totalHadiths": 161
      },
      {
        "sectionNumber": 22,
        "name": "The Book of Musaqah",
        "firstHadith": 3962,
        "lastHadith": 4139,
        "totalHadiths": 178
      },
      {
        "sectionNumber": 23,
        "name": "The Book of the Rules of Inheritance",
        "firstHadith": 4140,
        "lastHadith": 4162,
        "totalHadiths": 23
      },
      {
        "sectionNumber": 24,
        "name": "The Book of Gifts",
        "firstHadith": 4163,
        "lastHadith": 4203,
        "totalHadiths": 41
      },
      {
        "sectionNumber": 25,
        "name": "The Book of Wills",
        "firstHadith": 4204,
        "lastHadith": 4234,
        "totalHadiths": 31
      },
      {
        "sectionNumber": 26,
        "name": "The Book of Vows",
        "firstHadith": 4235,
        "lastHadith": 4253,
        "totalHadiths": 19
      },
      {
        "sectionNumber": 27,
        "name": "The Book of Oaths",
        "firstHadith": 4254,
        "lastHadith": 4341,
        "totalHadiths": 88
      },
      {
        "sectionNumber": 28,
        "name": "The Book of Oaths, Muharibin, Qasas (Retaliation), and Diyat (Blood Money)",
        "firstHadith": 4342,
        "lastHadith": 4397,
        "totalHadiths": 56
      },
      {
        "sectionNumber": 29,
        "name": "The Book of Legal Punishments",
        "firstHadith": 4398,
        "lastHadith": 4469,
        "totalHadiths": 72
      },
      {
        "sectionNumber": 30,
        "name": "The Book of Judicial Decisions",
        "firstHadith": 4470,
        "lastHadith": 4497,
        "totalHadiths": 28
      },
      {
        "sectionNumber": 31,
        "name": "The Book of Lost Property",
        "firstHadith": 4498,
        "lastHadith": 4518,
        "totalHadiths": 21
      },
      {
        "sectionNumber": 32,
        "name": "The Book of Jihad and Expeditions",
        "firstHadith": 4519,
        "lastHadith": 4700,
        "totalHadiths": 182
      },
      {
        "sectionNumber": 33,
        "name": "The Book on Government",
        "firstHadith": 4701,
        "lastHadith": 4967,
        "totalHadiths": 267
      },
      {
        "sectionNumber": 34,
        "name": "The Book of Hunting, Slaughter, and what may be Eaten",
        "firstHadith": 4972,
        "lastHadith": 5063,
        "totalHadiths": 92
      },
      {
        "sectionNumber": 35,
        "name": "The Book of Sacrifices",
        "firstHadith": 5064,
        "lastHadith": 5126,
        "totalHadiths": 63
      },
      {
        "sectionNumber": 36,
        "name": "The Book of Drinks",
        "firstHadith": 5114,
        "lastHadith": 5383,
        "totalHadiths": 270
      },
      {
        "sectionNumber": 37,
        "name": "The Book of Clothes and Adornment",
        "firstHadith": 5385,
        "lastHadith": 5585,
        "totalHadiths": 201
      },
      {
        "sectionNumber": 38,
        "name": "The Book of Manners and Etiquette",
        "firstHadith": 5586,
        "lastHadith": 5645,
        "totalHadiths": 60
      },
      {
        "sectionNumber": 39,
        "name": "The Book of Greetings",
        "firstHadith": 5646,
        "lastHadith": 5861,
        "totalHadiths": 216
      },
      {
        "sectionNumber": 40,
        "name": "The Book Concerning the Use of Correct Words",
        "firstHadith": 5862,
        "lastHadith": 5884,
        "totalHadiths": 23
      },
      {
        "sectionNumber": 41,
        "name": "The Book of Poetry",
        "firstHadith": 5887,
        "lastHadith": 5896,
        "totalHadiths": 10
      },
      {
        "sectionNumber": 42,
        "name": "The Book of Dreams",
        "firstHadith": 5897,
        "lastHadith": 5937,
        "totalHadiths": 41
      },
      {
        "sectionNumber": 43,
        "name": "The Book of Virtues",
        "firstHadith": 384,
        "lastHadith": 6168,
        "totalHadiths": 5785
      },
      {
        "sectionNumber": 44,
        "name": "The Book of the Merits of the Companions",
        "firstHadith": 6169,
        "lastHadith": 6499,
        "totalHadiths": 331
      },
      {
        "sectionNumber": 45,
        "name": "The Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship",
        "firstHadith": 6500,
        "lastHadith": 6722,
        "totalHadiths": 223
      },
      {
        "sectionNumber": 46,
        "name": "The Book of Destiny",
        "firstHadith": 6723,
        "lastHadith": 6774,
        "totalHadiths": 52
      },
      {
        "sectionNumber": 47,
        "name": "The Book of Knowledge",
        "firstHadith": 6775,
        "lastHadith": 6804,
        "totalHadiths": 30
      },
      {
        "sectionNumber": 48,
        "name": "The Book Pertaining to the Remembrance of Allah, Supplication, Repentance and Seeking Forgiveness",
        "firstHadith": 6805,
        "lastHadith": 6936,
        "totalHadiths": 132
      },
      {
        "sectionNumber": 49,
        "name": "The Book of Heart-Melting Traditions",
        "firstHadith": 6937,
        "lastHadith": 6951,
        "totalHadiths": 15
      },
      {
        "sectionNumber": 50,
        "name": "The Book of Repentance",
        "firstHadith": 6952,
        "lastHadith": 7023,
        "totalHadiths": 72
      },
      {
        "sectionNumber": 51,
        "name": "Characteristics of The Hypocrites And Rulings Concerning Them",
        "firstHadith": 7024,
        "lastHadith": 7044,
        "totalHadiths": 21
      },
      {
        "sectionNumber": 52,
        "name": "Characteristics of the Day of Judgment, Paradise, and Hell",
        "firstHadith": 7045,
        "lastHadith": 7129,
        "totalHadiths": 85
      },
      {
        "sectionNumber": 53,
        "name": "The Book of Paradise, its Description, its Bounties and its Inhabitants",
        "firstHadith": 7130,
        "lastHadith": 7234,
        "totalHadiths": 105
      },
      {
        "sectionNumber": 54,
        "name": "The Book of Tribulations and Portents of the Last Hour",
        "firstHadith": 7235,
        "lastHadith": 7416,
        "totalHadiths": 182
      },
      {
        "sectionNumber": 55,
        "name": "The Book of Zuhd and Softening of Hearts",
        "firstHadith": 7417,
        "lastHadith": 7522,
        "totalHadiths": 106
      },
      {
        "sectionNumber": 56,
        "name": "The Book of Commentary on the Qur'an",
        "firstHadith": 7523,
        "lastHadith": 7563,
        "totalHadiths": 41
      }
    ]
  }
};
