import Image from "next/image";
import React from "react";
import talkball from "/public/images/talkball.png";
import search from "/public/images/search.png";
import money from "/public/images/money.png";

function Direction() {
  return (
    <article>
      <section className="flex flex-col justify-center items-center py-8 md:py-10">
        <Image alt="꽁머니팡소개" width={248} height={255} src={money} />
        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-4">
          <span className="text-blue">꽁머니 홍보 게시판 </span>이용 방법
        </div>
        <p className="w-full max-w-[900px] px-4 sm:px-5 pt-4 text-xs sm:text-sm md:text-base text-description leading-6 text-center">
          누구나 꽁머니 홍보 게시판을 이용할 수 있습니다. 주로 토토 사이트들이 꽁머니나 이벤트 등을 홍보하기 위해 해당 게시판을 이용합니다. 유저들은 사이트가 주는 혜택이 무엇인지 한 눈에 꽁 머니 홍보 게시판에서 확인할 수 있습니다. 다만, 해당 게시판을 이용하는 모든 사이트가 검증된 사이트는 아니므로 유저들의 주의가 필요합니다.
        </p>
        
        <div className="w-full max-w-[1000px] pt-16 md:pt-20 px-4 sm:px-5 flex flex-col lg:flex-row items-center justify-between">
          <section className="hidden lg:flex w-1/2 h-full flex-col justify-center items-center">
            <div className="font-bold text-center">
              <h1 className="text-lg md:text-2xl">꽁머니 홍보 게시판</h1>
              <h1 className="text-lg md:text-2xl">이용 주의사항</h1>
            </div>
            <Image alt="꽁머니팡소개" width={248} height={255} src={search} />
          </section>

          <section className="w-full flex flex-col items-center gap-4 sm:gap-5">
            {[
              "해당 게시판은 먹튀 검증 게시판이 아닙니다. 먹튀 사이트나 사기 사이트가 있을 수 있음으로 꽁머니를 지급한다고 하더라도 사이트가 안전한지 확인 후에 이용하셔야 합니다.",
              "꽁머니는 물론이고 토토 사이트에서 진행하는 이벤트를 홍보할 수 있습니다. 꽁머니, 가입머니, 입금 플러스 머니 등 사이트에서 유저에게 제공하는 혜택이 있다면 해당 게시판을 통해 홍보가 가능합니다.",
              "사이트명과 주소를 명확하게 기재하는 것이 좋습니다. 사이트명이 다르거나 사이트주소가 입력되지 않으면 꽁머니 홍보 효과가 저하될 수 있습니다.",
              "댓글을 통해 정보를 함께 나눌 수 있습니다. 게시글 내에 댓글을 달아 다양한 정보들을 주고받을 수 있습니다. 다른 게시판을 이용할 수도 있지만 도움이 될만한 기초적인 정보들을 댓글을 통해 나눈다면 많은 사람들에게 좋은 정보를 제공할 수 있습니다.",
              "가입 코드를 적어야 합니다. 가입 코드를 명확하게 기재할 때 고객 유치 효과가 큽니다.",
              "게시글을 작성 시, 정확하고 구체적인 제목을 적어주는 것이 좋습니다. 단순히 ‘꽁머니 지급’으로 제목을 작성하기보다는 어떤 사이트에서 어느 정도의 꽁머니를 어떤 기준으로 제공하는지를 제목을 통해 홍보할 필요가 있습니다.",
            ].map((text, index) => (
              <article
                key={index}
                className="w-full max-w-80 h-36 relative px-4 sm:px-5 py-4 sm:py-5 text-xs sm:text-sm rounded-lg border border-solid border-[#EEEEEE] flex items-center justify-center"
              >
                <p className="text-center">{text}</p>
              </article>
            ))}
          </section>
        </div>

        <article className="w-full flex flex-col sm:flex-row justify-center items-center pt-8 sm:pt-10 gap-3 px-4 sm:px-5 text-xs sm:text-sm">
          <Image src={talkball} width={100} height={100} alt="sub description" />
          <div className="w-full max-w-[900px] text-description leading-6 text-center">
            <p>
              해당 게시판은 유저들이 사이트 이용 시, 다양한 혜택을 받아볼 수 있도록 돕는 사이트입니다. 누구나 이용이 가능한 게시판이기 때문에 먹튀 검증이 이루어지지 않은 사이트 홍보가 올라올 수 있으므로 이용자의 주의가 필요합니다.
            </p>
          </div>
        </article>
      </section>
    </article>
  );
}

export default Direction;