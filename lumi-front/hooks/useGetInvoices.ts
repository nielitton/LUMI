import { api } from '@/api/api'
import { IInvoice } from '@/models/invoice-entity'

export const UseGetInvoices = async (clientNumber?: string | null) => {
  return (
    await api.get<{ invoices: IInvoice[]; count: number }>('/invoices', {
      params: { clientNumber },
    })
  ).data
}
