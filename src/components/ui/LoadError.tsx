export default function LoadError({ message }: { message: string }) {
  return (
    <p role="alert" className="mx-auto max-w-md rounded-lg bg-error/10 px-4 py-3 text-center text-error">
      {message}
    </p>
  );
}
