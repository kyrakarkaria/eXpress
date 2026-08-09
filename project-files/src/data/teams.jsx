import React from "react";

const placeholder = "https://placehold.co/400x400?text=Photo";

// Helper: turns "Dhruv Thakur" into "dhruv-thakur"
const slugify = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

// Builds the local image path for a core/leadership member (NO extension —
// MemberCard.jsx automatically tries .jpg, .jpeg, .png, then .webp)
const corePhoto = (name, year = "2026-2027") =>
  `/teams/${year}/core/${slugify(name)}`;

// STATIC leadership — principal & faculty advisor stay the same across
// every year, so this is defined ONCE and reused everywhere instead of
// being duplicated inside each year block.
export const leadership = {
  principal: {
    name: "Dr. Hari Vasudevan",
    position: "Principal",
    image: "/teams/leadership/dr-hari-vasudevan.png",
  },

  faculty: {
    name: "Dr. Ranjeet Puyed",
    position: "Faculty Advisor",
    image: "/teams/leadership/dr-ranjeet-puyed.jpg",
  },
};

export const teams = {
  "2026-2027": {
    groupPhoto: "/teams/2026-2027/groupicture.jpeg",

    core: {
      "Chairperson": [
        {
          id: 1,
          name: "Dhruv Thakur",
          position: "Chairperson",
          image: corePhoto("Dhruv Thakur"),
        },
      ],

      "Vice Chairpersons": [
        {
          id: 2,
          name: "Sakshi Gandhi",
          position: "Vice Chairperson",
          image: corePhoto("Sakshi Gandhi"),
        },
        {
          id: 3,
          name: "Vidit Thakkar",
          position: "Vice Chairperson",
          image: corePhoto("Vidit Thakkar"),
        },
      ],

      Treasurer: [
        {
          id: 4,
          name: "Priyansh Dedhia",
          position: "Treasurer",
          image: corePhoto("Priyansh Dedhia"),
        },
      ],

      Secretaries: [
        {
          id: 5,
          name: "Anuja Dubbewar",
          position: "Secretary",
          image: corePhoto("Anuja Dubbewar"),
        },
        {
          id: 6,
          name: "Rudra Bhandari",
          position: "Secretary",
          image: corePhoto("Rudra Bhandari"),
        },
      ],

      "Technical ": [
        {
          id: 7,
          name: "Lavish Jain",
          position: "Technical Head",
          image: corePhoto("Lavish Jain"),
        },
        {
          id: 8,
          name: "Kyra Karkaria",
          position: "Technical Head",
          image: corePhoto("Kyra Karkaria"),
        },
      ],

      "Marketing ": [
        {
          id: 9,
          name: "Vedant Dighe",
          position: "Marketing Head",
          image: corePhoto("Vedant Dighe"),
        },
        {
          id: 10,
          name: " Mohit Karkaria",
          position: "Marketing Head",
          image: corePhoto("Mohit Karkaria"),
        },
      ],

      "Public Relations ": [
        {
          id: 11,
          name: "Nandish Vyas",
          position: "Public Relations Head",
          image: corePhoto("Nandish Vyas"),
        },
        {
          id: 12,
          name: " Lavisha Boliya",
          position: "Public Relations Head",
          image: corePhoto("Lavisha Boliya"),
        },
      ],

      "Production ": [
        {
          id: 13,
          name: "Maanvi Gupta",
          position: "Production Head",
          image: corePhoto("Maanvi Gupta"),
        },
        {
          id: 14,
          name: "Mohammed Ali Memon",
          position: "Production Head",
          image: corePhoto("Mohammed Ali Memon"),
        },
      ],

      "Creatives ": [
        {
          id: 15,
          name: "Sahana Nayak",
          position: "Creatives Head",
          image: corePhoto("Sahana Nayak"),
        },
        {
          id: 16,
          name: "Arushi Kumar",
          position: "Creatives Head",
          image: corePhoto("Arushi Kumar"),
        },
      ],

      "Logistics ": [
        {
          id: 17,
          name: "Raj Sawant",
          position: "Logistics Head",
          image: corePhoto("Raj Sawant"),
        },
        {
          id: 18,
          name: "Mulraj Gala",
          position: "Logistics Head",
          image: corePhoto("Mulraj Gala"),
        },
      ],

      "Events ": [
        {
          id: 19,
          name: "Anushka Dwivedi",
          position: "Events Head",
          image: corePhoto("Anushka Dwivedi"),
        },
        {
          id: 20,
          name: "Junisha Walecha",
          position: "Events Head",
          image: corePhoto("Junisha Walecha"),
        },
      ],

      Journalism: [
        {
          id: 21,
          name: "Panini Shah",
          position: "Journalism Head",
          image: corePhoto("Panini Shah"),
        },
        {
          id: 22,
          name: "Suhani Gupta",
          position: "Journalism Head",
          image: corePhoto("Suhani Gupta"),
        },
      ],

      Editorial: [
        {
          id: 23,
          name: "Heer Bhadra",
          position: "Editorial Head",
          image: corePhoto("Heer Bhadra"),
        },
      ],

      Outreach: [
        {
          id: 24,
          name: "Aryan Maurya",
          position: "Outreach Head",
          image: corePhoto("Aryan Maurya"),
        },
      ],
    },

    associates: {
      Technical: [
        { name: "Aarya Gosavi" },
        { name: (
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cursor-default text-inherit no-underline outline-none hover:text-inherit"
            >
              Affan Niyazi
            </a>
          )  },
        { name: "Bhavya Lakhani" },
        { name: "Janhavi Shintre" },
        { name: "Manan Gohil" },
        { name: "Nishant V" },
        { name: "Om Upadhyay" },
        { name: "Sharvari Sapte" },
        { name: "Vivaan Bhimani" },
      ],

      Marketing: [
        { name: "Dhairya Shah" },
        { name: "Dhrusti Patel" },
        { name: "Harshi Modi" },
        { name: "Hitansh Pandya" },
        { name: "Hriday Dedhia" },
        { name: "Laksshya Saria" },
        { name: "Maahi Goradia" },
        { name: "Vidhi Shah" },
        { name: "Meet Bhanushali" },
        { name: "Mishka Shetty" },
        { name: "Neev Rupani" },
        { name: "Nimay Shah" },
        { name: "Prisha Patel" },
        { name: "Purav Shah" },
        { name: "Rishi Mantri" },
      ],
      Creatives: [
        { name: "Aayush Kothiyal" },
        { name: "Atharva Joshi" },
        { name: "Dhruvi Chaudhari" },
        { name: "Lucky Solanki" },
        { name: "Manan Gohil" },
        { name: "Nirvaan Shetty" },
        { name: "Parth Gada" },
        { name: "Reeva Mehta" },
        { name: "Sanskruti Doshi" },
        { name: "Shravani Thote" },
        { name: "Tisha Gada" },
        { name: "Vraj Vora" },
        { name: "Yashvi Donda" },
        { name: "Yesha Khania" },
      ],
      Production: [
        { name: "Aayush Joshi" },
        { name: "Harsh Vaghamshi" },
        { name: "Huzefa N" },
        { name: "Janhavi Thakkar" },
        { name: "Kaavish Mehta" },
        { name: "Poorva Shah" },
        { name: "Priyansh Vaishnav" },
        { name: "Rishabh Gupta" },
        { name: "Sahil Gavkar" },
        { name: "Shubh Sheth" },
        { name: "Teesha Padia" },
        { name: "Vivaan Mistry" },
      ],
      Logistics: [
        { name: "Abhishek Kamdar" },
        { name: "Akash Dalvi" },
        { name: "Aymaan Madhia" },
        { name: "Diva Shah" },
        { name: "Heer Shah" },
        { name: "Kathit Parekh" },
        { name: "Priyansh Furia" },
        { name: "Priyansh Jain" },
        { name: "Sahil Budhia" },
        { name: "Saloni Mehta" },
        { name: "Siddharth Santosh" },
        { name: "Shivani Panchal" },
        { name: "Mann Morbia" },
        { name: "Vedant Jain" },
      ],
      Journalism: [
        { name: "Aaditya Jadhav" },
        { name: "Aiden Fernandes" },
        { name: "Avrojit Dutta" },
        { name: "Bhumika Ruparelia" },
        { name: "Ishaan Raghavan" },
        { name: "Krimsi Shah" },
        { name: "Purva Pimple" },
        { name: "Pranay Purohit" },
        { name: "Shruti Gadgil" },
        { name: "Swara Desai" },
        { name: "Trisha Nair" },
      ],
      Editorial: [
        { name: "Jay Thakkar" },
        { name: "Janhavi Thakkar" },
        { name: "Najuk Diora" },
        { name: "Radhika Korade" },
        { name: "Sahil Zinjal" },
        { name: "Tamanna Rupapra" },
      ],
      Outreach: [
        { name: "Diva Shah" },
        { name: "Harshi Modi" },
        { name: "Kaashvi Mehta" },
        { name: "Manasvee Jain" },
        { name: "Mishka Shetty" },
        { name: "Pranay Purohit" },
        { name: "Pratistha Prashant" },
        { name: "Shloka Bakliwal" },
        { name: "Trisha Nair" },
        { name: "Tianna Varghese" },
      ],
      events: [
        { name: "Aaryaan Narayan" },
        { name: "Bakhtyar Raja" },
        { name: "Bhumi Kamdar" },
        { name: "Dhairya Shah" },
        { name: "Heet Furia" },
        { name: "Dhruv Dongarkar" },
        { name: "Pratistha Prashant" },
        { name: "Poorva Shah" },
        { name: "Maanya Master" },
        { name: "Rikin Shah" },
        { name: "Siya Jain" },
        { name: "Vedika Bhatt" },
        { name: "Yesha Khania" },
      ],
      pr: [
        { name: "Aayush Joshi" },
        { name: "Hazel Tanna" },
        { name: "Ishita Mody" },
        { name: "Khushi Charla" },
        { name: "Maahi Goradia" },
        { name: "Nikhil Patil" },
        { name: "Pia Zaveri" },
        { name: "Raghav Maheshwari" },
        { name: "Riddhi Shetty" },
        { name: "Rishi Dharak" },
        { name: "Shravani Thote" },
        { name: "Jash Vora" },
        { name: "Bhavya Mehta" },
      ],
    },
  },

 
};
