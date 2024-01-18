"use client";

import { useState } from "react";

import type { Session } from "next-auth/types";
import { toast } from "sonner";
import { z } from "zod";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Form,
  useFieldArray,
  useForm,
  type Control,
} from "~/components/ui/form";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Switch } from "~/components/ui/switch";
import { Tabs } from "~/components/ui/tabs";
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
      questions: [
        {
          text: "Question 1",
          answers: [
            {
              text: "",
              isCorrect: false,
            },
          ],
        },
      ],
    },
  });
  const questions = useFieldArray({
    name: "questions",
    control: form.control,
  });
  const watchQuestions = form.watch("questions", questions.fields);
  const [currentQuestion, setCurrentQuestion] = useState("0");

  const handleCreateQuiz = form.handleSubmit(
    async ({ name, description, questions }) => {
      try {
        await createQuiz({
          name,
          description,
          creatorId: session.user.id,
          questions,
        });

        form.reset();
        toast.success("Quiz created");
      } catch (error) {
        toast.error(
          "An error occurred while creating the quiz. Please try again.",
        );
      }
    },
  );

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

        <h2 className="text-2xl font-semibold">Questions</h2>
        <Tabs
          value={currentQuestion}
          onValueChange={(value) => setCurrentQuestion(value)}
        >
          <ScrollArea className="flex-1">
            <ScrollArea.Viewport className="size-full pb-3">
              <Tabs.List className="h-auto">
                {questions.fields.map((field, index) => (
                  <Tabs.Trigger key={field.id} value={String(index)}>
                    {watchQuestions.at(index)?.text}
                  </Tabs.Trigger>
                ))}
                <ScrollArea.ScrollBar orientation="horizontal" />
              </Tabs.List>
            </ScrollArea.Viewport>
          </ScrollArea>
          <div className="my-2 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() =>
                questions.append({
                  text: `Question ${questions.fields.length + 1}`,
                  answers: [
                    {
                      text: "",
                      isCorrect: false,
                    },
                  ],
                })
              }
            >
              <Icons.Plus className="mr-2 size-4" />
              Add a new question
            </Button>
            {questions.fields.length > 1 && (
              <Button
                variant="destructive"
                onClick={() => {
                  setCurrentQuestion(
                    String(Math.max(0, Number(currentQuestion) - 1)),
                  );
                  questions.remove(Number(currentQuestion));
                }}
              >
                <Icons.Trash className="mr-2 size-4" />
                Delete current question
              </Button>
            )}
          </div>
          {questions.fields.map((field, index) => (
            <Tabs.Content key={field.id} value={String(index)}>
              <Form.Field
                control={form.control}
                name={`questions.${index}.text`}
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Question</Form.Label>
                    <TextField>
                      <Form.Control>
                        <TextField.Input {...field} />
                      </Form.Control>
                    </TextField>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <AnswerField index={index} control={form.control} />
            </Tabs.Content>
          ))}
        </Tabs>

        <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
          {isLoading && <Icons.Loader className="mr-2 size-4 animate-spin" />}
          Create quiz
        </Button>
      </form>
    </Form>
  );
}

type AnswerFieldProps = {
  index: number;
  control: Control<z.output<typeof schema>>;
};

function AnswerField({ index, control }: AnswerFieldProps) {
  const { fields, append, remove } = useFieldArray({
    name: `questions.${index}.answers`,
    control,
  });

  return (
    <>
      <h2 className="mt-6 text-2xl font-semibold">Answers</h2>
      <ScrollArea>
        <ScrollArea.Viewport className="size-full max-h-80 p-1 pr-4">
          {fields.map((field, i) => (
            <div className="-space-y-4" key={field.id}>
              <Form.Field
                control={control}
                name={`questions.${index}.answers.${i}.text`}
                render={({ field }) => (
                  <Form.Item className="my-6">
                    <Form.Label>Answer</Form.Label>
                    <div className="flex items-center gap-4">
                      <TextField className="flex-1">
                        <Form.Control>
                          <TextField.Input {...field} />
                        </Form.Control>
                      </TextField>
                      {fields.length > 1 && (
                        <Button
                          onClick={() => remove(i)}
                          size="icon"
                          variant="destructive"
                        >
                          <Icons.Trash className="size-4" />
                          <span className="sr-only">Delete answer</span>
                        </Button>
                      )}
                    </div>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={control}
                name={`questions.${index}.answers.${i}.isCorrect`}
                render={({ field }) => (
                  <Form.Item className="flex items-center gap-2 space-y-0">
                    <Form.Control>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      >
                        <Switch.Thumb />
                      </Switch>
                    </Form.Control>
                    <Form.Label>Correct</Form.Label>
                  </Form.Item>
                )}
              />
            </div>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.ScrollBar />
      </ScrollArea>
      <Button
        className="mt-4"
        variant="outline"
        onClick={() => append({ text: "", isCorrect: false })}
      >
        <Icons.Plus className="mr-2 size-4" />
        Add answer
      </Button>
    </>
  );
}
