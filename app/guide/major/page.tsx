import Ggmp from "../(components)/Ggmp";
import Image from "next/image";
import major from "/public/images/major.png";
import search from "/public/images/search.png";
import talkball from "/public/images/talkball.png";
import SubMenu from "../(components)/SubMenu";

function page() {
  return (
    <div className="w-full pt-36">
      <SubMenu />
      <main>
        <Ggmp />
        <section className="flex flex-col justify-center items-center py-20">
          <Image
            alt="꽁머니팡소개"
            width={248}
            height={255}
            src={major}
          ></Image>
          <div className="text-4xl font-semibold px-3">
            <span className="text-blue">메이저 놀이터 </span>란?
          </div>

          <p className="w-full max-w-[900px] px-5 pt-5 text-description leading-6 flex flex-col justify-center items-center text-sm">
            메이저 놀이터는 토토사이트, 스포츠토토, 카지노 등에서 신뢰성과
            안전성을 갖춘 대형 플랫폼을 의미합니다. 이러한 놀이터는 대규모
            사용자 기반과 안정적인 서비스로 잘 알려져 있으며, 일반적으로
            먹튀검증을 통해 신뢰성을 확보한 사이트를 말합니다. 오랜 기간동안
            운영되오며 많은 이용자들의 검증을 거쳐 이용자들에 의해 네임드와
            벨류가 생겨난 사이트를 말하며 메이저 놀이터의 특징과 주의점은 다음과
            같습니다.
          </p>

          <div className="w-full max-w-[1000px] pt-20 px-5 flex items-center justify-between">
            <section className="hidden lg:flex w-1/2 h-full  flex-col justify-center items-center">
              <div className="font-bold text-center">
                <h1 className="text-2xl ">메이저 놀이터</h1>
                <h1 className="text-2xl ">특징과 주의사항</h1>
              </div>
              <Image
                alt="꽁머니팡소개"
                width={248}
                height={255}
                src={search}
              ></Image>
            </section>
            <section className="w-full flex flex-col gap-5 ">
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full h-36 max-w-80  relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      메이저 놀이터는 먹튀사이트가 아닌 오랜 기간동안 운영된
                      신뢰할 수 있는 플랫폼으로, 이용자들에 의해 여러해에 걸쳐
                      검증된 업체입니다. 또한 꽁머니와 같은 다양한 이벤트를
                      제공합니다.
                    </p>
                  </div>
                </article>
                <article className="w-full h-36 max-w-80  relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      메이저 놀이터는 거의 실시간으로 배당이 변경되며 배당
                      흐름이 안정적이며, 국내 및 해외의 스포츠 정보를 토대로
                      이용자들에게 최신 배당을 제공합니다.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      메이저 놀이터를 선택할 때는 반드시 먹튀검증이 완료된
                      사이트를 이용해야 합니다. 일부 사이트는 겉보기에는
                      메이저처럼 보이지만, 실제로는 사기나 먹튀의 위험이 있을 수
                      있습니다.
                    </p>
                  </div>
                </article>
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      웹상의 메이저 놀이터 순위를 신뢰할 수 있는 것은 아니며,
                      먹튀사이트가 있을 수 있습니다. 따라서, 오랜기간 운영된
                      곳인지 여러 사람들의 피해사례 및 이용후기 글들을 찾아보며
                      선택해야 합니다.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      메이저 놀이터라도 정기적으로 사이트의 안전성과 서비스
                      품질을 점검하는 곳이 좋습니다. 사이트의 업데이트나 변동
                      사항이 있을 수 있으며, 스포츠토토의 베팅 규칙이나 이벤트가
                      변경될 수 있습니다.
                    </p>
                  </div>
                </article>
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      메이저 업체인지 헷갈릴 때에는 꽁머니팡의 사용자 리뷰와
                      평가를 참고하세요. 프로토와 파워볼과 같은 다양한 게임이
                      제공되는지, 그리고 배당과 관련된 서비스가 만족스러운지
                      등을 고려해야 합니다.
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </div>
          <article className="w-full flex justify-center items-center pt-10 gap-3 px-5">
            <Image
              src={talkball}
              width={120}
              height={120}
              alt="sub description"
            ></Image>
            <div className="w-full max-w-[900px] text-description leading-6">
              <p>
                메이저 놀이터 추천 업체는 메이저 놀이터 순위를 제공하지만, 이를
                활용하기 전에 먹튀검증, 이용자들의 후기, 피해사례등 정확성을
                충분히 확인하는 것이 중요합니다. 꽁머니팡 에서는 신뢰할 수 있는
                정보를 바탕으로 매일 매일 정기적으로 광고글인지 실제 이용자들의
                진솔한 후기 인지를 판단하여 최신 정보를 유지 하고 있습니다.
              </p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default page;
