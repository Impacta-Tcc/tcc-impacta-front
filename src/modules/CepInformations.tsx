import { viaCepResult } from '../api/contracts/viaCep'

interface CepInfoProps{
  list: viaCepResult[]
}

const CepInformations = ({list}:CepInfoProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-100 mt-5">
      {
        list.map((data,index)=>(
          <li key={data.cep+index} className="flex justify-around gap-x-6 py-5">
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">CEP</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.cep}</p>
            </div>
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">Rua</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.logradouro}</p>
            </div>
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">Cidade</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.localidade}</p>
            </div>
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">UF</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.uf}</p>
            </div>
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">Bairro</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.bairro}</p>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default CepInformations