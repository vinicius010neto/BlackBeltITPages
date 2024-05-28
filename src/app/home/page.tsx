"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Carouselhome from "./backgroundcarouselhome";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";


import "animate.css";

export default function Home() {

  const navigation = useRouter();

  const HandleNavigation = (destino: string) => {
    navigation.push(destino);
  };


  // State para controlar se a tela é pequena
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Verifica o tamanho da tela ao carregar a página e sempre que a largura da tela mudar
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Define o limite de largura para uma tela pequena
    };
    handleResize(); // Verifica o tamanho da tela ao carregar a página
    window.addEventListener("resize", handleResize); // Verifica o tamanho da tela sempre que a largura da tela mudar
    return () => window.removeEventListener("resize", handleResize); // Remove o event listener ao desmontar o componente
  }, []);

  

  return (
    <>
      <div className="flex flex-col h-screen bg-black">
        <Carouselhome />

        <div className="flex-grow relative">
          <Header />

          <div className="grid grid-cols-12 h-full">
            {/* Espaço para as colunas */}
            <div className="col-span-3" />

            {/* Colunas com o texto */}
            <div className="col-span-8 flex items-center justify-end text-center text-white">
              <div>
                <p className="text-5xl font-bold">SOMOS FAIXA PRETA</p>
                <p className="text-5xl font-bold"> EM SEGURANÇA</p>
                <p className="text-5xl font-bold"> DA INFORMAÇÃO</p>
                <p>
                  Deseja obter mais informações sobre como proteger seu negócio?
                </p>
                <p>
                  Fique á vontade para entrar em contato conosco e descobrir
                  como podemos ajudar!
                </p>
                <button className="text-white font-bold py-2 px-4 rounded mt-2 border-2 border-white transform transition duration-300 ease-in-out hover:text-black hover:bg-white hover:scale-105">
                  <a href="https://api.whatsapp.com/send?phone=5581996527732&text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%A3o%20sobre%20os%20servi%C3%A7os%20e%20solu%C3%A7%C3%B5es%20da%20BlackBelt%20IT%20Solutions.">
                    SAIBA MAIS
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Renderiza o Footer apenas se a tela não for pequena */}
        {!isSmallScreen && (
          <div className="relative">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
