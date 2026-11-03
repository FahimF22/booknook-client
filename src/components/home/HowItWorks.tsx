import { LuBookmarkCheck, LuBookOpen, LuSearch, LuUndo2 } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    icon: LuSearch,
    title: "Find a book",
    text: "Browse the shelf or open New Arrivals to see what other readers have shared.",
  },
  {
    icon: LuBookmarkCheck,
    title: "Borrow it",
    text: "Open the book's page, press Borrow This Book and confirm. It's that quick.",
  },
  {
    icon: LuBookOpen,
    title: "Read for 7 days",
    text: "The book is yours for a week. Track every borrow and its return date in My Borrows.",
  },
  {
    icon: LuUndo2,
    title: "Return it",
    text: "Done reading? Press Return Book so the copy goes back on the shelf for the next reader.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-base-300 bg-base-200">
      <div className="section page-container">
        <Reveal className="text-center">
          <p className="font-semibold uppercase tracking-widest text-secondary">Simple as 1, 2, 3, 4</p>
          <h2 className="section-title mt-2">How Borrowing Works</h2>
          <p className="section-subtitle mx-auto">
            No library card, no fees. Borrow a book from a fellow reader in four easy steps.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="h-full">
              <Reveal
                delay={i * 0.1}
                className="card h-full border border-base-300 bg-base-100 p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-serif text-4xl font-semibold text-base-content/15">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-base-content/70">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
