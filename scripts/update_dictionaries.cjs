const fs = require('fs');
const path = require('path');

// Read current dictionaries
const enPath = path.join(__dirname, '../dictionaries/en.json');
const frPath = path.join(__dirname, '../dictionaries/fr.json');
const arPath = path.join(__dirname, '../dictionaries/ar.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// 1. Sanitize EN
function sanitizeText(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/ECOCERT CERTIFIED/g, 'QUALITY TESTED')
    .replace(/ECOCERT/gi, 'International Standard')
    .replace(/USDA ORGANIC/g, 'NATURAL ORIGIN')
    .replace(/USDA Organic/gi, 'Pure Moroccan Origin')
    .replace(/CRUELTY-FREE & VEGAN/gi, 'ETHICALLY PRODUCED')
    .replace(/SANS CRUAUTÉ & VÉGAN/gi, 'ORIGINE NATURELLE')
    .replace(/نباتي وخالي من القسوة/gi, 'أصالة وجودة')
    .replace(/1000\+ Happy Partners/gi, 'Businesses Worldwide')
    .replace(/1000\+ Partenaires Satisfaits/gi, 'Partenaires Professionnels')
    .replace(/1000\+ شركاء سعداء/gi, 'شركاء تجاريون')
    .replace(/1000\+/g, '50+')
    .replace(/hundreds of brands worldwide/gi, 'businesses worldwide')
    .replace(/centaines de marques dans le monde/gi, 'entreprises à travers le monde')
    .replace(/مئات العلامات التجارية في جميع أنحاء العالم/gi, 'شركات في جميع أنحاء العالم')
    .replace(/leading Moroccan cosmetic products supplier/gi, 'Moroccan cosmetic wholesale supplier')
    .replace(/leading Moroccan beauty ingredient supplier/gi, 'Moroccan beauty ingredient wholesale supplier')
    .replace(/l'un des principaux fournisseurs/gi, 'fournisseur en gros')
    .replace(/المورد الرائد/gi, 'مورد بالجملة')
    .replace(/anti-aging and skin-repairing/gi, 'deeply hydrating and nourishing')
    .replace(/anti-aging/gi, 'revitalizing')
    .replace(/skin-repairing/gi, 'restorative');
}

function recursiveSanitize(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = sanitizeText(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(item => typeof item === 'string' ? sanitizeText(item) : (typeof item === 'object' ? recursiveSanitize(item) : item));
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      recursiveSanitize(obj[key]);
    }
  }
  return obj;
}

recursiveSanitize(en);
recursiveSanitize(fr);
recursiveSanitize(ar);

