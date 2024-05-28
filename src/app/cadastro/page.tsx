"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/header/header";
// Importar animate.css no JavaScript
import "animate.css";
import Image from "next/image";
import MainCadastro from "@/components/cadastro/ccadastro";

export default function Cadastro() {



  return (
    <>
      <MainCadastro/>
    </>
  );
}
