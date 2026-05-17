// רשימת שחקנים בולטים מכל 48 הנבחרות במונדיאל 2026
// ממוינת אלפביתית לפי שם משפחה

export const PLAYERS: string[] = [
  // Argentina
  "Alexis Mac Allister",
  "Enzo Fernández",
  "Julián Álvarez",
  "Lautaro Martínez",
  "Lionel Messi",
  "Rodrigo De Paul",
  // Algeria
  "Islam Slimani",
  "Riyad Mahrez",
  "Youcef Atal",
  // Australia
  "Jackson Irvine",
  "Martin Boyle",
  "Mathew Leckie",
  "Riley McGree",
  // Austria
  "Christoph Baumgartner",
  "David Alaba",
  "Marcel Sabitzer",
  "Marko Arnautović",
  // Belgium
  "Kevin De Bruyne",
  "Leandro Trossard",
  "Lois Openda",
  "Romelu Lukaku",
  "Youri Tielemans",
  // Bosnia
  "Edin Džeko",
  "Ermedin Demirović",
  // Brazil
  "Endrick",
  "Gabriel Martinelli",
  "Raphinha",
  "Rodrygo",
  "Vinícius Júnior",
  // Canada
  "Alphonso Davies",
  "Cyle Larin",
  "Jonathan David",
  "Stephen Eustaquio",
  // Cape Verde
  "Garry Rodrigues",
  "Ryan Mendes",
  // Colombia
  "James Rodríguez",
  "Jhon Arias",
  "Jhon Córdoba",
  "Luis Díaz",
  "Richard Ríos",
  // Croatia
  "Bruno Petković",
  "Luka Modrić",
  "Mateo Kovačić",
  // Curacao
  "Cuco Martina",
  "Leandro Bacuna",
  // Czechia
  "Antonín Barák",
  "Patrik Schick",
  "Tomáš Souček",
  // DR Congo
  "Cédric Bakambu",
  "Chancel Mbemba",
  "Yoane Wissa",
  // Ecuador
  "Enner Valencia",
  "Jeremy Sarmiento",
  "Moisés Caicedo",
  // Egypt
  "Mohamed Salah",
  "Mostafa Mohamed",
  "Omar Marmoush",
  // England
  "Bukayo Saka",
  "Declan Rice",
  "Harry Kane",
  "Jude Bellingham",
  "Marcus Rashford",
  "Phil Foden",
  "Trent Alexander-Arnold",
  // France
  "Antoine Griezmann",
  "Eduardo Camavinga",
  "Kylian Mbappé",
  "Marcus Thuram",
  "Ousmane Dembélé",
  // Germany
  "Antonio Rüdiger",
  "Florian Wirtz",
  "Jamal Musiala",
  "Joshua Kimmich",
  "Kai Havertz",
  "Leroy Sané",
  // Ghana
  "Inaki Williams",
  "Jordan Ayew",
  "Mohammed Kudus",
  "Thomas Partey",
  // Haiti
  "Derrick Etienne",
  "Frantzdy Pierrot",
  // Iran
  "Alireza Jahanbakhsh",
  "Mehdi Taremi",
  "Sardar Azmoun",
  // Iraq
  "Amjed Attwan",
  "Mohanad Ali",
  // Ivory Coast
  "Franck Kessié",
  "Nicolas Pépé",
  "Sébastien Haller",
  // Japan
  "Junya Ito",
  "Kaoru Mitoma",
  "Ritsu Doan",
  "Takefusa Kubo",
  "Takumi Minamino",
  // Jordan
  "Mousa Al-Taamari",
  "Yazan Al-Naimat",
  // Mexico
  "Edson Álvarez",
  "Hirving Lozano",
  "Raúl Jiménez",
  "Santiago Giménez",
  // Morocco
  "Achraf Hakimi",
  "Hakim Ziyech",
  "Noussair Mazraoui",
  "Sofyan Amrabat",
  "Youssef En-Nesyri",
  // Netherlands
  "Cody Gakpo",
  "Denzel Dumfries",
  "Frenkie de Jong",
  "Virgil van Dijk",
  "Xavi Simons",
  // New Zealand
  "Chris Wood",
  "Ryan Thomas",
  // Norway
  "Alexander Sørloth",
  "Erling Haaland",
  "Martin Ødegaard",
  "Sander Berge",
  // Panama
  "Cecilio Waterman",
  "Ismael Díaz",
  // Paraguay
  "Antonio Sanabria",
  "Julio Enciso",
  "Miguel Almirón",
  // Portugal
  "Bernardo Silva",
  "Bruno Fernandes",
  "Cristiano Ronaldo",
  "Diogo Jota",
  "Rafael Leão",
  "Rúben Dias",
  // Qatar
  "Akram Afif",
  "Almoez Ali",
  "Hassan Al-Haydos",
  // Saudi Arabia
  "Firas Al-Buraikan",
  "Salem Al-Dawsari",
  // Scotland
  "Andrew Robertson",
  "Che Adams",
  "John McGinn",
  "Scott McTominay",
  // Senegal
  "Boulaye Dia",
  "Idrissa Gueye",
  "Ismaïla Sarr",
  "Sadio Mané",
  // South Africa
  "Bradley Cross",
  "Percy Tau",
  // South Korea
  "Cho Gue-sung",
  "Hwang Hee-chan",
  "Lee Kang-in",
  "Son Heung-min",
  // Spain
  "Álvaro Morata",
  "Dani Olmo",
  "Ferran Torres",
  "Gavi",
  "Lamine Yamal",
  "Pedri",
  "Rodri",
  // Sweden
  "Alexander Isak",
  "Dejan Kulusevski",
  "Emil Forsberg",
  "Viktor Gyökeres",
  // Switzerland
  "Breel Embolo",
  "Granit Xhaka",
  "Manuel Akanji",
  "Xherdan Shaqiri",
  // Tunisia
  "Ellyes Skhiri",
  "Youssef Msakni",
  // Turkey
  "Arda Güler",
  "Ferdi Kadıoğlu",
  "Hakan Çalhanoğlu",
  "Kenan Yıldız",
  // United States
  "Christian Pulisic",
  "Folarin Balogun",
  "Giovanni Reyna",
  "Tim Weah",
  "Weston McKennie",
  // Uruguay
  "Darwin Núñez",
  "Federico Valverde",
  "Rodrigo Bentancur",
  "Ronald Araújo",
  // Uzbekistan
  "Eldor Shomurodov",
  "Otabek Shukurov",
].sort((a, b) => a.split(" ").pop()!.localeCompare(b.split(" ").pop()!));