// Now define newHome data for EN, FR, AR
const newHomeEN = {
  seo: {
    title: "Moroccan Beauty Products Wholesale | From 50 Pieces",
    description: "Ready-to-sell Moroccan beauty products for shops, spas and hotels: argan oil, black soap, ghassoul, rose water and hammam kits. Wholesale from 50 pieces."
  },
  hero: {
    h1: "Moroccan Beauty Products, Wholesale and Ready to Sell",
    subtitle: "Argan oil in retail bottles, black soap in jars, ghassoul, rose water, kessa gloves and complete hammam kits - labelled, packed and ready for your shelf, your treatment room or your guest bathrooms. Start from 50 pieces.",
    ctaPrice: "Request the Price List",
    ctaWhatsApp: "Chat on WhatsApp",
    trustFacts: [
      "Minimum order: 50 pieces",
      "Mixed orders welcome",
      "Reply within 24 hours",
      "Factory in Agadir"
    ]
  },
  whoItsFor: {
    title: "Who It's For",
    intro: "Most wholesale suppliers are built for big brands buying drums. We built this service for businesses that need finished products in manageable quantities.",
    cards: [
      {
        id: "shops",
        title: "Shops and concept stores",
        description: "Moroccan beauty sells well next to home décor, tea and crafts. Ready-labelled products and gift sets in quantities a shop can actually move.",
        linkText: "See gift sets and hammam kits",
        href: "/contact/"
      },
      {
        id: "spas",
        title: "Spas and hammams",
        description: "Professional formats of black soap and ghassoul for treatments, kessa gloves by the pack, and retail sizes for your reception desk.",
        linkText: "See spa and hammam supplies",
        href: "/contact/"
      },
      {
        id: "hotels",
        title: "Hotels and riads",
        description: "Argan oil, black soap and rose water for guest rooms and in-house spas - a small detail guests remember.",
        linkText: "See hotel amenities",
        href: "/contact/"
      },
      {
        id: "online",
        title: "Online sellers",
        description: "Retail-ready products with clear labels and ingredient lists, packed to travel well.",
        linkText: "See the catalog",
        href: "/contact/",
        image: "/images/img24.jfif"
      }
    ]
  },
  products: {
    title: "Ready-to-Sell Products",
    columns: {
      product: "Product",
      formats: "Formats",
      popularWith: "Works well for"
    },
    items: [
      {
        name: "Argan oil (cosmetic)",
        format: "On request",
        popularWith: "Shops, online sellers, hotels",
        image: "/images/hero-background.jpg"
      },
      {
        name: "Moroccan black soap",
        format: "On request",
        popularWith: "Spas, hammams, shops",
        image: "/images/card-premium-oils.jpg"
      },
      {
        name: "Ghassoul clay",
        format: "On request",
        popularWith: "Spas, shops",
        image: "/images/hero-background.jpg"
      },
      {
        name: "Rose water",
        format: "On request",
        popularWith: "Shops, online sellers",
        image: "/images/rose water morocoo.png"
      },
      {
        name: "Kessa exfoliating gloves",
        format: "On request",
        popularWith: "Spas, hammams, hotels",
        image: "/images/card-premium-oils.jpg"
      },
      {
        name: "Hammam kits",
        format: "On request",
        popularWith: "Shops, gift buyers, hotels",
        image: "/images/card-premium-oils.jpg"
      }
    ],
    footerNote: "Ask for the price list to see current formats and prices.",
    cta: "Ask for the price list"
  },
  mixedOrder: {
    title: "How a Mixed Order Works",
    subtitle: "You don't need to buy hundreds of one item to get started.",
    steps: [
      {
        num: "01",
        title: "Choose your products",
        desc: "Mix oils, soaps, clays and kits."
      },
      {
        num: "02",
        title: "Reach the minimum",
        desc: "50 pieces total order minimum."
      },
      {
        num: "03",
        title: "Receive a quote",
        desc: "Prices, lead time and shipping options within 24 hours."
      },
      {
        num: "04",
        title: "Confirm your order",
        desc: "Lock in your production run."
      },
      {
        num: "05",
        "title": "We pack and ship",
        desc: "Direct export with all necessary export documents."
      }
    ]
  },
  customLogo: {
    title: "Want Your Own Logo on the Products?",
    description: "From 50 pieces, we can put your shop's, spa's or hotel's name on the labels - a simple way to build a house brand without launching a full cosmetics line.",
    buttonText: "See custom labels",
    href: "/private-label/",
    image: "/images/img14.jfif"
  },
  sourcing: {
    title: "Where Our Products Come From",
    description: "Our factory is in Agadir, in the argan region of Morocco. We work with Moroccan producers and cooperatives, and we pack and check every order before it leaves. On request, we provide ingredient lists and safety data sheets for our products.",
    factoryLabel: "Factory",
    factoryCity: "Agadir",
    addressLabel: "Address",
    address: "Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh",
    image: "/images/manufacturing.webp"
  },
  shipping: {
    title: "Shipping",
    description: "Samples travel by express courier; orders by express, air or sea freight depending on size. We prepare the export documents and can ship to your door or to your forwarder."
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Still have a question?",
    whatsAppLink: "Chat on WhatsApp",
    items: [
      {
        q: "What is your minimum order?",
        a: "50 pieces. You can mix products in one order."
      },
      {
        q: "How quickly do you reply?",
        a: "Within 24 hours on business days, with prices, formats and shipping options."
      },
      {
        q: "Do you sell to small shops and single spas?",
        a: "Yes - that's who this service is built for. You can start from 50 pieces and mix products in one order."
      },
      {
        q: "Can you put my logo on the products?",
        a: "Yes, from 50 pieces. See our custom label page."
      },
      {
        q: "Where is your factory?",
        a: "In Agadir, Morocco. Our address is Lot 377 N°3/6, Sidi Ghanem industrial zone, 40110 Marrakesh."
      },
      {
        q: "Do you ship outside Morocco?",
        a: "Yes, worldwide, by express courier, air or sea freight."
      }
    ]
  },
  getPriceList: {
    title: "Get the Price List",
    description: "Tell us your type of business, the products you're interested in and your country. You'll receive the price list and shipping options within 24 hours on business days.",
    primaryCta: "Request the Price List",
    secondaryCta: "Chat on WhatsApp"
  }
};

