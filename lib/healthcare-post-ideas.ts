export type PostFormat =
  | "Short video"
  | "Carousel"
  | "Single image"
  | "Story"
  | "LinkedIn post";

export type ContentAngle =
  | "Explained simply"
  | "Common mistakes"
  | "Warning signs"
  | "Questions answered"
  | "Practical advice";

export type HealthcarePostIdea = {
  id: string;
  profession: "Dentist";
  category: string;
  categorySlug: string;
  categoryDescription: string;
  topic: string;
  title: string;
  hook: string;
  format: PostFormat;
  angle: ContentAngle;
  callToAction: string;
};

type Topic = {
  name: string;
  context: string;
};

type CategoryDefinition = {
  name: string;
  slug: string;
  description: string;
  topics: Topic[];
};

export const dentalCategories: CategoryDefinition[] = [
  {
    name: "Oral health education",
    slug: "oral-health-education",
    description:
      "Clear explanations that help patients understand everyday oral health.",
    topics: [
      { name: "bleeding gums", context: "why gums may bleed and when patients should seek advice" },
      { name: "plaque and tartar", context: "the difference between soft plaque and hardened tartar" },
      { name: "persistent bad breath", context: "common oral causes and why masking it is not enough" },
      { name: "tooth sensitivity", context: "why hot, cold or sweet foods may trigger discomfort" },
      { name: "dry mouth", context: "how reduced saliva can affect comfort and dental health" },
      { name: "mouth ulcers", context: "common triggers and when a long-lasting ulcer needs checking" },
      { name: "tongue health", context: "normal tongue changes and signs worth discussing" },
      { name: "tooth decay", context: "how decay develops and why early treatment matters" },
      { name: "gum disease", context: "the progression from gingivitis to more serious disease" },
      { name: "enamel erosion", context: "how acids can gradually wear away the tooth surface" },
    ],
  },
  {
    name: "Prevention and hygiene",
    slug: "prevention-and-hygiene",
    description:
      "Practical habits patients can use to protect their teeth and gums.",
    topics: [
      { name: "brushing technique", context: "how gentle, thorough brushing protects teeth and gums" },
      { name: "flossing", context: "why cleaning between teeth matters as well as brushing" },
      { name: "interdental brushes", context: "how to choose and use the right size safely" },
      { name: "replacing a toothbrush", context: "when worn bristles make brushing less effective" },
      { name: "electric toothbrushes", context: "who may benefit and how to use one correctly" },
      { name: "fluoride toothpaste", context: "how fluoride strengthens enamel and supports prevention" },
      { name: "mouthwash", context: "when mouthwash may help and why it does not replace brushing" },
      { name: "diet and sugar", context: "how frequency of sugar exposure affects decay risk" },
      { name: "routine dental check-ups", context: "why regular reviews can identify problems earlier" },
      { name: "professional cleaning", context: "what a hygiene appointment can and cannot achieve" },
    ],
  },
  {
    name: "Dental treatments explained",
    slug: "dental-treatments-explained",
    description:
      "Simple explanations of common treatments and what patients can expect.",
    topics: [
      { name: "fillings", context: "why fillings are needed and what materials may be considered" },
      { name: "root canal treatment", context: "how treatment aims to save an infected tooth" },
      { name: "dental crowns", context: "when a tooth may need protection with a crown" },
      { name: "dental bridges", context: "how a bridge can replace a missing tooth" },
      { name: "dental implants", context: "the stages, assessment and maintenance involved" },
      { name: "dentures", context: "types of dentures and how patients adapt to them" },
      { name: "tooth extraction", context: "why removal may be advised and what recovery involves" },
      { name: "gum treatment", context: "how periodontal care is planned and monitored" },
      { name: "inlays and onlays", context: "when a laboratory-made restoration may be suitable" },
      { name: "emergency dental appointments", context: "what urgent care can address on the day" },
    ],
  },
  {
    name: "Cosmetic dentistry",
    slug: "cosmetic-dentistry",
    description:
      "Balanced content about improving smiles without unrealistic promises.",
    topics: [
      { name: "teeth whitening", context: "safe whitening options and who may not be suitable" },
      { name: "composite bonding", context: "what bonding can change and its maintenance needs" },
      { name: "veneers", context: "benefits, limitations and the importance of tooth preservation" },
      { name: "smile makeovers", context: "how treatment choices are combined around patient goals" },
      { name: "tooth reshaping", context: "small contouring changes and appropriate case selection" },
      { name: "white fillings", context: "appearance, function and replacement considerations" },
      { name: "straightening teeth", context: "different orthodontic approaches and realistic timelines" },
      { name: "closing tooth gaps", context: "bonding, orthodontics and other possible approaches" },
      { name: "worn teeth", context: "why wear happens and options for protecting or restoring teeth" },
      { name: "cosmetic consultations", context: "how goals, risks, costs and alternatives are discussed" },
    ],
  },
  {
    name: "Children's dentistry",
    slug: "childrens-dentistry",
    description:
      "Helpful posts for parents, children and family dental care.",
    topics: [
      { name: "a child's first dental visit", context: "how parents can make the first appointment positive" },
      { name: "teething", context: "common symptoms and safe ways to support a teething child" },
      { name: "thumb sucking", context: "when the habit may begin to affect developing teeth" },
      { name: "helping children brush", context: "age-appropriate supervision and making brushing easier" },
      { name: "fissure sealants", context: "how sealants can protect vulnerable grooves in back teeth" },
      { name: "fluoride varnish", context: "why it may be offered and how it supports prevention" },
      { name: "sports mouthguards", context: "why a well-fitting guard matters during contact sport" },
      { name: "sugary snacks", context: "how timing and frequency can affect children's teeth" },
      { name: "wobbly baby teeth", context: "what is normal and when parents should ask for advice" },
      { name: "dental anxiety in children", context: "ways families and dental teams can build confidence" },
    ],
  },
  {
    name: "Dental myths",
    slug: "dental-myths",
    description:
      "Correct common misunderstandings in a respectful, patient-friendly way.",
    topics: [
      { name: "brushing harder cleans better", context: "why excessive force can damage gums and teeth" },
      { name: "bleeding gums should be left alone", context: "why gentle cleaning and assessment still matter" },
      { name: "whitening toothpaste changes tooth colour", context: "the difference between stain removal and bleaching" },
      { name: "baby teeth do not matter", context: "how primary teeth support eating, speech and development" },
      { name: "everyone needs wisdom teeth removed", context: "why treatment depends on symptoms and clinical findings" },
      { name: "sugar-free fizzy drinks cannot harm teeth", context: "how acidity can still contribute to erosion" },
      { name: "charcoal toothpaste is always safer", context: "abrasiveness, evidence and product choice" },
      { name: "mouthwash replaces brushing", context: "why mechanical plaque removal remains essential" },
      { name: "a vanished toothache means the problem is gone", context: "why reduced pain can sometimes hide progression" },
      { name: "dental X-rays are taken without reason", context: "how dentists balance diagnostic value and exposure" },
    ],
  },
  {
    name: "Patient questions",
    slug: "patient-questions",
    description:
      "Turn frequently asked reception and surgery questions into useful posts.",
    topics: [
      { name: "how long appointments take", context: "why appointment length depends on the assessment or treatment" },
      { name: "understanding treatment costs", context: "how estimates, options and staged plans are explained" },
      { name: "what to do with dental pain", context: "safe next steps while arranging professional care" },
      { name: "support for nervous patients", context: "ways a practice can adapt the patient experience" },
      { name: "payment options", context: "how patients can ask about plans and phased treatment" },
      { name: "when a problem is a dental emergency", context: "symptoms that may need urgent assessment" },
      { name: "getting a second opinion", context: "why patients can seek clarity before major treatment" },
      { name: "following aftercare instructions", context: "why recovery advice varies by procedure" },
      { name: "medication and dental treatment", context: "why an accurate medical history matters" },
      { name: "choosing between treatment options", context: "how benefits, risks, costs and alternatives are compared" },
    ],
  },
  {
    name: "Behind the scenes",
    slug: "behind-the-scenes",
    description:
      "Build trust by showing the people, systems and standards inside the practice.",
    topics: [
      { name: "instrument sterilisation", context: "the steps used to clean, inspect and sterilise instruments" },
      { name: "preparing the clinic each morning", context: "the checks completed before the first patient arrives" },
      { name: "the role of a dental nurse", context: "how nurses support patients, clinicians and safety" },
      { name: "team training", context: "why ongoing learning matters in a modern dental practice" },
      { name: "practice technology", context: "how digital tools can support diagnosis and communication" },
      { name: "protecting patient records", context: "how confidentiality shapes everyday practice systems" },
      { name: "the decontamination room", context: "why it is a critical part of safe patient care" },
      { name: "clinical team meetings", context: "how teams review systems, learning and patient care" },
      { name: "introducing new equipment", context: "how a practice evaluates technology before use" },
      { name: "a day in the dental clinic", context: "the mix of preparation, care, administration and teamwork" },
    ],
  },
  {
    name: "Trust and transparency",
    slug: "trust-and-transparency",
    description:
      "Explain choices, fees, consent and patient safety more openly.",
    topics: [
      { name: "treatment choices", context: "why patients should understand reasonable alternatives" },
      { name: "written treatment estimates", context: "what an estimate should help a patient understand" },
      { name: "informed consent", context: "why consent is an ongoing conversation rather than a signature" },
      { name: "private and NHS dental care", context: "how availability, eligibility and options may differ" },
      { name: "clinician qualifications", context: "how patients can understand roles and professional registration" },
      { name: "raising a concern or complaint", context: "how a clear process helps practices learn and respond" },
      { name: "clinical photography", context: "why images may be useful and how permission should be handled" },
      { name: "treatment planning", context: "how findings are turned into a prioritised, understandable plan" },
      { name: "specialist referrals", context: "why a patient may be referred for additional expertise" },
      { name: "follow-up care", context: "how reviews help assess healing, adaptation and outcomes" },
    ],
  },
  {
    name: "Clinic and community",
    slug: "clinic-and-community",
    description:
      "Human, local and timely content that connects the practice to its community.",
    topics: [
      { name: "welcoming a new team member", context: "introducing their role, experience and approach to care" },
      { name: "a practice milestone", context: "reflecting on growth while thanking patients and staff" },
      { name: "supporting local schools", context: "sharing age-appropriate prevention and community work" },
      { name: "charity activity", context: "showing genuine participation without making the post self-centred" },
      { name: "a local community event", context: "connecting oral health messages with local activity" },
      { name: "responding to patient feedback", context: "showing how feedback can improve the patient experience" },
      { name: "celebrating staff achievements", context: "recognising training, qualifications and contributions" },
      { name: "seasonal opening hours", context: "making access information clear before holidays" },
      { name: "local healthcare partnerships", context: "explaining how collaboration can support patients" },
      { name: "improvements to the practice", context: "showing what changed and how patients benefit" },
    ],
  },
];

