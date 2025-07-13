import { Card } from "../components/Card";
import { Book, ShoppingCart, MessageSquare, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your <span className="text-primary">Campus SuperApp</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Notes, Marketplace, Doubt Solving - All in One Place
        </p>
      </section>

      {/* Features Grid */}
      <section className="container py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          icon={<Book size={24} />}
          title="Smart Notes"
          description="Access 1000+ student-contributed notes"
          actionText="Browse Notes"
        />
        <Card 
          icon={<ShoppingCart size={24} />}
          title="Campus Bazaar"
          description="Buy/Sell books, gadgets & more"
          actionText="Visit Marketplace"
        />
        <Card 
          icon={<MessageSquare size={24} />}
          title="Doubt Solver"
          description="Get instant help from seniors"
          actionText="Ask a Question"
        />
        <Card 
          icon={<FileText size={24} />}
          title="Assignment Help"
          description="AI-powered assignment generator"
          actionText="Try Now"
        />
      </section>
    </div>
  );
}