import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { UseGetInvoices } from '../hooks/useGetInvoices'

describe('UseGetInvoices function', () => {
  it('should fetch invoices correctly', async () => {
    const mock = new MockAdapter(axios)
    mock.onGet('/invoices').reply(200)

    const result = await UseGetInvoices()

    expect(result).toHaveProperty('invoices')
    expect(result).toHaveProperty('count')
  })
})
