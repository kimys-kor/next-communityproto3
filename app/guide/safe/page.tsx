import Ggmp from "../(components)/Ggmp";
import Image from "next/image";
import safe from "/public/images/safe.png";
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
          <Image alt="꽁머니팡소개" width={248} height={255} src={safe}></Image>
          <div className="text-4xl font-semibold px-3">
            <span className="text-blue">안전 놀이터 </span>란?
          </div>

          <p className="w-full max-w-[900px] px-5 pt-5 text-description leading-6 flex flex-col justify-center items-center text-sm">
            안전 놀이터는 토토사이트, 스포츠토토, 카지노 등에서 오랜기간
            운영되어온 안전성을 갖춘 플랫폼을 의미합니다. 이러한 놀이터는
            어느정도 규모 있는 자본력과 안전한 운영방식을 통해 먹튀 확률이 없는
            검증된 사이트를 말합니다. 지금도 안타깝게 많은 사람들이 먹튀 피해를
            입는 사건이 발생하고 있습니다. 저희 꽁머니팡에서는 담당 검증팀을
            통하여 안전놀이터인지 정확하고 꼼꼼하게 검증을 진행하고 있습니다.
          </p>

          <div className="w-full max-w-[1000px] pt-20 px-5 flex items-center justify-between">
            <section className="hidden lg:flex w-1/2 h-full  flex-col justify-center items-center">
              <div className="font-bold text-center">
                <h1 className="text-2xl ">안전 놀이터</h1>
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
                      안전 놀이터는 어느정도 규모 있는 자본력을 유지하고
                      있습니다. 꽁머니팡에서는 일정한 자본이 있는 놀이터인지
                      정기적으로 점검하고 있습니다.
                    </p>
                  </div>
                </article>
                <article className="w-full h-36 max-w-80  relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      안전 놀이터는 메이저 놀이터라고 해도 언제나 믿을 수 있는게
                      아닙니다. 실제로 메이저 놀이터라고 안심하였다가 피해
                      사례를 입는 분들이 다수 존재 합니다. 따라서 정기적으로
                      검증을 통하여 신뢰성을 확보하여야 합니다.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      안전 놀이터를 선택할 때에도 업체마다 이벤트와 규정에
                      상당한 차이가 존재합니다. 따라서 자신의 성향과 맞는 업체를
                      찾는것이 중요하기 때문에 꼼꼼히 이벤트와 규정을 따져보고
                      자신에게 유리한 업체를 찾는것이 좋습니다.
                    </p>
                  </div>
                </article>
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      믿을 수 있는 안전 놀이터라고 하더라도 개인 정보와 업체의
                      보안 규정 스타일을 파악하여야 합니다. 언제든지 유저의
                      개인정보 해킹 피해를 통해 금전적인 손실을 입을 수 있기
                      때문입니다. 따라서 기술적인 수준, 보안 의식이 있는
                      업체인지도 판단을 하여야 안전 놀이터라 할 수 있습니다.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      안전 놀이터라도 정기적으로 이벤트를 진행하는 곳과 업데이트
                      하는 곳이 좋습니다. 게임외에 부가적으로 다양한 즐길거리를
                      제공 하는 업체인지 확인하는것이 중요합니다.
                    </p>
                  </div>
                </article>
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      안전 놀이터 헷갈릴 때에는 꽁머니팡에서 사용자 리뷰와
                      평가를 통하여 확인해 보는것이 좋습니다. 꽁머니팡에서는
                      정기적으로 광고멘트, 자금력 여부, 이벤트 여부를 검증하고
                      있기 때문에 믿고 이용할 수 있습니다.
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
                안전 놀이터 추천 업체는 안전 놀이터 순위를 제공하지만, 이를
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
