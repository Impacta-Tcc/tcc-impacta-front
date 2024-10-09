import React, { ChangeEvent } from 'react'
import { viaCepResult } from './api/contracts/viaCep'
import { getInfoViaCepByZipCode } from './helpers/getInfoViacep'
import CepInformations from './modules/CepInformations'
import NavBar from './modules/Navbar'
type Status = 'Loading' | 'Success' | 'Error'

const HomePage = () => {
  const [cepToSearch, setCepToSearch] = React.useState<string>()
  const [cep] = React.useState()
  const [status, setStatus] = React.useState<Status>()
  const [data, setData] = React.useState<viaCepResult[] | undefined>()


  function handleChangeSearchCep(text: ChangeEvent<HTMLInputElement>) {
    setCepToSearch(text.target.value)
  }
  async function handleConsultViaCep(event: any) {
    try {
      event.preventDefault();
      if (cepToSearch) {
        setStatus('Loading');
        const dataInfoCep: viaCepResult | { erro: "true" } = await getInfoViaCepByZipCode(cepToSearch);
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
        <label htmlFor="consultCep" className="block text-sm font-medium leading-6 text-gray-900">
          Digite o Cep que deseja consultar:
        </label>
        <div className="mt-2">
          <input type="text" name="consultCep" id="consultCep" 
            value={cep} onChange={(text) => handleChangeSearchCep(text)} maxLength={10} 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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