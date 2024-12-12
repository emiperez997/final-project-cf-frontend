import { Hero } from "../components/Hero";

export function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        flexDirection: "column",
      }}
    >
      <Hero
        title="Bienvenidos al blog de Cody"
        subtitle="Un blog de tecnología y desarrollo web"
      />
    </div>
  );
}
