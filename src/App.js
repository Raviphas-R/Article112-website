import React, { useState, useEffect, useRef } from "react";
import Chart from "./chart/chart";

function App() {
  const [heroSectionInView, setHeroSectionInView] = useState(true);

  const elementRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    });

    const elements = elementRefs.current;
    elements.forEach((elementRef) => {
      observer.observe(elementRef);
    });

    return () => {
      elements.forEach((elementRef) => {
        observer.unobserve(elementRef);
      });
    };
  }, []);

  const handleClickScroll = () => {
    const element = heroSectionInView
      ? document.getElementById("cases__section")
      : document.getElementById("hero__section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero__section");
      if (heroSection) {
        const { top } = heroSection.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const isVisible = Math.ceil(Math.abs(top)) >= viewHeight;
        if (isVisible) {
          setHeroSectionInView(false);
        } else {
          setHeroSectionInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const quotes = [
    {
      id: 1,
      name: "ดร. เข็มทอง ต้นสกุลรุ่งเรือง",
      image: "person-1.png",
      quote: `“ปัญหาใหญ่มากๆ ของมาตรา 112 คือมันมีนโยบายที่ให้ใช้อย่างร้ายแรงที่สุด ให้เป็นความลับ มันทำให้ภาพลักษณ์ของระบบยุติธรรมในคดี 112 เป็นกฎหมายที่ไม่ชัดเจนแน่นอน กฎหมายไม่มีความโปร่งใส และไม่สมเหตุสมผล  ไม่ว่าต่อไปนี้คุณจะตัดสินคดีอื่น คดีไหนก็ตาม คนก็จะเกิดความไม่เชื่อถือ เกิดความสงสัยในการกระทำของสถาบันตุลาการ ถ้าเป็นอย่างนั้นสังคมไทยอยู่ไม่ได้”`,
      title: "คณะนิติศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    },
    {
      id: 2,
      name: "รองศาสตราจารย์ ดร. วาสนา วงศ์สุรวัฒน์",
      image: "person-2.png",
      quote:
        "“เราสามารถมีระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุขได้ แต่เราก็สามารถทำให้กฏหมายนั้น มันไม่ขัดแย้งต่อหลักการพื้นฐาน สิทธิ และเสรีภาพของประชาชนในสังคมประชาธิปไตยได้ และนั่นก็ควรเป็นสิ่งที่ควรจะทำ”",
      title: "คณะอักษรศาสตร์ ภาควิชาประวัติศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    },
    {
      id: 3,
      name: "นิธิ เอียวศรีวงศ์",
      image: "person-3.png",
      quote:
        "“ควรมีบุคคลหรือองค์กรในระดับสูง ซึ่งไม่เกี่ยวกับพระมหากษัตริย์โดยทางหนึ่งทางใด อาจเป็นองค์กรที่มีอยู่แล้วเช่น อัยการสูงสุด รัฐมนตรีกระทรวงวัฒนธรรม นายกรัฐมนตรี หรือตั้งองค์กรใหม่ขึ้นกลั่นกรองก่อนจะอนุมัติให้ดำเนินคดีได้ อย่าปล่อยให้ใครๆ ก็สามารถตั้งตัวเป็นโจทย์ฟ้องร้องได้ และปล่อยให้ตำรวจชั้นผู้น้อยและอัยการชั้นผู้น้อย ต้องใช้วินิจฉัยของตนเองว่าจะดำเนินคดีหรือไม่ ซึ่งยากที่จะใช้อำนาจวินิจฉัยนั้นอย่างเที่ยงธรรม”",
      title:
        "อดีตอาจารย์ประจำภาควิชาประวัติศาสตร์ คณะมนุษยศาสตร์ มหาวิทยาลัยเชียงใหม่",
    },
  ];

  return (
    <main>
      <section
        className="hero__section d-flex justify-content-center align-items-center min-vh-100 px-4"
        id="hero__section"
      >
        <div style={{ maxWidth: "720px" }}>
          <h1 className="text-center">ม.๑๑๒</h1>
          <p className="font-md text-center mt-4">
            “ผู้ใดหมิ่นประมาท ดูหมิ่น <br className="d-sm-none"></br>
            หรือแสดงความอาฆาตมาดร้าย พระมหากษัตริย์
            <br className="d-sm-none"></br>พระราชินี รัชทายาท
            <br></br>
            หรือผู้สำเร็จราชการแทนพระองค์
            <br className="d-sm-none"></br>
            ต้องระวางโทษจำคุกตั้งแต่สามปีถึงสิบห้าปี”
          </p>
        </div>
        <button
          className={`hero__scroll-btn position-fixed ${
            !heroSectionInView ? "rotate-180" : ""
          }`}
          onClick={handleClickScroll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path d="M7 12L13 16L19 12" stroke="#636363" />
            <circle cx="13" cy="13" r="12.5" stroke="#636363" />
          </svg>
        </button>
      </section>
      <section
        className="cases__section d-flex justify-content-center align-items-center min-vh-100 px-4 px-md-5 py-5"
        id="cases__section"
      >
        <div style={{ maxWidth: "720px" }}>
          <h2>จำนวนคดีที่เกิดขึ้น</h2>

          <p className="font-md mt-4">
            มาตรา 112 <br className="d-sm-none"></br>
            มีการตีความการกระทำอย่างไร้ขอบเขต
            แต่ทุกคนสามารถผู้กล่าวโทษให้ดำเนินคดีได้
            จึงมีการกล่าวหากันเป็นจำนวนมากในช่วงที่มีความขัดแย้งทางการเมืองหลังจากปี
            2548 เป็นต้นมา
          </p>
          <Chart />
          <p className="font-sm text-center">
            ที่มา: <a href="https://freedom.ilaw.or.th/node/817">iLaw</a>
          </p>
        </div>
      </section>

      <section
        className="opinions__section d-flex justify-content-center px-4 px-md-5 py-5"
        id="opinions__section "
      >
        <div className="opinions__section__opinion-container">
          <h2 className="text-center text-md-start">ความเห็นนักวิชาการ</h2>
          {quotes.map((opinion, index) => (
            <div
              ref={(ref) => (elementRefs.current[index] = ref)}
              className={`opinions__section__opinion-card d-flex flex-column align-items-center ${
                index % 2 === 0 ? "me-md-auto" : "ms-md-auto"
              }`}
              key={opinion.id}
            >
              <p className="text-center text-md-start">{opinion.quote}</p>
              <div
                className={`d-flex flex-column flex-md-row align-items-center ${
                  index % 2 === 0 ? "me-md-auto" : "ms-md-auto"
                }`}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/${opinion.image}`}
                  alt={opinion.name}
                  className={`mt-2 ${
                    index % 2 === 0 ? "order-md-1" : "order-md-2"
                  }`}
                ></img>
                <div
                  className={` ${
                    index % 2 === 0
                      ? "order-md-2 ms-md-3"
                      : "order-md-1 me-md-3"
                  }`}
                >
                  <p
                    className={`opinions__name font-sm fw-bold text-center mb-0 ${
                      index % 2 === 0 ? "text-md-start" : "text-md-end"
                    } `}
                  >
                    {opinion.name}
                  </p>
                  <p className="font-sm text-center text-md-start mb-0">
                    {opinion.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <div className="footer font-sm text-center">
          &copy; PU Dev Challenge - Developed by Raviphas R.
        </div>
      </footer>
    </main>
  );
}

export default App;
