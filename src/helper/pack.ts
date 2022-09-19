import { translate } from "@/composable/useTranslate";

function pricingTypeLabel(type: string) {
  if (type === "per_person") {
    return translate("netPerson");
  } else {
    return translate("netSet");
  }
}

export { pricingTypeLabel };