const newHomeFR = {
  seo: {
    title: "Produits Cosmétiques Marocains en Gros | Dès 50 Pièces",
    description: "Produits cosmétiques marocains prêts à la revente pour boutiques, spas et hôtels : huile d'argan, savon noir, rhassoul, eau de rose et kits hammam. Vente en gros dès 50 pièces."
  },
  hero: {
    h1: "Produits Cosmétiques Marocains, en Gros et Prêts à Vendre",
    subtitle: "Huile d'argan en flacons de vente, savon noir en pots, rhassoul, eau de rose, gants de kessa et kits hammam complets — étiquetés, conditionnés et prêts pour votre boutique, cabine de soin ou vos chambres d'hôtes. Dès 50 pièces.",
    ctaPrice: "Demander la liste des prix",
    ctaWhatsApp: "Échanger sur WhatsApp",
    trustFacts: [
      "Commande minimum : 50 pièces",
      "Commandes mixtes bienvenues",
      "Réponse sous 24 heures",
      "Atelier à Agadir"
    ]
  },
  whoItsFor: {
    title: "À qui s'adresse notre service",
    intro: "La plupart des grossistes sont organisés pour de grandes marques achetant par fûts entiers. Nous avons conçu ce service pour les entreprises qui ont besoin de produits finis en quantités gérables.",
    cards: [
      {
        id: "shops",
        title: "Boutiques et concept stores",
        description: "La beauté marocaine se vend très bien aux côtés de la décoration, du thé et de l'artisanat. Produits finis étiquetés et coffrets cadeaux en volumes adaptés aux boutiques indépendantes.",
        linkText: "Voir coffrets et kits hammam",
        href: "/contact/"
      },
      {
        id: "spas",
        title: "Spas et hammams",
        description: "Formats professionnels de savon noir et rhassoul pour les cabines de soin, gants de kessa par lot et formats revente pour votre comptoir d'accueil.",
        linkText: "Voir fournitures spa & hammam",
        href: "/contact/"
      },
      {
        id: "hotels",
        title: "Hôtels et riads",
        description: "Huile d'argan, savon noir et eau de rose pour chambres d'hôtes et spas intégrés — une attention raffinée dont les clients se souviennent.",
        linkText: "Voir produits d'accueil hôtel",
        href: "/contact/"
      },
      {
        id: "online",
        title: "Vendeurs en ligne",
        description: "Produits prêts à la commercialisation avec étiquetage clair et liste d'ingrédients, soigneusement emballés pour le transport.",
        linkText: "Voir le catalogue",
        href: "/contact/",
        image: "/images/img24.jfif"
      }
    ]
  },
  products: {
    title: "Produits Prêts à la Revente",
    columns: {
      product: "Produit",
      formats: "Formats",
      popularWith: "Idéal pour"
    },
    items: [
      {
        name: "Huile d'argan (cosmétique)",
        format: "Sur demande",
        popularWith: "Boutiques, e-commerce, hôtels",
        image: "/images/hero-background.jpg"
      },
      {
        name: "Savon noir marocain",
        format: "Sur demande",
        popularWith: "Spas, hammams, boutiques",
        image: "/images/card-premium-oils.jpg"
      },
      {
        name: "Argile Ghassoul",
        format: "Sur demande",
        popularWith: "Spas, boutiques",
        image: "/images/hero-background.jpg"
      },
      {
        name: "Eau de rose",
        format: "Sur demande",
        popularWith: "Boutiques, e-commerce",
        image: "/images/rose water morocoo.png"
      },
      {
        name: "Gants exfoliants Kessa",
        format: "Sur demande",
        popularWith: "Spas, hammams, hôtels",
        image: "/images/card-premium-oils.jpg"
      },
      {
        name: "Kits de hammam",
        format: "Sur demande",
        popularWith: "Boutiques, cadeaux, hôtels",
        image: "/images/card-premium-oils.jpg"
      }
    ],
    footerNote: "Demandez la liste de prix pour consulter les formats actuels et les tarifs.",
    cta: "Demander la liste des prix"
  },
  mixedOrder: {
    title: "Comment fonctionne une commande mixte",
    subtitle: "Vous n'avez pas besoin d'acheter des centaines d'exemplaires d'un seul article pour démarrer.",
    steps: [
      {
        num: "01",
        title: "Choisissez vos produits",
        desc: "Mélangez huiles, savons, argiles et coffrets."
      },
      {
        num: "02",
        title: "Atteignez le minimum",
        desc: "50 pièces au total par commande."
      },
      {
        num: "03",
        title: "Recevez votre devis",
        desc: "Tarifs, délais et options de livraison sous 24 heures."
      },
      {
        num: "04",
        title: "Confirmez votre commande",
        desc: "Validation de votre lot de fabrication."
      },
      {
        num: "05",
        title: "Préparation et expédition",
        desc: "Expédition directe avec documents d'exportation."
      }
    ]
  },
  customLogo: {
    title: "Envie de votre propre logo sur les produits ?",
    description: "Dès 50 pièces, nous pouvons apposer le nom de votre boutique, spa ou hôtel sur les étiquettes — un moyen simple de créer votre marque sans développer une gamme complète.",
    buttonText: "Voir les étiquettes personnalisées",
    href: "/private-label/",
    image: "/images/img14.jfif"
  },
  sourcing: {
    title: "D'où viennent nos produits",
    description: "Notre atelier de production se situe à Agadir, au cœur de la région de l'arganier au Maroc. Nous collaborons avec des coopératives et producteurs marocains, et chaque commande est contrôlée et conditionnée avant expédition. Sur demande, nous fournissons les listes d'ingrédients et fiches de données de sécurité.",
    factoryLabel: "Atelier",
    factoryCity: "Agadir",
    addressLabel: "Adresse",
    address: "Lot 377 N°3/6, Zone industrielle Sidi Ghanem, 40110 Marrakech",
    image: "/images/manufacturing.webp"
  },
  shipping: {
    title: "Expédition & Logistique",
    description: "Les échantillons sont expédiés par coursier express ; les commandes par express, fret aérien ou maritime selon le volume. Nous établissons les formalités douanières et livrons directement à votre adresse ou chez votre transitaire."
  },
  faq: {
    title: "Foire Aux Questions",
    subtitle: "Vous avez une question ?",
    whatsAppLink: "Échanger sur WhatsApp",
    items: [
      {
        q: "Quel est votre minimum de commande ?",
        a: "50 pièces. Vous pouvez mélanger les produits dans une même commande."
      },
      {
        q: "En combien de temps répondez-vous ?",
        a: "Sous 24 heures les jours ouvrables, avec les tarifs, formats et options d'expédition."
      },
      {
        q: "Vendez-vous aux petites boutiques et aux spas indépendants ?",
        a: "Oui — c'est exactement pour vous que ce service est conçu. Vous pouvez commencer dès 50 pièces et mélanger les produits dans une seule commande."
      },
      {
        q: "Pouvez-vous apposer mon logo sur les produits ?",
        a: "Oui, dès 50 pièces. Consultez notre page marque personnalisée."
      },
      {
        q: "Où se trouve votre atelier de production ?",
        a: "À Agadir, au Maroc. Notre adresse est Lot 377 N°3/6, Zone industrielle Sidi Ghanem, 40110 Marrakech."
      },
      {
        q: "Livrez-vous en dehors du Maroc ?",
        a: "Oui, dans le monde entier, par coursier express, fret aérien ou maritime."
      }
    ]
  },
  getPriceList: {
    title: "Demandez la liste des prix",
    description: "Indiquez-nous votre type d'activité, les produits souhaités et votre pays. Vous recevrez notre grille tarifaire et les options d'expédition sous 24 heures les jours ouvrables.",
    primaryCta: "Demander la liste des prix",
    secondaryCta: "Échanger sur WhatsApp"
  }
};

