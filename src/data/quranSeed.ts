import { SurahData } from '../types/quran';

export const SEED_SURAHS: Record<number, SurahData> = {
  // Surah 1: Al-Fatihah
  1: {
    number: 1,
    name: 'الفَاتِحة',
    englishName: 'Al-Fatihah',
    englishNameTranslation: 'The Opening',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
    bismillahPre: false,
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
        tafsir: 'Tafsir Ibn Kathir: The Basmalah is the opening formula of the Quran. Starting with "In the Name of Allah" seeks the blessing of Allah before undertaking any righteous deed. "Ar-Rahman" (The Entirely Merciful) and "Ar-Rahim" (The Especially Merciful) are two of Allah\'s sublime names denoting infinite grace.'
      },
      {
        number: 2,
        numberInSurah: 2,
        text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translation: '[All] praise is [due] to Allah, Lord of the worlds -',
        transliteration: 'Al-ḥamdu lillāhi Rabbil-\'ālamīn',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
        tafsir: 'Tafsir Ibn Kathir: "Al-Hamd" signifies profound gratitude combined with deep love and veneration. "Rabb" denotes the Creator, Sustainer, Owner, and Ruler. "Al-\'Alameen" refers to all realms of existence—mankind, angels, jinn, and all of creation.'
      },
      {
        number: 3,
        numberInSurah: 3,
        text: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'The Entirely Merciful, the Especially Merciful,',
        transliteration: 'Ar-Raḥmānir-Raḥīm',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
        tafsir: 'Tafsir Al-Jalalayn: Reiterating Allah\'s vast mercy after mentioning His supreme Lordship reassures humanity that divine sovereignty is guided by boundlessly compassionate wisdom.'
      },
      {
        number: 4,
        numberInSurah: 4,
        text: 'مَالِكِ يَوْمِ الدِّينِ',
        translation: 'Sovereign of the Day of Recompense.',
        transliteration: 'Māliki Yawmid-Dīn',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3',
        tafsir: 'Tafsir Ibn Kathir: "Day of Recompense" is the Day of Judgment when all souls will be called to account and justly rewarded or reprimanded. On that Day, no king or tyrant will possess any dominion; all authority belongs exclusively to Allah.'
      },
      {
        number: 5,
        numberInSurah: 5,
        text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translation: 'It is You we worship and You we ask for help.',
        transliteration: 'Iyyāka na\'budu wa iyyāka nasta\'īn',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3',
        tafsir: 'Tafsir Ibn Kathir: The spiritual heart of Surat Al-Fatihah. Worship is dedicated solely to Allah (pure Monotheism - Tawhid), and reliance is placed exclusively on Him, acknowledging that no good can be attained nor hardship removed without His divine assistance.'
      },
      {
        number: 6,
        numberInSurah: 6,
        text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Guide us to the straight path -',
        transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3',
        tafsir: 'Tafsir Al-Qurtubi: The believer asks not merely to be shown the path, but to be kept steadfast upon it throughout life. "The Straight Path" is the clear path of truth, righteous deeds, and divine revelation.'
      },
      {
        number: 7,
        numberInSurah: 7,
        text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        transliteration: 'Ṣirāṭalladhīna an\'amta \'alayhim ghayril-maghḍūbi \'alayhim wa laḍ-ḍāllīn',
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3',
        tafsir: 'Tafsir Ibn Kathir: Those favored are the Prophets, the truthful, the martyrs, and the righteous. It cautions against two perils: knowing the truth yet turning away from it, or acting upon ignorance without divine knowledge.'
      }
    ]
  },

  // Surah 112: Al-Ikhlas
  112: {
    number: 112,
    name: 'الإِخْلَاص',
    englishName: 'Al-Ikhlas',
    englishNameTranslation: 'The Sincerity',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    bismillahPre: true,
    ayahs: [
      {
        number: 6222,
        numberInSurah: 1,
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        translation: 'Say, "He is Allah, [who is] One,',
        transliteration: 'Qul Huwallāhu Aḥad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
        tafsir: 'Tafsir Ibn Kathir: Revealed when the polytheists asked the Prophet (PBUH) to describe the lineage of his Lord. "Ahad" means the Unique One who has no equal, partner, or peer in His essence, attributes, and actions.'
      },
      {
        number: 6223,
        numberInSurah: 2,
        text: 'اللَّهُ الصَّمَدُ',
        translation: 'Allah, the Eternal Refuge.',
        transliteration: 'Allāhuṣ-Ṣamad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3',
        tafsir: 'Tafsir Al-Jalalayn: "As-Samad" means the Self-Sufficient Master upon whom all creation depends for their needs, while He needs nothing from any creation.'
      },
      {
        number: 6224,
        numberInSurah: 3,
        text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        translation: 'He neither begets nor is born,',
        transliteration: 'Lam yalid wa lam yūlad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3',
        tafsir: 'Tafsir Ibn Kathir: He has no offspring, nor did He originate from parents. He has no beginning and no end, transcending all mortal limitations.'
      },
      {
        number: 6225,
        numberInSurah: 4,
        text: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translation: 'Nor is there to Him any equivalent."',
        transliteration: 'Wa lam yakul-lahū kufuwan aḥad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3',
        tafsir: 'Tafsir Ibn Kathir: There is none like unto Him in power, greatness, or mercy. Reciting this Surah is equivalent to one third of the Quran in thematic weight.'
      }
    ]
  },

  // Surah 113: Al-Falaq
  113: {
    number: 113,
    name: 'الفَلَق',
    englishName: 'Al-Falaq',
    englishNameTranslation: 'The Daybreak',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    bismillahPre: true,
    ayahs: [
      {
        number: 6226,
        numberInSurah: 1,
        text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        translation: 'Say, "I seek refuge in the Lord of daybreak',
        transliteration: 'Qul a\'ūdhu birabbil-falaq',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3',
        tafsir: 'Tafsir Ibn Kathir: "Al-Falaq" is the morning light cleaving through the darkness of night. Seeking refuge in the Lord who brings dawn out of night signifies trust in His power to dispel darkness and distress.'
      },
      {
        number: 6227,
        numberInSurah: 2,
        text: 'مِن شَرِّ مَا خَلَقَ',
        translation: 'From the evil of that which He created',
        transliteration: 'Min sharri mā khalaq',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3',
        tafsir: 'Tafsir Al-Jalalayn: Protection from any harm emanating from any created being, visible or hidden.'
      },
      {
        number: 6228,
        numberInSurah: 3,
        text: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        translation: 'And from the evil of darkness when it settles',
        transliteration: 'Wa min sharri ghāsiqin idhā waqab',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3',
        tafsir: 'Tafsir Ibn Kathir: Darkness provides cover for harmful predators, unseen perils, and malevolent spiritual forces.'
      },
      {
        number: 6229,
        numberInSurah: 4,
        text: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        translation: 'And from the evil of the blowers in knots',
        transliteration: 'Wa min sharrin-naffāthāti fil-\'uqad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3',
        tafsir: 'Tafsir Ibn Kathir: Refers to practitioners of sorcery and malevolent enchantments, declaring divine protection supreme over all occult arts.'
      },
      {
        number: 6230,
        numberInSurah: 5,
        text: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'And from the evil of an envier when he envies."',
        transliteration: 'Wa min sharri ḥāsidin idhā ḥasad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3',
        tafsir: 'Tafsir Ibn Kathir: The envier wishes for the blessings of others to be taken away. This verse teaches the believer to seek divine shelter against the toxic effects of jealousy and the evil eye.'
      }
    ]
  },

  // Surah 114: An-Nas
  114: {
    number: 114,
    name: 'النَّاس',
    englishName: 'An-Nas',
    englishNameTranslation: 'Mankind',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    bismillahPre: true,
    ayahs: [
      {
        number: 6231,
        numberInSurah: 1,
        text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        translation: 'Say, "I seek refuge in the Lord of mankind,',
        transliteration: 'Qul a\'ūdhu birabbin-nās',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3',
        tafsir: 'Tafsir Ibn Kathir: An-Nas invokes Allah by three core attributes: Lord (Rabb), Sovereign King (Malik), and True God (Ilah).'
      },
      {
        number: 6232,
        numberInSurah: 2,
        text: 'مَلِكِ النَّاسِ',
        translation: 'The Sovereign of mankind.',
        transliteration: 'Malikin-nās',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3',
        tafsir: 'Tafsir Al-Jalalayn: The King who possesses absolute supreme authority over human affairs.'
      },
      {
        number: 6233,
        numberInSurah: 3,
        text: 'إِلَٰهِ النَّاسِ',
        translation: 'The God of mankind,',
        transliteration: 'Ilāhin-nās',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3',
        tafsir: 'Tafsir Ibn Kathir: The One whom humanity is commanded to worship exclusively with complete devotion.'
      },
      {
        number: 6234,
        numberInSurah: 4,
        text: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        translation: 'From the evil of the retreating whisperer -',
        transliteration: 'Min sharril-waswāsil-khannās',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3',
        tafsir: 'Tafsir Ibn Kathir: Satan whispers temptations when one is heedless of Allah, but retreats (khannas) immediately when Allah is remembered.'
      },
      {
        number: 6235,
        numberInSurah: 5,
        text: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        translation: 'Who whispers [evil] into the breasts of mankind -',
        transliteration: 'Alladhī yuwaswisu fī ṣudūrin-nās',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3',
        tafsir: 'Tafsir Al-Qurtubi: Planting doubts, anxiety, and unrighteous impulses into hearts.'
      },
      {
        number: 6236,
        numberInSurah: 6,
        text: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        translation: 'From among the jinn and mankind."',
        transliteration: 'Minal-jinnati wan-nās',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3',
        tafsir: 'Tafsir Ibn Kathir: Evil influences and corrupters exist both among unseen spirits (jinn) and mortal companions (men).'
      }
    ]
  },

  // Surah 108: Al-Kawthar
  108: {
    number: 108,
    name: 'الكَوْثَر',
    englishName: 'Al-Kawthar',
    englishNameTranslation: 'Abundance',
    numberOfAyahs: 3,
    revelationType: 'Meccan',
    bismillahPre: true,
    ayahs: [
      {
        number: 6205,
        numberInSurah: 1,
        text: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        translation: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.',
        transliteration: 'Innā a\'ṭaynākal-kawthar',
        juz: 30,
        page: 602,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3',
        tafsir: 'Tafsir Ibn Kathir: Al-Kawthar is an abundant fountain in Paradise with water whiter than milk and sweeter than honey, given as an eternal gift to the Prophet.'
      },
      {
        number: 6206,
        numberInSurah: 2,
        text: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        translation: 'So pray to your Lord and sacrifice [to Him alone].',
        transliteration: 'Faṣalli liRabbika wan-ḥar',
        juz: 30,
        page: 602,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6206.mp3',
        tafsir: 'Tafsir Al-Jalalayn: Direct your prayers and sacrifices exclusively for Allah\'s sake, contrary to the polytheists who sacrificed to idols.'
      },
      {
        number: 6207,
        numberInSurah: 3,
        text: 'إِنَّ شَانِئَكَ هُوَ الأَبْتَرُ',
        translation: 'Indeed, your enemy is the one cut off.',
        transliteration: 'Inna shāni\'aka huwal-abtar',
        juz: 30,
        page: 602,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6207.mp3',
        tafsir: 'Tafsir Ibn Kathir: Those who opposed and mocked the Messenger are the ones cut off from remembrance, blessing, and eternal goodness.'
      }
    ]
  },

  // Surah 103: Al-Asr
  103: {
    number: 103,
    name: 'العَصْر',
    englishName: 'Al-\'Asr',
    englishNameTranslation: 'The Declining Day',
    numberOfAyahs: 3,
    revelationType: 'Meccan',
    bismillahPre: true,
    ayahs: [
      {
        number: 6177,
        numberInSurah: 1,
        text: 'وَالْعَصْرِ',
        translation: 'By time,',
        transliteration: 'Wal-\'aṣr',
        juz: 30,
        page: 601,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3',
        tafsir: 'Tafsir Ibn Kathir: Allah swears by Time, which witnesses the entirety of human deeds, victories, and downfalls.'
      },
      {
        number: 6178,
        numberInSurah: 2,
        text: 'إِنَّ الإِنسَانَ لَفِي خُسْرٍ',
        translation: 'Indeed, mankind is in loss,',
        transliteration: 'Innal-insāna lafī khusr',
        juz: 30,
        page: 601,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6178.mp3',
        tafsir: 'Tafsir Al-Tabari: Every mortal is heading towards irrevocable loss and demise as every passing breath diminishes life.'
      },
      {
        number: 6179,
        numberInSurah: 3,
        text: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        translation: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
        transliteration: 'Illalladhīna āmanū wa \'amiluṣ-ṣāliḥāti wa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr',
        juz: 30,
        page: 601,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6179.mp3',
        tafsir: 'Imam Ash-Shafi\'i noted: "If humanity were to reflect upon this single short Surah alone, it would suffice them." It provides the four foundations of salvation: Faith, Good Deeds, Mutual Counsel to Truth, and Mutual Counsel to Perseverance.'
      }
    ]
  }
};
