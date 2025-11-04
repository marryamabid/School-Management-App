"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { createContact } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { contactSchema, ContactSchema } from "@/lib/formValidationSchemas";

// Define validation schema

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema) as any,
  });

  const [state, formAction] = useFormState(createContact, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast("✅ Message sent successfully!");
      router.refresh();
    }
    if (state.error) {
      toast("❌ Something went wrong!");
    }
  }, [state, router]);

  return (
    <section id="contact" className="container max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Contact <span className="text-lamaPurple">SmartLearn</span>
      </h1>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 bg-white shadow-md p-8 rounded-2xl"
      >
        <input
          type="text"
          {...register("name")}
          placeholder="Your Name"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-lamaPurple"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <input
          type="email"
          {...register("email")}
          placeholder="Your Email"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-lamaPurple"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <textarea
          {...register("message")}
          rows={5}
          placeholder="Your Message"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-lamaPurple"
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}

        <button
          type="submit"
          className="bg-lamaPurple text-white py-3 rounded-md hover:bg-lamaSky transition duration-300"
        >
          Send Message
        </button>
      </form>

      {state.success && (
        <p className="text-green-600 text-center mt-4">
          ✅ Message sent successfully!
        </p>
      )}
      {state.error && (
        <p className="text-red-600 text-center mt-4">
          ❌ Something went wrong!
        </p>
      )}
    </section>
  );
}
