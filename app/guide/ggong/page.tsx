import Ggmp from "../(components)/Ggmp";
import Image from "next/image";
import money from "/public/images/money.png";
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
            src={money}
          ></Image>
          <div className="text-4xl font-semibold">
            <span className="text-blue">꽁머니 </span>바로알기
          </div>
          <p className="w-full max-w-[900px] px-5 pt-5 text-description leading-6 flex flex-col justify-center items-center text-sm">
            꽁머니는 토토사이트나 스포츠토토, 카지노에서 신규 가입자나 기존
            사용자에게 제공하는 무료 포인트입니다. 이를 통해 사용자는 실제
            이용전에 게임을 시험해볼 수 있습니다. 꽁머니는 주로 메이저사이트와
            안전한놀이터에서 제공되며, 먹튀검증이 완료된 신뢰할 수 있는
            사이트에서 주어지는 것이 일반적입니다. 하지만 꽁머니를 통해 안전하게
            이용을 마쳤더라도 안전한 업체라고 안심할 수는 없습니다. 마케팅
            목적으로 이용자를 끌어들인 후 먹튀를 하는 업체도 심심치 않게
            존재하기 때문입니다. 꽁머니팡에서 활발한 소통을 통하여 피해 사례를
            공유하고 안전한 업체를 찾아보세요.
          </p>
          <div className="w-full max-w-[1000px] pt-20 px-5 flex items-center justify-between">
            <section className="hidden lg:flex w-1/2 h-full  flex-col justify-center items-center">
              <div className="font-bold text-center">
                <h1 className="text-2xl ">꽁머니</h1>
                <h1 className="text-2xl ">이용 주의사항</h1>
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
                      꽁머니는 게임을 시험해볼 수 있는 기회를 제공합니다.
                      이용자들은 프로토나 파워볼을 무료로 시도해볼 수 있으며,
                      이를 통해 안전놀이터 인지 판단할 수 있습니다.
                    </p>
                  </div>
                </article>
                <article className="w-full h-36 max-w-80  relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      신규 토토사이트나 스포츠토토를 이용할 때, 꽁머니를 통해
                      사이트의 인터페이스와 게임 종류를 체험할 수 있습니다. 이를
                      통해 해당 사이트가 메이저놀이터인지 확인할 수 있습니다.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      꽁머니로 얻은 승리는 종종 실제 수익화가 가능할 수
                      있습니다. 다만, 그렇다고 안전한 업체로 확실히 믿을 수는
                      없습니다. 오랜기간 소액으로 이용하면서 안전놀이터인지
                      검증을 거쳐야 합니다.
                    </p>
                  </div>
                </article>
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      모든 사이트가 신뢰할 수 있는 것은 아니며, 먹튀사이트가
                      있을 수 있습니다. 따라서, 꽁머니를 제공하는 사이트가
                      먹튀검증을 통과했는지 확인하는 것이 중요합니다.
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      꽁머니는 특정 게임이나 안전한놀이터에서만 사용이 가능하며,
                      사용 조건이 제한적일 수 있습니다. 또한, 사용한 금액이나
                      배당에 따른 제한이 있을 수 있습니다.
                    </p>
                  </div>
                </article>
                <article className="w-full max-w-80 h-36 relative px-5 py-5 text-sm rounded-lg  border border-solid border-[#EEEEEE] flex items-center justify-center">
                  <div>
                    <p className="">
                      꽁머니를 사용하려면 업체마다 복잡한 베팅 요구 사항과
                      규정이 있습니다. 이러한 요구 사항을 충족하지 않으면 실제
                      수익화가 어려울 수 있습니다. 예를 들어, 스포츠토토의 경우
                      특정 베팅 규칙을 따라야 할 수 있습니다.
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
                꽁머니를 안전히 사용하기 위해서는 이러한 여러가지 주의 사항이
                필요합니다. 꽁머니팡은 꽁머니를 지급하는 사이트를 여러 유저들의
                사용경험, 피해사례를 통하여 검증합니다. 또 한번 안전한 업체라고
                판단이 되어도 언제나 안전한 업체일수는 없으므로 일정 기간마다
                검증을 반복합니다. 그렇기에 꽁머니팡에서 추천드리는 업체는
                안전한 업체임을 신뢰할 수 있습니다.
              </p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default page;
