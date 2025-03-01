import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { id: 'admin' },
    update: {},
    create: {
      id: 'admin',
      name: 'Admin',
      isAdmin: true,
    },
  });

  console.log(`Created admin user: ${adminUser.name}`);

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
          imageUrl: `https://digitalreach.asia/wp-content/uploads/2021/11/placeholder-image.png`,
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