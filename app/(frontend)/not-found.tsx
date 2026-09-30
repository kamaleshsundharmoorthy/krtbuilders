import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-secondary pt-24 text-white">
      <div className="container-x">
        <p className="eyebrow text-white/60">404</p>
        <h1 className="display-xl mt-6">Nothing<br /><span className="text-primary">built here.</span></h1>
        <div className="mt-10"><ButtonLink href="/">Back to home</ButtonLink></div>
      </div>
    </section>
  );
}
