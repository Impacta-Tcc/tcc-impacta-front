import React from 'react';
import { viaCepResult } from './api/contracts/viaCep';
import { getCepHistorico } from './helpers/getInfoViacep';
import CepInformations from './modules/CepInformations';

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
      {status === 'Loading' && <>Carregando ...</>}
      {status === 'Error' && <>Erro!</>}
      {status === 'Success' && data && (
        data.map((dataObj)=>
          <CepInformations {...dataObj} />
        )
      )}
    </>
  );
};

export default HistoryPage;
