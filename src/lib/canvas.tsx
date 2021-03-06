import { DraggableLocation } from 'react-beautiful-dnd';
import { EMode, ICanvas, IColumn } from '../types';

export const shuffleArray = (arr: ICanvas[]): ICanvas[] => {
  const newArray = [...arr];
  for (let i = newArray.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = newArray[i];
    newArray[i] = newArray[r];
    newArray[r] = tmp;
  }
  return newArray;
};

export const getSize = (mode: number): number => {
  const isPhone = (navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;

  const CANVAS_SIZE = isPhone? 300 : 600;
  let size = 0;
  if (mode === EMode.easy) size = CANVAS_SIZE / EMode.easy;
  if (mode === EMode.normal) size = CANVAS_SIZE / EMode.normal;
  if (mode === EMode.hard) size = CANVAS_SIZE / EMode.hard;
  return size;
};

export const createStartColumns = (mode: number, canvasList: ICanvas[]): IColumn[] => {
  const columns: any = [...Array(mode)].map(
    (_, i): IColumn => {
      return {
        id: i,
        tasks: [],
      };
    }
  );

  let columnNumber = 0;
  canvasList.forEach((canvas, i) => {
    if (isNewLine(i, mode)) {
      columnNumber = 0;
    }
    columns[columnNumber].tasks.push(canvas);
    columnNumber++;
  });
  return columns;
};

export const createCanvasList = (img: any, mode: number): ICanvas[] => {
  const size: number = getSize(mode);
  let sy = 0;
  let sx = 0;
  const canvasArr: ICanvas[] = [];

  for (let i = 0; i < mode * mode; i++) {
    if (isNewLine(i, mode)) {
      sy += size;
      sx = 0;
    }
    canvasArr.push({
      url: getCanvasPartsURL(img, sx, sy, size),
      id: i,
      isCorrect: false,
    });

    sx += size;
  }
  return canvasArr;
};

const getCanvasPartsURL = (img: HTMLImageElement, sx: number, sy: number, size: number): string => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx: any = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
  return canvas.toDataURL('image/png');
};

const isNewLine = (count: number, mode: number): boolean => {
  return count !== 0 && count % mode === 0;
};

export const getNewColumns = (
  columns: IColumn[],
  source: DraggableLocation,
  destination: DraggableLocation
): IColumn[] => {
  let changeColumn = [...columns];
  const startCanvasList = columns[parseInt(source.droppableId)].tasks;
  const startTasks = Array.from(startCanvasList);

  startTasks.splice(source.index, 1);
  if (source.droppableId === destination.droppableId) {
    startTasks.splice(destination.index, 0, startCanvasList[source.index]); //移動
  } else {
    const finishCanvasList = columns[parseInt(destination.droppableId)].tasks;
    const finishTasks = Array.from(finishCanvasList);
    finishTasks.splice(destination.index, 0, startCanvasList[source.index]);
    changeColumn[parseInt(destination.droppableId)] = {
      ...columns[parseInt(destination.droppableId)],
      tasks: finishTasks,
    };
  }

  changeColumn[parseInt(source.droppableId)] = {
    ...columns[parseInt(source.droppableId)],
    tasks: startTasks,
  };
  return changeColumn;
};
