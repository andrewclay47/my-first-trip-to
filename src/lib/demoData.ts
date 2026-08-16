import type { Post, Profile } from './types'

export const DEMO_USER: Profile = {
  id: 'demo-user',
  displayName: 'Demo Traveler',
  avatarUrl: null,
  bio: 'Just exploring the preview!',
  createdAt: '2026-01-01T00:00:00Z',
}

function photo(seed: string): string {
  return `https://picsum.photos/seed/${seed}/1200/800`
}

export const DEMO_POSTS: Post[] = [
  {
    id: 'demo-1',
    authorId: 'author-mia',
    authorName: 'Mia Chen',
    authorAvatarUrl: null,
    title: 'Lost (happily) in Tokyo for the first time',
    destinationCity: 'Tokyo',
    destinationCountry: 'Japan',
    countrySlug: 'japan',
    tripDate: '2026-04-10',
    body: `I landed at Haneda at 6am with no data plan and a hotel name written on a sticky note. Best mistake I ever made.

The first thing that hits you is how quiet the trains are. Hundreds of people, and you can hear your own footsteps. I got lost twice before breakfast and both times a stranger walked me — literally walked me — to where I needed to go.

Things I wish I'd known: get the Suica card immediately, it works for trains AND convenience stores. Konbini food is genuinely great, do not skip the egg sandwiches. Shibuya crossing is fun for five minutes; the backstreets of Yanaka are fun for five hours.

Total for a week: about $1,400 not counting flights, staying in a business hotel in Ueno. Would I go back? I'm already looking at flights.`,
    photoUrls: [photo('tokyo-street'), photo('tokyo-temple'), photo('tokyo-food')],
    createdAt: '2026-04-20T09:00:00Z',
  },
  {
    id: 'demo-2',
    authorId: 'author-james',
    authorName: 'James Okafor',
    authorAvatarUrl: null,
    title: 'A week in Lisbon on a shoestring',
    destinationCity: 'Lisbon',
    destinationCountry: 'Portugal',
    countrySlug: 'portugal',
    tripDate: '2026-02-14',
    body: `Lisbon was my first solo trip abroad and I budgeted $60 a day including the hostel. It was tight but completely doable.

The hills are no joke — my phone said I climbed 40 flights of stairs a day. Tram 28 is the famous one but it's packed; take it once at 7am and never again. The real move is just walking Alfama until you're lost and then following the smell of grilled sardines.

Pastel de nata ranking after extensive research: Manteigaria first, Pastéis de Belém second (fight me), any random café a close third because the floor for these things is incredibly high.

Biggest surprise: how easy it was to meet people. Hostels in Lisbon are social in a way that never felt forced.`,
    photoUrls: [photo('lisbon-tram'), photo('lisbon-tiles')],
    createdAt: '2026-02-25T18:30:00Z',
  },
  {
    id: 'demo-3',
    authorId: 'author-sofia',
    authorName: 'Sofia Reyes',
    authorAvatarUrl: null,
    title: 'First time in Iceland: renting a camper in winter',
    destinationCity: 'Reykjavík',
    destinationCountry: 'Iceland',
    countrySlug: 'iceland',
    tripDate: '2025-12-02',
    body: `Everyone told me not to do a camper van in December. Everyone was half right.

The wind is the thing nobody warns you about properly. It's not "windy" — it will bend your car door backwards if you open it carelessly (this costs about $900, ask me how I know). Check road.is and safetravel.is every single morning. Some days you simply do not drive, and you need slack in your itinerary for that.

But then: northern lights from a hot tub in Hvammstangi, sunrise at 11am painting Kirkjufell pink, and having Diamond Beach completely to ourselves. Winter Iceland asks a lot and pays it all back.

Budget warning: food is brutal. We cooked in the camper for almost every meal and still spent more than expected. The hot dogs are famous for a reason — they're the only cheap thing in the country.`,
    photoUrls: [photo('iceland-aurora'), photo('iceland-beach'), photo('iceland-mountain')],
    createdAt: '2025-12-15T12:00:00Z',
  },
  {
    id: 'demo-4',
    authorId: 'author-mia',
    authorName: 'Mia Chen',
    authorAvatarUrl: null,
    title: 'Oaxaca changed how I think about food',
    destinationCity: 'Oaxaca',
    destinationCountry: 'Mexico',
    countrySlug: 'mexico',
    tripDate: '2025-10-28',
    body: `I went for Día de Muertos and stayed for the mole. Ten days was not enough.

If it's your first time: base yourself in Centro, everything walkable. The markets (20 de Noviembre for food, Benito Juárez for everything else) are where you should eat at least once a day. Tlayudas from street stands at night are perfect and cost about $3.

Día de Muertos itself was the most moving thing I've experienced traveling. It's not a party for tourists — it's families in cemeteries at midnight with marigolds and candles, and being welcomed into that as a guest is something I'll never forget. Book accommodation 3+ months out if you're going for it.

Spanish level needed: mine is mediocre and I was fine, but even ten more words would have made it richer.`,
    photoUrls: [photo('oaxaca-market'), photo('oaxaca-street')],
    createdAt: '2025-11-08T15:45:00Z',
  },
  {
    id: 'demo-5',
    authorId: 'author-dev',
    authorName: 'Dev Patel',
    authorAvatarUrl: null,
    title: 'New Zealand South Island: two weeks, one tent',
    destinationCity: 'Queenstown',
    destinationCountry: 'New Zealand',
    countrySlug: 'new-zealand',
    tripDate: '2026-01-05',
    body: `First trip to the southern hemisphere and I picked the right place to fall in love with it.

The DOC campsite system is the best travel infrastructure I've ever used. $10-15 a night, always near something beautiful, bookable on one app. We did Queenstown → Wanaka → Mount Cook → Tekapo → Christchurch and every single drive was the best drive of my life until the next one.

Roys Peak is worth the hype and the 5am start. Hooker Valley Track is the best effort-to-reward ratio in hiking, maybe anywhere. Sandflies at Milford Sound are a biblical plague; bring repellent or accept your fate.

One regret: not budgeting a rest day. Two weeks of daily hikes caught up with me hard around day ten.`,
    photoUrls: [photo('nz-mountain'), photo('nz-lake'), photo('nz-road')],
    createdAt: '2026-01-22T08:20:00Z',
  },
  {
    id: 'demo-6',
    authorId: 'author-james',
    authorName: 'James Okafor',
    authorAvatarUrl: null,
    title: 'Cairo in three days — chaotic, loud, unmissable',
    destinationCity: 'Cairo',
    destinationCountry: 'Egypt',
    countrySlug: 'egypt',
    tripDate: '2026-03-01',
    body: `Cairo doesn't ease you in. The traffic has no rules, the honking is a language, and crossing the street is an act of faith. Give yourself a day to recalibrate and then it clicks.

The pyramids are somehow both exactly what you expect and nothing like it. Go at opening (8am), do Giza first, and hire a licensed guide at the entrance — mine was worth every pound for keeping the hustlers away alone. The new Grand Egyptian Museum needs a full day, not the half day I gave it.

Koshary is the best cheap meal on the planet and I will not be taking questions. Abou Tarek is the classic but honestly the corner shop near my hotel was just as good.

Solo female travelers I met said they'd recommend it but with more prep — dress conservatively, book drivers through the hotel, and expect attention in tourist areas.`,
    photoUrls: [photo('cairo-pyramids'), photo('cairo-market')],
    createdAt: '2026-03-10T20:10:00Z',
  },
]
