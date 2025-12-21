export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd') // Handle Vietnamese 'đ'
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (excluding spaces and hyphens)
    .replace(/[\s_-]+/g, '-') // Collapse whitespace and hyphens to a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
