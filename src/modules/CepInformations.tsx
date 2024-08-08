import { viaCepResult } from '../api/contracts/viaCep'

const CepInformations = (data: viaCepResult) => {
  return (
    <>
      <div>{data.bairro}</div>
      <div>{data.cep}</div>
      <div>{data.complemento}</div>
      <div>{data.ddd}</div>
      <div>{data.gia}</div>
      <div>{data.ibge}</div>
      <div>{data.localidade}</div>
      <div>{data.logradouro}</div>
      <div>{data.siafi}</div>
      <div>{data.uf}</div>
    </>
  )
}

export default CepInformations