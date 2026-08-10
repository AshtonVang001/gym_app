export type uploadedImage = {
  success: boolean;
  message: string;
  image: {
    name: string;
    size: number;
    type: string;
  };
};
