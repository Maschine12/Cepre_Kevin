import Button from "@/components/ui/buton";

function HomePage() {

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative w-full h-full">
          <img src="../images/ImagenTecnica1.jpg" alt="Cepre_Unajma" />
        </div>
        <div className="container absolute flex flex-col items-center justify-center">
          <div className="flex flex-col w-full md:w-7/12 lg:w-6/12">
            <div className="flex flex-col items-center title-none bg-slate-200 p-5 rounded-3xl bg-opacity-80">
              <h1 className="text-7xl text-center font-semibold xl:mt-0">
                ¡Bienvenido al Cepre de la Unajma 2025!
              </h1>
              <p className="slogan text-center p-5 text-4xl">
                ¿Listo para empezar una nueva etapa?
              </p>
              <Button className="mt-3">Incripción</Button>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default HomePage;
