import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function useScrollY() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

export default function Layout() {
  const scrolled = useScrollY();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-colors",
          scrolled
            ? "backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b"
            : "bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-emerald-400 shadow-[0_0_40px_-10px_theme(colors.emerald.400/60%)]" />
            <span className="font-extrabold tracking-tight">SITR</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-primary">
              Features
            </a>
            <a href="#how" className="hover:text-primary">
              How it works
            </a>
            <a href="#pricing" className="hover:text-primary">
              Pricing
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="#docs">Docs</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="shadow-[0_0_40px_-10px_theme(colors.emerald.400/60%)]"
            >
              <a href="#get-started">Get Started</a>
            </Button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} SITR. Secure Intelligence for Trusted
            Repos.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#terms" className="hover:text-foreground">
              Terms
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
