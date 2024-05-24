import { api } from '@/api/api'

export const UseDownloadInvoice = async (invoiceNumber: string) => {
  return await api.get(`/pdf/${invoiceNumber}`, {
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
}
