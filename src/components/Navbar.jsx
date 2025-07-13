import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/logo.svg" alt="Kampuz" className="h-8 w-8" />
          <span className="text-primary">Kampuz</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link to="/notes" className="hover:text-primary transition-colors">Notes</Link>
          <Link to="/bazaar" className="hover:text-primary transition-colors">Bazaar</Link>
          <Link to="/doubts" className="hover:text-primary transition-colors">Doubts</Link>
        </nav>

        <div className="flex gap-2">
          <Button variant="outline">Login</Button>
          <Button className="bg-primary hover:bg-primary-dark">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}