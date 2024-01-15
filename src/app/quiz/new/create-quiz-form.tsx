"use client";

import type { Session } from "next-auth/types";
import { toast } from "sonner";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Form, useForm } from "~/components/ui/form";
import { TextField } from "~/components/ui/textfield";
import { createQuiz } from "~/services/quiz";
import { createQuizSchema } from "~/services/quiz/schema";

const schema = createQuizSchema.omit({ creatorId: true });

type CreateQuizFormProps = {
  session: Session;
};

export function CreateQuizForm({ session }: CreateQuizFormProps) {
  const form = useForm({
    schema,
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCreateQuiz = form.handleSubmit(async ({ name, description }) => {
    try {
      await createQuiz({
        name,
        description,
        creatorId: session.user.id,
      });

      form.reset();
      toast.success("Quiz created");
    } catch (error) {
      toast.error(
        "An error occurred while creating the quiz. Please try again.",
      );
    }
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleCreateQuiz}>
        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Name</Form.Label>
              <TextField>
                <Form.Control>
                  <TextField.Input {...field} />
                </Form.Control>
              </TextField>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Description</Form.Label>
              <TextField>
                <Form.Control>
                  <TextField.Input {...field} />
                </Form.Control>
              </TextField>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.Loader className="mr-2 size-4 animate-spin" />}
          Create
        </Button>
      </form>
    </Form>
  );
}