const newHomeAR = {
  seo: {
    title: "منتجات تجميل مغربية بالجملة | ابتداءً من 50 قطعة",
    description: "منتجات تجميل مغربية جاهزة للبيع للمتاجر والسبا والفنادق: زيت الأرغان، الصابون الأسود، الغاسول، ماء الورد وباقات الحمام. بالجملة من 50 قطعة."
  },
  hero: {
    h1: "منتجات التجميل المغربية، بالجملة وجاهزة للبيع",
    subtitle: "زيت الأرغان في زجاجات التجزئة، الصابون الأسود في علب، الغاسول، ماء الورد، قفازات الكيس وباقات الحمام الكاملة — مغلفة ومجهزة وجاهزة لمتجرك أو صالونك أو غرف الضيوف. ابتداءً من 50 قطعة.",
    ctaPrice: "طلب لائحة الأسعار",
    ctaWhatsApp: "تواصل عبر واتساب",
    trustFacts: [
      "الحد الأدنى: 50 قطعة",
      "إمكانية طلب تشكيلة منوعة",
      "الرد خلال 24 ساعة",
      "المعمل في أكادير"
    ]
  },
  whoItsFor: {
    title: "لمن صُممت هذه الخدمة",
    intro: "معظم موردي الجملة يركزون على الشركات الكبرى التي تشتري بالبراميل الضخمة. نحن أسسنا هذه الخدمة للشركات والمتاجر التي تحتاج إلى منتجات نهائية جاهزة بكميات مناسبة.",
    cards: [
      {
        id: "shops",
        title: "المتاجر والمتاجر الفاخرة",
        description: "منتجات التجميل المغربية تباع بشكل ممتاز بجانب الديكور المنزلي والشاي والحرف اليدوية. منتجات مغلفة وباقات هدايا بكميات واقعية للمتاجر.",
        linkText: "مشاهدة باقات الهدايا ومجموعات الحمام",
        href: "/contact/"
      },
      {
        id: "spas",
        title: "المنتجعات الصحية والحمامات",
        description: "أحجام مهنية من الصابون الأسود والغاسول لجلسات العناية، قفازات الكيس بالباقة، وأحجام للتجزئة لمكتب الاستقبال.",
        linkText: "مشاهدة مستلزمات السبا والحمام",
        href: "/contact/"
      },
      {
        id: "hotels",
        title: "الفنادق والرياضات",
        description: "زيت الأرغان، الصابون الأسود وماء الورد لغرف النزلاء والحمامات الداخلية — لمسة أصيلة يتذكرها الضيوف دائماً.",
        linkText: "مشاهدة مستلزمات الضيافة للفنادق",
        href: "/contact/"
      },
      {
        id: "online",
        title: "البائعون عبر الإنترنت",
        description: "منتجات جاهزة للبيع مع ملصقات واضحة وقائمة المكونات، مغلفة بإحكام لتحمل الشحن والتنقل.",
        linkText: "مشاهدة الكتالوج",
        href: "/contact/",
        image: "/images/img24.jfif"
      }
    ]
  },
  products: {
    title: "منتجات جاهزة للبيع الفوري",
    columns: {
      product: "المنتج",
      formats: "الأحجام",
      popularWith: "مناسب لـ"
    },
    items: [
      {
        name: "زيت الأرغان (للتجميل)",
        format: "عند الطلب",
        popularWith: "المتاجر، التجارة الإلكترونية، الفنادق",
        image: "/images/hero-background.jpg"
      },
      {
        name: "الصابون الأسود المغربي",
        format: "عند الطلب",
        popularWith: "الصالونات، الحمامات، المتاجر",
        image: "/images/card-premium-oils.jpg"
      },
      {
        name: "طين الغاسول الطبيعي",
        format: "عند الطلب",
        popularWith: "الصالونات، المتاجر",
        image: "/images/hero-background.jpg"
      },
      {
        name: "ماء الورد المقطر",
        format: "عند الطلب",
        popularWith: "المتاجر، التجارة الإلكترونية",
        image: "/images/rose water morocoo.png"
      },
      {
        name: "قفاز الكيس المغربي للتقشير",
        format: "عند الطلب",
        popularWith: "الصالونات، الحمامات، الفنادق",
        image: "/images/card-premium-oils.jpg"
      },
      {
        name: "باقات الحمام المغربي",
        format: "عند الطلب",
        popularWith: "المتاجر، الهدايا، الفنادق",
        image: "/images/card-premium-oils.jpg"
      }
    ],
    footerNote: "اطلب لائحة الأسعار للاطلاع على الأحجام المتوفرة والأسعار.",
    cta: "طلب لائحة الأسعار"
  },
  mixedOrder: {
    title: "كيف تتم معالجة الطلبية المنوعة",
    subtitle: "لست بحاجة لشراء مئات القطع من منتج واحد للبدء.",
    steps: [
      {
        num: "01",
        title: "اختر منتجاتك",
        desc: "امزج بين الزيوت، الصابون، الطين وباقات الحمام."
      },
      {
        num: "02",
        title: "الوصول للحد الأدنى",
        desc: "50 قطعة إجمالاً للطلبية."
      },
      {
        num: "03",
        title: "استلام عرض الأسعار",
        desc: "الأسعار، مدة التجهيز وخيارات الشحن خلال 24 ساعة."
      },
      {
        num: "04",
        title: "تأكيد الطلبية",
        desc: "اعتماد تشغيلة الإنتاج الخاصة بك."
      },
      {
        num: "05",
        title: "التغليف والشحن",
        desc: "تجهيز الشحنة مع كافة وثائق التصدير الرسمية."
      }
    ]
  },
  customLogo: {
    title: "هل ترغب في وضع شعارك الخاص على المنتجات؟",
    description: "ابتداءً من 50 قطعة، يمكننا وضع اسم متجرك أو صالونك أو فندقك على الملصقات — وسيلة سهلة لبناء علامتك التجارية دون الحاجة لإطلاق خط تصنيع معقد.",
    buttonText: "مشاهدة خيارات العلامة الخاصة",
    href: "/private-label/",
    image: "/images/img14.jfif"
  },
  sourcing: {
    title: "من أين تأتي منتجاتنا",
    description: "يقع معملنا في مدينة أكادير، في قلب منطقة شجر الأرغان بالمغرب. نتعامل مباشرة مع تعاونيات ومنتجين مغاربة، ونفحص كل شحنة بدقة قبل خروجها. نوفر عند الطلب قوائم المكونات وصحائف بيانات السلامة.",
    factoryLabel: "المعمل",
    factoryCity: "أكادير",
    addressLabel: "العنوان",
    address: "القطعة 377 رقم 3/6، المنطقة الصناعية سيدي غانم، 40110 مراكش",
    image: "/images/manufacturing.webp"
  },
  shipping: {
    title: "الشحن والتوصيل الدولي",
    description: "تُرسل العينات عبر البريد السريع، والطلبيات عبر الشحن السريع أو الجوي أو البحري حسب الحجم. نجهز كافة وثائق التصدير الرسمية ونشحن إلى عنوانك أو إلى وكيل الشحن الخاص بك."
  },
  faq: {
    title: "الأسئلة الشائعة",
    subtitle: "هل لديك سؤال آخر؟",
    whatsAppLink: "تواصل عبر واتساب",
    items: [
      {
        q: "ما هو الحد الأدنى للطلب لديكم؟",
        a: "50 قطعة. يمكنك الجمع بين منتجات مختلفة في طلبية واحدة."
      },
      {
        q: "ما هي سرعة الرد على الاستفسارات؟",
        a: "خلال 24 ساعة في أيام العمل، مع توضيح الأسعار والأحجام وخيارات الشحن."
      },
      {
        q: "هل تبيعون للمتاجر الصغيرة والصالونات المستقلة؟",
        a: "نعم — لقد صممنا هذه الخدمة خصيصاً لكم. يمكنكم البدء من 50 قطعة مع إمكانية مزج المنتجات في نفس الطلبية."
      },
      {
        q: "هل يمكنكم وضع شعاري (اللوغو) على المنتجات؟",
        a: "نعم، ابتداءً من 50 قطعة. راجع صفحة العلامة المخصصة."
      },
      {
        q: "أين يقع معملكم؟",
        a: "في أكادير، المغرب. عنواننا هو القطعة 377 رقم 3/6، المنطقة الصناعية سيدي غانم، 40110 مراكش."
      },
      {
        q: "هل تقومون بالشحن خارج المغرب؟",
        a: "نعم، إلى جميع أنحاء العالم، عبر البريد السريع، أو الشحن الجوي، أو الشحن البحري."
      }
    ]
  },
  getPriceList: {
    title: "الحصول على لائحة الأسعار",
    description: "أخبرنا بطبيعة نشاطك التجاري والمنتجات التي تهمك ودولتك، وستتلقى لائحة الأسعار وخيارات الشحن خلال 24 ساعة في أيام العمل.",
    primaryCta: "طلب لائحة الأسعار",
    secondaryCta: "تواصل عبر واتساب"
  }
};

