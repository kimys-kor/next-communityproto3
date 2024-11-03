import Image from "next/image";
import Ggmp from "./(components)/Ggmp";
import question from "/public/images/question.png";
import talkball from "/public/images/talkball.png";
import advantage from "/public/images/advantage.png";
import logo from "/public/images/logo.png";
import SubMenu from "./(components)/SubMenu";

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
            src={question}
          ></Image>
          <div className="text-4xl font-semibold">
            왜<span className="text-blue"> 꽁머니팡</span> 인가요?
          </div>
          <div className="flex flex-col items-center px-3">
            <div className="w-full flex flex-col lg:flex-row pt-10 gap-5">
              <article
                className="w-full sm:w-[450px] md:w-[480px] 
              border border-solid border-deepsky rounded-md py-5 px-5 sm:px-10 flex justify-start items-center gap-3"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-deepblue text-xl font-bold">
                  1
                </span>
                <div className="text-lg font-medium">
                  <div>
                    정기적으로
                    <span className="text-deepblue"> 광고성 글을 점검</span>
                    하고 관리하고 있습니다. 약속과 다르게 꽁머니를 지급하지 않는
                    글들을 자체적으로 점검하여 정리하고 있습니다.
                  </div>
                </div>
              </article>
              <article
                className="w-full sm:w-[450px] md:w-[480px] 
              border border-solid border-deepsky rounded-md py-5 px-5 sm:px-10 flex justify-start items-center gap-3"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-deepblue text-xl font-bold">
                  2
                </span>
                <div className="text-lg font-medium">
                  <div>
                    먹튀 피해 사례가 있던 곳들의
                    <span className="text-deepblue">
                      {" "}
                      정보를 확인하고 관리합니다.
                    </span>
                    메이저 놀이터와 안전 놀이터에 대한 추천으로 안전한 게임을
                    즐길 수 있습니다.
                  </div>
                </div>
              </article>
            </div>
            <div className="w-full flex flex-col lg:flex-row pt-5 gap-5">
              <article
                className="w-full sm:w-[450px] md:w-[480px] 
              border border-solid border-deepsky rounded-md py-5 px-5 sm:px-10 flex justify-start items-center gap-3"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-deepblue text-xl font-bold">
                  3
                </span>
                <div className="text-lg font-medium">
                  <div>
                    파워볼, 배당, 라인업 등 최신 스포츠 정보를 빠르게
                    <span className="text-deepblue"> 업데이트 하여 </span>
                    제공 합니다.
                  </div>
                </div>
              </article>
              <article
                className="w-full sm:w-[450px] md:w-[480px] 
              border border-solid border-deepsky rounded-md py-5 px-5 sm:px-10 flex justify-start items-center gap-3"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-deepblue text-xl font-bold">
                  4
                </span>
                <div className="text-lg font-medium">
                  <div>
                    저희 토토팡에서는 다양한
                    <span className="text-deepblue"> 이벤트 </span>를 진행하고
                    있습니다. 이벤트에 참여하여 많은 혜택을 받아 보세요!
                  </div>
                </div>
              </article>
            </div>
            <div className="pt-5 w-full flex justify-center">
              <article
                className="w-full sm:w-[450px] md:w-[480px] 
              border border-solid border-deepsky rounded-md py-5 px-5 sm:px-10 flex justify-start items-center gap-3"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-deepblue text-xl font-bold">
                  5
                </span>
                <div className="text-lg font-medium">
                  <div>
                    유저들과
                    <span className="text-deepblue">
                      {" "}
                      실제 피해 사례, 스포츠 정보를
                    </span>{" "}
                    실시간으로 공유하고 소통해 보세요!
                  </div>
                </div>
              </article>
            </div>
          </div>
          <article className="w-full max-w-[900px] flex justify-center items-center pt-5 px-5 gap-3">
            <Image
              src={talkball}
              width={120}
              height={120}
              alt="sub description"
            ></Image>
            <div className="w-text-description leading-6">
              <p>
                더이상 넘쳐나는 광고성 글과 매크로에 현혹되지 마시기 바랍니다.
                많은 스포츠 관련 사이트에서 누가 썼는지 믿을 수 없는 먹튀사이트
                글에 피해를 입지 않도록 꽁머니팡에서는 안전한 정보를 제공해
                드리겠습니다. 먹튀검증과 꽁머니 정보는 꽁머니팡에서!
              </p>
            </div>
          </article>
          <article className="pt-20 w-full flex flex-col items-center px-3">
            <div className="flex flex-col items-center">
              <div className="w-80 text-2xl font-semibold flex items-center justify-center">
                스포츠커뮤니티
                <span className="text-blue"> GOAT</span>
              </div>
              <div className="w-80 flex justify-center items-center">
                <Image alt="logo" width={260} height={100} src={logo}></Image>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default page;
