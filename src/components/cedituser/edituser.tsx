"use client";
import Image from "next/image";
import { TextField } from "@mui/material";
import Carousel from "@/components/login/backgroundcarousel";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Importar animate.css no JavaScript
import "animate.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import bcrypt from "bcryptjs";
import { Token } from "@mui/icons-material";

export default function MainEditUser() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentname, setCurrentname] = useState("");
  const navigation = useRouter();

  //Navegação de tela
  const HandleNavigation = (destino: string) => {
    navigation.push(destino);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      HandleNavigation("/");
    } else {
      fetchUserData(token);
    }
  }, []);
  const [oldPassword, setOldPassword] = useState(""); // Novo estado para a senha antiga
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

    // Chamada de API para buscar os dados atuais do usuário
    const fetchUserData = async (token: string) => {
      try {
        const response = await axios.get("http://54.94.70.171:3000/users/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
    
        if (response.status === 200) {
          const { data } = response;
          setCurrentEmail(data.email);
          setCurrentname(data.name);
        } else {
          // Tratar erros aqui, como token inválido
          // Por exemplo, remover o token do localStorage e redirecionar para a página inicial
          localStorage.removeItem("token");
          HandleNavigation("/");
        }
      } catch (error: any) {
        // Tratar outros erros, como falha na requisição
        if (isDevelopment) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
        setErrorMessage("Erro ao buscar dados do usuário. Por favor, tente novamente.");
        setOpen(true);
      }
    };
    // Chama a função para buscar os dados do usuário

    


  // Enviar info para o back

  const updateUserData = async (
    name: string,
    email: string,
    oldPassword: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      // Verificar se a senha nova e a confirmação de senha coincidem
      if (password !== confirmPassword) {
        throw new Error("A senha e a confirmação de senha não coincidem.");
      }

      // Chamada de API para atualizar os dados do usuário
      const response = await axios.put(
        "http://54.94.70.171:3000/users/profile",
        {
          name,
          email,
          oldPassword,
          password,
          confirmPassword
        }
      );

      console.log("Dados atualizados:", response.data); // Log da resposta de sucesso
      setErrorMessage("Dados atualizados com sucesso!"); // Define a mensagem de sucesso
      setOpen(true);  //HandleNavigation("/home")
      // HandleNavigation("/home")// Abre o Snackbar com a mensagem de sucesso
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

      setErrorMessage("Erro ao atualizar cadastro. Por favor, tente novamente.");
      setOpen(true);
    }
  };


  return (
    <div className="h-screen bg-black">
      <Carousel />

      <div className="absolute bottom-0 left-0 p-4"></div>

      <div className="flex items-center justify-center h-full relative">
        <div className="bg-white rounded-lg shadow-lg min-w-80 p-8 w-1/3 xl:p-8 relative z-10 animate__animated animate__zoomIn">
          <div className="flex justify-center">
            <Image src="/Logo 2.png" alt="Logo" width={240} height={200} />
          </div>
          <div className="text-xl font-medium flex justify-center mb-4">
            <h1>Edição de usuário</h1>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-1/2">
              <TextField
                variant="outlined"
                label="Nome Completo"
                type="text"
                required
                onChange={(e) => setname(e.target.value)}
                value={name}
                fullWidth
                helperText={`Nome atual: ${currentname}`}
              />
              <TextField
                variant="outlined"
                label="Email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                fullWidth
                helperText={`Email atual: ${currentEmail}`}
              />
              <TextField
                variant="outlined"
                label="Senha Antiga"
                type="password"
                required
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <TextField
                variant="outlined"
                label="Nova Senha"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
              />
              <div className="mt-6">
              <TextField
                variant="outlined"
                label="Confirmar Nova Senha"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                fullWidth
              />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="text-orangeCustom font-bold py-2 px-4 rounded border-2 border-orangeCustom transform transition duration-300 ease-in-out hover:text-white hover:bg-orangeCustom hover:scale-105 hover:border-orangeCustom"
              onClick={() => updateUserData(name, email, oldPassword, password, confirmPassword)}
            >
              Atualizar
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
      />
    </div>
  );
}
