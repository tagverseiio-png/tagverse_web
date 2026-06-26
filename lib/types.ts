/**
 * Firestore `projects` collection — document shape.
 * Add documents in the Firebase console with these fields:
 *   title     (string)   e.g. "Aurora Rebrand"
 *   category  (string)   e.g. "Brand identity"
 *   year      (string)   e.g. "2026"
 *   img       (string)   image URL (Storage download URL or any public URL)
 *   featured  (boolean)  optional — true makes the card span 2 columns
 *   order     (number)   optional — lower numbers sort first
 */
export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  img?: string;
  featured?: boolean;
  order?: number;
};
