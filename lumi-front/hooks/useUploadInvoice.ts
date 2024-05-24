import { api } from '@/api/api'
import { IInvoice } from '@/models/invoice-entity'
import { toast } from 'sonner'

export const UseUploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('pdf', file)

  api.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  const response = await api
    .post<IInvoice>('/pdf-extractor/extract', formData)
    .then((res) => {
      toast.success(`Fatura enviada: ${res.data.referenceMonth}`)
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.response.data.message)
    })

  return response
}
