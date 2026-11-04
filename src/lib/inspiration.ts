export const INSPIRATION_KEY = 'floral-edit-inspiration-v1';
export const INSPIRATION_LIMIT = 8;

export function readInspiration(raw: string | null, knownIds: readonly string[]): string[] {
  try {
    const value: unknown = JSON.parse(raw || 'null');
    if (!Array.isArray(value)) return [];
    const known = new Set(knownIds);
    return [...new Set(value.filter((id): id is string => typeof id === 'string' && known.has(id)))].slice(0, INSPIRATION_LIMIT);
  } catch { return []; }
}

export function toggleInspiration(ids: readonly string[], id: string, knownIds: readonly string[]): string[] {
  const current = readInspiration(JSON.stringify(ids), knownIds);
  if (!knownIds.includes(id)) return current;
  if (current.includes(id)) return current.filter(item => item !== id);
  return current.length < INSPIRATION_LIMIT ? [...current, id] : current;
}
