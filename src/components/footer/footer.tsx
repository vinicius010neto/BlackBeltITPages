import { useState } from "react";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-5 px-8 flex justify-between items-center ">
      {/* Contatos */}
      <div className="flex items-center">
        {/* Número de contato 1 */}
        <div className="flex items-center mr-4" >
          <PhoneIcon style={{ color: "#D32727" }} />
          <p className="ml-2 font-medium">+55 81 3049-7999</p>
        </div>

        {/* Número de contato 2 */}
        <div className="flex items-center mr-4">
          <a href="https://api.whatsapp.com/send?phone=5581996527732&text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%A3o%20sobre%20os%20servi%C3%A7os%20e%20solu%C3%A7%C3%B5es%20da%20BlackBelt%20IT%20Solutions." className="transform transition duration-300 ease-in-out hover:scale-125">
            <WhatsAppIcon style={{ color: "#D32727" }} />{" "}
          </a>
          <p className="ml-2 font-medium">81 99652-7732</p>
        </div>

        {/* Número de contato 3 */}
        <div className="flex items-center">
          <a href="https://api.whatsapp.com/send?phone=5581999416031&text=Ol%C3%A1!%20Gostaria%20de%20obter%20mais%20informa%C3%A7%C3%A3o%20sobre%20os%20servi%C3%A7os%20e%20solu%C3%A7%C3%B5es%20da%20BlackBelt%20IT%20Solutions." className="transform transition duration-300 ease-in-out hover:scale-125">
            <WhatsAppIcon style={{ color: "#D32727" }} />
          </a>
          <p className="ml-2 font-medium">81 99941-6031</p>
        </div>

        {/* Email */}
        <div className="flex items-center ml-4">
          <a href="mailto:contato@bbitsolutions.com.br" className="transform transition duration-300 ease-in-out hover:scale-125">
            <EmailIcon style={{ color: "#D32727" }} />
          </a>
          <p className="ml-2 font-medium">contato@bbitsolutions.com.br</p>
        </div>
      </div>

      {/* Redes Sociais */}
      <div className="flex items-center">
        {/* Instagram */}
        <a href="https://www.instagram.com/bbitsolutions/" className="mr-4 transform transition duration-300 ease-in-out hover:scale-125">
          <InstagramIcon style={{ color: "#D32727" }} />
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/c/BlackBeltItSolutions"
          className="mr-4 transform transition duration-300 ease-in-out hover:scale-125"
        >
          <YouTubeIcon style={{ color: "#D32727" }} />
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/company/blackbelt-it-solutions/" className="transform transition duration-300 ease-in-out hover:scale-125">
          <LinkedInIcon style={{ color: "#D32727" }} />
        </a>
      </div>
    </footer>
  );
}