en.newHome = newHomeEN;
fr.newHome = newHomeFR;
ar.newHome = newHomeAR;

// Update SEO object in each dictionary as well
en.seo.title = newHomeEN.seo.title;
en.seo.description = newHomeEN.seo.description;
fr.seo.title = newHomeFR.seo.title;
fr.seo.description = newHomeFR.seo.description;
ar.seo.title = newHomeAR.seo.title;
ar.seo.description = newHomeAR.seo.description;

// Write updated dictionaries
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2), 'utf8');

console.log('✓ Dictionaries updated and sanitized.');

// Create review folder if it does not exist
const reviewDir = path.join(__dirname, '../review');
if (!fs.existsSync(reviewDir)) {
  fs.mkdirSync(reviewDir, { recursive: true });
}

// Generate CSV export for FR
function generateCsv(sourceObj, targetObj, langName) {
  const rows = [['Key Path', 'English Original', `${langName} Translation`]];

  function flatten(sObj, tObj, prefix = '') {
    for (const k in sObj) {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (typeof sObj[k] === 'string') {
        const sVal = sObj[k].replace(/"/g, '""').replace(/\n/g, ' ');
        const tVal = (tObj && tObj[k] ? tObj[k] : '').replace(/"/g, '""').replace(/\n/g, ' ');
        rows.push([`"${fullKey}"`, `"${sVal}"`, `"${tVal}"`]);
      } else if (Array.isArray(sObj[k])) {
        sObj[k].forEach((item, idx) => {
          if (typeof item === 'string') {
            const sVal = item.replace(/"/g, '""').replace(/\n/g, ' ');
            const tVal = (tObj && tObj[k] && tObj[k][idx] ? tObj[k][idx] : '').replace(/"/g, '""').replace(/\n/g, ' ');
            rows.push([`"${fullKey}[${idx}]"`, `"${sVal}"`, `"${tVal}"`]);
          } else if (typeof item === 'object') {
            flatten(item, tObj && tObj[k] ? tObj[k][idx] : {}, `${fullKey}[${idx}]`);
          }
        });
      } else if (typeof sObj[k] === 'object' && sObj[k] !== null) {
        flatten(sObj[k], tObj ? tObj[k] : {}, fullKey);
      }
    }
  }

  flatten(sourceObj, targetObj);
  return rows.map(r => r.join(',')).join('\n');
}

const csvFR = generateCsv(newHomeEN, newHomeFR, 'French');
const csvAR = generateCsv(newHomeEN, newHomeAR, 'Arabic');

fs.writeFileSync(path.join(reviewDir, 'translations-fr.csv'), '\uFEFF' + csvFR, 'utf8');
fs.writeFileSync(path.join(reviewDir, 'translations-ar.csv'), '\uFEFF' + csvAR, 'utf8');

console.log('✓ Generated review/translations-fr.csv and review/translations-ar.csv');
