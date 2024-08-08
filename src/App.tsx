import React, { ChangeEvent } from 'react'
import { viaCepResult } from './api/contracts/viaCep'
import { getInfoViaCepByZipCode } from './helpers/getInfoViacep'
import CepInformations from './modules/CepInformations'
type Status = 'Loading' | 'Success' | 'Error'

const App = () => {
  const [cepToSearch, setCepToSearch] = React.useState<string>()
  const [cep] = React.useState()
  const [status, setStatus] = React.useState<Status>()
  const [data, setData] = React.useState<viaCepResult | undefined>()

  function handleChangeSearchCep(text: ChangeEvent<HTMLInputElement>) {
    setCepToSearch(text.target.value)
  }
  async function handleConsultViaCep(event: any) {
    try {
      event.preventDefault()
      if (cepToSearch) {
        setStatus('Loading')
        const dataInfoCep = await getInfoViaCepByZipCode(cepToSearch)
        setData(dataInfoCep)
        setStatus('Success')
      }
    } catch (error) {
      setStatus('Error')
    }
  }
  return (
    <>
      <form onSubmit={handleConsultViaCep}>
        <label htmlFor="consultCep">Digite o Cep que deseja contultar:</label>
        <input type="text" name="consultCep" id="consultCep" value={cep} onChange={(text) => handleChangeSearchCep(text)} maxLength={10} />
        <input type="submit" value="Consultar" />
      </form>
      {status === 'Loading' && <>Carregando ...</>}
      {status === 'Error' && <>Erro!</>}
      {(status === 'Success' && data) && (
        <CepInformations {...data} />
      )}
    </>
  )
}

export default App