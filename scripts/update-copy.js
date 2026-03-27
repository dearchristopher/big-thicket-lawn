const PROJECT_ID = 'hj2wzg7f'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const TOKEN = process.env.SANITY_TOKEN
if (!TOKEN) {
  console.error('Set SANITY_TOKEN environment variable first.')
  console.error('Get one from: https://www.sanity.io/manage → API → Tokens → Add API Token (Editor)')
  process.exit(1)
}

const BASE = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`

async function query(groq) {
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const json = await res.json()
  return json.result
}

async function mutate(mutations) {
  const res = await fetch(`${BASE}/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  })
  const json = await res.json()
  if (json.error) throw new Error(JSON.stringify(json.error))
  return json
}

async function main() {
  console.log('Updating site copy to sound more local...\n')

  // 1. Update siteSettings
  const settings = await query('*[_type == "siteSettings"][0]')
  if (settings) {
    console.log('Updating siteSettings...')
    await mutate([{
      patch: {
        id: settings._id,
        set: {
          heroSubtitle: 'Lawn care by people who live in your community',
          whyChooseUsBadge: 'Why Folks Choose Us',
          whyChooseUsTitle: 'The Big Thicket Difference',
          whyChooseUsSubtitle: "We're not a franchise. We're your neighbors.",
          whyChooseUsFooter: 'When you support local, everybody wins',
          testimonialsTitle: 'What Our Customers Say',
          testimonialsSubtitle: 'From our neighbors right here in Lumberton',
          galleryTitle: 'Recent Work',
          gallerySubtitle: 'See what a difference we can make',
          faqBadge: 'Got Questions?',
          faqTitle: 'Common Questions',
          faqSubtitle: 'The stuff people usually ask us',
          faqCtaTitle: 'Still have questions?',
          faqCtaText: 'Just give us a call or shoot us a text.',
          contactTitle: 'GET IN TOUCH',
          contactSubtitle: 'Ready to chat?',
          contactDescription: "Give us a holler — we'd love to hear from you.",
          contactFooter: 'Family-owned & operated in Southeast Texas',
          footerTagline: 'Your neighbors in lawn care, right here in Southeast Texas',
          pricingSubtitle: 'Straightforward pricing. No hidden fees.',
        },
      },
    }])
    console.log('  ✓ siteSettings updated')
  } else {
    console.log('  ⚠ No siteSettings document found — fallbacks in code will be used')
  }

  // 2. Update Why Choose Us items
  const reasons = await query('*[_type == "whyChooseUs"] | order(orderIndex asc)')
  if (reasons?.length > 0) {
    console.log('\nUpdating Why Choose Us items...')
    const copyMap = {
      'Local & Family Owned': "We live right here in Lumberton. You call us, you get us — not some 1-800 number.",
      'Owner-Operated Service': "Todd, Hunter, and Terry do the work themselves. You'll see the same guys every time.",
      'Fast, Free Quotes': "Text or call and we'll get back to you the same day with a straight-up price.",
      'Satisfaction Guaranteed': "If something doesn't look right, we'll come back and fix it. Simple as that.",
    }
    for (const reason of reasons) {
      if (copyMap[reason.title]) {
        await mutate([{
          patch: {
            id: reason._id,
            set: { description: copyMap[reason.title] },
          },
        }])
        console.log(`  ✓ ${reason.title}`)
      }
    }
  }

  // 3. Update FAQ items
  const faqs = await query('*[_type == "faq"] | order(orderIndex asc)')
  if (faqs?.length > 0) {
    console.log('\nUpdating FAQ answers...')
    const faqMap = {
      'How often should my lawn be mowed?':
        'Weekly during growing season (March through October), every other week the rest of the year. We can adjust based on how your yard grows.',
      'Do I need to be home during service?':
        "Nope. Most folks just leave the gate unlocked or give us a code. We'll lock up when we're done and shoot you a text.",
      'What forms of payment do you accept?':
        'Cash, check, or card — whatever works for you. Recurring customers can set up auto-pay if they want.',
      "What's included in a standard mowing service?":
        "Mowing, edging along sidewalks and driveways, trimming around obstacles and fences, and we clean up all the clippings before we leave.",
      'Do you offer discounts for recurring service?':
        "Yep — weekly and bi-weekly customers get a better rate. Give us a call and we'll work out pricing for your yard.",
    }
    for (const faq of faqs) {
      if (faqMap[faq.question]) {
        await mutate([{
          patch: {
            id: faq._id,
            set: { answer: faqMap[faq.question] },
          },
        }])
        console.log(`  ✓ ${faq.question}`)
      }
    }
  }

  // 4. Update CTA sections
  const ctas = await query('*[_type == "ctaSection"]')
  if (ctas?.length > 0) {
    console.log('\nUpdating CTA sections...')
    for (const cta of ctas) {
      if (cta.sectionId?.current === 'final-cta') {
        await mutate([{
          patch: {
            id: cta._id,
            set: {
              title: 'Let Us Take Care of Your Yard',
              subtitle: 'Get a free quote in a couple minutes. No strings attached.',
            },
          },
        }])
        console.log(`  ✓ final-cta`)
      }
    }
  }

  console.log('\n✓ All done! Copy has been updated to sound more local.')
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
