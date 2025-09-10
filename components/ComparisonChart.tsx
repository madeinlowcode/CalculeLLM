import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LLM } from '../types';

interface ChartData extends LLM {
    inputCost: number;
    outputCost: number;
    totalCost: number;
}

interface ComparisonChartProps {
  data: ChartData[];
  conversionRate: number;
}

const CustomTooltip = ({ active, payload, label, conversionRate }: any) => {
  if (active && payload && payload.length) {
    const formatUSD = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 });
    const formatLocal = (value: number) => {
      if (isNaN(conversionRate) || conversionRate <= 0) return '';
      const converted = value * conversionRate;
      return ` / ${converted.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`;
    }

    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);

    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600">
        <p className="font-bold text-slate-800 dark:text-slate-100">{label}</p>
        <p className="text-sm text-sky-600 dark:text-sky-400">{`Entrada: ${formatUSD(payload[0].value)}${formatLocal(payload[0].value)}`}</p>
        <p className="text-sm text-amber-600 dark:text-amber-400">{`Saída: ${formatUSD(payload[1].value)}${formatLocal(payload[1].value)}`}</p>
        <p className="text-sm font-semibold mt-1 text-slate-700 dark:text-slate-200">{`Total: ${formatUSD(total)}${formatLocal(total)}`}</p>
      </div>
    );
  }
  return null;
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, conversionRate }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 35,
          bottom: 5,
        }}
        barGap={10}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }} 
          angle={-20}
          textAnchor="end"
          height={60}
          interval={0}
          className="dark:fill-slate-400"
        />
        <YAxis 
          tickFormatter={(value) => `$${value.toFixed(2)}`}
          tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }}
          className="dark:fill-slate-400"
        />
        <Tooltip content={<CustomTooltip conversionRate={conversionRate} />} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
        <Legend wrapperStyle={{fontSize: "14px"}}/>
        <Bar dataKey="inputCost" stackId="a" name="Custo de Entrada" fill="#38bdf8" />
        <Bar dataKey="outputCost" stackId="a" name="Custo de Saída" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;