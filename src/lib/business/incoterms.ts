import type { Incoterm } from "@/lib/types/logistics-ledger";

export type RiskTransferPoint =
  | "SellerPremises"
  | "LoadedOnVessel"
  | "ArrivalPort"
  | "DeliveredToBuyer";

export type IncotermDecision = {
  incoterm: Incoterm;
  riskTransferPoint: RiskTransferPoint;
  triggers: Array<"BillingTriggered" | "InsuranceBound">;
};

export function evaluateIncoterms(incoterm: Incoterm): IncotermDecision {
  switch (incoterm) {
    case "EXW":
      return { incoterm, riskTransferPoint: "SellerPremises", triggers: ["BillingTriggered"] };
    case "FOB":
      return { incoterm, riskTransferPoint: "LoadedOnVessel", triggers: ["BillingTriggered"] };
    case "CIF":
      return { incoterm, riskTransferPoint: "LoadedOnVessel", triggers: ["BillingTriggered", "InsuranceBound"] };
    case "DDP":
      return { incoterm, riskTransferPoint: "DeliveredToBuyer", triggers: ["BillingTriggered", "InsuranceBound"] };
  }
}

