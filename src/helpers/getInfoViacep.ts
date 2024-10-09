import axios from "axios";
import { viaCepResult } from "../api/contracts/viaCep";

export async function getInfoViaCepByZipCode(cep: string): Promise<viaCepResult> {
  try {
  const result: viaCepResult = ((await axios.get(`http://localhost:7500/consulta-cep?cep=${cep}`)).data)
  return result
  }catch (error) {
    console.error('Erro ao buscar histórico de CEP:', error);
    throw new Error('Não foi possível buscar o histórico de CEP');
  }
}

export async function getCepHistorico(): Promise<viaCepResult[]> {
  try {
    const response = await axios.get('http://localhost:7500/historico-cep');
    const result: viaCepResult[] = response.data;
    return result;
  } catch (error) {
    console.error('Erro ao buscar histórico de CEP:', error);
    throw new Error('Não foi possível buscar o histórico de CEP');
  }
}
