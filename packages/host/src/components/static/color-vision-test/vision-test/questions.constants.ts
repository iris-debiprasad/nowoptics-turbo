export interface VisionTestQuestion {
  id: React.Key;
  image: string;
  answer: number;
}

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const TestQuestions: VisionTestQuestion[] = [
  {
    id: "cvtq1",
    image:
      BASE_IMAGE_URL + "transform/51f054d9-8d9f-4395-8055-9112facf1113/6_1",
    answer: 6,
  },
  {
    id: "cvtq2",
    image:
      BASE_IMAGE_URL + "transform/e5e2926b-5626-45ec-b64e-43e9d36fe9a7/56_3",
    answer: 56,
  },
  {
    id: "cvtq3",
    image:
      BASE_IMAGE_URL + "transform/f9ed9269-4b18-4b09-b86e-9c3a7a9be01c/8_2",
    answer: 8,
  },
  {
    id: "cvtq4",
    image:
      BASE_IMAGE_URL + "transform/6e43a5ec-b4d2-4a74-8025-64ff0a672ae0/45_2",
    answer: 45,
  },
  {
    id: "cvtq5",
    image:
      BASE_IMAGE_URL + "transform/91ec3ab5-e279-4715-a1e4-c8f7c49f4db7/8_1",
    answer: 8,
  },
  {
    id: "cvtq6",
    image:
      BASE_IMAGE_URL + "transform/f783d83d-fcdb-42f3-bf94-0ff228df6aea/6_3",
    answer: 6,
  },
  {
    id: "cvtq7",
    image:
      BASE_IMAGE_URL + "transform/53f52348-092b-450f-b58e-5810b21e5e4e/56_1",
    answer: 56,
  },
  {
    id: "cvtq8",
    image:
      BASE_IMAGE_URL + "transform/3ca68778-051c-47ba-80d8-56b41d0db742/45_3",
    answer: 45,
  },
  {
    id: "cvtq9",
    image:
      BASE_IMAGE_URL + "transform/7efdd5d2-a3c4-419f-9b6f-0f4d61d9a4fb/8_3",
    answer: 8,
  },
  {
    id: "cvtq10",
    image:
      BASE_IMAGE_URL + "transform/fadb4c59-8e55-4037-b6f7-a3f0380ed979/45_1",
    answer: 45,
  },
  {
    id: "cvtq11",
    image:
      BASE_IMAGE_URL + "transform/849ccf7c-3f61-48ef-8a12-ce52ccf32e23/56_2",
    answer: 56,
  },
];
