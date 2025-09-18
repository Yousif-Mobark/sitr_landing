import Hero from "@/components/sitr/Hero";
import { Button } from "@/components/ui/button";

function SectionTitle({ id, eyebrow, title, desc }: { id: string; eyebrow?: string; title: string; desc?: string }) {
  return (
    <div id={id} className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

export default function Index() {
  return (
    <div className="relative">
      {/* Hero with python->hash animation */}
      <Hero />

      {/* Features */}
      <section id="features" className="container py-20">
        <SectionTitle
          id="features"
          eyebrow="Why SITR"
          title="Security that feels invisible"
          desc="Powerful cryptography and delightful DX, without compromises."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Client-first encryption",
              desc: "HMAC + SHA-256 hashing in the browser. Plaintext never leaves the device.",
            },
            {
              title: "Key management",
              desc: "Rotate, revoke, and scope keys with hardware-backed storage.",
            },
            {
              title: "Tamper-proof licensing",
              desc: "Bind execution to devices, users, or environments.",
            },
            {
              title: "Audit-ready",
              desc: "Signed logs for every operation. SOC2-friendly exports.",
            },
            {
              title: "Fast SDKs",
              desc: "Python, JS, and CLI tooling designed for CI/CD.",
            },
            {
              title: "Scales with you",
              desc: "Start free. Upgrade as your team grows.",
            },
          ].map((f) => (
            <div key={f.title} className="group rounded-xl border bg-background/60 p-6 backdrop-blur transition-colors hover:border-emerald-400/40">
              <div className="mb-3 h-10 w-10 rounded-md bg-gradient-to-br from-emerald-400/70 to-sky-400/70" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative overflow-hidden border-t">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(800px_500px_at_100%_0%,theme(colors.sky.500/12%),transparent_40%)]" />
        <div className="container py-20">
          <SectionTitle
            id="how"
            eyebrow="3 steps"
            title="Encrypt. Ship. Verify."
            desc="From local dev to production without exposing your IP."
          />
          <ol className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                title: "Encrypt",
                desc: "Drop code in, choose policy, generate artifacts.",
              },
              {
                title: "Ship",
                desc: "Publish encrypted wheels or bundles to your registry.",
              },
              {
                title: "Verify",
                desc: "Runtime attestation + licensing to keep control.",
              },
            ].map((s, i) => (
              <li key={s.title} className="relative rounded-xl border bg-background/60 p-6">
                <div className="absolute -top-3 left-6 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">{i + 1}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="pricing" className="container py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-8 text-center">
          <h3 className="text-2xl font-bold">Simple, transparent pricing</h3>
          <p className="mt-2 text-muted-foreground">Start free. Upgrade when you need advanced policies and team features.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="rounded-xl border bg-background/60 p-6">
              <div className="text-3xl font-extrabold">Free</div>
              <p className="text-sm text-muted-foreground">Personal projects</p>
            </div>
            <div className="rounded-xl border bg-background/60 p-6 ring-2 ring-emerald-400/50">
              <div className="text-3xl font-extrabold">Pro</div>
              <p className="text-sm text-muted-foreground">Teams & companies</p>
            </div>
          </div>
          <div id="get-started" className="mt-8">
            <Button size="lg" className="px-8">Get started — it’s free</Button>
          </div>
        </div>
      </section>

      {/* FAQ Placeholder */}
      <section id="faq" className="container pb-24">
        <SectionTitle id="faq" eyebrow="FAQ" title="Questions?" desc="Tell me what pages you want and I’ll generate them next." />
      </section>
    </div>
  );
}
