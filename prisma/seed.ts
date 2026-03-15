import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type NomineeImageMap = {
  [key: string]: string;
};

const nomineeImageMap: NomineeImageMap = {
  // Films
  "Bugonia": "https://m.media-amazon.com/images/M/MV5BMjA0NjE1ODEyOV5BMl5BanBnXkFtZTgwMTU2MzE5MjE@._V1_.jpg",
  "F1": "http://googleusercontent.com/image_collection/image_retrieval/9296402981186291266_0",
  "Frankenstein": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00ZTI3LWFmY2ItYmI3OTRkZGJlYmE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
  "Hamnet": "http://googleusercontent.com/image_collection/image_retrieval/990397926979045448_0",
  "Marty Supreme": "http://googleusercontent.com/image_collection/image_retrieval/14981673769868364267_0",
  "One Battle After Another": "http://googleusercontent.com/image_collection/image_retrieval/1137321586824917182_0",
  "The Secret Agent": "http://googleusercontent.com/image_collection/image_retrieval/13106216572033913568_0",
  "Sentimental Value": "http://googleusercontent.com/image_collection/image_retrieval/1471591560733212705_0",
  "Sinners": "http://googleusercontent.com/image_collection/image_retrieval/11136746451385087334_0",
  "Train Dreams": "https://m.media-amazon.com/images/M/MV5BMjE0MzM1OTYxMF5BMl5BanBnXkFtZTgwODUxNzM5MjE@._V1_.jpg",
  "Blue Moon": "http://googleusercontent.com/image_collection/image_retrieval/10284572368718130915_0",
  "It Was Just an Accident": "http://googleusercontent.com/image_collection/image_retrieval/1277721917390754834_0",
  "Arco": "http://googleusercontent.com/image_collection/image_retrieval/15813885891867316418_0",
  "Elio": "https://m.media-amazon.com/images/M/MV5BMTY1MTU3MzA5N15BMl5BanBnXkFtZTgwMDUyMDY5MjE@._V1_.jpg",
  "KPop Demon Hunters": "http://googleusercontent.com/image_collection/image_retrieval/14624802582445357860_0",
  "Little Amélie or the Character of Rain": "http://googleusercontent.com/image_collection/image_retrieval/5597476944767183252_0",
  "Zootopia 2": "https://m.media-amazon.com/images/M/MV5BNTljYjU2YmQtMDZlYy00NDY4LTk2YmYtNjdiZDFmYTEwMDcyXkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_.jpg",
  "The Alabama Solution": "http://googleusercontent.com/image_collection/image_retrieval/1471591560733213320_0",
  "Come See Me in the Good Light": "http://googleusercontent.com/image_collection/image_retrieval/9039950155673370837_0",
  "Cutting Through Rocks": "http://googleusercontent.com/image_collection/image_retrieval/14403687113789459537_0",
  "Mr. Nobody Against Putin": "http://googleusercontent.com/image_collection/image_retrieval/14228814662340770524_0",
  "The Perfect Neighbor": "http://googleusercontent.com/image_collection/image_retrieval/11157308631258307754_0",
  "Avatar: Fire and Ash": "http://googleusercontent.com/image_collection/image_retrieval/15675883116268739208_0",
  "Jurassic World Rebirth": "http://googleusercontent.com/image_collection/image_retrieval/9296402981186291266_0",
  "The Lost Bus": "http://googleusercontent.com/image_collection/image_retrieval/12754421267116179529_0",
  "Kokuho": "http://googleusercontent.com/image_collection/image_retrieval/8987240673366767533_0",
  "The Smashing Machine": "http://googleusercontent.com/image_collection/image_retrieval/13106216572033913568_0",
  "The Ugly Stepsister": "http://googleusercontent.com/image_collection/image_retrieval/9912207886271818746_0",
  "If I Had Legs I'd Kick You": "http://googleusercontent.com/image_collection/image_retrieval/10178215806985474751_0",
  "Song Sung Blue": "http://googleusercontent.com/image_collection/image_retrieval/9829794698729239943_0",
  "Weapons": "http://googleusercontent.com/image_collection/image_retrieval/15795443810630973928_0",
  "Sirât": "http://googleusercontent.com/image_collection/image_retrieval/7312417054639243953_0",

  // International Feature (with country)
  "It Was Just an Accident (France)": "http://googleusercontent.com/image_collection/image_retrieval/1277721917390754834_0",
  "The Secret Agent (Brazil)": "https://m.media-amazon.com/images/M/MV5BNGEyOGJiN2MtM2ExYS00NDRiLThjYmItYmRkMjY2YTg4Nzc1XkEyXkFqcGdeQXVyMTAzOTYyMDI2._V1_.jpg",
  "Sentimental Value (Norway)": "http://googleusercontent.com/image_collection/image_retrieval/1471591560733212705_0",
  "Sirât (Spain)": "http://googleusercontent.com/image_collection/image_retrieval/7312417054639243953_0",
  "The Voice of Hind Rajab (Tunisia)": "http://googleusercontent.com/image_collection/image_retrieval/11157308631258305963_0",

  // Songs
  "\"Dear Me,\" Diane Warren: Relentless": "http://googleusercontent.com/image_collection/image_retrieval/9422230707874237332_0",
  "\"Golden,\" KPop Demon Hunters": "http://googleusercontent.com/image_collection/image_retrieval/14624802582445357860_0",
  "\"I Lied to You,\" Sinners": "http://googleusercontent.com/image_collection/image_retrieval/11136746451385087334_0",
  "\"Sweet Dreams of Joy,\" Viva Verdi!": "https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4N15BMl5BanBnXkFtZTgwODE3NTE0MzE@._V1_.jpg",
  "\"Train Dreams,\" Train Dreams": "https://m.media-amazon.com/images/M/MV5BMjE0MzM1OTYxMF5BMl5BanBnXkFtZTgwODUxNzM5MjE@._V1_.jpg",

  // People
  "Ryan Coogler, Sinners": "http://googleusercontent.com/image_collection/image_retrieval/16890138806989658476_0",
  "Paul Thomas Anderson, One Battle After Another": "http://googleusercontent.com/image_collection/image_retrieval/7617765713793843238_0",
  "Chloé Zhao, Hamnet": "http://googleusercontent.com/image_collection/image_retrieval/5976038535471554125_0",
  "Josh Safdie, Marty Supreme": "https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4N15BMl5BanBnXkFtZTgwODE3NTE0MzE@._V1_.jpg",
  "Joachim Trier, Sentimental Value": "https://m.media-amazon.com/images/M/MV5BNzA3MDY0NTYtZDRiYS00ZWEzLWI1ZTgtZjY5YjU3Mzg3NjYyXkEyXkFqcGdeQXVyMTAzOTYyMDI2._V1_.jpg",
  "Jessie Buckley, Hamnet": "http://googleusercontent.com/image_collection/image_retrieval/5521225347820672779_0",
  "Rose Byrne, If I Had Legs I'd Kick You": "http://googleusercontent.com/image_collection/image_retrieval/15675883116268739565_0",
  "Kate Hudson, Song Sung Blue": "http://googleusercontent.com/image_collection/image_retrieval/12988219565131072739_0",
  "Renate Reinsve, Sentimental Value": "http://googleusercontent.com/image_collection/image_retrieval/1471591560733212705_0",
  "Emma Stone, Bugonia": "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwNDgzNTE1MjE@._V1_.jpg",
  "Timothée Chalamet, Marty Supreme": "https://m.media-amazon.com/images/M/MV5BZjE0ZTliNWYtZmNhYi00M2I1LWEzYmYtM2ZlZWJmN2RjY2MzXkEyXkFqcGdeQXVyMTAzOTYyMDI2._V1_.jpg",
  "Leonardo DiCaprio, One Battle After Another": "http://googleusercontent.com/image_collection/image_retrieval/6977583245625984506_0",
  "Ethan Hawke, Blue Moon": "http://googleusercontent.com/image_collection/image_retrieval/15813885891867319823_0",
  "Michael B. Jordan, Sinners": "http://googleusercontent.com/image_collection/image_retrieval/10971666971567161244_0",
  "Wagner Moura, The Secret Agent": "http://googleusercontent.com/image_collection/image_retrieval/13106216572033916793_0",
  "Elle Fanning, Sentimental Value": "http://googleusercontent.com/image_collection/image_retrieval/14367465918227758903_0",
  "Inga Ibsdotter Lilleaas, Sentimental Value": "http://googleusercontent.com/image_collection/image_retrieval/975406302689469380_0",
  "Amy Madigan, Weapons": "http://googleusercontent.com/image_collection/image_retrieval/4437532020604150002_0",
  "Wunmi Mosaku, Sinners": "http://googleusercontent.com/image_collection/image_retrieval/9829794698729239816_0",
  "Teyana Taylor, One Battle After Another": "http://googleusercontent.com/image_collection/image_retrieval/4602385917511146270_0",
  "Jacob Elordi, Frankenstein": "http://googleusercontent.com/image_collection/image_retrieval/10178215806985478048_0",
  "Delroy Lindo, Sinners": "http://googleusercontent.com/image_collection/image_retrieval/8790239573611720253_0",
  "Sean Penn, One Battle After Another": "http://googleusercontent.com/image_collection/image_retrieval/13776825327530826508_0",
  "Stellan Skarsgård, Sentimental Value": "http://googleusercontent.com/image_collection/image_retrieval/6009376513686548631_0",
  "Benicio del Toro, One Battle After Another": "http://googleusercontent.com/image_collection/image_retrieval/9422230707874237609_0",

  // Shorts
  "Butterfly": "https://m.media-amazon.com/images/M/MV5BMjE0MzM1OTYxMF5BMl5BanBnXkFtZTgwODUxNzM5MjE@._V1_.jpg",
  "Forevergreen": "http://googleusercontent.com/image_collection/image_retrieval/15813885891867316418_0",
  "The Girl Who Cried Pearls": "http://googleusercontent.com/image_collection/image_retrieval/5597476944767183252_0",
  "Retirement Plan": "http://googleusercontent.com/image_collection/image_retrieval/14624802582445357860_0",
  "The Three Sisters": "https://m.media-amazon.com/images/M/MV5BNTljYjU2YmQtMDZlYy00NDY4LTk2YmYtNjdiZDFmYTEwMDcyXkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_.jpg",
  "Butcher's Stain": "http://googleusercontent.com/image_collection/image_retrieval/11157308631258305963_0",
  "A Friend of Dorothy": "http://googleusercontent.com/image_collection/image_retrieval/10178215806985474751_0",
  "Jane Austen's Period Drama": "http://googleusercontent.com/image_collection/image_retrieval/9912207886271818746_0",
  "The Singers": "http://googleusercontent.com/image_collection/image_retrieval/9829794698729239943_0",
  "Two People Exchanging Saliva": "http://googleusercontent.com/image_collection/image_retrieval/1277721917390754834_0",
  "All the Empty Rooms": "http://googleusercontent.com/image_collection/image_retrieval/1471591560733213320_0",
  "Armed Only with a Camera: The Life and Death of Brent Renaud": "http://googleusercontent.com/image_collection/image_retrieval/14228814662340770524_0",
  "Children No More: Were and Are Gone": "http://googleusercontent.com/image_collection/image_retrieval/11157308631258307754_0",
  "The Devil Is Busy": "http://googleusercontent.com/image_collection/image_retrieval/14403687113789459537_0",
  "Perfectly a Strangeness": "http://googleusercontent.com/image_collection/image_retrieval/9039950155673370837_0"
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
        "Bugonia",
        "F1",
        "Frankenstein",
        "Hamnet",
        "Marty Supreme",
        "One Battle After Another",
        "The Secret Agent",
        "Sentimental Value",
        "Sinners",
        "Train Dreams"
      ]
    },
    {
      name: "DIRECTOR",
      order: 2,
      nominees: [
        "Ryan Coogler, Sinners",
        "Paul Thomas Anderson, One Battle After Another",
        "Chloé Zhao, Hamnet",
        "Josh Safdie, Marty Supreme",
        "Joachim Trier, Sentimental Value"
      ]
    },
    {
      name: "ACTRESS IN A LEADING ROLE",
      order: 3,
      nominees: [
        "Jessie Buckley, Hamnet",
        "Rose Byrne, If I Had Legs I'd Kick You",
        "Kate Hudson, Song Sung Blue",
        "Renate Reinsve, Sentimental Value",
        "Emma Stone, Bugonia"
      ]
    },
    {
      name: "ACTOR IN A LEADING ROLE",
      order: 4,
      nominees: [
        "Timothée Chalamet, Marty Supreme",
        "Leonardo DiCaprio, One Battle After Another",
        "Ethan Hawke, Blue Moon",
        "Michael B. Jordan, Sinners",
        "Wagner Moura, The Secret Agent"
      ]
    },
    {
      name: "ACTRESS IN A SUPPORTING ROLE",
      order: 5,
      nominees: [
        "Elle Fanning, Sentimental Value",
        "Inga Ibsdotter Lilleaas, Sentimental Value",
        "Amy Madigan, Weapons",
        "Wunmi Mosaku, Sinners",
        "Teyana Taylor, One Battle After Another"
      ]
    },
    {
      name: "ACTOR IN A SUPPORTING ROLE",
      order: 6,
      nominees: [
        "Jacob Elordi, Frankenstein",
        "Delroy Lindo, Sinners",
        "Sean Penn, One Battle After Another",
        "Stellan Skarsgård, Sentimental Value",
        "Benicio del Toro, One Battle After Another"
      ]
    },
    {
      name: "ORIGINAL SCREENPLAY",
      order: 7,
      nominees: [
        "Blue Moon",
        "It Was Just an Accident",
        "Marty Supreme",
        "Sentimental Value",
        "Sinners"
      ]
    },
    {
      name: "ADAPTED SCREENPLAY",
      order: 8,
      nominees: [
        "Bugonia",
        "Frankenstein",
        "Hamnet",
        "One Battle After Another",
        "Train Dreams"
      ]
    },
    {
      name: "CASTING",
      order: 9,
      nominees: [
        "Hamnet",
        "Marty Supreme",
        "One Battle After Another",
        "The Secret Agent",
        "Sinners"
      ]
    },
    {
      name: "INTERNATIONAL FEATURE",
      order: 10,
      nominees: [
        "It Was Just an Accident (France)",
        "The Secret Agent (Brazil)",
        "Sentimental Value (Norway)",
        "Sirât (Spain)",
        "The Voice of Hind Rajab (Tunisia)"
      ]
    },
    {
      name: "ANIMATED FEATURE",
      order: 11,
      nominees: [
        "Arco",
        "Elio",
        "KPop Demon Hunters",
        "Little Amélie or the Character of Rain",
        "Zootopia 2"
      ]
    },
    {
      name: "DOCUMENTARY FEATURE",
      order: 12,
      nominees: [
        "The Alabama Solution",
        "Come See Me in the Good Light",
        "Cutting Through Rocks",
        "Mr. Nobody Against Putin",
        "The Perfect Neighbor"
      ]
    },
    {
      name: "ORIGINAL SCORE",
      order: 13,
      nominees: [
        "Bugonia",
        "Frankenstein",
        "Hamnet",
        "One Battle After Another",
        "Sinners"
      ]
    },
    {
      name: "ORIGINAL SONG",
      order: 14,
      nominees: [
        "\"Dear Me,\" Diane Warren: Relentless",
        "\"Golden,\" KPop Demon Hunters",
        "\"I Lied to You,\" Sinners",
        "\"Sweet Dreams of Joy,\" Viva Verdi!",
        "\"Train Dreams,\" Train Dreams"
      ]
    },
    {
      name: "CINEMATOGRAPHY",
      order: 15,
      nominees: [
        "Frankenstein",
        "Marty Supreme",
        "One Battle After Another",
        "Sinners",
        "Train Dreams"
      ]
    },
    {
      name: "COSTUME DESIGN",
      order: 16,
      nominees: [
        "Avatar: Fire and Ash",
        "Frankenstein",
        "Hamnet",
        "Marty Supreme",
        "Sinners"
      ]
    },
    {
      name: "EDITING",
      order: 17,
      nominees: [
        "F1",
        "Marty Supreme",
        "One Battle After Another",
        "Sentimental Value",
        "Sinners"
      ]
    },
    {
      name: "MAKEUP AND HAIRSTYLING",
      order: 18,
      nominees: [
        "Frankenstein",
        "Kokuho",
        "Sinners",
        "The Smashing Machine",
        "The Ugly Stepsister"
      ]
    },
    {
      name: "PRODUCTION DESIGN",
      order: 19,
      nominees: [
        "Frankenstein",
        "Hamnet",
        "Marty Supreme",
        "One Battle After Another",
        "Sinners"
      ]
    },
    {
      name: "SOUND",
      order: 20,
      nominees: [
        "F1",
        "Frankenstein",
        "One Battle After Another",
        "Sinners",
        "Sirât"
      ]
    },
    {
      name: "VISUAL EFFECTS",
      order: 21,
      nominees: [
        "Avatar: Fire and Ash",
        "F1",
        "Jurassic World Rebirth",
        "The Lost Bus",
        "Sinners"
      ]
    },
    {
      name: "ANIMATED SHORT",
      order: 22,
      nominees: [
        "Butterfly",
        "Forevergreen",
        "The Girl Who Cried Pearls",
        "Retirement Plan",
        "The Three Sisters"
      ]
    },
    {
      name: "LIVE-ACTION SHORT",
      order: 23,
      nominees: [
        "Butcher's Stain",
        "A Friend of Dorothy",
        "Jane Austen's Period Drama",
        "The Singers",
        "Two People Exchanging Saliva"
      ]
    },
    {
      name: "DOCUMENTARY SHORT",
      order: 24,
      nominees: [
        "All the Empty Rooms",
        "Armed Only with a Camera: The Life and Death of Brent Renaud",
        "Children No More: Were and Are Gone",
        "The Devil Is Busy",
        "Perfectly a Strangeness"
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