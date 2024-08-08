import axios from "axios";
import { viaCepResult } from "../api/contracts/viaCep";

export async function getInfoViaCepByZipCode(cep: string): Promise<viaCepResult> {
  const result: viaCepResult = ((await axios.get(`http://localhost:7500/consulta-cep?cep=${cep}`)).data)
  return result
}