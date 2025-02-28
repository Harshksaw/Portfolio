import PhoneShowcase from "./PhoneShowcase";

const Showcase = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-16 py-20 bg-gradient-to-b from-black to-gray-900">
      <h2 className="text-4xl text-white font-bold">Showcase</h2>

      {/* Mobile App Showcase */}
      <div className="flex flex-col items-center">
        <h3 className="text-2xl text-gray-300 mb-4">Mobile App</h3>
        <PhoneShowcase />
      </div>
    </section>
  );
};

export default Showcase;