const formats: PostFormat[] = [
  "Short video",
  "Carousel",
  "Single image",
  "Story",
  "LinkedIn post",
];

const angles: Array<{
  name: ContentAngle;
  title: (topic: string) => string;
  hook: (topic: string, context: string) => string;
  callToAction: string;
}> = [
  {
    name: "Explained simply",
    title: (topic) => `${sentenceCase(topic)}: a simple patient guide`,
    hook: (topic, context) =>
      `${sentenceCase(topic)} can be confusing. Here is a clear explanation of ${context}.`,
    callToAction:
      "Save this guide and speak to your dental team for advice based on your own needs.",
  },
  {
    name: "Common mistakes",
    title: (topic) => `Five common mistakes people make with ${topic}`,
    hook: (topic, context) =>
      `Many patients try to manage ${topic} themselves. These common mistakes can make it harder to address ${context}.`,
    callToAction: "Which of these surprised you most?",
  },
  {
    name: "Warning signs",
    title: (topic) => `When ${topic} should not be ignored`,
    hook: (topic, context) =>
      `Some changes involving ${topic} are minor, while others deserve professional attention. Here is what to know about ${context}.`,
    callToAction:
      "Arrange a dental assessment if symptoms are persistent, severe or getting worse.",
  },
  {
    name: "Questions answered",
    title: (topic) => `The questions patients ask us about ${topic}`,
    hook: (topic, context) =>
      `We regularly hear questions about ${topic}. Here are straightforward answers covering ${context}.`,
    callToAction: "Leave another question for the dental team.",
  },
  {
    name: "Practical advice",
    title: (topic) => `Practical ways to approach ${topic}`,
    hook: (topic, context) =>
      `Small, informed steps can make ${topic} easier to understand. Start with these practical points about ${context}.`,
    callToAction: "Share this with someone who may find it useful.",
  },
];

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const dentalPostIdeas: HealthcarePostIdea[] = dentalCategories.flatMap(
  (category, categoryIndex) =>
    category.topics.flatMap((topic, topicIndex) =>
      angles.map((angle, angleIndex) => ({
        id: `dentist-${categoryIndex + 1}-${topicIndex + 1}-${angleIndex + 1}`,
        profession: "Dentist" as const,
        category: category.name,
        categorySlug: category.slug,
        categoryDescription: category.description,
        topic: topic.name,
        title: angle.title(topic.name),
        hook: angle.hook(topic.name, topic.context),
        format:
          formats[
            (categoryIndex + topicIndex + angleIndex) % formats.length
          ],
        angle: angle.name,
        callToAction: angle.callToAction,
      })),
    ),
);

export const dentalIdeaCount = dentalPostIdeas.length;
