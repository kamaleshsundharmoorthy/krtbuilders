import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import sharp from "sharp";

import { Users, Media, Enquiries } from "./cms/collections/Core";
import { Services, Projects, Packages, MaterialCategories, ProcessSteps, Testimonials, Faqs, Reasons } from "./cms/collections/Content";
import { CompanySettings, HomePage, Customizer } from "./cms/globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " · Website admin" },
    components: {
      graphics: { Logo: "/cms/components/Brand#AdminLogo", Icon: "/cms/components/Brand#AdminIcon" },
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    // Website
    Services,
    ProcessSteps,
    Reasons,
    Testimonials,
    Faqs,
    // Projects
    Projects,
    // Packages & Materials
    Packages,
    MaterialCategories,
    // Leads
    Enquiries,
    // Settings
    Media,
    Users,
  ],
  globals: [HomePage, Customizer, CompanySettings],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "types/payload-types.ts") },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || "" }),
  // Email is optional: set SMTP_* in .env to send new-enquiry alerts and password resets.
  // Without it, emails are printed to the server console instead.
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER || "",
          defaultFromName: process.env.SMTP_FROM_NAME || "Website",
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          },
        }),
      }
    : {}),
  sharp,
  plugins: [
    // Uploads go to Vercel Blob when a token is present (production on Vercel).
    // Without a token (local development) they are stored in /media on disk.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Uploads go straight from the browser to Blob storage, avoiding
      // Vercel's 4.5 MB request limit for large photos.
      clientUploads: true,
    }),
  ],
});
