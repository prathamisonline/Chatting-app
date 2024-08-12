import React from "react";

const ChatCard = () => {
  return (
    <div className=" flex gap-4 items-center px-4 py-3 w-[350px]">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="flex flex-col w-[300px]  ">
        <div className="flex justify-between items-center ">
          <div className="text-[17px] font-[600]">Pratham Srivastava</div>
          <div className="text-[12px] font-[400]">19:38</div>
        </div>
        <div className="flex justify-between items-center ">
          <div className="text-[12px] font-[400]">See you later</div>
          <div className=" flex justify-center items-center h-[18px] w-[18px] bg-green-400  rounded-full text-[12px] text-white">
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
