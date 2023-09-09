"use client";
import React, { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "react-avatar";
import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function SignInButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <Avatar
                name={session?.user?.name ?? ""}
                round
                size="50"
                color="#0055D1"
                src={session?.user?.image ?? ""}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => signOut()}
                    >
                      Sign Out
                      <ArrowRightOnRectangleIcon height={16} />
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    );
  }
  return (
    <button
      onClick={() => signIn("github")}
      className="inline-flex gap-4 justify-center items-center rounded-md border border-transparent bg-violet-600 p-4 text-md font-medium text-white hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
    >
      Sign In
      <Image
        alt="Github Icon"
        loading="lazy"
        height="24"
        width="24"
        src="https://authjs.dev/img/providers/github-dark.svg"
      ></Image>
    </button>
  );
}

export default SignInButton;
