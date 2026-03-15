import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type NomineeImageMap = {
  [key: string]: string;
};

const nomineeImageMap: NomineeImageMap = {
  // Films
  "Bugonia": "",
  "F1": "",
  "Frankenstein": "",
  "Hamnet": "",
  "Marty Supreme": "",
  "One Battle After Another": "",
  "The Secret Agent": "",
  "Sentimental Value": "",
  "Sinners": "",
  "Train Dreams": "",
  "Blue Moon": "",
  "It Was Just an Accident": "",
  "Arco": "",
  "Elio": "",
  "KPop Demon Hunters": "",
  "Little Amélie or the Character of Rain": "",
  "Zootopia 2": "",
  "The Alabama Solution": "",
  "Come See Me in the Good Light": "",
  "Cutting Through Rocks": "",
  "Mr. Nobody Against Putin": "",
  "The Perfect Neighbor": "",
  "Avatar: Fire and Ash": "",
  "Jurassic World Rebirth": "",
  "The Lost Bus": "",
  "Kokuho": "",
  "The Smashing Machine": "",
  "The Ugly Stepsister": "",
  "If I Had Legs I'd Kick You": "",
  "Song Sung Blue": "",
  "Weapons": "",
  "Sirât": "",

  // International Feature (with country)
  "It Was Just an Accident (France)": "",
  "The Secret Agent (Brazil)": "",
  "Sentimental Value (Norway)": "",
  "Sirât (Spain)": "",
  "The Voice of Hind Rajab (Tunisia)": "",

  // Songs
  "\"Dear Me,\" Diane Warren: Relentless": "",
  "\"Golden,\" KPop Demon Hunters": "",
  "\"I Lied to You,\" Sinners": "",
  "\"Sweet Dreams of Joy,\" Viva Verdi!": "",
  "\"Train Dreams,\" Train Dreams": "",

  // People
  "Ryan Coogler, Sinners": "",
  "Paul Thomas Anderson, One Battle After Another": "",
  "Chloé Zhao, Hamnet": "",
  "Josh Safdie, Marty Supreme": "",
  "Joachim Trier, Sentimental Value": "",
  "Jessie Buckley, Hamnet": "",
  "Rose Byrne, If I Had Legs I'd Kick You": "",
  "Kate Hudson, Song Sung Blue": "",
  "Renate Reinsve, Sentimental Value": "",
  "Emma Stone, Bugonia": "",
  "Timothée Chalamet, Marty Supreme": "",
  "Leonardo DiCaprio, One Battle After Another": "",
  "Ethan Hawke, Blue Moon": "",
  "Michael B. Jordan, Sinners": "",
  "Wagner Moura, The Secret Agent": "",
  "Elle Fanning, Sentimental Value": "",
  "Inga Ibsdotter Lilleaas, Sentimental Value": "",
  "Amy Madigan, Weapons": "",
  "Wunmi Mosaku, Sinners": "",
  "Teyana Taylor, One Battle After Another": "",
  "Jacob Elordi, Frankenstein": "",
  "Delroy Lindo, Sinners": "",
  "Sean Penn, One Battle After Another": "",
  "Stellan Skarsgård, Sentimental Value": "",
  "Benicio del Toro, One Battle After Another": "",

  // Shorts
  "Butterfly": "",
  "Forevergreen": "",
  "The Girl Who Cried Pearls": "",
  "Retirement Plan": "",
  "The Three Sisters": "",
  "Butcher's Stain": "",
  "A Friend of Dorothy": "",
  "Jane Austen's Period Drama": "",
  "The Singers": "",
  "Two People Exchanging Saliva": "",
  "All the Empty Rooms": "",
  "Armed Only with a Camera: The Life and Death of Brent Renaud": "",
  "Children No More: Were and Are Gone": "",
  "The Devil Is Busy": "",
  "Perfectly a Strangeness": ""
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