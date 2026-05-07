export type X12Segment = {
  tag: string;
  elements: string[];
};

export type X12ParseResult = {
  interchange?: X12Segment;
  functionalGroup?: X12Segment;
  transactionSet?: X12Segment;
  segments: X12Segment[];
};

/**
 * Minimal ANSI X12 segment parser:
 * - Splits on segment terminator (default "~")
 * - Splits elements on delimiter (default "*")
 *
 * This is a scaffold for legacy integration, not a full X12 validator.
 */
export function parseX12(
  raw: string,
  options?: { segmentTerminator?: string; elementDelimiter?: string },
): X12ParseResult {
  const segmentTerminator = options?.segmentTerminator ?? "~";
  const elementDelimiter = options?.elementDelimiter ?? "*";

  const segments: X12Segment[] = raw
    .split(segmentTerminator)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((seg) => {
      const [tag, ...elements] = seg.split(elementDelimiter);
      return { tag, elements };
    });

  const first = segments[0];
  const interchange = segments.find((s) => s.tag === "ISA");
  const functionalGroup = segments.find((s) => s.tag === "GS");
  const transactionSet = segments.find((s) => s.tag === "ST");

  // If ISA is missing but input has some segments, treat first as interchange.
  return {
    interchange: interchange ?? (first ? first : undefined),
    functionalGroup,
    transactionSet,
    segments,
  };
}

