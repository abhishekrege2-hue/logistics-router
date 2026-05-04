/** Half-hour slots for "Open Before" / "Open After" selectors. */
export function generateTimeOptions(): string[] {
  const out: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      const mm = m === 0 ? "00" : "30";
      out.push(`${hour12}:${mm} ${ampm}`);
    }
  }
  return out;
}
