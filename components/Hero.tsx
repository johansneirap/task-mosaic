"use client";
import React from "react";
import SignInButton from "./SignInButton";

function Hero() {
  return (
    <main className="flex-column md:flex justify-between p-8 md:p-12 md:max-w-7xl md:m-auto h-full items-center gap-8">
      <div className="md:max-w-xl flex-col">
        <h1 className="text-7xl md:text-8xl font-semibold">
          Simple and powerful TODO Application
        </h1>
        <div className="mt-12 text-gray-500 text-xl flex flex-col gap-8 items-center md:items-start">
          <h2 className="block">
            Unleash your full productivity. Try it for free today and forever,
            and come to experience effortless task management!
          </h2>
          <div>
            <SignInButton />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 mt-8">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              Save Tasks and access them in Desktop or Mobile
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              You will have your own assistant
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-8 rounded-2xl shadow-md md:ml-4">
              It allows to you insert images in your todo
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              Persistence wherever you are
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              Constantly growing in features
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            Why overcomplicate your tasks? Simple is better...
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center">
            It is free!!
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
