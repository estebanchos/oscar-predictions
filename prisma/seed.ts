import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type NomineeImageMap = {
  [key: string]: string;
};

const nomineeImageMap: NomineeImageMap = {
  // Films
  "Anora": "https://m.media-amazon.com/images/I/61j3bu9I2HL._AC_UF894,1000_QL80_.jpg",
  "The Brutalist": "https://images.squarespace-cdn.com/content/v1/63bb3e8a824d7e2f7eedf0d3/1729559725932-JVNTP5CLW1FKJYTP78GW/The%2BBrutalist%2B3.jpg?format=750w",
  "A Complete Unknown": "https://lumiere-a.akamaihd.net/v1/images/au_movies_20cs_acompleteunknown_payoff_m_ce1913b4.jpeg",
  "Conclave": "https://www.mauvais-genres.com/47731-large_default/conclave-original-french-movie-poster-15x21-in-2024-edward-berger-ralph-fiennes.jpg",
  "Dune: Part Two": "https://i.ebayimg.com/images/g/t24AAOSws2NlwgIb/s-l1200.jpg",
  "Emilia Pérez": "https://m.media-amazon.com/images/M/MV5BNjBhMWVmYjQtYmI2NC00NjdiLTliMjQtODliYjI5OTZmMzczXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
  "I'm Still Here": "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/202/2025/01/10141344/SONY-STHMI-16_Family_DigitalPoster_1934x2866-scaled.jpg",
  "Nickel Boys": "https://images.randomhouse.com/cover/9780385537070",
  "The Substance": "https://image.tmdb.org/t/p/original/cGm2qnmXx9tFabmzEIkJZjCJdQd.jpg",
  "Wicked": "https://m.media-amazon.com/images/I/81cmJpAKEVL.jpg",
  "A Real Pain": "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/261/2025/01/06110037/38lb62nJcNvVgCDkFt2wiVE0bX4-scaled.jpg",
  "September 5": "https://static1.tribute.ca/poster/660x980/september-5-193983.jpg",
  "Flow": "https://m.media-amazon.com/images/M/MV5BOTM5ODBlOTAtYjcwZi00YzkzLWIzODEtMTM2MTZlNDFmMWU2XkEyXkFqcGc@._V1_.jpg",
  "The Girl With the Needle": "https://resizing.flixster.com/1T8IA0wiy1ugg2njG4QxaHhzrVw=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzM5YjMwMDI4LTczNmYtNGQwMC1iY2EzLTRhMThjYjIxMGVjMi5qcGc=",
  "The Seed of the Sacred Fig": "https://m.media-amazon.com/images/M/MV5BMmYxMTlmODQtZTUyOS00YWE3LWFjYTktOWU4ZjU3ZGYwZDk2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Inside Out 2": "https://m.media-amazon.com/images/I/714xn6rxXSL.jpg",
  "Memoir of a Snail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsKYo304vPuR5MwsCdH3LVFWPzZ-nYgKpntg&s",
  "Wallace & Gromit: Vengeance Most Fowl": "https://m.media-amazon.com/images/M/MV5BMTk3M2YwMGUtZDJiZS00MDNkLWIyZDEtY2VjMWYyZDFmZjMzXkEyXkFqcGc@._V1_QL75_UY281_CR18,0,190,281_.jpg",
  "The Wild Robot": "https://m.media-amazon.com/images/I/712zpgXz3SL._AC_UF894,1000_QL80_.jpg",
  "Black Box Diaries": "https://m.media-amazon.com/images/M/MV5BZjM4Y2VmYTYtMDY1OS00MjYyLTg0ZTctNTE3MmJmNjJiYTZlXkEyXkFqcGc@._V1_.jpg",
  "No Other Land": "https://images.ctfassets.net/22n7d68fswlw/74Z5tFMThtzvpQdGprXZwF/708f9c2850e6c24595fe6b9bed269ffd/No-Other-Land_Poster.jpg",
  "Porcelain War": "https://m.media-amazon.com/images/M/MV5BZjkxMTQ3YWMtYmE3My00MDZlLWE1MGEtNmM2NDMzMTljNDczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Soundtrack to a Coup d'Etat": "https://m.media-amazon.com/images/M/MV5BOWIzNmIxYTUtMTdiMi00Zjk2LWJlYjktMzA5ZTA3YTExY2VkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Sugarcane": "https://slcc.ca/wp-content/uploads/2024/08/Sugarcane-Final-Key-Art_LR.jpg",
  "Maria": "https://m.media-amazon.com/images/M/MV5BMmJlZTkzOWMtYjBmMi00MWY2LTg0YTUtNGUzZjI0MzgxYTY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Nosferatu": "https://m.media-amazon.com/images/M/MV5BY2FhZGE3NmEtNWJjOC00NDI1LWFhMTQtMjcxNmQzZmEwNGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Gladiator II": "https://i.ebayimg.com/images/g/DLwAAOSwfklml4Q2/s-l400.jpg",
  "A Different Man": "https://m.media-amazon.com/images/M/MV5BYTQ0NDI2NzItZjNiOC00ZDc0LWJiNGMtMzZmMGM2NmVjMmJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Alien: Romulus": "https://m.media-amazon.com/images/I/614lcZY032L.jpg",
  "Better Man": "https://preview.redd.it/official-poster-for-the-robbie-williams-biopic-better-man-v0-5p3vahyz6wxd1.jpeg?auto=webp&s=4d6d74bb66e5fe0560386c5c49987ebe06052fe3",
  "Kingdom of the Planet of the Apes": "https://i.ebayimg.com/images/g/zzgAAOSwxuNmMmk7/s-l1200.jpg",
  "Sing Sing": "https://lh6.googleusercontent.com/proxy/oge2WrWhMJgfdMCPpLHqVKQbQUJArom76ePlBLar9lsy7c1RTlcv3uSzR7gC1LOJq4_zWvu12sBTz4WCSUt92H1NwH31rGoIBOs_VvLvNczBZm_I7HyjVcuW64TeB-6KecPdWHR49Fw",
  "The Apprentice": "https://static1.tribute.ca/poster/660x980/the-apprentice-189209.jpg",

  // Songs
  "\"El Mal,\" Emilia Pérez": "https://m.media-amazon.com/images/M/MV5BNjBhMWVmYjQtYmI2NC00NjdiLTliMjQtODliYjI5OTZmMzczXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
  "\"The Journey,\" The Six Triple Eight": "https://m.media-amazon.com/images/M/MV5BNDdhYTY4ZTEtZTlhZS00ZWI1LWFjYzQtMWRkMjIzN2E5NjBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "\"Like a Bird,\" Sing Sing": "https://lh6.googleusercontent.com/proxy/oge2WrWhMJgfdMCPpLHqVKQbQUJArom76ePlBLar9lsy7c1RTlcv3uSzR7gC1LOJq4_zWvu12sBTz4WCSUt92H1NwH31rGoIBOs_VvLvNczBZm_I7HyjVcuW64TeB-6KecPdWHR49Fw",
  "\"Mi Camino,\" Emilia Pérez": "https://m.media-amazon.com/images/M/MV5BNjBhMWVmYjQtYmI2NC00NjdiLTliMjQtODliYjI5OTZmMzczXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
  "\"Never Too Late,\" Elton John: Never Too Late": "https://m.media-amazon.com/images/M/MV5BMDMyOTI1OGMtZjM4Ni00YzMxLThkZmItYWU4MjUwM2RlZTAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",

  // People
  "Jacques Audiard, Emilia Pérez": "https://m.media-amazon.com/images/M/MV5BNjBhMWVmYjQtYmI2NC00NjdiLTliMjQtODliYjI5OTZmMzczXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
  "Sean Baker, Anora": "https://m.media-amazon.com/images/I/61j3bu9I2HL._AC_UF894,1000_QL80_.jpg",
  "Brady Corbet, The Brutalist": "https://images.squarespace-cdn.com/content/v1/63bb3e8a824d7e2f7eedf0d3/1729559725932-JVNTP5CLW1FKJYTP78GW/The%2BBrutalist%2B3.jpg?format=750w",
  "Coralie Fargeat, The Substance": "https://image.tmdb.org/t/p/original/cGm2qnmXx9tFabmzEIkJZjCJdQd.jpg",
  "James Mangold, A Complete Unknown": "https://lumiere-a.akamaihd.net/v1/images/au_movies_20cs_acompleteunknown_payoff_m_ce1913b4.jpeg",
  "Cynthia Erivo, Wicked": "https://m.media-amazon.com/images/M/MV5BMTcyMTI3NzI1Nl5BMl5BanBnXkFtZTgwNjQ3Njk2NjM@._V1_.jpg",
  "Karla Sofía Gascón, Emilia Pérez": "https://i.guim.co.uk/img/media/c0c552b6ffa98c7d1986a1c64b4b033d596cfb64/0_103_3101_1862/master/3101.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d955d1cd3880a7abc98ba0299268b9f",
  "Mikey Madison, Anora": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Mikey_Madison_at_the_2024_New_York_Film_Festival_2_%28cropped_3%29.jpg",
  "Demi Moore, The Substance": "https://m.media-amazon.com/images/M/MV5BMTc2Mjc1MDE4MV5BMl5BanBnXkFtZTcwNzAyNDczNA@@._V1_.jpg",
  "Fernanda Torres, I'm Still Here": "https://i.abcnewsfe.com/a/158714f0-566a-4c51-9ca7-1d23e0bacacd/im-still-here-01-ht-jef-250116_1737062374789_hpMain.jpg",
  "Adrien Brody, The Brutalist": "https://media.themoviedb.org/t/p/w500/qBc7ahQrpVpcllaZ5hkivsOEb3C.jpg",
  "Timothée Chalamet, A Complete Unknown": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg/640px-Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg",
  "Colman Domingo, Sing Sing": "https://m.media-amazon.com/images/M/MV5BMmI2NTQ4YmItYWZmMS00ZjE0LWEyZGItZWFhZmRmY2QxZjljXkEyXkFqcGc@._V1_.jpg",
  "Ralph Fiennes, Conclave": "https://m.media-amazon.com/images/M/MV5BMzc5MjE1NDgyN15BMl5BanBnXkFtZTcwNzg2ODgwNA@@._V1_FMjpg_UX1000_.jpg",
  "Sebastian Stan, The Apprentice": "https://m.media-amazon.com/images/M/MV5BMWEwYjgxMDQtYmRkOS00MGFiLThjMzMtZGQ2ZjBhMTcyOWNlXkEyXkFqcGc@._V1_.jpg",
  "Monica Barbaro, A Complete Unknown": "https://m.media-amazon.com/images/M/MV5BMzAzNWM1NTgtNzhhMS00OTVmLWI0ZmUtMTMwMjkyMjdkOTUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Ariana Grande, Wicked": "https://hips.hearstapps.com/hmg-prod/images/ariana-grande-attends-the-wsj-magazine-2024-innovator-news-photo-1733523847.jpg",
  "Felicity Jones, The Brutalist": "https://m.media-amazon.com/images/M/MV5BMjA0MTIwMzIyN15BMl5BanBnXkFtZTgwNDEyMzg1NDE@._V1_.jpg",
  "Isabella Rossellini, Conclave": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Isabella_Rossellini_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg/220px-Isabella_Rossellini_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg",
  "Zoe Saldaña, Emilia Pérez": "https://m.media-amazon.com/images/M/MV5BMDFkMWQ5ZDItNGUzNS00YzI4LWIyOTctMDk0Mjc3MGQyZTYxXkEyXkFqcGc@._V1_.jpg",
  "Yura Borisov, Anora": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Yura_Borisov_at_the_2024_Toronto_International_Film_Festival_%28Cropped%29.jpg/800px-Yura_Borisov_at_the_2024_Toronto_International_Film_Festival_%28Cropped%29.jpg",
  "Kieran Culkin, A Real Pain": "https://upload.wikimedia.org/wikipedia/commons/d/dc/ARealPainBFILFF131024_%2882_of_138%29_%2854065186044%29_%28cropped%29_%28cropped%29.jpg",
  "Edward Norton, A Complete Unknown": "https://m.media-amazon.com/images/M/MV5BMTYwNjQ5MTI1NF5BMl5BanBnXkFtZTcwMzU5MTI2Mw@@._V1_FMjpg_UX1000_.jpg",
  "Guy Pearce, The Brutalist": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Crew_members_of_the_movie_%22Genius%22_at_the_Berlinale_party_%2825036107966%29_%28cropped%29.jpg/220px-Crew_members_of_the_movie_%22Genius%22_at_the_Berlinale_party_%2825036107966%29_%28cropped%29.jpg",
  "Jeremy Strong, The Apprentice": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Jeremy_Strong_at_%22The_Apprentice%22_in_NYC_01_%28cropped%29.jpg/640px-Jeremy_Strong_at_%22The_Apprentice%22_in_NYC_01_%28cropped%29.jpg",

  // Shorts
  "Beautiful Men": "",
  "In the Shadow of the Cypress": "",
  "Magic Candies": "",
  "Wander to Wonder": "",
  "Yuck!": "",
  "A Lien": "",
  "Anuja": "",
  "I'm Not a Robot": "",
  "The Last Ranger": "",
  "The Man Who Could Not Remain Silent": "",
  "Death by Numbers": "",
  "I Am Ready, Warden": "",
  "Incident": "",
  "Instruments of a Beating Heart": "",
  "The Only Girl in the Orchestra": ""
};

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin',
      isAdmin: true,
    },
  })

  const initialSetting = await prisma.globalSettings.create({
    data: {
      id: 'default',
      votingEnabled: true,
    },
  });

  console.log('created global settings:', initialSetting);

  // Oscar 2025 categories and nominees data
  const categories = [
    {
      name: "BEST PICTURE",
      order: 1,
      nominees: [
        "Anora",
        "The Brutalist",
        "A Complete Unknown",
        "Conclave",
        "Dune: Part Two",
        "Emilia Pérez",
        "I'm Still Here",
        "Nickel Boys",
        "The Substance",
        "Wicked"
      ]
    },
    {
      name: "DIRECTOR",
      order: 2,
      nominees: [
        "Jacques Audiard, Emilia Pérez",
        "Sean Baker, Anora",
        "Brady Corbet, The Brutalist",
        "Coralie Fargeat, The Substance",
        "James Mangold, A Complete Unknown"
      ]
    },
    {
      name: "ACTRESS IN A LEADING ROLE",
      order: 3,
      nominees: [
        "Cynthia Erivo, Wicked",
        "Karla Sofía Gascón, Emilia Pérez",
        "Mikey Madison, Anora",
        "Demi Moore, The Substance",
        "Fernanda Torres, I'm Still Here"
      ]
    },
    {
      name: "ACTOR IN A LEADING ROLE",
      order: 4,
      nominees: [
        "Adrien Brody, The Brutalist",
        "Timothée Chalamet, A Complete Unknown",
        "Colman Domingo, Sing Sing",
        "Ralph Fiennes, Conclave",
        "Sebastian Stan, The Apprentice"
      ]
    },
    {
      name: "ACTRESS IN A SUPPORTING ROLE",
      order: 5,
      nominees: [
        "Monica Barbaro, A Complete Unknown",
        "Ariana Grande, Wicked",
        "Felicity Jones, The Brutalist",
        "Isabella Rossellini, Conclave",
        "Zoe Saldaña, Emilia Pérez"
      ]
    },
    {
      name: "ACTOR IN A SUPPORTING ROLE",
      order: 6,
      nominees: [
        "Yura Borisov, Anora",
        "Kieran Culkin, A Real Pain",
        "Edward Norton, A Complete Unknown",
        "Guy Pearce, The Brutalist",
        "Jeremy Strong, The Apprentice"
      ]
    },
    {
      name: "ORIGINAL SCREENPLAY",
      order: 7,
      nominees: [
        "Anora",
        "A Real Pain",
        "The Brutalist",
        "September 5",
        "The Substance"
      ]
    },
    {
      name: "ADAPTED SCREENPLAY",
      order: 8,
      nominees: [
        "A Complete Unknown",
        "Conclave",
        "Emilia Pérez",
        "Nickel Boys",
        "Sing Sing"
      ]
    },
    {
      name: "INTERNATIONAL FEATURE",
      order: 9,
      nominees: [
        "Emilia Pérez",
        "Flow",
        "The Girl With the Needle",
        "I'm Still Here",
        "The Seed of the Sacred Fig"
      ]
    },
    {
      name: "ANIMATED FEATURE",
      order: 10,
      nominees: [
        "Flow",
        "Inside Out 2",
        "Memoir of a Snail",
        "Wallace & Gromit: Vengeance Most Fowl",
        "The Wild Robot"
      ]
    },
    {
      name: "DOCUMENTARY FEATURE",
      order: 11,
      nominees: [
        "Black Box Diaries",
        "No Other Land",
        "Porcelain War",
        "Soundtrack to a Coup d'Etat",
        "Sugarcane"
      ]
    },
    {
      name: "ORIGINAL SCORE",
      order: 12,
      nominees: [
        "The Brutalist",
        "Conclave",
        "Emilia Pérez",
        "Wicked",
        "The Wild Robot"
      ]
    },
    {
      name: "ORIGINAL SONG",
      order: 13,
      nominees: [
        "\"El Mal,\" Emilia Pérez",
        "\"The Journey,\" The Six Triple Eight",
        "\"Like a Bird,\" Sing Sing",
        "\"Mi Camino,\" Emilia Pérez",
        "\"Never Too Late,\" Elton John: Never Too Late"
      ]
    },
    {
      name: "CINEMATOGRAPHY",
      order: 14,
      nominees: [
        "The Brutalist",
        "Dune: Part Two",
        "Emilia Pérez",
        "Maria",
        "Nosferatu"
      ]
    },
    {
      name: "COSTUME DESIGN",
      order: 15,
      nominees: [
        "A Complete Unknown",
        "Conclave",
        "Gladiator II",
        "Nosferatu",
        "Wicked"
      ]
    },
    {
      name: "EDITING",
      order: 16,
      nominees: [
        "Anora",
        "The Brutalist",
        "Conclave",
        "Emilia Pérez",
        "Wicked"
      ]
    },
    {
      name: "MAKEUP AND HAIRSTYLING",
      order: 17,
      nominees: [
        "A Different Man",
        "Emilia Pérez",
        "Nosferatu",
        "The Substance",
        "Wicked"
      ]
    },
    {
      name: "PRODUCTION DESIGN",
      order: 18,
      nominees: [
        "The Brutalist",
        "Conclave",
        "Dune: Part Two",
        "Nosferatu",
        "Wicked"
      ]
    },
    {
      name: "SOUND",
      order: 19,
      nominees: [
        "A Complete Unknown",
        "Dune: Part Two",
        "Emilia Pérez",
        "Wicked",
        "The Wild Robot"
      ]
    },
    {
      name: "VISUAL EFFECTS",
      order: 20,
      nominees: [
        "Alien: Romulus",
        "Better Man",
        "Dune: Part Two",
        "Kingdom of the Planet of the Apes",
        "Wicked"
      ]
    },
    {
      name: "ANIMATED SHORT",
      order: 21,
      nominees: [
        "Beautiful Men",
        "In the Shadow of the Cypress",
        "Magic Candies",
        "Wander to Wonder",
        "Yuck!"
      ]
    },
    {
      name: "LIVE-ACTION SHORT",
      order: 22,
      nominees: [
        "A Lien",
        "Anuja",
        "I'm Not a Robot",
        "The Last Ranger",
        "The Man Who Could Not Remain Silent"
      ]
    },
    {
      name: "DOCUMENTARY SHORT",
      order: 23,
      nominees: [
        "Death by Numbers",
        "I Am Ready, Warden",
        "Incident",
        "Instruments of a Beating Heart",
        "The Only Girl in the Orchestra"
      ]
    }
  ];

  // Insert categories and nominees
  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: { order: category.order },
      create: {
        name: category.name,
        order: category.order,
      },
    });

    console.log(`Created category: ${createdCategory.name}`);

    // Insert nominees for this category
    for (const nomineeName of category.nominees) {
      const imageUrl = (nomineeName in nomineeImageMap)
        ? nomineeImageMap[nomineeName]
        : `https://digitalreach.asia/wp-content/uploads/2021/11/placeholder-image.png`;

      const nominee = await prisma.nominee.upsert({
        where: {
          name_categoryId: {
            name: nomineeName,
            categoryId: createdCategory.id,
          },
        },
        update: {},
        create: {
          name: nomineeName,
          categoryId: createdCategory.id,
          // Add placeholder image URLs if needed
          imageUrl: imageUrl,
        },
      });

      console.log(`Created nominee: ${nominee.name} for category: ${createdCategory.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });