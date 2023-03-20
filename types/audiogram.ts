export interface IAudiogramDetails {
  title: string;
  cover: string;
  audio: string;
  srtFile: string;
  orientation: any;
  designProps: IDesignProps;
}

export interface IDesignProps {
  backgroundColor: string;
  textColor: string;
  titleColor: string;
}
