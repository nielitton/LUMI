/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { IInvoice } from '@/models/invoice-entity'
import { Button } from '../ui/button'
import { UseDownloadInvoice } from '@/hooks/useDonwloadInvoice'
import { useState } from 'react'

export const InvoiceCard = ({
  invoiceNumber,
  totalValue,
  eletricEnergyKwh,
  eletricEnergyValue,
  referenceMonth,
  clientNumber,
  publicContrib,
  compensedEnergyKwh,
  compensedEnergyValue,
  sceeEnergyKwh,
  sceeEnergyValue,
}: IInvoice) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      const response = await UseDownloadInvoice(invoiceNumber || '')

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
      const pdfUrl = URL.createObjectURL(pdfBlob)
      setPdfUrl(pdfUrl)

      window.open(pdfUrl)
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error)
    }
  }

  return (
    <div className="flex flex-col w-80 gap-2 border rounded-md shadow-lg p-4 mb-5">
      <p className="text-gray-400">
        Número da nota:{' '}
        <span className="text-green-spotify font-semibold">
          {invoiceNumber}
        </span>
      </p>
      <p className="text-gray-400">
        Número do cliente:{' '}
        <span className="text-green-spotify font-semibold">{clientNumber}</span>
      </p>
      <p className="text-gray-400">
        Valor total:{' '}
        <span className="text-green-spotify font-semibold">{totalValue}</span>
      </p>
      <p className="text-gray-400">
        Energia eletrica (kwh):{' '}
        <span className="text-green-spotify font-semibold">
          {eletricEnergyKwh} kwh
        </span>
      </p>
      <p className="text-gray-400">
        Valor Energia:{' '}
        <span className="text-green-spotify font-semibold">
          {eletricEnergyValue}
        </span>
      </p>
      <p className="text-gray-400">
        Referente a:{' '}
        <span className="text-green-spotify font-semibold">
          {referenceMonth}
        </span>
      </p>
      <p className="text-gray-400">
        Energia SCEE (kwh):{' '}
        <span className="text-green-spotify font-semibold">
          {sceeEnergyKwh} kwh
        </span>
      </p>
      <p className="text-gray-400">
        Energia SCEE:{' '}
        <span className="text-green-spotify font-semibold">
          {sceeEnergyValue}
        </span>
      </p>
      <p className="text-gray-400">
        Energia Compensada (kwh):{' '}
        <span className="text-green-spotify font-semibold">
          {compensedEnergyKwh} kwh
        </span>
      </p>
      <p className="text-gray-400">
        Energia Compensada:{' '}
        <span className="text-green-spotify font-semibold">
          {compensedEnergyValue}
        </span>
      </p>
      <p className="text-gray-400">
        Contrib Publica:{' '}
        <span className="text-green-spotify font-semibold">
          {publicContrib}
        </span>
      </p>
      <Button
        onClick={handleDownload}
        className="flex justify-center items-center gap-2 mr-2 bg-green-spotify"
      >
        Baixar Fatura
      </Button>
    </div>
  )
}
