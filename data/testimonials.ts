import type { Testimonial } from "@/types/content";
import { images } from "./images";

/**
 * TESTIMONIALS — PLACEHOLDER
 *
 * These are sample testimonials for layout only. Replace them with real,
 * consented client testimonials before launch — never publish these as genuine.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Client Name [placeholder]",
    project: "The Courtyard House",
    location: "Madurai",
    quote:
      "Sample testimonial — replace with a real client quote. Describe what the experience of building with the team was like, what stood out, and how the finished home feels to live in.",
    image: images.testimonials.t1,
    placeholder: true,
  },
  {
    id: "t2",
    name: "Client Name [placeholder]",
    project: "The Horizon Villa",
    location: "Coimbatore",
    quote:
      "Sample testimonial — replace with a real client quote. A good testimonial mentions a specific moment: a design decision, how an issue on site was handled, or the day of handover.",
    image: images.testimonials.t2,
    placeholder: true,
  },
  {
    id: "t3",
    name: "Client Name [placeholder]",
    project: "The Urban Residence",
    location: "Chennai",
    quote:
      "Sample testimonial — replace with a real client quote. Keep it to two or three sentences in the client's own words, with their permission to publish.",
    image: images.testimonials.t3,
    placeholder: true,
  },
];
