"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

export default function Header() {
  const [userName, setUserName] = useState("");
  const navigation = useRouter();
  const HandleNavigation = (destino: string) => {
    navigation.push(destino);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // State para controlar a exibição do menu hamburguer lateral
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      HandleNavigation("/");
    } else {
      fetchUserData(token);
    }
  }, []);

  // Verifica o tamanho da tela ao carregar a página e sempre que a largura da tela mudar
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Defina o limite de largura para uma tela pequena
    };
    handleResize(); // Verifica o tamanho da tela ao carregar a página
    window.addEventListener("resize", handleResize); // Verifica o tamanho da tela sempre que a largura da tela mudar
    return () => window.removeEventListener("resize", handleResize); // Remove o event listener ao desmontar o componente
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get("http://54.94.70.171:3000/users/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const { data } = response;
        const firstName = data.name.split(" ")[0]; // Pega apenas o primeiro nome
        setUserName(firstName);
      } else {
        // Handle invalid token or other errors
        localStorage.removeItem("token");
        HandleNavigation("/");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      HandleNavigation("/");
    }
  };

  const handleLogout = () => {
    // Limpa o token do localStorage
    localStorage.removeItem("token");
    // Redireciona o usuário para a tela de login
    HandleNavigation("/");
  };

  return (
    <header className="bg-white shadow-lg flex items-center justify-between px-4 py-2">
      {/* Logo */}
      <div className="flex items-center ml-10">
        <Image src="/Logo 2.png" alt="Logo" width={160} height={120} />
      </div>

      {/* Renderiza o menu hamburguer lateral quando a tela for pequena */}
      {isSmallScreen && (
        <MenuIcon
          className="mr-4 cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
      )}
      {isSmallScreen && (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List>
            <ListItem button onClick={() => HandleNavigation("/home")}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => HandleNavigation("/dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => HandleNavigation("/planos")}>
              <ListItemText primary="Planos" />
            </ListItem>
            <ListItem button onClick={() => handleLogout()}>
              <LogoutIcon style={{ color: "#D32727" }} />
            </ListItem>
          </List>
        </Drawer>
      )}

      {/* Renderiza o menu de navegação normal quando a tela for grande */}
      {!isSmallScreen && (
        <nav className="flex items-center ml-16">
          <button className="mr-20 text-gray-800 text-xl font-medium hover:text-orangeCustom border-transparent hover:border-orangeCustom hover:border-b-4">
            {" "}
            Home
          </button>
          <button
            className="mr-20 text-gray-800 text-xl font-medium hover:text-orangeCustom border-transparent hover:border-orangeCustom hover:border-b-4"
            onClick={() => HandleNavigation("/dashboard")}
          >
            {" "}
            Dashboard
          </button>
          <button className="mr-20 text-gray-800 text-xl font-medium hover:text-orangeCustom border-transparent hover:border-orangeCustom hover:border-b-4">
            {" "}
            Planos
          </button>
        </nav>
      )}

      {/* Renderiza o nome do usuário */}
      {!isSmallScreen && (
        
        <div className="flex">
          <p className="text-gray-800 text-xl">
            Olá, <span className="font-medium text-xl">{userName}</span>
          </p>
          
          <button onClick={() => HandleNavigation("/edituser")}>
            <EditIcon className="ml-5" style={{ color: "#D32727" }}  />
          </button>
          <button className="ml-5" onClick={handleLogout}>
            <LogoutIcon style={{ color: "#D32727" }} />
          </button>
        </div>
      )}
    </header>
  );
}
