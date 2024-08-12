import React from "react";

const MessageBody = () => {
  return (
    <>
      <div className=" bg-[url('/image.png')] w-full h-svh p-4 rounded-lg">
        <div className="text-center mb-4">
          <span className="inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
            Today
          </span>
        </div>
        <div className="space-y-4">
          {/* Sender message */}
          <div className="flex items-end">
            <div className="bg-white text-black p-3 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm">
                OMG 😳 do you remember what you did last night at the work night
                out?
              </p>
              <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
                <span className="text-red-500 mr-1">❤️</span>
                <span>18:12</span>
                <span className="ml-1">✔️</span>
              </div>
            </div>
          </div>

          {/* Receiver message 1 */}
          <div className="flex justify-end items-end">
            <div className="bg-green-300 text-black p-3 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm">no haha</p>
              <div className="flex justify-end mt-2 text-xs text-gray-500">
                <span>18:16</span>
                <span className="ml-1">✔️</span>
              </div>
            </div>
          </div>

          {/* Receiver message 2 */}
          <div className="flex justify-end items-end">
            <div className="bg-green-300 text-black p-3 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm">i don't remember anything 😅</p>
              <div className="flex justify-end mt-2 text-xs text-gray-500">
                <span>18:16</span>
                <span className="ml-1">✔️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBody;
