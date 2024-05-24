export interface IInvoice {
  id?: string
  clientNumber?: string
  invoiceNumber?: string
  referenceMonth?: string
  totalValue?: string
  eletricEnergyKwh?: string
  eletricEnergyValue?: string
  sceeEnergyKwh?: string
  sceeEnergyValue?: string
  compensedEnergyKwh?: string
  compensedEnergyValue?: string
  publicContrib?: string
}

export interface IDataChartsKwh {
  name: string
  ENERCOMP: number
  CONENER: number
}

export interface IDataChartsValue {
  name: string
  TOTALSEMGD: number
  ECONOMIAGD: number
}
