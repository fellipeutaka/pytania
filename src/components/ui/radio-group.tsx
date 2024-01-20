"use client";

import { forwardRef } from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { tv } from "mizuhara/utils";

import { Icons } from "../icons";

export const RadioGroupStyles = {
	Root: tv({
		base: ["grid gap-4"],
	}),
	Item: tv({
		base: [
			"flex w-full items-center justify-between rounded-md border px-6 py-4 text-left transition-colors focus:outline-none aria-checked:border-primary dark:aria-checked:border-primary-foreground",
		],
	}),
};

const RadioGroupRoot = forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.RadioGroup>
>(({ className, ...props }, ref) => (
	<RadioGroupPrimitive.Root
		ref={ref}
		className={RadioGroupStyles.Root({ className })}
		{...props}
	/>
));
RadioGroupRoot.displayName = RadioGroupPrimitive.RadioGroup.displayName;

const RadioGroupItem = forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={RadioGroupStyles.Item({ className })}
			{...props}
		>
			{children}
			<RadioGroupPrimitive.Indicator>
				<Icons.Check className="ml-auto size-5 animate-fade text-primary animate-duration-300 dark:text-primary-foreground" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export const RadioGroup = Object.assign(RadioGroupRoot, {
	Item: RadioGroupItem,
});
