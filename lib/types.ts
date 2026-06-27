/**
 * Firestore `projects` collection — document shape.
 * Add documents in the Firebase console with these fields:
 *   title     (string)   e.g. "Aurora Rebrand"
 *   category  (string)   e.g. "Brand identity"
 *   year      (string)   e.g. "2026"
 *   img       (string)   image URL (Storage download URL or any public URL)
 *   url       (string)   optional — clicking the card opens this link
 *   featured  (boolean)  optional — true makes the card span 2 columns
 *   order     (number)   optional — lower numbers sort first
 */
export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  img?: string;
  url?: string;
  featured?: boolean;
  order?: number;
};

/**
 * Firestore `logos` collection — the "trusted by" marquee.
 *   text   (string)   shown when there is no image
 *   img    (string)   optional logo image (compressed base64 or any URL)
 *   url    (string)   optional — clicking the logo opens this link
 *   order  (number)   optional — lower numbers appear first
 */
export type Logo = {
  id: string;
  text?: string;
  img?: string;
  url?: string;
  order?: number;
};
