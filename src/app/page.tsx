export default function Home() {
  return (
    <main className="flex-1 grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-bold">BookNook</h1>
        <p className="mt-2 opacity-70">Add a book, borrow a book, return a book.</p>
        <button className="btn btn-primary mt-6">Browse Books</button>
      </div>
    </main>
  );
}
