'use client'

import { IDataChartsKwh, IDataChartsValue } from '@/models/invoice-entity'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface ICharts {
  dataKwh?: IDataChartsKwh[]
  dataValue?: IDataChartsValue[]
}

export const LineChartsCustomKwh = ({ dataKwh }: ICharts) => {
  return (
    <LineChart width={600} height={500} data={dataKwh}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" stroke="#0E632C" dataKey="ENERCOMP" />
      <Line type="monotone" stroke="#1DB954" dataKey="CONENER" />
    </LineChart>
  )
}

export const LineChartsCustomValue = ({ dataValue }: ICharts) => {
  return (
    <LineChart width={600} height={500} data={dataValue}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" stroke="#0E632C" dataKey="TOTALSEMGD" />
      <Line type="monotone" stroke="#1DB954" dataKey="ECONOMIAGD" />
    </LineChart>
  )
}
