import { useRef, forwardRef, ReactNode, useState } from "react";
import HTMLFlipBook from "react-pageflip";

import "./App.css";

const pages = [
  {
    image:
      "https://catalogodigitalassets.somosbelcorp.com/PE/202307/L/paginas/PE_L_202307_006-007.jpg",
    left: [
      {
        x: 100,
        y: 100,
        item: {},
      },
      { x: 100, y: 150, item: { name: "Nombre 1" } },
      { x: 200, y: 200, item: { name: "Nombre 2" } },
    ],
    right: [
      { x: 100, y: 100, item: { name: "Nombre 3" } },
      { x: 100, y: 150, item: { name: "Nombre 4" } },
      { x: 200, y: 200, item: { name: "Nombre 5" } },
    ],
  },

  {
    image:
      "https://catalogodigitalassets.somosbelcorp.com/PE/202307/L/paginas/PE_L_202307_004-005.jpg",
    left: [],
    right: [],
  },
];

const PageCover = forwardRef<any, PageProps>((props, ref) => {
  return (
    <div className="page page-cover" ref={ref}>
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

type Point = {
  x: number;
  y: number;
  item: any;
};

type PageProps = {
  src: string;
  number: number;
  points: Array<Point>;
  setSelected: (item: any) => void;
  children?: ReactNode;
};

const PageLeft = forwardRef<any, PageProps>((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div
        className="image-wrap image-wrap-left"
        onMouseDownCapture={(event) => {
          event.stopPropagation();
          event.preventDefault();
          event.nativeEvent.stopImmediatePropagation();
          return;
        }}
      >
        {props.points.map((point) => {
          return (
            <div
              className="point"
              style={{ top: point.y, left: point.x }}
              tabIndex={1}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                props.setSelected(point.item);
              }}
            ></div>
          );
        })}
        <img className={`image `} src={props.src} />
      </div>
    </div>
  );
});

const PageRight = forwardRef<any, PageProps>((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div
        className="image-wrap image-wrap-right"
        onMouseDownCapture={(event) => {
          event.stopPropagation();
          event.preventDefault();
          event.nativeEvent.stopImmediatePropagation();
          return;
        }}
      >
        {props.points.map((point) => {
          return (
            <div
              className="point"
              style={{ top: point.y, left: point.x }}
              tabIndex={1}
              onClick={(event) => {
                props.setSelected(point.item);
                event.nativeEvent.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                return;
              }}
            ></div>
          );
        })}
        <img className={`image`} src={props.src} />
      </div>
    </div>
  );
});

function App() {
  const book = useRef();
  const [selected, setSelected] = useState<any>(undefined);

  return (
    <div className="wrapper">
      {selected && (
        <div className="selected">
          <div onClick={() => setSelected(undefined)}>cerrar</div>
          <h1>{selected.name}</h1>
        </div>
      )}
      <HTMLFlipBook
        height={733}
        width={550}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book"
        ref={book}
      >
        <PageCover>BOOK TITLE</PageCover>
        {pages.map((page, index) => {
          return [
            <PageLeft
              key={index + 1}
              number={index + 1}
              src={page.image}
              points={page.left}
              setSelected={setSelected}
            />,
            <PageRight
              key={(index + 1) * 2}
              number={(index + 1) * 2}
              src={page.image}
              points={page.right}
              setSelected={setSelected}
            />,
          ];
        })}
      </HTMLFlipBook>
    </div>
  );
}

export default App;
