import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col items-start justify-center gap-10 py-20 px-8 text-center sm:text-left">
        <h1 className="text-4xl font-bold text-center w-full tracking-tight ">
          Telegram Web App Login Test
        </h1>

        <section className="flex flex-col gap-4  max-w-xl">
          <h2 className="text-2xl font-semibold ">📘 About the Project</h2>
          <p>
            This project was created for testing <b>Telegram login</b>{" "}
            functionality for a Telegram Web App and deploying it on{" "}
            <b>Vercel</b>.
          </p>
          <p>It is intended for development and testing purposes only.</p>
        </section>

        <section className="flex w-full flex-col gap-4 ">
          <h2 className="text-2xl font-semibold">🚀 Features</h2>
          <ul className="list-disc list-inside items-center space-y-2">
            <li>Telegram login integration test</li>
            <li>Simple web interface for testing</li>
            <li>Easy deployment to Vercel</li>
          </ul>
        </section>

        <div className="flex flex-col justify-center items-center w-full gap-4 sm:flex-row mt-10">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border justify-center gap-2 rounded-full px-6 py-3 font-medium transition hover:opacity-80"
          >
            <Image
              className="invert"
              src="/vercel.svg"
              alt="Vercel"
              width={18}
              height={18}
            />
            Deploy on Vercel
          </a>
          <a
            href="https://core.telegram.org/bots/webapps#initializing-mini-apps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full border border-zinc-400 dark:border-zinc-700 px-6 py-3 font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Telegram Docs
          </a>
          <Button variant="tg" className="px-6 py-3" asChild>
            <Link href={"/profile"}>Login with Telegram</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
