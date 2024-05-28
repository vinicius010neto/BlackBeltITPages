"use client";
import Image from "next/image";
import { TextField } from "@mui/material";
import Carousel from "@/components/login/backgroundcarousel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "animate.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import bcrypt from 'bcryptjs';






export default function MainLogin() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const navigation = useRouter();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };


  // Navegação de tela
  const HandleNavigation = (destino: string) => {
    navigation.push(destino);
  };

  const FetchingDataLogin = async (email: string, password: string) => {
    try {
      
      const response = await axios.post(
        "http://54.94.70.171:3000/users/login",
        {
          email,
          password,
        }
      );
      const {token} = response.data;
      localStorage.setItem('token', token);
      HandleNavigation("/home");

    

    } catch (error: any) {
      // Verificação de tipo de erro e tratamento apropriado
      if (isDevelopment) {
        if (error.response) {
          // Erros de resposta do servidor
          console.error("Erro de resposta do servidor:", error.response.data);
        } else if (error.request) {
          // Erros de solicitação (sem resposta do servidor)
          console.error("Erro de solicitação:", error.request);
        } else {
          // Erros ao configurar a solicitação
          console.error("Erro ao configurar a solicitação:", error.message);
        }
      }

      setErrorMessage("Erro ao fazer login. Por favor, tente novamente.");
      setOpen(true);
    }
  };
  return (
    <div className="h-screen bg-black">
      <Carousel />

      <div className="absolute bottom-0 left-0 p-4"></div>

      <div className="flex items-center justify-center h-full relative">
        <div className="flex flex-col gap-8 bg-white rounded-lg shadow-lg min-w-80 p-8 w-1/4 xl:p-8 relative z-10 animate__animated animate__zoomIn">
          <div className="flex justify-center items-center"></div>
          <div className="flex justify-center">
            <Image src="/Logo 2.png" alt="Logo" width={240} height={200} />
          </div>
          <div className="xl:mb-8">
            <TextField
              variant="outlined"
              label="Email"
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
            />
          </div>
          <div className="xl:mb-8">
            <TextField
              variant="outlined"
              label="Senha"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
            />
          </div>
          <button
            className="bg-gradient-radial from-light-black to-black text-white font-bold py-2 px-4 rounded mt-2 transform transition duration-300 ease-in-out hover:scale-105"
            onClick={() => FetchingDataLogin(email, password)}
          >
            Login
          </button>
          <button
            className="text-orangeCustom font-bold py-2 px-4 rounded mt-2 border-2 border-orangeCustom transform transition duration-300 ease-in-out hover:text-white hover:bg-orangeCustom hover:scale-105 hover:border-orangeCustom"
            onClick={() => HandleNavigation("/cadastro")}
          >
            Cadastre-se
          </button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
