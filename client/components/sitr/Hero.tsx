import { Button } from "@/components/ui/button";
import CodeToHash from "./CodeToHash";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_-10%,theme(colors.emerald.500/12%),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-grid" />
      </div>

      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            End-to-end source protection
          </div>
          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Encrypt Python source with confidence — meet <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">SITR</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base/7 text-muted-foreground sm:text-lg/8">
            A modern platform for encrypting, licensing, and verifying Python code. Built for teams shipping sensitive IP.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="px-8">
              Start encrypting
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="#how">How it works</a>
            </Button>
          </div>
        </div>

        <div className="mt-14">
          <CodeToHash />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 text-center text-xs text-muted-foreground sm:grid-cols-4">
          <div>Client-side hashing</div>
          <div>Hardware-backed keys</div>
          <div>Audit-ready logs</div>
          <div>Open SDKs</div>
        </div>
      </div>
    </section>
  );
}
