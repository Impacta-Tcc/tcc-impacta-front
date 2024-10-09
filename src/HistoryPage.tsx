import React from 'react';
import { viaCepResult } from './api/contracts/viaCep';
import { getCepHistorico } from './helpers/getInfoViacep';
import CepInformations from './modules/CepInformations';
import { ClockIcon } from '@heroicons/react/16/solid';
import NavBar from './modules/Navbar';

type Status = 'Loading' | 'Success' | 'Error';

const HistoryPage = () => {
  const [status, setStatus] = React.useState<Status>();
  const [data, setData] = React.useState<viaCepResult[] | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('Loading');
        const dataInfoCep = await getCepHistorico();
        setData(dataInfoCep);
        setStatus('Success');
      } catch (error) {
        setStatus('Error');
      }
    };

    fetchData(); // Chama a função assíncrona
  }, []); // Dependência vazia para garantir que o efeito seja executado apenas uma vez

  return (
    <>
      <NavBar />
      <div className="flex justify-center mt-5">
        <ClockIcon className="size-6 text-gray-600 mr-2"/>
        <h1 className='font-semibold leading-6 text-gray-900 text-center'>
          Histórico de pesquisa de ceps
        </h1>
      </div>
      {status === 'Loading' && <>Carregando ...</>}
      {status === 'Error' && <>Erro!</>}
      {status === 'Success' && data && (
          <CepInformations  list={data} />
      )}
    </>
  );
};

export default HistoryPage;
