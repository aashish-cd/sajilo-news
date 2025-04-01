import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const articles = [{
  "_id": {
    "$oid": "676bc918878f8dbda89a67d0"
  },
  "title": "Lamichhane suspended from State Affairs Committee",
  "content": "KATHMANDU: Rastriya Swatantra Party (RSP) President Rabi Lamichhane has been suspended from his position as a member of the State Affairs and good governance Committee. In a meeting held at Singha Durbar on Tuesday, President Ramhari Khatiwada announced the decision to suspend Rabi from the committee. After being suspended from the post of MP, Rabi is preparing to seek justice in the Supreme Court. \n\nLamichhane, who was suspended from the post of MP after a case was filed in the District Court, Kaski, on charges of cooperative fraud, organized crime and money laundering, is now preparing to file a writ petition in the Supreme Court. Lamichhane was arrested from the RSP’s central office in Banasthali, Kathmandu, on October 18.",
  "category": "Politics",
  "image": "https://web.nepalnews.com/storage/story/1024/rabi_lamichhane1734864839_1024.jpg",
  "publishedAt": {
    "$date": "2024-12-25T08:58:00.054Z"
  }
},
{
  "_id": {
    "$oid": "676bc960878f8dbda89a67d1"
  },
  "title": "What even happened in 2024? Try the Global News year-end quiz",
  "content": "ent Hill has seen in decades, what could possibly happen this winter? Our reporter panel discusses what moves the official opposition has, what tools the NDP might use and what Prime Minister Justin Trudeau could possibly do next.\nLeave a comment\nShare this item on Facebook\nShare this item on Twitter\nSend this page to someone via email\nSee more sharing options\nDescrease article font size\nIncrease article font size\nFrom Donald Trump’s political comeback to a turbulent close for Prime Minister Justin Trudeau, 2024 was yet another long year in news.\n\n\nWere you keeping track through the labour disputes, the moments of triumph and heartbreak in sport, and some of the just plain weird pop culture happenings of 2024?\n\nGet the day's top news, political, economic, and current affairs headlines, delivered to your inbox once a day.\nGet daily National news\nGet the day's top news, political, economic, and current affairs headlines, delivered to your inbox once a day.\n\nSign up for daily National newsletter\nEmail address\nSign Up\nBy providing your email address, you have read and agree to Global News' Terms and Conditions and Privacy Policy.\nTry your luck at the Global News year-end quiz, and share your score with friends online to see who took the crown for the most-informed in 2024.",
  "category": "Global",
  "image": "https://globalnews.ca/wp-content/themes/shaw-globalnews/images/skyline/national.jpg",
  "publishedAt": {
    "$date": "2024-12-25T08:59:12.395Z"
  }
},
{
  "_id": {
    "$oid": "676bc98f878f8dbda89a67d2"
  },
  "title": "Plane carrying 67 people crashes in Kazakhstan, officials say; more than 20 survive",
  "content": "A passenger plane carrying 67 people from Azerbaijan to southern Russia crashed near the Kazakh city of Aktau on Wednesday, local authorities said.\n\nAt least 25 people survived, authorities said, adding that 22 of the 25 survivors were hospitalized.\n\nAzerbaijan Airlines flight J2-8243, flying from the Azerbaijani capital Baku to Grozny in the Russian region of Chechnya, made an emergency landing approximately 3 kilometers (1.8 miles) from Aktau, the carrier said.\n\nKazakhstan’s Ministry of Emergency Situations said its teams found the aircraft on fire upon arrival at the scene.\n\n“Rescue units began extinguishing the fire. Currently, information about the victims is being clarified, and according to preliminary information, there are survivors,” the ministry said.\n\nThere were 62 passengers and 5 crew members on board, Kazakhstan’s transport ministry said in a preliminary report. It said 37 of the passengers were citizens of Azerbaijan, six of Kazakhstan, three of Kyrgyzstan, and 16 of Russia, according to preliminary data.\n\n“Additional information regarding the incident will be provided to the public,” the airline said on its Facebook page.",
  "category": "News",
  "image": "https://media.cnn.com/api/v1/images/stellar/prod/2024-12-25t081808z-546185039-rc28wbad8n7c-rtrmadp-3-kazakhstan-crash.jpg?q=w_1110,c_fill/f_webp",
  "publishedAt": {
    "$date": "2024-12-25T08:59:59.921Z"
  }
},
{
  "_id": {
    "$oid": "676d55bfc03b9e72b005d03e"
  },
  "title": "पाकिस्तानले हवाई आक्रमण गर्दा अफगानिस्तानमा ४६ जनाको मृत्यु : तालिवान सरकार",
  "content": "अफगानिस्तानको तालिवान सरकारले पाकिस्तानी हवाई आक्रमणमा पाक्टिकाको बर्मल जिल्लाका ४६ जनाको मृत्यु भएको जनाएको छ । तीमध्ये अधिकांश महिला र बालबालिका थिए ।\n\nबर्माल जिल्ला दक्षिण वजिरिस्तानको वाना र रज्माक क्षेत्रहरू नजिक छ । तालिबान अधिकारीहरूका अनुसार आक्रमणले वजिरिस्तानका शरणार्थीहरूलाई लक्षित गरेको थियो।\n\nतालिबानका प्रवक्ता जबिउल्लाह मुजाहिदले समाचार एजेन्सी एएफपीलाई पाक्टिका प्रान्तका चार क्षेत्रलाई निशाना बनाइएको बताए । तालिबान सरकारका उपप्रवक्ता हमदुल्लाह फित्रातले पनि मृत्यु हुनेमा अधिकांश महिला र बालबालिका रहेको बताए । धेरै घर ध्वस्त भएको उनले बताए । \n\nतालिबान सरकारको रक्षा मन्त्रालयबाट जारी गरिएको विज्ञप्तिमा उक्त हमलाको निन्दा गर्दै यसलाई बर्बर भनिएको छ।",
  "category": "Politics",
  "image": "https://lktcdn2.prixacdn.net/media/taliban_O4DLFFnjQg.webp",
  "publishedAt": {
    "$date": "2024-12-26T13:10:23.196Z"
  }
}]