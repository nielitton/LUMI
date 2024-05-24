'use client'

import { InvoiceCard } from '../../components/custom/invoiceCard'
import { UseGetInvoices } from '@/hooks/useGetInvoices'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileUp } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { UseUploadFile } from '@/hooks/useUploadInvoice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const getInvoices = async (clientNumber?: string | null) => {
  return await UseGetInvoices(clientNumber)
}

const uploadInvoices = async (file: File) => {
  return await UseUploadFile(file)
}

export default function Invoices() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [clientNumber, setClientNumber] = useState<string | null>(null)

  const { data, refetch: refetchInvoices } = useQuery({
    queryKey: ['invoices', clientNumber],
    queryFn: () => getInvoices(clientNumber === 'null' ? null : clientNumber),
  })

  const debouncedSearch = useCallback((value: string) => {
    const timeout = setTimeout(() => {
      setClientNumber(value)
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  const handleClientNumberChange = (value: string) => {
    debouncedSearch(value)
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      await uploadInvoices(file)
      refetchInvoices()
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <section className="flex flex-col gap-5 p-4 justify-start">
      <div className="flex flex-col lg:flex-row justify-between gap-2 items-center">
        <h1 className="text-[20px] font-semibold text-green-spotify">
          Biblioteca de faturas
        </h1>
        <Select
          defaultValue="null"
          onValueChange={(e) => handleClientNumberChange(e)}
        >
          <SelectTrigger className="w-[30%]">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Todos</SelectItem>
            <SelectItem value="7005400387">Cliente: 7005400387</SelectItem>
            <SelectItem value="7202788969">Cliente: 7202788969</SelectItem>
          </SelectContent>
        </Select>
        <Input
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
          name="pdf"
          className="hidden"
        />
        <Button
          className="flex justify-center items-center gap-2 mr-2 bg-green-spotify"
          onClick={handleButtonClick}
        >
          <FileUp color="#FFFFFF" /> Importar Fatura
        </Button>
      </div>
      <div>
        <p className="text-green-spotify font-semibold text-[18px] text-center">
          Quantidade de faturas: {data?.count}
        </p>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-2 overflow-y-scroll max-h-[17rem] md:max-h-[37rem]">
        {data?.invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            eletricEnergyValue={invoice.eletricEnergyValue}
            eletricEnergyKwh={invoice.eletricEnergyKwh}
            invoiceNumber={invoice.invoiceNumber}
            totalValue={invoice.totalValue}
            referenceMonth={invoice.referenceMonth}
            clientNumber={invoice.clientNumber}
          />
        ))}
      </div>
    </section>
  )
}
