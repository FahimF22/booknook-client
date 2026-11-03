import Link from "next/link";
import { LuArrowUpRight, LuAtom, LuFeather, LuLandmark, LuShapes, LuToyBrick } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";

const categories = [
  { name: "Fiction", icon: LuFeather, text: "Classic novels and modern stories to get lost in." },
  { name: "Science", icon: LuAtom, text: "Space, nature and the big ideas behind how things work." },
  { name: "History", icon: LuLandmark, text: "True stories of people, empires and turning points." },
  { name: "Kids", icon: LuToyBrick, text: "Picture books and adventures for young readers." },
  { name: "Others", icon: LuShapes, text: "Self-help, strategy and everything in between." },
];

export default function TopCategories() {
  return (
    <section className="section page-container">
      <Reveal className="text-center">
        <p className="font-semibold uppercase tracking-widest text-secondary">Find your next read</p>
        <h2 className="section-title mt-2">Browse by Category</h2>
        <p className="section-subtitle mx-auto">Pick a shelf and see every book our readers have added to it.</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map(({ name, icon: Icon, text }, i) => (
          <Reveal key={name} delay={i * 0.08} className="h-full">
            <Link
              href={`/books?category=${name}`}
              className="group card h-full border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-secondary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                  <Icon className="h-6 w-6" />
                </span>
                <LuArrowUpRight className="h-5 w-5 text-base-content/40 transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-base-content/70">{text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
