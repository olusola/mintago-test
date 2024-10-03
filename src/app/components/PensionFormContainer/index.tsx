'use client';

import { PensionFormValuesTypes } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type PensionFormProps = {
  handlePensionFormValues: (formValues: PensionFormValuesTypes) => void;
};

const PensionForm = ({ handlePensionFormValues }: PensionFormProps) => {
  const formSchema = z.object({
    employerContribution: z.coerce
      .number({
        required_error: 'Employer Contribution is required',
        invalid_type_error: 'Field must be a number',
      })
      .min(0),
    retirementAge: z.coerce
      .number({
        required_error: 'Retirement Age is required',
        invalid_type_error: 'Field must be a number',
      })
      .min(26)
      .max(81),
    desiredIncomePerYear: z.coerce
      .number({
        required_error: 'Desired Income is required',
        invalid_type_error: 'Field must be a number',
      })
      .min(0),
    personalContribution: z.coerce
      .number({
        required_error: 'Employer Contribution is required',
        invalid_type_error: 'Field must be a number',
      })
      .min(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitForm = (values: z.infer<typeof formSchema>) =>
    handlePensionFormValues(values);

  return (
    <div className="my-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-3 w-[300px]"
        >
          <FormField
            control={form.control}
            name="desiredIncomePerYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Retirement Income Per Year(£)</FormLabel>
                <FormControl>
                  <Input min={0} type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personalContribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Personal contribution(£)</FormLabel>
                <FormControl>
                  <Input min={0} {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employerContribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Employer Contribution (£)</FormLabel>
                <FormControl>
                  <Input min={0} {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retirementAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retirement Age</FormLabel>
                <FormControl>
                  <Input min={0} {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size={'lg'}>
            Calculate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PensionForm;
