export type DcsEblParty = {
  name: string;
  identifier?: string;
};

export type EblIssueRequest = {
  shipmentReference: string;
  shipper: DcsEblParty;
  consignee: DcsEblParty;
  notifyParty?: DcsEblParty;
};

export type EblDocument = {
  eblId: string;
  shipmentReference: string;
  issuedAt: string;
  currentHolder: DcsEblParty;
  status: "Issued" | "Transferred";
};

const registry = new Map<string, EblDocument>();

export function issueEbl(req: EblIssueRequest): EblDocument {
  const eblId = `ebl_${req.shipmentReference}_${Math.random().toString(16).slice(2)}`;
  const doc: EblDocument = {
    eblId,
    shipmentReference: req.shipmentReference,
    issuedAt: new Date().toISOString(),
    currentHolder: req.consignee,
    status: "Issued",
  };
  registry.set(eblId, doc);
  return doc;
}

export function transferEbl(eblId: string, newHolder: DcsEblParty): EblDocument {
  const doc = registry.get(eblId);
  if (!doc) throw new Error("eBL not found");
  const updated: EblDocument = { ...doc, currentHolder: newHolder, status: "Transferred" };
  registry.set(eblId, updated);
  return updated;
}

export function getEbl(eblId: string): EblDocument | null {
  return registry.get(eblId) ?? null;
}

