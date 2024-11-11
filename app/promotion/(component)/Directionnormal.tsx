import Image from "next/image";
import React from "react";
import talkball from "/public/images/talkball.png";
import search from "/public/images/search.png";
import major from "/public/images/major.png";

function Direction() {
  return (
    <article>
      <section className="flex flex-col justify-center items-center py-8 md:py-10">
        <Image alt="꽁머니팡 소개" width={248} height={255} src={major} />
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-4">
          <span className="text-blue">일반 홍보 게시판</span> 이용 방법
        </div>
        
        <p className="w-full max-w-[900px] px-4 sm:px-5 pt-4 text-xs sm:text-sm md:text-base text-description leading-6 text-center">
          일반 홍보 게시판은 누구나 이용이 가능합니다. 홍보를 원하는 토토 사이트는 물론이고 일반 유저들도 정보를 공유하기 위해 이용할 수 있습니다. 여러 종류의 홍보글, 여러 주제의 게시글이 올라오는 만큼 게시판을 이용할 때는 건전한 소통이 가능하도록 협조해 주시기 바랍니다.
        </p>

        <div className="w-full max-w-[1000px] pt-16 md:pt-20 px-4 sm:px-5 flex flex-col lg:flex-row items-center justify-between">
          <section className="hidden lg:flex w-1/2 h-full flex-col justify-center items-center">
            <div className="font-bold text-center">
              <h1 className="text-lg md:text-2xl">일반 홍보 게시판</h1>
              <h1 className="text-lg md:text-2xl">이용 주의사항</h1>
            </div>
            <Image alt="꽁머니팡 소개" width={248} height={255} src={search} />
          </section>

          <section className="w-full flex flex-col items-center gap-4 sm:gap-5">
            {[
              "일반 홍보 게시판은 먹튀 검증 게시판이 아닙니다. 먹튀 사이트나 사기 사이트가 있을 수 있으므로 다양한 혜택을 제공한다고 하더라도 사이트가 안전한지 확인 후에 이용하셔야 합니다.",
              "사이트 혜택은 물론이고 토토 사이트에서 진행하는 이벤트를 홍보할 수 있습니다. 꽁머니, 가입머니, 입금 플러스 머니 등 사이트에서 유저에게 제공하는 혜택이 있다면 일반 홍보 게시판을 통해 소통할 수 있습니다.",
              "토토 사이트 홍보 시에 사이트 이름과 주소를 기재해 주시면 홍보에 많은 도움이 됩니다. 간혹 홍보 내용은 있으나 사이트 이름과 주소가 기재되지 않아 홍보 효과가 사라지는 경우가 있으므로 주의가 필요합니다.",
              "일반 홍보 게시글을 통해 먹튀 검증은 불가능합니다. 먹튀 검증이 필요한 사이트나 공식보증업체로 등록을 원하는 사이트라면 고객센터를 통해 요청할 수 있습니다.",
              "게시글을 작성 시, 정확하고 구체적인 제목을 적어주는 것이 좋습니다. 단순히 ‘최고 혜택 제공’으로 제목을 작성하기보다는 어떤 사이트에서 어느 정도의 혜택이나 이벤트를 어떤 기준으로 제공하는지를 제목을 통해 홍보할 필요가 있습니다.",
              "일반 홍보 게시판을 통해 홍보할 때는 건전한 용어, 쉬운 용어를 사용하여야 합니다. 토토 사이트 초보자도 라이브맨을 많이 이용하기 때문에 누구나 알기 쉬운 게시글이 될 수 있도록 게시글을 작성해야 합니다.",
            ].map((text, index) => (
              <article
                key={index}
                className="w-full max-w-[300px] h-28 md:h-36 relative px-3 sm:px-5 py-3 sm:py-5 text-xs sm:text-sm rounded-lg border border-solid border-[#EEEEEE] flex items-center justify-center text-center"
              >
                <p>{text}</p>
              </article>
            ))}
          </section>
        </div>

        <article className="w-full flex flex-col sm:flex-row justify-center items-center pt-8 sm:pt-10 gap-3 px-4 sm:px-5 text-xs sm:text-sm">
          <Image src={talkball} width={100} height={100} alt="부가 설명" />
          <div className="w-full max-w-[900px] text-description leading-6 text-center">
            <p>
              일반 홍보 게시판은 누구나 이용이 가능합니다. 사이트 홍보는 물론이고 이벤트, 혜택 등 다양한 홍보가 가능하고 누구나 댓글을 통해 소통할 수 있습니다. 다만, 일반 홍보 게시판의 주제가 다양하고 많은 사람들이 이용하므로 건전한 게시판 이용을 위한 모두의 노력이 필요합니다.
            </p>
          </div>
        </article>
      </section>
    </article>
  );
}

export default Direction;