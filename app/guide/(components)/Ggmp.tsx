import Image from "next/image";
import ggongMoney from "/public/images/ggongMoney.png";
import logo from "/public/images/logo.png";

function Ggmp() {
  return (
    <section className="block lg:flex bg-bgblue py-28 px-10 gap-5">
      <div className="flex flex-col lg:flex-row items-center max-w-[1300px] mx-auto gap-10">
        <article className="w-full lg:w-auto flex flex-col justify-center items-center lg:items-start lg:px-20">
          <div className="w-80 text-2xl font-semibold flex items-center justify-center">
            스포츠커뮤니티
            <span className="text-blue"> GOAT</span>
          </div>
          <div className="w-80 flex justify-center items-center">
            <Image alt="logo" width={260} height={100} src={logo}></Image>
          </div>
          <div className="w-80 pt-5 text-lg font-medium text-blue flex justify-center items-center">
            <p>
              꽁머니팡은 스포츠분석글과 피해사례 및 꽁머니 정보등 다양한 정보를
              가지고 있는 스포츠 커뮤니티 입니다.
            </p>
          </div>
        </article>
        <article className="w-full lg:w-1/2 px-5">
          <p className="pt-10 text-deepsky text-sm">
            꽁머니팡 에서는 실시간 스포츠분석 및 스포츠토토 사이트에 대한 종합
            정보를 제공합니다. 꽁머니 제공과 먹튀검증이 포함되어 있어,
            사용자들에게 신뢰할 수 있는 안전한놀이터를 추천합니다. 또한, 다양한
            이벤트 및 토토사이트의 메이저놀이터와 메이저사이트뿐만 아니라
            유저들간의 실제 경험을 토대로 한 피해사례 공유 및 활발한 소통을
            지향합니다. 정보와 순위 모음으로 여러분의 토토 경험을 더 풍부하게
            만들어 드립니다. 프로토와 승무패, 스포츠토토에 대한 최신 소식과
            분석을 제공하며, 파워볼과 같은 다양한 게임의 라인업 및 상세한 정보를
            안내합니다. 커뮤니티를 통해 먹튀사이트에 대한 정보와 리뷰를
            공유하고, 추천하는 안전한 놀이터를 통해 안심하고 게임을 즐길 수
            있습니다. 꽁머니팡에서 제공하는 실시간 정보와 분석으로 신뢰할 수
            있는 정보를 찾아보세요.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Ggmp;
