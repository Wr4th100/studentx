"use client";

import type { AnyOptions } from "@/types";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";

type Props = {
  departments: AnyOptions;
  years: AnyOptions;
  degrees: AnyOptions;
  colleges: AnyOptions;
};

const studentFormSchema = z.object({
  name: z.string(),
  registerNumber: z.string(),
  gender: z.string(),
  department: z.string(),
  year: z.string(),
  degree: z.string(),
  college: z.string(),
});

const StudentForm = ({ departments, colleges, degrees, years }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
  });

  const createStudent = api.student.createStudent.useMutation({
    onSuccess: () => {
      router.refresh();
    },

  });

  function onSubmit(values: z.infer<typeof studentFormSchema>) {
    startTransition(async () => {
      await createStudent.mutateAsync({
        name: values.name,
        college: values.college,
        degree: values.degree,
        department: values.department,
        gender: values.gender,
        registerNumber: values.registerNumber,
        year: Number(values.year),
      });
      toast.success("Student created successfully");
      form.reset();
      router.push("/");
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full  gap-x-8 text-black dark:text-white border m-4 p-4 rounded-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Roshan" {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>This is your student name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Register Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="2104XXXXXXXX..."
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                This is your student register number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <Select onValueChange={field.onChange} disabled={isPending}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem value={String(year.value)} key={year.value}>
                      {" "}
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>This is your student year</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Department</FormLabel>

                  <Select onValueChange={field.onChange} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          value={String(department.value)}
                          key={department.value}
                        >
                          {" "}
                          {department.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    This is your student department
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <Select onValueChange={field.onChange} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Degree" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {degrees.map((degree) => (
                      <SelectItem
                        value={String(degree.value)}
                        key={degree.value}
                      >
                        {" "}
                        {degree.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>This is your student degree</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"Male"}>Male</SelectItem>
                    <SelectItem value={"Female"}>Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This is your student gender</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <Select onValueChange={field.onChange} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="College" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem
                        value={String(college.value)}
                        key={college.value}
                      >
                        {" "}
                        {college.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>This is your student college</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="mt-4 w-full self-end justify-self-end"
          variant="default"
          disabled={isPending}
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default StudentForm;
