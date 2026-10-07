import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const loadDict = dictionaries[locale as keyof typeof dictionaries];
  if (!loadDict) {
    return dictionaries["en"]();
  }
  return loadDict();
};
