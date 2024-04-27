'use client';

import {RefObject, useEffect, useRef, useState} from "react";

type AnimationValues = [ number, number, {start: number, end: number}? ];


type SceneInfo = {
  type: 'sticky' | 'normal';
  heightNum: number;
  scrollHeight: number;
  objs: {
    [key: string]: RefObject<HTMLDivElement | HTMLCanvasElement>;

  };
  values?: {
    [key: string]: AnimationValues;
  };
};

export default function Home() {

  const section0Ref = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const firstMessageRef = useRef<HTMLDivElement>(null);
  const secondMessageRef = useRef<HTMLDivElement>(null);
  const thirdMessageRef = useRef<HTMLDivElement>(null);
  const fourthMessageRef = useRef<HTMLDivElement>(null);

  const aMessageRef = useRef<HTMLDivElement>(null);
  const bMessageRef = useRef<HTMLDivElement>(null);
  const cMessageRef = useRef<HTMLDivElement>(null);
  const pinbRef = useRef<HTMLDivElement>(null);
  const pincRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const [videoImages, setVideoImages] = useState<HTMLImageElement[]>([]);
  const [secondVideoImages, setSecondVideoImages] = useState<HTMLImageElement[]>([]);
  const [imgLoadComplete, setImgLoadComplete] = useState<boolean>(false);

  const videoImageCount = 300
  const videoImageCount2 = 960

  const sceneInfo: SceneInfo[] = [
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: section0Ref,
        firstMessage: firstMessageRef,
        secondMessage: secondMessageRef,
        thirdMessage: thirdMessageRef,
        fourthMessage: fourthMessageRef,
      },
      values: {
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        firstMessage_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        secondMessage_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        thirdMessage_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        fourthMessage_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        firstMessage_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        secondMessage_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        thirdMessage_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        fourthMessage_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        firstMessage_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        secondMessage_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        thirdMessage_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        fourthMessage_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        firstMessage_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        secondMessage_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        thirdMessage_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        fourthMessage_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
      }
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: section1Ref,
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: section2Ref,
        a: aMessageRef,
        b: bMessageRef,
        c: cMessageRef,
        pinB: pinbRef,
        pinC: pincRef,
      },
      values: {
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        a_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        b_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        c_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        a_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        b_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        c_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        a_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        b_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        c_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        a_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        b_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        c_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
      }
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: section3Ref,
      }
    }
  ];

  let currentScene = 0;
  let prevScrollHeight = 0;
  let scrollY = 0;
  let enterNewScene = false;
  const [scene, setScene] = useState<number>(0)

  const loadImages = async () => {
    const loadImage = (src: string) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
        img.onerror = reject;
      });
    };

    const imagePromises = [];
    const imagePromises2 = [];

    for (let i = 0; i < videoImageCount; i++) {
      const imagePath = `/video/001/IMG_${(i + 6726).toString().padStart(4, "0")}.JPG`;
      imagePromises.push(loadImage(imagePath));
    }

    for (let i = 0; i < videoImageCount2; i++) {
      const imagePath = `/video/002/IMG_${(i + 7027).toString().padStart(4, "0")}.JPG`;
      imagePromises2.push(loadImage(imagePath));
    }

    try {
      const allImagePromises = [...imagePromises, ...imagePromises2];
      const allLoadedImages = await Promise.all(allImagePromises);
      // 이전에 두 세트로 나눠진 로드된 이미지들을 분리합니다.
      const loadedImages = allLoadedImages.slice(0, imagePromises.length);
      const loadedImages2 = allLoadedImages.slice(imagePromises.length);

      setVideoImages(loadedImages);
      setSecondVideoImages(loadedImages2);
      setImgLoadComplete(true);
    } catch (error) {
      console.error("Failed to load images", error);
    }
  };

  const setLayout = () => {
    sceneInfo.forEach((scene) => {
      if (scene.objs.container.current) {
        if(scene.type === 'sticky'){
          scene.scrollHeight = scene.heightNum * window.innerHeight /*+ paddingTop;*/
        } else {
          scene.scrollHeight = scene.objs.container.current.offsetHeight /*+ paddingTop;*/
        }
        scene.objs.container.current.style.height = `${scene.scrollHeight}px`;

      }
    });

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= window.scrollY) {
        currentScene = i;
        break;
      }
    }
    setScene(currentScene)
    const heightRatio = window.innerHeight / 1080;
    if(canvasRef.current){
      canvasRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }
    if(canvasRef2.current){
      canvasRef2.current.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }


  }

  const scrollLoop = () => {
    enterNewScene = false;
    scrollY = window.scrollY;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (scrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      setScene(currentScene)
    }
    if (scrollY < prevScrollHeight) {
      enterNewScene = true;
      if(currentScene === 0) return;
      currentScene--;
      setScene(currentScene)
    }
    if(enterNewScene) return;
    playAnimation();
  };

  const calcValues = (values: AnimationValues, currentYOffset: number) => {
    let rv
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const  scrollRatio = currentYOffset / scrollHeight

    if(values[2]){
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if(currentYOffset  < partScrollStart){
        rv= values[0];
      } else if(currentYOffset > partScrollEnd){
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  useEffect(() => {
    if (imgLoadComplete) {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.drawImage(videoImages[0], 0, 0);
        }
      }
      /*if(canvasRef2.current){
        const context = canvasRef2.current.getContext("2d");
        if (context) {
          context.drawImage(secondVideoImages[0], 0, 0);
        }
      }*/
    }
  }, [imgLoadComplete]);

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = scrollY - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        let sequence = Math.round(Number(calcValues(values?.imageSequence!, currentYOffset)));
        if (canvasRef.current) {
          const context = canvasRef.current.getContext("2d");
          /*console.log(context);*/
          if (context) {
            if(videoImages[sequence]){
              context.drawImage(videoImages[sequence], 0, 0);
            }
          }
          canvasRef.current.style.opacity = Number(calcValues(values?.canvas_opacity!, currentYOffset)).toString();
        }
        if(scrollRatio <= 0.22){
          objs.firstMessage.current!.style.opacity = Number(calcValues(values?.firstMessage_opacity_in!, currentYOffset)).toString();
          objs.firstMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.firstMessage_translateY_in!, currentYOffset)}%, 0)`;
        } else {
          objs.firstMessage.current!.style.opacity = Number(calcValues(values?.firstMessage_opacity_out!, currentYOffset)).toString();
          objs.firstMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.firstMessage_translateY_out!, currentYOffset)}%, 0)`;
        }

        if(scrollRatio <= 0.42){
          objs.secondMessage.current!.style.opacity = Number(calcValues(values?.secondMessage_opacity_in!, currentYOffset)).toString();
          objs.secondMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.secondMessage_translateY_in!, currentYOffset)}%, 0)`;
        } else {
          objs.secondMessage.current!.style.opacity = Number(calcValues(values?.secondMessage_opacity_out!, currentYOffset)).toString();
          objs.secondMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.secondMessage_translateY_out!, currentYOffset)}%, 0)`;
        }

        if(scrollRatio <= 0.62){
          objs.thirdMessage.current!.style.opacity = Number(calcValues(values?.thirdMessage_opacity_in!, currentYOffset)).toString();
          objs.thirdMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.thirdMessage_translateY_in!, currentYOffset)}%, 0)`;
        } else {
          objs.thirdMessage.current!.style.opacity = Number(calcValues(values?.thirdMessage_opacity_out!, currentYOffset)).toString();
          objs.thirdMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.thirdMessage_translateY_out!, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          objs.fourthMessage.current!.style.opacity = Number(calcValues(values?.fourthMessage_opacity_in!, currentYOffset)).toString();
          objs.fourthMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.fourthMessage_translateY_in!, currentYOffset)}%, 0)`;
        } else {
          objs.fourthMessage.current!.style.opacity = Number(calcValues(values?.fourthMessage_opacity_out!, currentYOffset)).toString();
          objs.fourthMessage.current!.style.transform = `translate3d(0, ${calcValues(values?.fourthMessage_translateY_out!, currentYOffset)}%, 0)`;
        }
        break
      case 2:
        let sequence2 = Math.round(Number(calcValues(values?.imageSequence!, currentYOffset)));

        if (canvasRef2.current) {
          const context = canvasRef2.current.getContext("2d");
          if (context) {
            if(secondVideoImages[sequence2]){
              console.log(secondVideoImages[sequence2]);
              context.drawImage(secondVideoImages[sequence2], 0, 0);
            }
          }
          if (scrollRatio <= 0.5) {
            canvasRef2.current.style.opacity = Number(calcValues(values?.canvas_opacity_in!, currentYOffset)).toString();
          } else {
            canvasRef2.current.style.opacity = Number(calcValues(values?.canvas_opacity_out!, currentYOffset)).toString();
          }
        }


        if (scrollRatio <= 0.25) {
          objs.a.current!.style.opacity = Number(calcValues(values?.a_opacity_in!, currentYOffset)).toString();
          objs.a.current!.style.transform = `translate3d(0, ${calcValues(values?.a_translateY_in!, currentYOffset)}%, 0)`;
        } else {
          objs.a.current!.style.opacity = Number(calcValues(values?.a_opacity_out!, currentYOffset)).toString();
          objs.a.current!.style.transform = `translate3d(0, ${calcValues(values?.a_translateY_out!, currentYOffset)}%, 0)`;
        }

        if(scrollRatio <= 0.57) {
          objs.b.current!.style.opacity = Number(calcValues(values?.b_opacity_in!, currentYOffset)).toString();
          objs.b.current!.style.transform = `translate3d(0, ${calcValues(values?.b_translateY_in!, currentYOffset)}%, 0)`;
          objs.pinB.current!.style.transform = `scaleY(${calcValues(values?.pinB_scaleY!, currentYOffset)})`;
        } else {
          objs.b.current!.style.opacity = Number(calcValues(values?.b_opacity_out!, currentYOffset)).toString();
          objs.b.current!.style.transform = `translate3d(0, ${calcValues(values?.b_translateY_out!, currentYOffset)}%, 0)`;
          objs.pinB.current!.style.transform = `scaleY(${calcValues(values?.pinB_scaleY!, currentYOffset)})`;
        }

        if(scrollRatio <= 0.83) {
          objs.c.current!.style.opacity = Number(calcValues(values?.c_opacity_in!, currentYOffset)).toString();
          objs.c.current!.style.transform = `translate3d(0, ${calcValues(values?.c_translateY_in!, currentYOffset)}%, 0)`;
          objs.pinC.current!.style.transform = `scaleY(${calcValues(values?.pinC_scaleY!, currentYOffset)})`;
        } else {
          objs.c.current!.style.opacity = Number(calcValues(values?.c_opacity_out!, currentYOffset)).toString();
          objs.c.current!.style.transform = `translate3d(0, ${calcValues(values?.c_translateY_out!, currentYOffset)}%, 0)`;
          objs.pinC.current!.style.transform = `scaleY(${calcValues(values?.pinC_scaleY!, currentYOffset)})`;
        }
        break
      case 3:
        break

    }
  }




  useEffect(() => {
    setLayout();
    loadImages();
    window.addEventListener('scroll', ()=>{
      scrollLoop();
    });

    return () => {
      window.removeEventListener('scroll', scrollLoop);
    };
  }, [imgLoadComplete]);


  return (
    <div>
      <section id="scroll-section-0" className="scroll-section" ref={section0Ref}>
        <h1>AirMug Pro</h1>
        <div className={`sticky-elem sticky-elem-canvas ${scene === 0 ? 'visible' : ''}`}>
          <canvas ref={canvasRef} width="1920" height="1080" />
        </div>
        <div className={`sticky-elem main-message ${scene === 0 ? 'visible' : ''}`} ref={firstMessageRef}>
          <p>온전히 빠져들게 하는<br/>최고급 세라믹</p>
        </div>
        <div className={`sticky-elem main-message ${scene === 0 ? 'visible' : ''}`} ref={secondMessageRef}>
          <p>주변 맛을 느끼게 해주는<br/>주변 맛 허용 모드</p>
        </div>
        <div className={`sticky-elem main-message ${scene === 0 ? 'visible' : ''}`} ref={thirdMessageRef}>
          <p>온종일 편안한<br/>맞춤형 손잡이</p>
        </div>
        <div className={`sticky-elem main-message ${scene === 0 ? 'visible' : ''}`} ref={fourthMessageRef}>
          <p>새롭게 입가를<br/>찾아온 매혹</p>
        </div>
      </section>
      <section id="scroll-section-1" className="scroll-section" ref={section1Ref}>
        <p className={'description'}>
          <strong>보통 스크롤 영역</strong>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ipsa iusto natus. Alias atque commodi corporis, dignissimos dolorem doloremque eos fugit id incidunt ipsa iste natus perferendis quaerat quia quisquam sed sint, soluta voluptas. Consectetur ea porro quaerat quisquam vero. Adipisci aliquam aliquid, blanditiis culpa cumque deleniti dolor eaque enim est ex expedita id illo, ipsa laboriosam modi nostrum odit officiis perspiciatis placeat quam tempora tempore totam, ullam veritatis vero! A cumque deserunt facere fugiat hic ipsa itaque, omnis optio pariatur perspiciatis reprehenderit sunt tempora voluptatem. Accusantium amet asperiores at beatae consequatur doloribus ducimus earum eligendi eos exercitationem fugit incidunt iste laboriosam magni maxime nam nobis optio porro praesentium quae quam recusandae rerum sed sequi temporibus ullam, voluptatum. Accusantium ad adipisci animi consequatur cum eius error et exercitationem fugiat itaque magnam, minima molestias, nesciunt odio optio provident unde ut voluptatibus. Ab deleniti error explicabo ipsam nostrum reiciendis unde voluptates? Adipisci at deleniti, distinctio dolor dolorem doloremque dolores expedita harum, inventore, ipsa iste iure laborum non possimus qui recusandae tenetur vel voluptatum? Adipisci aliquid at, blanditiis consectetur dignissimos doloribus eius eligendi ex facilis maxime, praesentium quas recusandae reiciendis saepe sequi sint unde? At atque culpa cum debitis, explicabo fugit harum provident!
        </p>
      </section>
      <section id="scroll-section-2" className="scroll-section" ref={section2Ref}>
        <div className={`sticky-elem sticky-elem-canvas ${scene === 2 ? 'visible' : ''}`}>
          <canvas ref={canvasRef2} width="1920" height="1080"/>
        </div>
        <div className={`sticky-elem main-message a ${scene === 2 ? 'visible' : ''}`} ref={aMessageRef}>
          <p>
            <small>편안한 촉감</small>
            입과 하나 되다
          </p>
        </div>

        <div className={`sticky-elem desc-message b ${scene === 2 ? 'visible' : ''}`} ref={bMessageRef}>
          <p>
            편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가 댔다는 감각은
            어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
          </p>
          <div className="pin" ref={pinbRef}/>
        </div>

        <div className={`sticky-elem desc-message c ${scene === 2 ? 'visible' : ''}`} ref={cMessageRef}>
          <p>
            디자인 앤 퀄리티 오브 스웨덴,<br/>메이드 인 차이나
          </p>
          <div className="pin" ref={pincRef}/>
        </div>

      </section>
      <section id="scroll-section-3" className="scroll-section" ref={section3Ref}>
        <p className="mid-message">
          <strong>Retina 머그</strong>
          아이디어를 광활하게 펼칠 <br/>
          아름답고 부드러운 음료 공간.
        </p>
        <p className="canvas-caption">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias eaque earum eligendi magnam molestias. Animi asperiores at atque corporis cupiditate deleniti dicta dolorum explicabo laboriosam magni nostrum odit, quam quidem sint ullam. Aliquam doloremque ipsum maiores nemo perferendis voluptatibus. Alias aperiam autem beatae harum ipsam iste nam quae quia voluptatem? Animi debitis delectus eum facilis, nesciunt nobis, nulla odio praesentium quam repellat sed sit, soluta. Adipisci aspernatur blanditiis cum debitis delectus, dolorem, ex id impedit non numquam pariatur quos repellendus saepe sed suscipit veniam, voluptatibus? Accusamus aperiam aspernatur aut beatae eius eos esse eveniet, iure molestias nam neque obcaecati porro provident qui, quisquam similique veniam veritatis voluptatem! Architecto deleniti id, natus praesentium qui vitae? Accusamus alias aliquid at consectetur, dignissimos ex impedit labore nihil non nulla quisquam, recusandae repudiandae tempora tempore ullam vel voluptates! Assumenda dignissimos enim explicabo mollitia, neque quis voluptatibus. Aspernatur assumenda autem culpa dicta excepturi illum impedit incidunt inventore ipsa iure laboriosam laborum minima molestias nam nesciunt, nobis non nulla numquam obcaecati pariatur perferendis quibusdam rem repellat reprehenderit rerum saepe sed, similique sint sunt voluptas. Aperiam beatae enim fugit illo magni maiores sapiente sed! Atque cupiditate, earum eligendi ex impedit, iusto, maxime nesciunt pariatur quisquam quo veritatis!
        </p>
      </section>
    </div>
  );
}
