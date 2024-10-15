import React, { ChangeEvent } from 'react'
import { viaCepResult } from './api/contracts/viaCep'
import { getInfoViaCepByZipCode } from './helpers/getInfoViacep'
import CepInformations from './modules/CepInformations'
import NavBar from './modules/Navbar'
import { InputCep } from 'react-input-cep'
type Status = 'Loading' | 'Success' | 'Error'

const HomePage = () => {
  const [isCepLoading, setIsCepLoading] = React.useState(false)
  const [cep, setCep] = React.useState<string>('')
  const [errorMsg] = React.useState<string>('')

  const [status, setStatus] = React.useState<Status>()
  const [data, setData] = React.useState<viaCepResult[] | undefined>()

  async function handleConsultViaCep(event: any) {
    try {
      event.preventDefault();
      if (cep) {
        setStatus('Loading');
        const dataInfoCep: viaCepResult | { erro: "true" } = await getInfoViaCepByZipCode(cep);
        let listDataInfo: viaCepResult[] = [];
  
        if ('erro' in dataInfoCep && dataInfoCep.erro === "true") {
          setStatus('Error');
        } else {
          listDataInfo.push(dataInfoCep);
          setData(listDataInfo);
          setStatus('Success');
        }
      }
    } catch (error) {
      setStatus('Error');
    }
  }
  
  return (
    <>
    <NavBar />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form onSubmit={handleConsultViaCep}>
        <div className="mt-2">
          <InputCep 
            placeholder="Digite o Cep que deseja consultar:"
            name="cep"
            onValueChange={value => setCep(value)}
            onLoading={(loadingStatus) => setIsCepLoading(loadingStatus)}
            disabled={isCepLoading}
            errorMsg={errorMsg}
          />
        </div>
        <input type="submit" value="Consultar" 
          className="cursor-pointer mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
      {status === 'Loading' && <>Carregando ...</>}
      {status === 'Error' && <>Erro!</>}
      {status === 'Success' && data && (
        <CepInformations  list={data} />
      )}
    </div>
    </>
  )
}

export default HomePage