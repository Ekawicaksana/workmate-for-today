export default function Header({ name }) {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Hello, {name}</h2>
        <p>{today}</p>
      </div>
    </div>
  );
}
