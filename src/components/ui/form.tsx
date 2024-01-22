import { createContext, forwardRef, useContext, useId } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseFormProps as UseReactHookFormProps,
  type UseFormReturn as UseReactHookFormReturn,
  useForm as useReactHookForm,
  useFormContext,
} from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "mizuhara/utils";

import type { BaseSchema } from "valibot";
import { Label, type LabelProps } from "./label";

const FormRoot = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <Form.Field>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "Form.Item";

const FormLabel = forwardRef<HTMLLabelElement, Omit<LabelProps, "htmlFor">>(
  (props, ref) => {
    const { formItemId } = useFormField();

    return <Label ref={ref} {...props} htmlFor={formItemId} />;
  },
);
FormLabel.displayName = "Form.Label";

const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "Form.Control";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "Form.Description";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "Form.Message";

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> = Omit<UseReactHookFormProps<TFieldValues, TContext>, "resolver"> & {
  schema: BaseSchema;
  defaultValues: Required<
    UseReactHookFormProps<TFieldValues, TContext>["defaultValues"]
  >;
};

function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props: UseFormProps<TFieldValues, TContext>,
): UseReactHookFormReturn<TFieldValues, TContext, TTransformedValues> {
  return useReactHookForm({
    ...props,
    defaultValues: props.defaultValues,
    resolver: valibotResolver(props.schema),
  });
}

const Form = Object.assign(FormRoot, {
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField,
});

export * from "react-hook-form";

export { Form, useForm };
