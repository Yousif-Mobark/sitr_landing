import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PY_SNIPPET = `def sitr_encrypt(source: str, secret: bytes) -> str:\n    import hashlib, hmac\n    salt = hashlib.sha256(secret).digest()\n    mac = hmac.new(salt, source.encode(), hashlib.sha256)\n    return mac.hexdigest()\n\nif __name__ == "__main__":\n    code = open("main.py").read()\n    print(sitr_encrypt(code, b"s3cr3t"))`;

function useSha256Hex() {
  const enc = useMemo(() => new TextEncoder(), []);
  return async (text: string) => {
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
    const bytes = new Uint8Array(buf);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };
}

function useInterval(callback: () => void, delay: number) {
  const savedRef = useRef(callback);
  useEffect(() => {
    savedRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const id = setInterval(() => savedRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function ScrambleReveal({
  target,
  speed = 18,
  className,
}: {
  target: string;
  speed?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState("");
  const idxRef = useRef(0);
  useInterval(() => {
    if (idxRef.current < target.length) {
      idxRef.current += 2; // faster reveal
      setDisplay(target.slice(0, idxRef.current));
    }
  }, speed);
  useEffect(() => {
    idxRef.current = 0;
    setDisplay("");
  }, [target]);
  return (
    <code className={cn("font-mono text-sm leading-relaxed break-all", className)}>
      {display}
    </code>
  );
}

export default function CodeToHash() {
  const [cursor, setCursor] = useState(0);
  const [chunk, setChunk] = useState("");
  const [hash, setHash] = useState("");
  const sha256 = useSha256Hex();

  const lines = useMemo(() => PY_SNIPPET.split("\n"), []);

  useEffect(() => {
    let mounted = true;
    const next = async () => {
      const upto = lines.slice(0, cursor + 1).join("\n");
      setChunk(upto);
      try {
        const h = await sha256(upto);
        if (mounted) setHash(h);
      } catch {}
    };
    next();
    return () => {
      mounted = false;
    };
  }, [cursor, lines, sha256]);

  useInterval(() => {
    setCursor((c) => (c + 1) % lines.length);
  }, 1300);

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* glow decorations */}
      <div className="pointer-events-none absolute -inset-6 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_20%,theme(colors.emerald.500/12%),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_80%_30%,theme(colors.sky.500/10%),transparent_60%)]" />
      </div>

      <div className="rounded-lg border bg-gradient-to-b from-background/60 to-background/30 backdrop-blur shadow-lg p-4 lg:p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>python ▶ sitr_encrypt()</span>
        </div>
        <pre className="font-mono text-[13px] leading-relaxed text-muted-foreground/90 overflow-hidden">
{chunk}
<span className="animate-pulse">▌</span>
        </pre>
      </div>

      <div className="rounded-lg border bg-gradient-to-b from-emerald-500/10 to-sky-500/10 p-4 lg:p-5">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>SHA-256</span>
          <span className="uppercase tracking-widest text-emerald-400">hash</span>
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-background/60 p-3">
          <ScrambleReveal target={hash} className="text-emerald-300/95" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Deterministic HMAC digest of your source. No plaintext leaves your browser.
        </p>
      </div>
    </div>
  );
}
