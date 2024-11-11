import Image from "next/image";
import React from "react";
import talkball from "/public/images/talkball.png";
import search from "/public/images/search.png";
import safe from "/public/images/safe.png";

function Direction() {
  return (
    <article>
      <section className="flex flex-col justify-center items-center py-8 md:py-10">
        <Image alt="꽁머니팡소개" width={248} height={255} src={safe} />
        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-4">
          <span className="text-blue">구인구직 게시판 </span>이용 방법
        </div>
        <p className="w-full max-w-[900px] px-4 sm:px-5 pt-4 text-xs sm:text-sm md:text-base text-description leading-6 text-center">
          꽁머니팡 에서는 구인구직 게시판을 운영하고 있습니다. 구인구직 페이지를 운영하는 이유는 많은 분들이 다양한 방식으로 소통할 수 있도록 돕기 위해서입니다. 특히, 토토사이트를 이용하는 유저들이 갖추고 있는 역량이나 재능이 각기 다르기 때문에 구인구직 사이트를 통하여 역량을 발휘할 수 있도록 돕습니다. 다양한 일자리 소개는 물론이고 토토사이트의 파트너나 팀원 모집 역시 해당 페이지를 통해 정보를 주고받을 수 있습니다.
        </p>

        <div className="w-full max-w-[1000px] pt-16 md:pt-20 px-4 sm:px-5 flex flex-col lg:flex-row items-center justify-between">
          <section className="hidden lg:flex w-1/2 h-full flex-col justify-center items-center">
            <div className="font-bold text-center">
              <h1 className="text-lg md:text-2xl">구인구직 홍보 게시판</h1>
              <h1 className="text-lg md:text-2xl">이용 주의사항</h1>
            </div>
            <Image alt="꽁머니팡소개" width={248} height={255} src={search} />
          </section>

          <section className="w-full flex flex-col items-center gap-4 sm:gap-5">
            {[
              "구인 / 구직 카테고리 선택하기 구인 / 구직 중 원하는 상태를 선택합니다. 정확하게 구인 / 구직을 선택해야 빠른 소통과 정보 공유가 가능해집니다.",
              "구인구직 내용을 게시할 때는 직관적이고 구체적인 제목을 사용하는 것이 좋습니다. 예를 들어 ‘구인 모집합니다’와 같은 제목보다는 ‘총판, 파트너 모집합니다’와 같은 제목을 사용하는 것이 도움이 됩니다.",
              "구인, 구직 내용이 아닌 홍보를 목적으로 한 게시글은 통보 없이 삭제될 수 있음으로 주의합니다. 홍보를 목적으로 한다면 ‘일반홍보’게시판을 이용해 주시기 바랍니다.",
              "다른 사이트나 사람을 비방할 목적으로 해당 게시판을 이용할 수 없습니다.",
              "사실이 아닌 내용을 올려서는 안 되며, 허위 구인 구직 게시글로 인지될 경우 통보 없이 게시글이 삭제될 수 있습니다.",
              "다른 사람의 의견이나 게시글을 비방하거나 악의적인 욕설을 하지 않습니다.",
            ].map((text, index) => (
              <article
                key={index}
                className="w-full max-w-80 h-28 md:h-36 relative px-3 sm:px-5 py-3 sm:py-5 text-xs sm:text-sm rounded-lg border border-solid border-[#EEEEEE] flex items-center justify-center"
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
              구인구직 게시판은 누구나 이용할 수 있도록 열려 있습니다. 사람을 구하거나 일자리를 구하고 싶은 모든 사람이 이용할 수 있습니다. 다양한 일자리, 다양한 인력들이 함께 하는 공간이기에 건전한 게시판 운영이 중요합니다.
            </p>
          </div>
        </article>
      </section>
    </article>
  );
}

export default Direction;