'use client';

import { useState } from 'react';
import PensionForm from './components/PensionFormContainer';
import PensionResultCharts from './components/PensionResultCharts';
import { PensionFormValuesTypes } from './types';

export default function Home() {
  const [pensionFormValues, setPensionFormValues] =
    useState<PensionFormValuesTypes | null>(null);

  const handlePensionFormValues = (formValues: PensionFormValuesTypes) =>
    setPensionFormValues(formValues);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-black text-3xl">Pension Calculator</h1>
      <PensionForm handlePensionFormValues={handlePensionFormValues} />
      {pensionFormValues && (
        <PensionResultCharts pensionFormValues={pensionFormValues} />
      )}
    </div>
  );
}
