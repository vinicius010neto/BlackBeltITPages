"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Importar animate.css no JavaScript
import "animate.css";
import MainLogin from "@/components/login/main";
import Cabecalho from "@/components/header/header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // Enviar info para o back
  const FetchingDataLogin = async (email: string, password: string) => {};

  return (
    <>
      
      <MainLogin />
    </>
  );
}
