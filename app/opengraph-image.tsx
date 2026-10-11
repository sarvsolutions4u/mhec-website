import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Muscat Higher Education Centre — recognised qualifications and job-ready skills";

export default function Image() {
  return ogImage({ kicker: "25 years in Muscat", title: "Secure a recognised qualification. Build the skills to use it." })
}
