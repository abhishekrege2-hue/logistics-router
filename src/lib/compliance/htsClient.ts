export type HtsClassificationRequest = {
  description: string;
  countryOfOrigin?: string;
  hsHints?: string[];
};

export type HtsClassificationResult = {
  hsCode: string;
  confidence: number; // 0..1
  dutyRatePercent?: number;
  explanation?: string;
};

export async function classifyHtsCode(
  req: HtsClassificationRequest,
): Promise<HtsClassificationResult> {
  const url = process.env.HTS_CLASSIFICATION_API_URL;
  const apiKey = process.env.HTS_CLASSIFICATION_API_KEY;

  // Scaffold: if not configured, return a deterministic mock.
  if (!url || !apiKey) {
    const normalized = req.description.toLowerCase();
    const isElectronics = /pcb|circuit|laptop|phone|semiconductor/.test(normalized);
    return {
      hsCode: isElectronics ? "8471.30" : "3926.90",
      confidence: 0.62,
      dutyRatePercent: isElectronics ? 0 : 6.5,
      explanation: "Mock classification (configure HTS_* env vars to enable real provider).",
    };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) throw new Error(`HTS provider error: ${res.status}`);
  const data = (await res.json()) as unknown;

  const parsed = data as Partial<HtsClassificationResult>;
  if (!parsed.hsCode || typeof parsed.confidence !== "number") {
    throw new Error("Invalid HTS provider response");
  }
  return {
    hsCode: parsed.hsCode,
    confidence: parsed.confidence,
    dutyRatePercent: parsed.dutyRatePercent,
    explanation: parsed.explanation,
  };
}

