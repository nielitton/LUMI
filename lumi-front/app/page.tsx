'use client'

import {
  LineChartsCustomKwh,
  LineChartsCustomValue,
} from '@/components/custom/charts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UseGetInvoices } from '@/hooks/useGetInvoices'
import { IDataChartsKwh, IDataChartsValue } from '@/models/invoice-entity'
import { formatNumber } from '@/utils/formatNumbers'
import { getMonthNumber } from '@/utils/monthNumber'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

const getInvoices = async (clientNumber?: string | null) => {
  return await UseGetInvoices(clientNumber)
}

export default function Home() {
  const [client, setClient] = useState<string | null>(null)

  const { data: invoicesData } = useQuery({
    queryKey: ['invoices', client],
    queryFn: () => getInvoices(client === 'null' ? null : client),
  })

  const dataChartsKwh = useMemo<IDataChartsKwh[] | [] | undefined>(() => {
    const sortedInvoices = invoicesData?.invoices.sort((a, b) => {
      const monthA = getMonthNumber(a.referenceMonth?.split('/')[0] || '')
      const monthB = getMonthNumber(b.referenceMonth?.split('/')[0] || '')
      return monthA - monthB
    })

    return sortedInvoices?.map((invoice) => ({
      name: invoice.referenceMonth || '',
      CONENER: Number(invoice.eletricEnergyKwh) + Number(invoice.sceeEnergyKwh),
      ENERCOMP: Number(invoice.compensedEnergyKwh),
    }))
  }, [invoicesData])

  const dataChartsValue = useMemo<IDataChartsValue[] | [] | undefined>(() => {
    const sortedInvoices = invoicesData?.invoices.sort((a, b) => {
      const monthA = getMonthNumber(a.referenceMonth?.split('/')[0] || '')
      const monthB = getMonthNumber(b.referenceMonth?.split('/')[0] || '')
      return monthA - monthB
    })

    return sortedInvoices?.map((invoice) => {
      const totalSemGD = Number(
        (
          formatNumber(invoice.eletricEnergyValue || '0') +
          formatNumber(invoice.sceeEnergyValue || '0') +
          formatNumber(invoice.publicContrib || '0')
        ).toFixed(2),
      )

      const economiaGD = formatNumber(invoice.compensedEnergyValue || '')

      return {
        name: invoice.referenceMonth || '',
        TOTALSEMGD: totalSemGD,
        ECONOMIAGD: economiaGD,
      }
    })
  }, [invoicesData])

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-start p-5">
      <h1 className="text-[20px] font-semibold text-green-spotify">
        Dashboard
      </h1>
      <section className="w-full h-full flex flex-col gap-3 justify-center items-center">
        <Select defaultValue="null" onValueChange={setClient}>
          <SelectTrigger className="w-[30%]">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Todos</SelectItem>
            <SelectItem value="7005400387">Cliente: 7005400387</SelectItem>
            <SelectItem value="7202788969">Cliente: 7202788969</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex">
          <div className="flex flex-col items-center gap-3">
            <LineChartsCustomKwh dataKwh={dataChartsKwh || []} />
            <div className="flex gap-2 justify-center">
              <span className="text-[#0E632C]">
                Energia compensada (kwh): ENERCOMP
              </span>
              -
              <span className="text-green-spotify">
                Consumo de energia (kwh): CONENER
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <LineChartsCustomValue dataValue={dataChartsValue || []} />
            <div className="flex gap-2 justify-center">
              <span className="text-[#0E632C]">
                Valor total sem GD: TOTALSEMGD
              </span>
              -
              <span className="text-green-spotify">
                Economia GD: ECONOMIAGD
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
