import React from "react";

const Manager = () => {

    const savepasword = () => {
        // Logic to save the password
    }
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="  max-w  myContainer">
        <h1 className="text-4xl font-bold text-center ">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="text-white mt-2 flex flex-col gap-4 p-4">
          {/* Top Input */}
          <input
            className="border border-green-500 w-full px-4 py-2 text-black rounded-full"
            type="text"
            placeholder="Enter URL or Service Name"
          />

          {/* Two Side-by-Side Inputs */}
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <input
              className="border border-green-500 w-full px-4 py-2 text-black rounded-full"
              type="text"
              placeholder="Username"
            />
            <div className="relative w-full">
              <input
                className="border border-green-500 w-full px-4 py-2 text-black rounded-full pr-16"
                type="password"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 font-medium hover:underline"
              >
                Show
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button onClick={savepasword} className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-6 py-2 rounded-full w-fit self-center flex items-center gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
