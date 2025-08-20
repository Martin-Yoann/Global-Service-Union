// components/Partners.tsx
const logos = [
    "/baidu.svg",
    "/alibaba.svg",
    "/tengxun.svg",
    "/douyin.svg",
  ];
  
  export default function Partners() {
    return (
      <section className="bg-white py-12 px-6">
        <h2 className="text-center text-xl text-gray-500 font-semibold mb-8">Our Trusted Partners</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {logos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Partner ${i + 1}`}
              className="h-12 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </section>
    );
  }
  