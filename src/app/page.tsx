export default function Home() {
  return (
    <main className="section page-container flex-1 text-center">
      <h1 className="section-title">Welcome to BookNook</h1>
      <p className="section-subtitle mx-auto">Add a book, borrow a book, return a book.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button className="btn btn-primary">Browse Books</button>
        <button className="btn btn-accent">Add a Book</button>
      </div>
    </main>
  );
}
