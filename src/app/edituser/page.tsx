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
import MainEditUser from "@/components/cedituser/edituser";

export default function EditUser() {

  return (
    <MainEditUser/>
  );
}